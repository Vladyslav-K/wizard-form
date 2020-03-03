import { takeLatest, call, all, put } from "redux-saga/effects";

import {
  getCurrentUserFromDB,
  updateUserListInDB,
  getUserListFromDB,
  getUserListCount
} from "../utils/database.js";

import {
  setCurrentUserData,
  getUserFromList,
  saveCurrentUser,
  setLoading,
  setError
} from "../store/currentUserModule.js";

import { getUsersWithDB, setTotal } from "../store/userListModule.js";

function* getCurrentUser(action) {
  yield put(setLoading());

  const userID = action.payload.id;

  try {
    const userData = yield call(() => getCurrentUserFromDB(userID));
    yield put(setCurrentUserData(userData));
  } catch {
    yield put(setError());
  }
}

function* updateUserAfterEditing(action) {
  const userID = action.payload.id;
  const currentUser = action.payload.userData;

  try {
    yield call(() => updateUserListInDB(userID, currentUser));

    const userListWithDB = yield call(() =>
      getUserListFromDB({ pageNumber: 1, pageSize: 10 })
    );

    const userListCount = yield call(() => getUserListCount());

    yield put(setTotal(userListCount));

    yield put(getUsersWithDB(userListWithDB));
  } catch {
    yield put(setError());
  }
}

export default function* currentUserSagas() {
  yield all([
    takeLatest(saveCurrentUser.type, updateUserAfterEditing),
    takeLatest(getUserFromList.type, getCurrentUser)
  ]);
}
