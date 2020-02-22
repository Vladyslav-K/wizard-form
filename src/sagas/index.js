import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { DateTime } from "luxon";

import { checkObjectPropsIsEmpty } from "../utils/helpers.js";
import database from "../utils/database.js";

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

const TEMPORARY_USER_ID = 1;

function* getUserListFromDatabase() {
  const userList = yield call(() => database.userList.toArray());

  return userList;
}

function* getTemporaryUserDataFromDatabase() {
  const temporaryUserData = yield call(
    {
      context: database.temporaryUserData,
      fn: database.temporaryUserData.get
    },
    TEMPORARY_USER_ID
  );

  return temporaryUserData;
}

function* checkTemporaryUserDataInDatabase() {
  const temporaryUserData = yield call(() =>
    getTemporaryUserDataFromDatabase()
  );

  if (temporaryUserData) {
    delete temporaryUserData.id;
  }

  if (!checkObjectPropsIsEmpty(temporaryUserData)) {
    yield put(databaseHasTemporaryUserData(true));
  }
}

function* removeTemporaryUser() {
  yield call(
    {
      context: database.temporaryUserData,
      fn: database.temporaryUserData.delete
    },
    TEMPORARY_USER_ID
  );

  yield put(databaseHasTemporaryUserData(false));
}

export function* syncReduxTemporaryUserDataWithDatabase() {
  const dataWithDatabase = yield call(() => getTemporaryUserDataFromDatabase());

  yield put(databaseHasTemporaryUserData(false));

  if (dataWithDatabase) {
    delete dataWithDatabase.id;

    yield put(syncTemporaryUserDataWithDatabase(dataWithDatabase));
  }
}

export function* syncDatabaseTemporaryUserDataWithRedux(action) {
  const dataWithDatabase = yield call(() => getTemporaryUserDataFromDatabase());

  const databaseHasUserData = yield select(
    state => state.submitted.databaseHasUserData
  );

  if (databaseHasUserData) {
    yield put(databaseHasTemporaryUserData(false));
  }

  yield call(
    {
      context: database.temporaryUserData,
      fn: database.temporaryUserData.put
    },
    {
      ...dataWithDatabase,
      ...action.payload,
      id: TEMPORARY_USER_ID
    }
  );
}

export function* syncReduxUserListWithDatabase() {
  yield put(userListIsLoading());

  try {
    const userListWithDB = yield call(() => getUserListFromDatabase());
    yield put(syncUserListWithDatabase(userListWithDB));
  } catch {
    yield put(userListFetchingError());
  }
}

export function* putUserToDatabaseUserList() {
  const userData = yield select(state => state.temporaryUserData);

  yield call(
    {
      context: database.userList,
      fn: database.userList.add
    },
    {
      ...userData,
      createdAt: DateTime.local().toJSDate(),
      updatedAt: DateTime.local().toJSDate()
    }
  );
}

export function* removeUserFromDatabaseUserList(action) {
  yield call(
    {
      context: database.userList,
      fn: database.userList.delete
    },
    action.payload.id
  );
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

    takeLatest(removeUserFromList.type, removeUserFromDatabaseUserList)
  ]);
}
