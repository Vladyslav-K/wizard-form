import { createSlice } from "@reduxjs/toolkit";

import { fields } from "../utils/constants.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  databaseHasUserData: false,
  isLoading: false,
  isError: false,
  user: {
    ...account,
    ...profile,
    ...contacts,
    ...capabilities
  },
  disabledTabs: {
    capabilitiesTab: true,
    contactsTab: true,
    profileTab: true
  }
};

const temporaryUserModule = createSlice({
  name: "temporaryUser",

  initialState,

  reducers: {
    getTemporaryUserWithDB: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    setTemporaryUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    deleteTemporaryUser: (state, action) => {
      state.user = initialState.user;
    },

    databaseHasTemporaryUser: (state, action) => {
      state.databaseHasUserData = action.payload;
    },

    setDisabledTabs: (state, action) => {
      state.disabledTabs = { ...state.disabledTabs, ...action.payload };
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.isError = false;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    syncTemporaryUserDataWithDB() {},

    checkTemporaryUser() {}
  }
});

const { actions, reducer } = temporaryUserModule;

export const {
  syncTemporaryUserDataWithDB,
  databaseHasTemporaryUser,
  getTemporaryUserWithDB,
  deleteTemporaryUser,
  checkTemporaryUser,
  setTemporaryUser,
  setDisabledTabs,
  setLoading,
  setError
} = actions;

export default reducer;
