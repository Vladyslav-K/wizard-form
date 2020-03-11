import Dexie from "dexie";
import { store } from "../index.js";
import { TEMPORARY_USER_ID } from "./constants.js";

const database = new Dexie("UsersData");

database.version(1).stores({
  temporaryUser: "++id",
  userList: "++id, &username, &email, firstName, lastName, createdAt"
});

export const getTemporaryUserFromDB = () => {
  const temporaryUser = database.temporaryUser.get(TEMPORARY_USER_ID);

  delete temporaryUser.id;

  return temporaryUser;
};

export const deleteTemporaryUserFromDB = () => {
  return database.temporaryUser.delete(TEMPORARY_USER_ID);
};

export const putTemporaryUserToDB = (prevDBData, currentUser) => {
  return database.temporaryUser.put({
    ...prevDBData,
    ...currentUser,
    id: TEMPORARY_USER_ID
  });
};

export const getUserListFromDB = ({ pageNumber, pageSize }) => {
  return database.userList
    .orderBy("createdAt")
    .reverse()
    .offset(pageNumber * pageSize - pageSize)
    .limit(pageSize)
    .toArray();
};

export const addUserToUserListFromDB = user => {
  return database.userList.add({
    ...user,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  });
};

export const updateUserListInDB = (userId, user) => {
  return database.userList.update(userId, user);
};

export const deleteUserFromUserListInDB = userId => {
  return database.userList.delete(userId);
};

export const getUserListCount = () => {
  return database.userList.count();
};

export const getCurrentUserFromDB = userId => {
  return database.userList.get(userId);
};

export const validateEditedUser = async (keyPath, value = "") => {
  const currentUser = store.getState().currentUser.user;

  const editeduser = await database.userList
    .where({ [keyPath]: value })
    .first();

  return editeduser && currentUser.id === editeduser.id
    ? true
    : editeduser
    ? false
    : true;
};

export const addTestUserToDB = user => {
  return database.userList.add({ ...user });
};

export const filterUserList = async ({ keywords, pageNumber, pageSize }) => {
  if (!keywords) {
    return {
      userList: await getUserListFromDB({ pageNumber: 1, pageSize: 10 }),
      userListCount: await getUserListCount()
    };
  }

  return {
    userList: await database.userList
      .orderBy("createdAt")
      .reverse()
      .filter(
        user =>
          user.firstName.toLowerCase().includes(keywords) ||
          user.lastName.toLowerCase().includes(keywords)
      )
      .offset(pageNumber * pageSize - pageSize)
      .limit(pageSize)
      .toArray(),

    userListCount: await database.userList
      .orderBy("createdAt")
      .reverse()
      .filter(
        user =>
          user.firstName.toLowerCase().includes(keywords) ||
          user.lastName.toLowerCase().includes(keywords)
      )
      .count()
  };
};
