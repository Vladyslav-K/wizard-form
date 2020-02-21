import { createAction } from "@reduxjs/toolkit";

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

