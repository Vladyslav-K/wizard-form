import { createReducer } from "@reduxjs/toolkit";

import {
  syncProfileDataWithDatabase,
  setFirstName,
  setBirthDate,
  setLastName,
  setAddress,
  setGender,
  setEmail
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

  [setFirstName]: (state, action) => {
    state.firstName = action.payload;
  },

  [setBirthDate]: (state, action) => {
    state.birthDate = action.payload;
  },

  [setLastName]: (state, action) => {
    state.lastName = action.payload;
  },

  [setAddress]: (state, action) => {
    state.address = action.payload;
  },

  [setGender]: (state, action) => {
    state.gender = action.payload;
  },

  [setEmail]: (state, action) => {
    state.email = action.payload;
  }
});
