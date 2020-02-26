import { createReducer } from "@reduxjs/toolkit";

import { fields } from "../../utils/constants.js";

import { setCurrentUserData } from "./currentUserActions.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  ...account,
  ...profile,
  ...contacts,
  ...capabilities
};

export const currentUserReducers = createReducer(initialState, {
  [setCurrentUserData]: (state, action) => {
    return { ...state, ...action.payload };
  }
});
