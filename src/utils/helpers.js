import { createHashHistory } from "history";

export const setQueryStringIndex = (query, newIndex) => {
  const history = createHashHistory();

  history.push({ search: `?${query}=${newIndex}` });
};

export const getQueryStringIndex = (query, location) => {
  const params = new URLSearchParams(location);
  const queryIndex = params.get(query);

  return +queryIndex;
};

export const checkObjectPropsIsNotEmpty = checkedObject => {
  for (let key in checkedObject) {
    if (checkedObject[key].length !== 0 && checkedObject[key][0] !== "") {
      return true;
    }
  }

  return false;
};
