import { createReducer } from "@reduxjs/toolkit";

import {
  syncProfileDataWithDatabase,
  setProfileData
} from "./profileFormActions";

const initialState = {
  firstName: "",
  birthDate: "",
  lastName: "",
  address: "",
  gender: "",
  email: ""
};

export const profileFormReducers = createReducer(initialState, {
  [syncProfileDataWithDatabase]: (state, action) => {
    state.firstName = action.payload.firstName;
    state.birthDate = action.payload.birthDate;
    state.lastName = action.payload.lastName;
    state.address = action.payload.address;
    state.gender = action.payload.gender;
    state.email = action.payload.email;
  },

  [setProfileData]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  }
});
