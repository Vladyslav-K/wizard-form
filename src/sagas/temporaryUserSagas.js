import { takeLatest, select, call, all, put } from "redux-saga/effects";

import { checkObjectPropsIsNotEmpty } from "../utils/helpers.js";

import isEqual from "lodash.isequal";

import {
  deleteTemporaryUserFromDB,
  getTemporaryUserFromDB,
  putTemporaryUserToDB
} from "../utils/database.js";

import {
  syncTemporaryUserDataWithDB,
  databaseHasTemporaryUser,
  checkTemporaryUserData,
  getTemporaryUserWithDB,
  setTemporaryUserData,
  deleteTemporaryUser,
  pushPhoneNumber,
  pushHobbie
} from "../store/temporaryUserModule.js";

import { setLoading, setError } from "../store/UIModule.js";

function* checkTemporaryUserDataInDB() {
  yield put(setLoading(true));

  const temporaryUser = yield call(() => getTemporaryUserFromDB());

  const localTemporaryUser = yield select(
    state => state.temporaryUserData.userData
  );

  if (
    temporaryUser &&
    checkObjectPropsIsNotEmpty(temporaryUser) &&
    !isEqual(temporaryUser, localTemporaryUser)
  ) {
    yield put(databaseHasTemporaryUser(true));
  }

  yield put(setLoading(false));
}

export function* removeTemporaryUser() {
  yield call(() => deleteTemporaryUserFromDB());

  yield put(databaseHasTemporaryUser(false));
}

function* getTemporaryUser() {
  yield put(databaseHasTemporaryUser(false));
  yield put(setLoading(true));

  try {
    const temporaryUser = yield call(() => getTemporaryUserFromDB());

    yield put(getTemporaryUserWithDB(temporaryUser));

    yield put(setLoading(false));
  } catch {
    yield put(setError(true));
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
    takeLatest(checkTemporaryUserData.type, checkTemporaryUserDataInDB),

    takeLatest(
      [setTemporaryUserData.type, pushPhoneNumber.type, pushHobbie.type],
      syncTemporaryUserWithDB
    ),

    takeLatest(syncTemporaryUserDataWithDB.type, getTemporaryUser),

    takeLatest(deleteTemporaryUser.type, removeTemporaryUser)
  ]);
}
