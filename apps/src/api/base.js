/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { ApiService, ApiTree } from "@apicase/services";
import fetch from "@apicase/adapter-fetch";
import apiList from "./list";
import { v4 } from "uuid";
import { parse } from "query-string";
import { getCookie } from "helpers/util";

// VARIABLE LIST
// make sure match for your APP
const appBaseUrl = process.env.REACT_APP_BASE_URL;
const appEnvironment = process.env.REACT_APP_ENVIRONMENT;
// END OF VARIABLE LIST

// SERVICE LOGGER
// this function to get event & result log
// only in local
const serviceLogger = (event, result) => {
  if (appEnvironment === "local")
    console.log("serviceLogger: ", { event }, { result });
  return null;
};

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

// Token Taken
const inProd = process.env.REACT_APP_ENVIRONMENT === "production";
const params = parse(window.location.search);
const cookieToken = getCookie("USER-ACCESS-TOKEN");
const paramsToken = params.accessToken;
const token = inProd ? cookieToken : cookieToken || paramsToken;

const MainService = new ApiTree(RootService, [
  {
    url: "ottobiz-api",
    children: apiList,
    hooks: {
      before({ payload, next }) {
        const newPayload = { ...payload };
        newPayload.headers = {
          ...payload.headers,
          Authorization: `Bearer ${token}`,
          "X-TRACE-ID": v4(),
        };
        if (process.env.REACT_APP_ENVIRONMENT === "development")
          console.log("API payload: ", newPayload);
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
