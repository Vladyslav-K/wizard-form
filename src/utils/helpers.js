import { createHashHistory } from "history";
import { DateTime } from "luxon";

import {
  CAPABILITIES_TAB_INDEX,
  CONTACTS_TAB_INDEX,
  PROFILE_TAB_INDEX,
  ACCOUNT_TAB_INDEX,
  tabs
} from "./constants.js";

export const setQueryString = ({
  queryName,
  queryValue,
  additionalName,
  additionalValue,
  pathname
}) => {
  const history = createHashHistory();

  history.push({
    pathname: pathname || history.location.pathname,
    search: additionalValue
      ? `?${queryName}=${queryValue}&${additionalName}=${additionalValue}`
      : `?${queryName}=${queryValue}`
  });
};

export const getQueryStringValue = ({ queryName, location }) => {
  const params = new URLSearchParams(location);
  const queryValue = params.get(queryName);

  return queryValue;
};

export const checkObjectPropsIsNotEmpty = checkedObject => {
  for (let key in checkedObject) {
    if (
      checkedObject[key] &&
      checkedObject[key][0] !== "" &&
      checkedObject[key].length !== 0
    ) {
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

export const checkDataInTabsAfterReload = ({
  setDisabledTabs,
  setTabIndex,
  capabilitiesData,
  contactsData,
  profileData
}) => {
  if (checkObjectPropsIsNotEmpty(profileData)) {
    setDisabledTabs(prevState => ({ ...prevState, profileTab: false }));

    setTabIndex(PROFILE_TAB_INDEX);

    setQueryString({
      queryName: "tab",
      queryValue: getTabKeyByValue(PROFILE_TAB_INDEX)
    });
  }

  if (checkObjectPropsIsNotEmpty(contactsData)) {
    setDisabledTabs(prevState => ({ ...prevState, contactsTab: false }));

    setTabIndex(CONTACTS_TAB_INDEX);

    setQueryString({
      queryName: "tab",
      queryValue: getTabKeyByValue(CONTACTS_TAB_INDEX)
    });
  }

  if (checkObjectPropsIsNotEmpty(capabilitiesData)) {
    setDisabledTabs(prevState => ({ ...prevState, capabilitiesTab: false }));

    setTabIndex(CAPABILITIES_TAB_INDEX);

    setQueryString({
      queryName: "tab",
      queryValue: getTabKeyByValue(CAPABILITIES_TAB_INDEX)
    });
  }
};

export const calculatePaginationCount = total => {
  return Math.ceil(total / 10);
};

export const createTestUserList = () => {
  const users = [];

  for (let i = 0; i < 20; i++) {
    users.push({
      passwordConfirmation: "testuser",
      password: "testuser",
      username:
        "test_user" + Math.floor(18 + Math.random() * (99999999 - 18 + 1)),
      avatar: "",
      firstName: "Test" + Math.floor(18 + Math.random() * (9999999 - 18 + 1)),
      lastName: "User" + Math.floor(18 + Math.random() * (9999999 - 18 + 1)),
      birthDate: DateTime.local()
        .minus({ year: Math.floor(18 + Math.random() * (50 - 18 + 1)) })
        .toJSDate(),
      address: "Test st.",
      gender: "Male",
      email:
        Math.floor(18 + Math.random() * (9999999 - 18 + 1)) +
        "test.user@gmail.com",
      mainLanguage: "Russian",
      facebookLink: "https://test-user.com",
      gitHubLink: "https://test-user.com",
      company: "Test company",
      phones: [
        "+7 (123) 123-12-31",
        "+7 (123) 123-12-31",
        "+7 (123) 123-12-31"
      ],
      fax: "+7 (123) 123-12-31",
      additionalInformation: "This is test user additional information",
      hobbies: [
        "Art",
        "Sport, fitness, aerobica and staff like that",
        "I just want to play games, I’m not living in this life"
      ],
      skills: ["HTML", "CSS", "Javascript"],
      createdAt: DateTime.local()
        .minus({ days: 1, hours: Math.floor(Math.random() * Math.floor(24)) })
        .toMillis(),
      updatedAt: DateTime.local()
        .minus({ hours: Math.floor(Math.random() * Math.floor(24)) })
        .toMillis()
    });
  }

  return users;
};
