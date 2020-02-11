import { createAction } from "@reduxjs/toolkit";

export const syncDatabaseWithProfileData = createAction(
  "SYNC_DATABASE_WITH_PROFILE_DATA"
);

export const syncProfileDataWithDatabase = createAction(
  "SYNC_PROFILE_DATA_WITH_DATABASE"
);

export const setFirstName = createAction("SET_FIRST_NAME");

export const setBirthDate = createAction("SET_BIRTH_DATE");

export const setLastName = createAction("SET_LAST_NAME");

export const setAddress = createAction("SET_ADDRESS");

export const setGender = createAction("SET_GENDER");

export const setEmail = createAction("SET_EMAIL");
