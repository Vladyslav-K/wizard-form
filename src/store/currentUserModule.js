import { createSlice, createAction } from "@reduxjs/toolkit";

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
    }
  }
});

export const getUserFromList = createAction("GET_USER_FROM_LIST");
export const saveCurrentUser = createAction("SAVE_CURRENT_USER");

const { actions, reducer } = currentUserModule;

export const { setCurrentUserData } = actions;

export default reducer;
