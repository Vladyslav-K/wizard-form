import { createSlice, createAction } from "@reduxjs/toolkit";

import { fields } from "../utils/constants.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  databaseHasUserData: false,
  isLoading: false,
  isError: false,
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
      state.isLoading = false;
      state.isError = false;
    },

    setTemporaryUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      state.isLoading = false;
      state.isError = false;
    },

    deleteTemporaryUser: () => {
      return initialState;
    },

    databaseHasTemporaryUser: (state, action) => {
      state.databaseHasUserData = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const syncTemporaryUserDataWithDB = createAction(
  "SYNC_TEMPORARY_USER_DATA_WITH_DB"
);

const { actions, reducer } = temporaryUserModule;

export const {
  databaseHasTemporaryUser,
  getTemporaryUserWithDB,
  setTemporaryUserData,
  deleteTemporaryUser,
  setLoading,
  setError
} = actions;

export default reducer;
