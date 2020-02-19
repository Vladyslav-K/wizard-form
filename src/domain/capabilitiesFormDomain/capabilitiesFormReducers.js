import { createReducer } from "@reduxjs/toolkit";

import {
  syncCapabilitiesDataWithDatabase,
  setCapabilitiesData
} from "./capabilitiesFormActions";

const initialState = {
  additionalInformation: "",
  hobbies: [],
  skills: []
};

export const capabilitiesFormReducers = createReducer(initialState, {
  [syncCapabilitiesDataWithDatabase]: (state, action) => {
    if (action.payload) {
      state.additionalInformation = action.payload.additionalInformation;
      state.hobbies = action.payload.hobbies;
      state.skills = action.payload.skills;
    }
  },

  [setCapabilitiesData]: (state, action) => {
    if (action.payload) {
      state.additionalInformation = action.payload.additionalInformation;
      state.hobbies = action.payload.hobbies;
      state.skills = action.payload.skills;
    }
  }
});
