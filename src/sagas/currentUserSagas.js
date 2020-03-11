import { takeLatest, call, all, put } from "redux-saga/effects";

// database methods
import {
  getCurrentUserFromDB,
  updateUserListInDB,
  getUserListFromDB,
  getUserListCount
} from "../utils/database.js";

// current user actions
import {
  getUserFromList,
  saveCurrentUser,
  setCurrentUser,
  setLoading,
  setError
} from "../store/currentUserModule.js";

// user list actions
import { getUsersWithDB, setTotal } from "../store/userListModule.js";

function* getCurrentUser(action) {
  yield put(setLoading(true));

  const userID = action.payload.id;

  try {
    const user = yield call(() => getCurrentUserFromDB(userID));

    yield put(setCurrentUser(user));

    yield put(setLoading(false));
  } catch {
    yield put(setError(true));
  }
}

function* updateUserAfterEditing(action) {
  const userID = action.payload.id;
  const currentUser = action.payload.user;

  try {
    yield call(() => updateUserListInDB(userID, currentUser));

    const userListWithDB = yield call(() =>
      getUserListFromDB({ pageNumber: 1, pageSize: 10 })
    );

    const userListCount = yield call(() => getUserListCount());

    yield put(setTotal(userListCount));

    yield put(getUsersWithDB(userListWithDB));
  } catch {
    yield put(setError(true));
  }
}

export default function* currentUserSagas() {
  yield all([
    takeLatest(saveCurrentUser.type, updateUserAfterEditing),
    takeLatest(getUserFromList.type, getCurrentUser)
  ]);
}
