import { createSlice } from "@reduxjs/toolkit";

import { fields } from "../utils/constants.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  databaseHasUserData: false,
  userData: {
    ...account,
    ...profile,
    ...contacts,
    ...capabilities
  }
};

const temporaryUserModule = createSlice({
  name: "temporaryUser",

  initialState,

  reducers: {
    getTemporaryUserWithDB: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },

    setTemporaryUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },

    deleteTemporaryUser: (state, action) => {
      state.userData = initialState.userData;
    },

    databaseHasTemporaryUser: (state, action) => {
      state.databaseHasUserData = action.payload;
    },

    pushPhoneNumber: (state, action) => {
      state.userData.phones.push(action.payload);
    },

    pushHobbie: (state, action) => {
      state.userData.hobbies.push(action.payload);
    },

    syncTemporaryUserDataWithDB() {},

    checkTemporaryUserData() {}
  }
});

const { actions, reducer } = temporaryUserModule;

export const {
  syncTemporaryUserDataWithDB,
  databaseHasTemporaryUser,
  checkTemporaryUserData,
  getTemporaryUserWithDB,
  setTemporaryUserData,
  deleteTemporaryUser,
  pushPhoneNumber,
  pushHobbie
} = actions;

export default reducer;
