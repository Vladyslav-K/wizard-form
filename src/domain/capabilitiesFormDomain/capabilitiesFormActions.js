import { createAction } from "@reduxjs/toolkit";

export const syncCapabilitiesDataWithDatabase = createAction(
  "SYNC_CAPABILITIES_DATA_WITH_DATABASE"
);

export const setCapabilitiesData = createAction("SET_CAPABILITIES_DATA");
