import { createSlice, createAction } from "@reduxjs/toolkit";

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

    deleteTemporaryUser: () => {
      return initialState;
    },

    databaseHasTemporaryUser: (state, action) => {
      state.databaseHasUserData = action.payload;
    }
  }
});

export const syncTemporaryUserDataWithDB = createAction(
  "SYNC_TEMPORARY_USER_DATA_WITH_DB"
);

export const checkTemporaryUserData = createAction("CHECK_TEMPORARY_USER_DATA");

const { actions, reducer } = temporaryUserModule;

export const {
  databaseHasTemporaryUser,
  getTemporaryUserWithDB,
  setTemporaryUserData,
  deleteTemporaryUser
} = actions;

export default reducer;
