import { all, call, put, select, takeLatest } from "redux-saga/effects";

import database from "../utils/database.js";

import {
  syncTemporaryUserDataWithDatabase,
  setTemporaryUserData
} from "../domain/temporaryUserDomain/temporaryUserActions.js";

const TEMPORARY_USER_KEYPATH = 1;

function* getUserDataFromDatabase() {
  const data = yield call(
    {
      context: database.temporaryUserData,
      fn: database.temporaryUserData.get
    },
    TEMPORARY_USER_KEYPATH
  );

  return data;
}

export function* syncReduxStoreWithDatabase() {
  const dataWithDatabase = yield call(() => getUserDataFromDatabase());
  const dataWithRedux = yield select();

  if (dataWithDatabase) {
    yield put(
      syncTemporaryUserDataWithDatabase({
        ...dataWithRedux,
        ...dataWithDatabase
      })
    );
  }
}

export function* syncDatabaseWithRedux(action) {
  const dataWithDatabase = yield call(() => getUserDataFromDatabase());

  yield call(
    {
      context: database.temporaryUserData,
      fn: database.temporaryUserData.put
    },
    {
      ...dataWithDatabase,
      ...action.payload,
      keyPath: TEMPORARY_USER_KEYPATH
    }
  );
}

export default function* rootSaga() {
  yield all([
    call(() => syncReduxStoreWithDatabase()),
    takeLatest(setTemporaryUserData.type, syncDatabaseWithRedux)
  ]);
}
