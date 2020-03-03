import { createSlice, createAction } from "@reduxjs/toolkit";

import { fields } from "../utils/constants.js";

const { account, profile, contacts, capabilities } = fields;

const initialState = {
  isLoading: false,
  isError: false,
  userData: {
    ...account,
    ...profile,
    ...contacts,
    ...capabilities
  }
};

const currentUserModule = createSlice({
  name: "currentUser",

  initialState,

  reducers: {
    setCurrentUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      state.isLoading = false;
      state.isError = false;
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

export const getUserFromList = createAction("GET_USER_FROM_LIST");
export const saveCurrentUser = createAction("SAVE_CURRENT_USER");

const { actions, reducer } = currentUserModule;

export const { setCurrentUserData, setLoading, setError } = actions;

export default reducer;
