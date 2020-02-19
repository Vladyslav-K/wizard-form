import { createReducer } from "@reduxjs/toolkit";

import {
  syncTemporaryUserDataWithDatabase,
  setTemporaryUserData
} from "./temporaryUserActions.js";

const initialState = {
  userData: {
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
  }
};

export const temporaryUserReducers = createReducer(initialState, {
  [syncTemporaryUserDataWithDatabase]: (state, action) => {
    return {
      ...state,
      userData: {
        ...state.userData,
        ...action.payload
      }
    };
  },

  [setTemporaryUserData]: (state, action) => {
    return {
      userData: {
        ...state.userData,
        ...action.payload
      }
    };
  }
});
