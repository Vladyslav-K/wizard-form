import { createAction } from "@reduxjs/toolkit";

export const syncDatabaseWithAccountData = createAction(
  "SYNC_DATABASE_WITH_ACCOUNT_DATA"
);

export const syncAccountDataWithDatabase = createAction(
  "SYNC_ACCOUNT_DATA_WITH_DATABASE"
);

export const setPasswordConfirmation = createAction(
  "SET_PASSWORD_CONFIRMATION"
);

export const setUserName = createAction("SET_USER_NAME");

export const setPassword = createAction("SET_PASSWORD");

export const setAvatar = createAction("SET_AVATAR");
