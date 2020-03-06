import { createSlice } from "@reduxjs/toolkit";

import { fields } from "../utils/constants.js";

const { account, profile, contacts, capabilities } = fields;

const currentUserModule = createSlice({
  name: "currentUser",

  initialState: {
    userData: {
      ...account,
      ...profile,
      ...contacts,
      ...capabilities
    }
  },

  reducers: {
    setCurrentUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },

    getUserFromList() {},

    saveCurrentUser() {}
  }
});

const { actions, reducer } = currentUserModule;

export const { setCurrentUserData, getUserFromList, saveCurrentUser } = actions;

export default reducer;
