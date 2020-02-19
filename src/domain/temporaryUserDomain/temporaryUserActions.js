import { createAction } from "@reduxjs/toolkit";

export const syncTemporaryUserDataWithDatabase = createAction(
  "SYNC_TEMPORARY_USER_DATA_WITH_DATABASE"
);

export const setTemporaryUserData = createAction("SET_TEMPORARY_USER_DATA");
