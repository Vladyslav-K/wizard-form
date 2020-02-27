import { createHashHistory } from "history";
import { DateTime } from "luxon";

import { tabs, ACCOUNT_TAB_INDEX } from "./constants.js";

export const setQueryString = ({ queryName, queryValue, pathname }) => {
  const history = createHashHistory();

  history.push({
    pathname: pathname || history.location.pathname,
    search: `?${queryName}=${queryValue}`
  });
};

export const getQueryStringValue = ({ queryName, location }) => {
  const params = new URLSearchParams(location);
  const queryValue = params.get(queryName);

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

export const createTestUserList = () => {
  const users = [];

  for (let i = 0; i < 20; i++) {
    users.push({
      passwordConfirmation: "testuser",
      password: "testuser",
      username: "test_user",
      avatar: "",
      firstName: "Test",
      lastName: "User",
      birthDate: DateTime.local()
        .minus({ year: Math.floor(18 + Math.random() * (50 - 18 + 1)) })
        .toJSDate(),
      address: "Test st.",
      gender: "Male",
      email: "test.user@gmail.com",
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
        .toJSDate(),
      updatedAt: DateTime.local()
        .minus({ hours: Math.floor(Math.random() * Math.floor(24)) })
        .toJSDate()
    });
  }

  return users;
};
