import { createReducer } from "@reduxjs/toolkit";

import {
  syncAccountDataWithDatabase,
  setPasswordConfirmation,
  setPassword,
  setUserName,
  setAvatar
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

  [setPasswordConfirmation]: (state, action) => {
    state.passwordConfirmation = action.payload;
  },

  [setPassword]: (state, action) => {
    state.password = action.payload;
  },

  [setUserName]: (state, action) => {
    state.username = action.payload;
  },

  [setAvatar]: (state, action) => {
    state.avatar = action.payload;
  }
});
