import { createSlice } from "@reduxjs/toolkit";

import { fields } from "../utils/constants.js";

const { account, profile, contacts, capabilities } = fields;

const currentUserModule = createSlice({
  name: "currentUser",

  initialState: {
    isLoading: false,
    isError: false,
    user: {
      ...account,
      ...profile,
      ...contacts,
      ...capabilities
    }
  },

  reducers: {
    setCurrentUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.isError = false;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    getUserFromList() {},

    saveCurrentUser() {}
  }
});

const { actions, reducer } = currentUserModule;

export const {
  getUserFromList,
  saveCurrentUser,
  setCurrentUser,
  setLoading,
  setError
} = actions;

export default reducer;
