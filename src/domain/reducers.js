import { createReducer } from "@reduxjs/toolkit";

import { setAccountData, syncAccountDataWithDatabase } from "./actions";

const initialState = {
  accountData: {
    username: "",
    password: "",
    passwordConfirmation: "",
    avatar: ""
  }
};

const reducers = createReducer(initialState, {
  [setAccountData]: (state, action) => {
    return {
      ...state,
      accountData: { ...state.accountData, ...action.payload }
    };
  },

  [syncAccountDataWithDatabase]: (state, action) => {
    return {
      ...state,
      accountData: { ...action.payload }
    };
  }
});

export default reducers;
