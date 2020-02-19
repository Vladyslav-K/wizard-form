import { all, call, put, takeLatest } from "redux-saga/effects";

import database from "../utils/database.js";

import {
  syncCapabilitiesDataWithDatabase,
  setCapabilitiesData
} from "../domain/capabilitiesFormDomain/capabilitiesFormActions.js";

import {
  syncContactsDataWithDatabase,
  setContactsData
} from "../domain/contactsFormDomain/contactsFormActions.js";

import {
  syncProfileDataWithDatabase,
  setProfileData
} from "../domain/profileFormDomain/profileFormActions.js";

import {
  syncAccountDataWithDatabase,
  setAccountData
} from "../domain/accountFormDomain/accountFormActions.js";

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

  if (dataWithDatabase) {
    yield all([
      put(syncCapabilitiesDataWithDatabase(dataWithDatabase)),
      put(syncContactsDataWithDatabase(dataWithDatabase)),
      put(syncProfileDataWithDatabase(dataWithDatabase)),
      put(syncAccountDataWithDatabase(dataWithDatabase))
    ]);
  }
}

export function* syncDatabaseWithRedux(action) {
  if (action.payload) {
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
}

export default function* rootSaga() {
  yield all([
    call(() => syncReduxStoreWithDatabase()),
    takeLatest(
      [
        setCapabilitiesData.type,
        setContactsData.type,
        setProfileData.type,
        setAccountData.type
      ],
      syncDatabaseWithRedux
    )
  ]);
}
