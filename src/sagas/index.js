import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { checkObjectPropsIsNotEmpty } from "../utils/helpers.js";

import {
  deleteTemporaryUserFromDB,
  getTemporaryUserFromDB,
  putTemporaryUserToDB,
  deleteUserFromUserListInDB,
  addUserToUserListFromDB,
  updateUserListInDB,
  getUserListFromDB,
  getCurrentUserFromDB,
  addTestUserToDB
} from "../utils/database.js";

import {
  syncTemporaryUserDataWithDatabase,
  getTemporaryUserDataWithDatabase,
  databaseHasTemporaryUserData,
  removeTemporaryUserData,
  setTemporaryUserData,
  temporaryUserFetchingError,
  temporaryUserIsLoading
} from "../domain/temporaryUserDomain/temporaryUserActions.js";

import {
  syncUserListWithDatabase,
  userListFetchingError,
  updateUserListFromDB,
  removeUserFromList,
  userListIsLoading,
  addUserToList,
  getTestUsers
} from "../domain/userListDomain/userListActions.js";

import {
  saveCurrentUserToList,
  setCurrentUserData,
  getUserFromList,
  currentUserFetchingError,
  currentUserIsLoading
} from "../domain/currentUserDomain/currentUserActions.js";

function* checkTemporaryUserDataInDatabase() {
  const temporaryUserData = yield call(() => getTemporaryUserFromDB());

  if (temporaryUserData) {
    delete temporaryUserData.id;
  }

  if (checkObjectPropsIsNotEmpty(temporaryUserData)) {
    yield put(databaseHasTemporaryUserData(true));
  }
}

function* removeTemporaryUser() {
  yield call(() => deleteTemporaryUserFromDB());

  yield put(databaseHasTemporaryUserData(false));
}

function* syncReduxTemporaryUserDataWithDatabase() {
  yield put(databaseHasTemporaryUserData(false));
  yield put(temporaryUserIsLoading());

  try {
    const dataWithDatabase = yield call(() => getTemporaryUserFromDB());

    delete dataWithDatabase.id;

    yield put(syncTemporaryUserDataWithDatabase(dataWithDatabase));
  } catch {
    yield put(temporaryUserFetchingError());
  }
}

function* syncDatabaseTemporaryUserDataWithRedux(action) {
  const currentData = yield select(state => state.temporaryUserData.userData);

  const databaseHasUserData = yield select(
    state => state.temporaryUserData.databaseHasUserData
  );

  if (databaseHasUserData) {
    yield call(() => removeTemporaryUser());
  }

  yield call(() => putTemporaryUserToDB(currentData));
}

function* syncReduxUserListWithDatabase() {
  yield put(userListIsLoading());

  try {
    const userListWithDB = yield call(() => getUserListFromDB());
    yield put(syncUserListWithDatabase(userListWithDB));
  } catch {
    yield put(userListFetchingError());
  }
}

function* putUserToDatabaseUserList() {
  const userData = yield select(state => state.temporaryUserData.userData);

  yield call(() => addUserToUserListFromDB(userData));
}

function* removeUserFromDatabaseUserList(action) {
  const userId = action.payload.id;

  yield call(() => deleteUserFromUserListInDB(userId));
}

function* getCurrentUserFromDatabase(action) {
  yield put(currentUserIsLoading());

  const userId = action.payload.id;

  try {
    const userData = yield call(() => getCurrentUserFromDB(userId));
    yield put(setCurrentUserData(userData));
  } catch {
    yield put(currentUserFetchingError());
  }
}

function* changeUserDataAfterEditing(action) {
  const userId = action.payload.id;
  const userData = action.payload.userData;

  yield call(() => updateUserListInDB(userId, userData));

  yield call(() => syncReduxUserListWithDatabase());
}

function* putTestUserListToDatabase(action) {
  const testUserList = action.payload;

  yield call(() => testUserList.forEach(user => addTestUserToDB(user)));

  yield call(() => syncReduxUserListWithDatabase());
}

export default function* rootSaga() {
  yield all([
    call(() => checkTemporaryUserDataInDatabase()),

    takeLatest(
      getTemporaryUserDataWithDatabase.type,
      syncReduxTemporaryUserDataWithDatabase
    ),

    takeLatest(
      setTemporaryUserData.type,
      syncDatabaseTemporaryUserDataWithRedux
    ),

    takeLatest(updateUserListFromDB.type, syncReduxUserListWithDatabase),

    takeLatest(removeTemporaryUserData.type, removeTemporaryUser),

    takeLatest(addUserToList.type, putUserToDatabaseUserList),

    takeLatest(removeUserFromList.type, removeUserFromDatabaseUserList),

    takeLatest(saveCurrentUserToList.type, changeUserDataAfterEditing),

    takeLatest(getUserFromList.type, getCurrentUserFromDatabase),

    takeLatest(getTestUsers.type, putTestUserListToDatabase)
  ]);
}
