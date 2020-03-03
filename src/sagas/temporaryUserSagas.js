import { takeLatest, select, call, all, put } from "redux-saga/effects";

import { checkObjectPropsIsNotEmpty } from "../utils/helpers.js";

import {
  syncTemporaryUserDataWithDB,
  databaseHasTemporaryUser,
  getTemporaryUserWithDB,
  setTemporaryUserData,
  deleteTemporaryUser,
  setLoading,
  setError
} from "../store/temporaryUserModule.js";

import {
  deleteTemporaryUserFromDB,
  getTemporaryUserFromDB,
  putTemporaryUserToDB
} from "../utils/database.js";

function* checkTemporaryUserDataInDB() {
  const temporaryUser = yield call(() => getTemporaryUserFromDB());

  if (checkObjectPropsIsNotEmpty(temporaryUser)) {
    yield put(databaseHasTemporaryUser(true));
  }
}

function* removeTemporaryUser() {
  yield call(() => deleteTemporaryUserFromDB());

  yield put(databaseHasTemporaryUser(false));
}

function* getTemporaryUser() {
  yield put(databaseHasTemporaryUser(false));
  yield put(setLoading());

  try {
    const temporaryUser = yield call(() => getTemporaryUserFromDB());

    yield put(getTemporaryUserWithDB(temporaryUser));
  } catch {
    yield put(setError());
  }
}

function* syncTemporaryUserWithDB(action) {
  const temporaryUser = yield select(state => state.temporaryUserData.userData);

  const databaseHasUserData = yield select(
    state => state.temporaryUserData.databaseHasUserData
  );

  if (databaseHasUserData) {
    yield call(() => removeTemporaryUser());
  }

  yield call(() => putTemporaryUserToDB(temporaryUser));
}

export default function* temporaryUserSagas() {
  yield all([
    call(() => checkTemporaryUserDataInDB()),

    takeLatest(setTemporaryUserData.type, syncTemporaryUserWithDB),

    takeLatest(syncTemporaryUserDataWithDB.type, getTemporaryUser),

    takeLatest(deleteTemporaryUser.type, removeTemporaryUser)
  ]);
}
