import { Button } from "components";
import { useState } from "react";

const urlMap = {
  undefined: "https://weekend-dev.ottodigital.id/",
  development: "http://localhost:4000/",
  staging: "https://weekend-dev.ottodigital.id/",
  local: "https://weekend-dev.ottodigital.id/",
  production: "https://weekend-dev.ottodigital.id/",
};

export default function FormSandbox() {
  const [insId, setInsId] = useState(1);
  const [custId, setCustId] = useState(170);

  const changeIns = (e) => setInsId(e.target.value || "");
  const changeCust = (e) => setCustId(e.target.value || "");

  const env = process.env.REACT_APP_ENVIRONMENT;
  const url = `${urlMap[env]}insurance/detail`;
  const params = `customerId=${custId}&insuranceId=${insId}`;

  // const submit = (e) => {
  //   console.log("Form: ", e);
  //   e.preventDefault();
  //   fetch(`${url}?${params}`, {
  //     method: "GET",
  //     headers: {
  //       "USER-ACCESS-TOKEN": e.target[0].value,
  //       "USER-REFRESH-TOKEN": e.target[1].value,
  //     },
  //   }).then((res) => {
  //     console.log("Responses: ", res);
  //     window.open(`${url}?${params}`);
  //   });
  // };

  return (
    <div className="container">
      <div className="max-w-sm mx-auto">
        <div className="text-xs">environment: {env}</div>
        <div className="text-2xl font-bold mb-6">FORM SANDBOX 4</div>
        <form action={`${url}?${params}`} method="GET">
          <div className="form-control mb-4">
            <label className="label-text" htmlFor="token">
              USER-ACCESS-TOKEN
            </label>
            <input
              id="token"
              className="input input-bordered w-full my-2"
              name="USER-ACCESS-TOKEN"
              placeholder="Access Token"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label-text" htmlFor="refToken">
              USER-REFRESH-TOKEN
            </label>
            <input
              id="refToken"
              className="input input-bordered w-full my-2"
              name="USER-REFRESH-TOKEN"
              placeholder="Refresh Token"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label-text" htmlFor="id">
              Customer Id
            </label>
            <input
              id="id"
              className="input input-bordered w-full my-2"
              name="customerId"
              placeholder="customerId"
              value={custId}
              onChange={changeCust}
            />
          </div>
          <div className="form-control mb-4 disabled">
            <label className="label-text" htmlFor="insuranceId">
              Insurance ID
            </label>
            <input
              id="insuranceId"
              className="input input-bordered w-full my-2"
              name="insuranceId"
              placeholder="insuranceId"
              value={insId}
              onChange={changeIns}
              disabled
            />
          </div>
          <div className="my-4">
            <Button type="submit">Proceed</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
