import { createAction } from "@reduxjs/toolkit";

export const setCababilitiesAsSubmitted = createAction(
  "SET_CAPABILITIES_AS_SUBMITTED"
);

export const setContactsAsSubmitted = createAction("SET_CONTACTS_AS_SUBMITTED");

export const setAccountAsSubmitted = createAction("SET_ACCOUNT_AS_SUBMITTED");

export const setProfileAsSubmitted = createAction("SET_PROFILE_AS_SUBMITTED");
