import { takeLatest, select, call, all, put } from "redux-saga/effects";
import isEqual from "lodash.isequal";

// helper funtion for check object is not empty
import {
  checkObjectPropsIsNotEmpty,
  checkValueInTabs,
  setQueryString
} from "../utils/helpers.js";

// database methods
import {
  deleteTemporaryUserFromDB,
  getTemporaryUserFromDB,
  putTemporaryUserToDB
} from "../utils/database.js";

// temporary user actions
import {
  syncTemporaryUserDataWithDB,
  databaseHasTemporaryUser,
  checkTemporaryUserData,
  getTemporaryUserWithDB,
  setTemporaryUserData,
  deleteTemporaryUser
} from "../store/temporaryUserModule.js";

// UI actions
import { setLoading, setError, setDisabledTabs } from "../store/UIModule.js";

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

    const { tabName, ...tabs } = yield call(() =>
      checkValueInTabs(temporaryUser)
    );

    yield put(setDisabledTabs(tabs));

    yield call(() =>
      setQueryString({
        queryName: "tab",
        queryValue: tabName
      })
    );

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

    takeLatest(setTemporaryUserData.type, syncTemporaryUserWithDB),

    takeLatest(syncTemporaryUserDataWithDB.type, getTemporaryUser),

    takeLatest(deleteTemporaryUser.type, removeTemporaryUser)
  ]);
}
