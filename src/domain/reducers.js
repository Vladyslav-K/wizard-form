import { createReducer } from "@reduxjs/toolkit";

import { setAccountData } from "./actions";

const initialState = {
  accountData: {
    username: "",
    password: "",
    avatar: ""
  }
};

const reducers = createReducer(initialState, {
  [setAccountData]: (state, action) =>
    (state.accountData = action.payload.accountData)
});

export default reducers;
