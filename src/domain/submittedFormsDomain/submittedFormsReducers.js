import { createReducer } from "@reduxjs/toolkit";

import {
  setAccountAsSubmitted,
  setContactsAsSubmitted,
  setProfileAsSubmitted,
  databaseHasTemporaryUserData
} from "./submittedFormsActions";

const initialState = {
  accountIsSubmitted: false,
  contactsIsSubmitted: false,
  profileIsSubmitted: false,
  databaseHasUserData: false
};

export const submittedFormsReducers = createReducer(initialState, {
  [setAccountAsSubmitted]: (state, action) => {
    state.accountIsSubmitted = true;
  },

  [setContactsAsSubmitted]: (state, action) => {
    state.contactsIsSubmitted = true;
  },

  [setProfileAsSubmitted]: (state, action) => {
    state.profileIsSubmitted = true;
  },

  [databaseHasTemporaryUserData]: (state, action) => {
    state.databaseHasUserData = action.payload;
  }
});
