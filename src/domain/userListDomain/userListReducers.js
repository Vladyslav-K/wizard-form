import { createReducer } from "@reduxjs/toolkit";

import {
  syncUserListWithDatabase,
  userListFetchingError,
  removeUserFromList,
  userListIsLoading,
  addUserToList
} from "./userListActions.js";

const initialState = {
  isErrorFetching: false,
  isLoading: false,
  userList: []
};

export const userListReducers = createReducer(initialState, {
  [syncUserListWithDatabase]: (state, action) => {
    state.userList = action.payload || [];
    state.isErrorFetching = false;
    state.isLoading = false;
  },

  [userListFetchingError]: (state, action) => {
    state.isErrorFetching = true;
    state.isLoading = false;
  },

  [removeUserFromList]: (state, action) => {
    state.userList = state.userList.filter(
      user => user.id !== action.payload.id
    );
  },

  [userListIsLoading]: (state, action) => {
    state.isErrorFetching = false;
    state.isLoading = true;
  },

  [addUserToList]: (state, action) => {
    state.userList.push(action.payload);
  }
});
