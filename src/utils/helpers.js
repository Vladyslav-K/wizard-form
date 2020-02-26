import { createHashHistory } from "history";

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
