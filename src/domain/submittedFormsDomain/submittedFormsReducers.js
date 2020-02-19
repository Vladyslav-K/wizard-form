import { createReducer } from "@reduxjs/toolkit";

import {
  setCababilitiesAsSubmitted,
  setContactsAsSubmitted,
  setProfileAsSubmitted,
  setAccountAsSubmitted
} from "./submittedFormsActions";

const initialState = {
  capabilitiesIsSubmitted: false,
  contactsIsSubmitted: false,
  profileIsSubmitted: false,
  accountIsSubmitted: false
};

export const submittedFormsReducers = createReducer(initialState, {
  [setCababilitiesAsSubmitted]: (state, actions) => {
    state.capabilitiesIsSubmitted = true;
  },

  [setContactsAsSubmitted]: (state, actions) => {
    state.contactsIsSubmitted = true;
  },

  [setProfileAsSubmitted]: (state, actions) => {
    state.profileIsSubmitted = true;
  },

  [setAccountAsSubmitted]: (state, actions) => {
    state.accountIsSubmitted = true;
  }
});
