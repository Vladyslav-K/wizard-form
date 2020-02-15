import { createAction } from "@reduxjs/toolkit";

export const syncAccountDataWithDatabase = createAction(
  "SYNC_ACCOUNT_DATA_WITH_DATABASE"
);

export const setAccountData = createAction("SET_ACCOUNT_DATA");
