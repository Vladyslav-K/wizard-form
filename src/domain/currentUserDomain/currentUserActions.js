import { createAction } from "@reduxjs/toolkit";

export const getUserFromList = createAction("GET_USER_FROM_LIST");

export const setCurrentUserData = createAction("SET_CURRENT_USER_DATA");

export const saveCurrentUserToList = createAction("SAVE_CURRENT_USER_TO_LIST");
