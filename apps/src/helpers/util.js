import PropTypes from "prop-types";
import CookieBrowser from "js-cookie";

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
  const date = new Date(rawDate);
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

export function detectBrowser(defaultValue = "Unlisted") {
  let userAgent = window.navigator.userAgent;
  let browserName = defaultValue;
  console.log(userAgent);

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
