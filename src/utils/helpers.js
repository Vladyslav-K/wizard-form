import { createHashHistory } from "history";

import { tabs, ACCOUNT_TAB_INDEX } from "./constants.js";

export const setQueryString = (queryName, queryValue) => {
  const history = createHashHistory();

  history.push({ search: `?${queryName}=${queryValue}` });
};

export const getQueryStringValue = (query, location) => {
  const params = new URLSearchParams(location);
  const queryValue = params.get(query);

  return queryValue;
};

export const checkObjectPropsIsNotEmpty = checkedObject => {
  for (let key in checkedObject) {
    if (checkedObject[key].length !== 0 && checkedObject[key][0] !== "") {
      return true;
    }
  }

  return false;
};

export const getTabKeyByValue = value => {
  return Object.keys(tabs).find(key => tabs[key] === value) || "account";
};

export const getTabValueByKey = key => {
  return tabs[key] || ACCOUNT_TAB_INDEX;
};
