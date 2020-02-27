import { createReducer } from "@reduxjs/toolkit";

import { fields } from "../../utils/constants.js";

import {
  syncTemporaryUserDataWithDatabase,
  databaseHasTemporaryUserData,
  temporaryUserFetchingError,
  removeTemporaryUserData,
  temporaryUserIsLoading,
  setTemporaryUserData
} from "./temporaryUserActions.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  databaseHasUserData: false,
  isLoading: false,
  isError: false,
  userData: {
    ...account,
    ...profile,
    ...contacts,
    ...capabilities
  }
};

export const temporaryUserReducers = createReducer(initialState, {
  [syncTemporaryUserDataWithDatabase]: (state, action) => {
    state.userData = { ...state.userData, ...action.payload };
    state.isLoading = false;
    state.isError = false;
  },

  [removeTemporaryUserData]: (state, action) => {
    return initialState;
  },

  [setTemporaryUserData]: (state, action) => {
    state.userData = { ...state.userData, ...action.payload };
  },

  [temporaryUserIsLoading]: (state, action) => {
    state.isLoading = true;
    state.isError = false;
  },

  [temporaryUserFetchingError]: (state, action) => {
    state.isLoading = false;
    state.isError = true;
  },

  [databaseHasTemporaryUserData]: (state, action) => {
    state.databaseHasUserData = action.payload;
  }
});
