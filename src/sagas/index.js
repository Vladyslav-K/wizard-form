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
  getCurrentUserFromDB
} from "../utils/database.js";

import { databaseHasTemporaryUserData } from "../domain/submittedFormsDomain/submittedFormsActions.js";

import {
  syncTemporaryUserDataWithDatabase,
  getTemporaryUserDataWithDatabase,
  removeTemporaryUserData,
  setTemporaryUserData
} from "../domain/temporaryUserDomain/temporaryUserActions.js";

import {
  syncUserListWithDatabase,
  userListFetchingError,
  removeUserFromList,
  userListIsLoading,
  addUserToList
} from "../domain/userListDomain/userListActions.js";

import {
  saveCurrentUserToList,
  setCurrentUserData,
  getUserFromList
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
  const dataWithDatabase = yield call(() => getTemporaryUserFromDB());

  yield put(databaseHasTemporaryUserData(false));

  if (dataWithDatabase) {
    delete dataWithDatabase.id;

    yield put(syncTemporaryUserDataWithDatabase(dataWithDatabase));
  }
}

function* syncDatabaseTemporaryUserDataWithRedux(action) {
  const dataWithDatabase = yield call(() => getTemporaryUserFromDB());
  const currentData = action.payload;

  const databaseHasUserData = yield select(
    state => state.submitted.databaseHasUserData
  );

  if (databaseHasUserData) {
    yield put(databaseHasTemporaryUserData(false));
  }

  yield call(() => putTemporaryUserToDB(dataWithDatabase, currentData));
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
  const userData = yield select(state => state.temporaryUserData);

  yield call(() => addUserToUserListFromDB(userData));
}

function* removeUserFromDatabaseUserList(action) {
  const userId = action.payload.id;

  yield call(() => deleteUserFromUserListInDB(userId));
}

function* getEditedUserFromDatabase(action) {
  const userId = action.payload.id;

  const userData = yield call(() => getCurrentUserFromDB(userId));

  yield put(setCurrentUserData(userData));
}

function* changeUserDataAfterEditing(action) {
  const userId = action.payload.id;
  const userData = action.payload.userData;

  yield call(() => updateUserListInDB(userId, userData));

  yield call(() => syncReduxUserListWithDatabase());
}

export default function* rootSaga() {
  yield all([
    call(() => checkTemporaryUserDataInDatabase()),

    call(() => syncReduxUserListWithDatabase()),

    takeLatest(
      getTemporaryUserDataWithDatabase.type,
      syncReduxTemporaryUserDataWithDatabase
    ),

    takeLatest(
      setTemporaryUserData.type,
      syncDatabaseTemporaryUserDataWithRedux
    ),

    takeLatest(removeTemporaryUserData.type, removeTemporaryUser),

    takeLatest(addUserToList.type, putUserToDatabaseUserList),

    takeLatest(removeUserFromList.type, removeUserFromDatabaseUserList),

    takeLatest(saveCurrentUserToList.type, changeUserDataAfterEditing),

    takeLatest(getUserFromList.type, getEditedUserFromDatabase)
  ]);
}
