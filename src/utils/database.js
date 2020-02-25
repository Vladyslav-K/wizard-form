import Dexie from "dexie";

import { TEMPORARY_USER_ID } from "./constants.js";

const database = new Dexie("UsersData");

database.version(1).stores({
  temporaryUserData: "++id",
  userList: "++id, username, email, firstName, lastName"
});

export const getTemporaryUserFromDB = () => {
  return database.temporaryUserData.get(TEMPORARY_USER_ID);
};

export const deleteTemporaryUserFromDB = () => {
  return database.temporaryUserData.delete(TEMPORARY_USER_ID);
};

export const putTemporaryUserToDB = (prevDBData, currentData) => {
  return database.temporaryUserData.put({
    ...prevDBData,
    ...currentData,
    id: TEMPORARY_USER_ID
  });
};

export const getUserListFromDB = () => {
  return database.userList.toArray();
};

export const addUserToUserListFromDB = userData => {
  return database.userList.add({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const updateUserListInDB = (userId, userData) => {
  return database.userList.update(userId, userData);
};

export const deleteUserFromUserListInDB = userId => {
  return database.userList.delete(userId);
};

export const getCurrentUserFromDB = userId => {
  return database.userList.get(userId);
};

export const getFilteredCurrentUserFromDB = (keyPath, value = "") => {
  return database.userList.where({ [keyPath]: value }).first();
};
