import { createAction } from "@reduxjs/toolkit";

export const getUserFromList = createAction("GET_USER_FROM_LIST");

export const setEditedUserData = createAction("SET_EDITED_USER_DATA");

export const saveEditedUserToList = createAction("SAVE_EDITED_USER_TO_LIST");
