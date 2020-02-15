import { createReducer } from "@reduxjs/toolkit";

import {
  syncContactsDataWithDatabase,
  setContactsData
} from "./contactsFormActions";

const initialState = {
  mainLanguage: "",
  facebookLink: "",
  gitHubLink: "",
  company: "",
  phones: [""],
  fax: ""
};

export const contactsFormReducers = createReducer(initialState, {
  [syncContactsDataWithDatabase]: (state, action) => {
    state.mainLanguage = action.payload.mainLanguage;
    state.facebookLink = action.payload.facebookLink;
    state.gitHubLink = action.payload.gitHubLink;
    state.company = action.payload.company;
    state.phones = [...action.payload.phones];
    state.fax = action.payload.fax;
  },

  [setContactsData]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  }
});
