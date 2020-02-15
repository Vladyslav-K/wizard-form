import { createAction } from "@reduxjs/toolkit";

export const syncContactsDataWithDatabase = createAction(
  "SYNC_CONTACTS_DATA_WITH_DATABASE"
);

export const setContactsData = createAction("SET_CONTACTS_DATA");
