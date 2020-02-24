import { createReducer } from "@reduxjs/toolkit";

import { setEditedUserData } from "./editedUserActions.js";

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

export const editedUserReducers = createReducer(initialState, {
  [setEditedUserData]: (state, action) => {
    return { ...state, ...action.payload };
  }
});
