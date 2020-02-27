import { createAction } from "@reduxjs/toolkit";

export const temporaryUserIsLoading = createAction("TEMPORARY_USER_IS_LOADING");

export const temporaryUserFetchingError = createAction(
  "TEMPORARY_USER_FETCHING_ERROR"
);

export const syncTemporaryUserDataWithDatabase = createAction(
  "SYNC_TEMPORARY_USER_DATA_WITH_DATABASE"
);

export const getTemporaryUserDataWithDatabase = createAction(
  "GET_TEMPORARY_USER_DATA_WITH_DATABASE"
);

export const removeTemporaryUserData = createAction(
  "REMOVE_TEMPORARY_USER_DATA"
);

export const setTemporaryUserData = createAction("SET_TEMPORARY_USER_DATA");

export const databaseHasTemporaryUserData = createAction(
  "DATABASE_HAS_TEMPORARY_USER_DATA"
);
