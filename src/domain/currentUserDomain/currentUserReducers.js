import { createReducer } from "@reduxjs/toolkit";

import { fields } from "../../utils/constants.js";

import {
  currentUserFetchingError,
  currentUserIsLoading,
  setCurrentUserData
} from "./currentUserActions.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  isLoading: false,
  isError: false,
  userData: {
    ...account,
    ...profile,
    ...contacts,
    ...capabilities
  }
};

export const currentUserReducers = createReducer(initialState, {
  [setCurrentUserData]: (state, action) => {
    state.userData = { ...state.userData, ...action.payload };
    state.isLoading = false;
    state.isError = false;
  },

  [currentUserIsLoading]: (state, action) => {
    state.isLoading = true;
    state.isError = false;
  },

  [currentUserFetchingError]: (state, action) => {
    state.isLoading = false;
    state.isError = true;
  }
});
