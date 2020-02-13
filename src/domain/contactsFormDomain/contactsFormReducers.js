import { createReducer } from "@reduxjs/toolkit";

import {
  syncContactsDataWithDatabase,
  setMainLanguage,
  setFacebookLink,
  setGitHubLink,
  setCompany,
  removePhone,
  setPhone,
  setFax
} from "./contactsFormActions";

const initialState = {
  phone: ["", "", ""],
  mainLanguage: "",
  facebookLink: "",
  gitHubLink: "",
  company: "",
  fax: ""
};

export const contactsFormReducers = createReducer(initialState, {
  [syncContactsDataWithDatabase]: (state, action) => {
    state.mainLanguage = action.payload.mainLanguage;
    state.facebookLink = action.payload.facebookLink;
    state.gitHubLink = action.payload.gitHubLink;
    state.company = action.payload.company;
    state.phone = [...action.payload.phone];
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

  [removePhone]: (state, action) => {
    const { id } = action.payload;
    state.phone[id] = "";
  },

  [setPhone]: (state, action) => {
    const { id, value } = action.payload;
    state.phone[id] = value;
  },

  [setFax]: (state, action) => {
    state.fax = action.payload;
  }
});
