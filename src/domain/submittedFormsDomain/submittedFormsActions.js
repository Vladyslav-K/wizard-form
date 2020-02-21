import { createAction } from "@reduxjs/toolkit";

export const databaseHasTemporaryUserData = createAction(
  "DATABASE_HAS_TEMPORARY_USER_DATA"
);
export const setContactsAsSubmitted = createAction("SET_CONTACTS_AS_SUBMITTED");

export const setAccountAsSubmitted = createAction("SET_ACCOUNT_AS_SUBMITTED");

export const setProfileAsSubmitted = createAction("SET_PROFILE_AS_SUBMITTED");
