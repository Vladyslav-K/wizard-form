import { createAction } from "@reduxjs/toolkit";

export const syncProfileDataWithDatabase = createAction(
  "SYNC_PROFILE_DATA_WITH_DATABASE"
);

export const setProfileData = createAction("SET_PROFILE_DATA");
