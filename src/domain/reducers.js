import { createReducer } from "@reduxjs/toolkit";

import {
  setAccountData,
  setProfileData,
  syncAccountDataWithDatabase
} from "./actions";

const initialState = {
  accountData: {
    username: "",
    password: "",
    passwordConfirmation: "",
    avatar: ""
  },

  profileData: {
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    adress: "",
    gender: ""
  }
};

const reducers = createReducer(initialState, {
  [setAccountData]: (state, action) => {
    return {
      ...state,
      accountData: { ...state.accountData, ...action.payload }
    };
  },

  [setProfileData]: (state, action) => {
    return {
      ...state,
      profileData: { ...state.profileData, ...action.payload }
    };
  },

  [syncAccountDataWithDatabase]: (state, action) => {
    return {
      ...state,
      accountData: { ...action.payload }
    };
  }
});

export default reducers;
