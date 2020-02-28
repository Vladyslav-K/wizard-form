import { createReducer } from "@reduxjs/toolkit";

import {
  syncUserListWithDatabase,
  userListFetchingError,
  removeUserFromList,
  userListIsLoading,
  setUserListTotal,
  addUserToList
} from "./userListActions.js";

const initialState = {
  isLoading: false,
  isError: false,
  userList: [],
  total: 0
};

export const userListReducers = createReducer(initialState, {
  [syncUserListWithDatabase]: (state, action) => {
    state.userList = action.payload || [];
    state.isLoading = false;
    state.isError = false;
  },

  [userListFetchingError]: (state, action) => {
    state.isLoading = false;
    state.isError = true;
  },

  [removeUserFromList]: (state, action) => {
    state.userList = state.userList.filter(
      user => user.id !== action.payload.id
    );
  },

  [userListIsLoading]: (state, action) => {
    state.isLoading = true;
    state.isError = false;
  },

  [setUserListTotal]: (state, action) => {
    state.total = action.payload;
  },

  [addUserToList]: (state, action) => {
    state.userList.push(action.payload);
  }
});
