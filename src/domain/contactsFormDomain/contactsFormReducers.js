import { createReducer } from "@reduxjs/toolkit";

import {
  syncContactDataWithDatabase,
  setMainLanguage,
  setFacebookLink,
  setGitHubLink,
  setCompany,
  setPhone,
  setFax
} from "./contactsFormActions";

const initialState = {
  mainLanguage: "",
  facebookLink: "",
  gitHubLink: "",
  company: "",
  phone: "",
  fax: ""
};

export const contactsFormReducers = createReducer(initialState, {
  [syncContactDataWithDatabase]: (state, action) => {
    state.mainLanguage = action.payload.mainLanguage;
    state.facebookLink = action.payload.facebookLink;
    state.gitHubLink = action.payload.gitHubLink;
    state.company = action.payload.company;
    state.phone = action.payload.phone;
    state.fax = action.payload.fax;
  },

  [setMainLanguage]: (state, action) => {
    state.mainLanguage = action.payload;
  },

  [setFacebookLink]: (state, action) => {
    state.facebookLink = action.payload;
  },

  [setGitHubLink]: (state, action) => {
    state.gitHubLink = action.payload;
  },

  [setCompany]: (state, action) => {
    state.company = action.payload;
  },

  [setPhone]: (state, action) => {
    state.phone = action.payload;
  },

  [setFax]: (state, action) => {
    state.fax = action.payload;
  }
});
