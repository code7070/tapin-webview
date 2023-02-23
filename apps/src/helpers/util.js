import PropTypes from "prop-types";
import CookieBrowser from "js-cookie";
import { parse } from "query-string";
import { v4 } from "uuid";

function easing(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function doScroll(target, duration, pos) {
  const targetClient = target;
  const offset = pos || 130;
  if (targetClient != null) {
    const client = targetClient.getBoundingClientRect().top;
    const elementY = window.pageYOffset + client;
    const startingY = window.pageYOffset;
    const diff = elementY - startingY - offset;
    let start;
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      let percent = Math.min(time / duration, 1);
      percent = easing(percent);
      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }
}

export const isFunction = (varFunction) => {
  if (varFunction && typeof varFunction === "function") return true;
  return false;
};

export const runFunction = (fn, backup) => {
  if (isFunction(fn)) fn();
  else if (isFunction(backup)) backup();
};

export const scrollToTop = () => doScroll(document.body, 500, 100);

const setTime = (range) => {
  const rangeTime = parseInt(range, 10);
  const timeToday = new Date();
  const time = timeToday.getTime();
  timeToday.setTime(time + 3600 * 1000 * 24 * rangeTime);
  const expiredDate = timeToday;
  return expiredDate;
};

export const setCookie = (field, value, time = 365) => {
  const expiredDate = setTime(time);
  CookieBrowser.set(field, value, { expires: expiredDate });
};

export const getCookie = (field) => CookieBrowser.get(field);

export const delCookie = (field) => CookieBrowser.remove(field);

export const pushDataLayer = (data) => {
  if (window.dataLayer) return window.dataLayer.push(data);
  return console.log("DATALAYER NOTFOUND. . .", data);
};

export const formatNumber = (x = 0, formatted = false) => {
  const z = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let f = z;
  const parsed = formatted && parseInt(x, 10);
  if (parsed >= 1000) f = `${z.slice(0, 1)}K`;
  else if (parsed >= 1000000) f = `${z.slice(0, 1)}M`;
  return formatted ? f : z;
};

const getMonthName = (monthNumber) => {
  if (!monthNumber) return false;
  const num = parseInt(monthNumber, 10);
  const monthList = [
    { id: 1, name: "Jan" },
    { id: 2, name: "Feb" },
    { id: 3, name: "Mar" },
    { id: 4, name: "Apr" },
    { id: 5, name: "Mei" },
    { id: 6, name: "Juni" },
    { id: 7, name: "Juli" },
    { id: 8, name: "Ags" },
    { id: 9, name: "Sept" },
    { id: 10, name: "Okt" },
    { id: 11, name: "Nov" },
    { id: 12, name: "Des" },
  ];
  const filtered = monthList.filter(({ id }) => id === num);
  return filtered[0].name;
};

export const getFormattedDate = (dateData) => {
  if (!dateData) return false;
  const truncated = dateData.split("-");
  // const year = truncated[0];
  const month = truncated[1];
  const date = truncated[2];
  const monthName = getMonthName(month);
  return `${date} ${monthName}`;
};

const underTenZero = (number = 0) => {
  const num = parseInt(number, 10);
  return num < 10 ? `0${num}` : num;
};

export const convertRawDate = (
  rawDate = 1,
  withYear = false,
  withHour = false
) => {
  if (!rawDate) return "-";
  const date = new Date(parseInt(rawDate, 10));
  const retDate = date.getDate();
  const retMonth = date.getMonth() + 1;
  const retYear = date.getFullYear();
  const time = `${underTenZero(date.getHours())}:${underTenZero(
    date.getMinutes()
  )}`;

  let defRet = `${underTenZero(retDate)}/${underTenZero(retMonth)}`;
  if (withYear) defRet = `${defRet}/${retYear}`;

  let fullRet = defRet;
  if (withHour) fullRet = `${defRet} - ${time}`;

  return fullRet;
};

export const propTypesNode = [
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
];

export const propTypesChildren = PropTypes.oneOfType(propTypesNode);

export function detectDevice(defaultValue = "Unlisted") {
  let userAgent = window.navigator.userAgent;
  let browserName = defaultValue;
  // console.log(userAgent);

  // if (userAgent.match(/chrome|chromium|crios/i)) {
  //   browserName = "Chrome";
  // } else if (userAgent.match(/firefox|fxios/i)) {
  //   browserName = "Firefox";
  // } else if (userAgent.match(/safari/i)) {
  //   browserName = "Safari";
  // } else if (userAgent.match(/opr\//i)) {
  //   browserName = "Opera";
  // } else if (userAgent.match(/edg/i)) {
  //   browserName = "Edge";
  // } else if (userAgent.match(/android/i)) {
  //   browserName = "Android";
  // } else if (userAgent.match(/iphone/i)) {
  //   browserName = "iPhone";
  // }
  if (userAgent.match(/android/i)) browserName = "Android";
  else if (userAgent.match(/iphone/i)) browserName = "iPhone";
  else if (userAgent.match(/ipad/i)) browserName = "iPad";

  return browserName;
}

export function isAppleDevice(defaultValue = "Unlisted") {
  const device = detectDevice(defaultValue);
  return device === "iPhone" || device === "iPad";
}

export function convertIntl(num) {
  return Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    notation: "compact",
  }).format(num);
}

export function numMillion(num = 0) {
  // let word = "";
  // const number = `${parseInt(num, 10)}`;
  return convertIntl(parseInt(num, 10)).replace("jt", "Juta");
}

export const inDev = process.env.REACT_APP_ENVIRONMENT === "development";

export const isAndroid = /Android/.test(window.navigator.userAgent);

export const getAccessToken = () => {
  const inProd = process.env.REACT_APP_ENVIRONMENT === "production";
  const params = parse(window.location.search);
  const cookieToken = getCookie("USER-ACCESS-TOKEN");
  const paramsToken = params.accessToken;
  const token = inProd ? cookieToken : cookieToken || paramsToken;

  return token;
};

export const webFetch = async (url, onCatch) => {
  if (!url) return {};

  const params = parse(window.location.search);

  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getAccessToken()}`,
      "X-TRACE-ID": v4(),
      "X-CUSTOMER-ID": params.customerId,
    },
  })
    .then((res) => res.json())
    .catch((res) => onCatch(res));
};

export function linkCreator(href = "") {
  const a = document.createElement("a");
  a.download;
  a.href = href;
  setTimeout(() => {
    a.click();
    a.remove();
    document.removeChild(a);
  }, 1000);
}
