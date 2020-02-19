import { createHashHistory } from "history";

const history = createHashHistory();

export const setQueryStringIndex = (query, newIndex) => {
  history.push({ search: `?${query}=${newIndex}` });
};

export const getQueryStringIndex = (query, location) => {
  const params = new URLSearchParams(location);
  const queryIndex = params.get(query);

  return +queryIndex;
};

const isEqual = require("lodash.isequal");

const checkObjectPropsIsNotEmpty = formikValues => {
  for (let key in formikValues) {
    if (
      formikValues.hasOwnProperty(key) &&
      formikValues[key] !== null &&
      formikValues[key] !== "" &&
      formikValues[key] !== [] &&
      formikValues[key] !== [""]
    ) {
      return true;
    }
  }

  return false;
};

export const compareValuesAndCheckForEmptiness = (formikValues, reduxData) =>
  checkObjectPropsIsNotEmpty(formikValues) && !isEqual(formikValues, reduxData);
