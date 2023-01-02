/* eslint-disable */
import MainService from "./base";

const convertToFormData = (formData, data, previousKey) => {
  if (data instanceof Object) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value instanceof Blob && !Array.isArray(value)) {
        formData.append(key, value, getFilename(value.name));
      }

      if (value instanceof Object && !Array.isArray(value)) {
        return convertToFormData(formData, value, key);
      }
      if (previousKey) {
        key = `${previousKey}[${key}]`;
      }
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(`${key}[]`, val);
        });
      } else {
        formData.append(key, value);
      }
    });
  }
};

const handleGeneralError = (error) => console.log("General Error", error);
const handleGETRequest = async (api, { ...body }, urlAPI = "api") => {
  const {
    result: { body: resultBody },
  } = await MainService(api, urlAPI)
    .doRequest({ query: { ...body } })
    .then((result) => result)
    .catch((errorGeneral) => {
      handleGeneralError(errorGeneral);
      return {
        result: { body: { data: null, error: null } },
        errorJS: errorGeneral,
      };
    });
  return resultBody;
};

const handlePOSTRequest = async (
  api,
  body,
  urlAPI = "api",
  asFormData = false
) => {
  const formData = new FormData();
  let actualBody = { ...body };

  if (asFormData) {
    // https://stackoverflow.com/a/43101878
    // convertToFormData(formData, body);
    actualBody = formData;
  }

  const {
    result: { body: resultBody },
  } = await MainService(api, urlAPI)
    .doRequest({
      body: actualBody,
      hooks: {
        before({ payload, next }) {
          const newPayload = { ...payload };
          if (asFormData) delete newPayload.headers["Content-Type"];
          next(newPayload);
        },
      },
    })
    .then((result) => result)
    .catch((errorGeneral) => {
      handleGeneralError(errorGeneral);
      return {
        result: {
          body: { data: null, error: null },
        },
        errorJS: errorGeneral,
      };
    });

  if (error) console.log(error);

  return resultBody;
};

/** Edit this part */

export const getInsurancePlans = ({ id, insuranceId }) =>
  handleGETRequest("insurancePlans", {
    customerId: `${id}`,
    insuranceProductId: `${insuranceId}`,
  });

export const downloadFile = ({ fileName }) =>
  handleGETRequest("downloadFile", { fileName });
