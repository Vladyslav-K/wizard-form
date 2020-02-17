import { createReducer } from "@reduxjs/toolkit";

import {
  syncCapabilitiesDataWithDatabase,
  setCapabilitiesData
} from "./capabilitiesFormActions";

const initialState = {
  additionalInformation: "",
  skills: null,
  hobbies: []
};

export const capabilitiesFormReducers = createReducer(initialState, {
  [syncCapabilitiesDataWithDatabase]: (state, action) => {
    state.additionalInformation = action.payload.additionalInformation;
    state.hobbies = action.payload.hobbies;
    state.skills = action.payload.skills;
  },

  [setCapabilitiesData]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  }
});
