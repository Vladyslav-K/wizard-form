import { createReducer } from "@reduxjs/toolkit";

import {
  syncAccountDataWithDatabase,
  setAccountData
} from "./accountFormActions";

const initialState = {
  passwordConfirmation: "",
  password: "",
  username: "",
  avatar: ""
};

export const accountFormReducers = createReducer(initialState, {
  [syncAccountDataWithDatabase]: (state, action) => {
    state.passwordConfirmation = action.payload.passwordConfirmation;
    state.password = action.payload.password;
    state.username = action.payload.username;
    state.avatar = action.payload.avatar;
  },

  [setAccountData]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  }
});
