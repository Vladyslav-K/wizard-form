import { createAction } from "@reduxjs/toolkit";

export const syncUserListWithDatabase = createAction(
  "SYNC_USER_LIST_WITH_DATABASE"
);

export const userListFetchingError = createAction("USER_LIST_FETCHING_ERROR");

export const updateUserListFromDB = createAction("UPDATE_USER_LIST_FROM_DB");

export const removeUserFromList = createAction("REMOVE_USER_FROM_LIST");

export const userListIsLoading = createAction("USER_LIST_IS_LOADING");

export const addUserToList = createAction("ADD_USER_TO_LIST");
