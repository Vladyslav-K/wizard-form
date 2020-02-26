import { createReducer } from "@reduxjs/toolkit";

import { fields } from "../../utils/constants.js";

import {
  syncTemporaryUserDataWithDatabase,
  removeTemporaryUserData,
  setTemporaryUserData
} from "./temporaryUserActions.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  ...account,
  ...profile,
  ...contacts,
  ...capabilities
};

export const temporaryUserReducers = createReducer(initialState, {
  [syncTemporaryUserDataWithDatabase]: (state, action) => {
    return { ...state, ...action.payload };
  },

  [removeTemporaryUserData]: (state, action) => {
    return initialState;
  },

  [setTemporaryUserData]: (state, action) => {
    return { ...state, ...action.payload };
  }
});
