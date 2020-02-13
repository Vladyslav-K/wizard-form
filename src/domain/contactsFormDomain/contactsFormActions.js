import { createAction } from "@reduxjs/toolkit";

export const syncDatabaseWithContactsData = createAction(
  "SYNC_DATABASE_WITH_CONTACTS_DATA"
);

export const syncContactsDataWithDatabase = createAction(
  "SYNC_CONTACTS_DATA_WITH_DATABASE"
);

export const setMainLanguage = createAction("SET_MAIN_LANGUAGE");

export const setFacebookLink = createAction("SET_FACEBOOK_LINK");

export const setGitHubLink = createAction("SET_GITHUB_LINK");

export const setCompany = createAction("SET_COMPANY");

export const removePhone = createAction("REMOVE_PHONE")

export const setPhone = createAction("SET_PHONE");

export const setFax = createAction("SET_FAX");
