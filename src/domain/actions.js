import { createAction } from "@reduxjs/toolkit";

export const setAccountData = createAction("SET_ACCOUNT_DATA");

export const setProfileData = createAction("SET_PROFILE_DATA");

export const syncAccountDataWithDatabase = createAction(
  "SYNC_ACCOUNT_DATA_WITH_DATABASE"
);
