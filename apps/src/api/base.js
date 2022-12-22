/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { ApiService, ApiTree } from "@apicase/services";
import fetch from "@apicase/adapter-fetch";
import Cookies from "js-cookie";
import apiList from "./list";
import { v4 } from "uuid";
import { parse } from "query-string";

// VARIABLE LIST
// make sure match for your APP
const appBaseUrl = process.env.REACT_APP_BASE_URL;
const appEnvironment = process.env.REACT_APP_ENVIRONMENT;
// const appName = process.env.REACT_APP_NAME;
// const appSecretKey = process.env.REACT_APP_SECRET_KEY;
// const appDeviceType = process.env.REACT_APP_DEVICE_TYPE;
// const appTokenHeader = process.env.REACT_APP_TOKEN_HEADER || "Authorization";

// END OF VARIABLE LIST

// SERVICE LOGGER
// this function to get event & result log
// only in local
const serviceLogger = (event, result) => {
  if (appEnvironment === "local")
    console.log("serviceLogger: ", { event }, { result });
  return null;
};

// END OF FUNCTION GROUP

const RootService = new ApiService({
  adapter: fetch,
  url: appBaseUrl,
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  options: { timeout: 1000 },
});

// SERVICE LOGGER FOR API ACTIVITY & RESPONSE
RootService.on("done", (result) => serviceLogger("done", result));
RootService.on("fail", (result) => serviceLogger("fail", result));
RootService.on("finish", (result) => serviceLogger("finish", result));
RootService.on("start", (result) => serviceLogger("start", result));
RootService.on("cancel", (result) => serviceLogger("cancel", result));
RootService.on("error", (result) => serviceLogger("error", result));
// END of SERVICE LOGGER FOR API ACTIVITY & RESPONSE

// ADDITIONAL ERROR STATES
const do400 = (result) => {
  const { meta } = result.body;
  const errText = `Error ${meta.code} - ${meta.title}`;
  alert(errText);
  console.log("API Error: ", errText);
};
// END OF ADDITIONAL ERROR STATES

// FAIL API ACTIVITY
const handleFailed = (errorCode, payload, retry, result, next) => {
  if (errorCode === 400) {
    console.log("ERR 400: ", { retry, result, payload });
    do400(result);
  }
};
// END OF FAIL API ACTIVITY

const parsed =
  parse(window.location.search) || "ff145788-3964-3703-8f50-680630b63943";

const MainService = new ApiTree(RootService, [
  {
    url: "api",
    children: apiList,
    hooks: {
      before({ payload, next }) {
        const token = Cookies.get("token");
        const newPayload = { ...payload };
        newPayload.headers = {
          ...payload.headers,
          Authorization: `Bearer ${parsed.accessToken}`,
          "X-TRACE-ID": v4(),
        };
        next(newPayload);
      },
      async fail({ payload, retry, result, next }) {
        const errorCode = result.status;
        // console.log(`FAIL on: ${errorCode}`);
        await handleFailed(errorCode, payload, retry, result, next);
        next(result);
      },
      async done({ result, fail, next }) {
        next(result);
        return true;
      },
    },
  },
]);

export default MainService;
