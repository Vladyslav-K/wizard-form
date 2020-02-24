import { createReducer } from "@reduxjs/toolkit";

import { setCurrentUserData } from "./currentUserActions.js";

const initialState = {
  passwordConfirmation: "",
  password: "",
  username: "",
  avatar: "",

  firstName: "",
  birthDate: "",
  lastName: "",
  address: "",
  gender: "",
  email: "",

  mainLanguage: "",
  facebookLink: "",
  gitHubLink: "",
  company: "",
  phones: [""],
  fax: "",

  additionalInformation: "",
  hobbies: [],
  skills: []
};

export const currentUserReducers = createReducer(initialState, {
  [setCurrentUserData]: (state, action) => {
    return { ...state, ...action.payload };
  }
});
