import {
  takeLatest,
  takeEvery,
  select,
  delay,
  call,
  all,
  put
} from "redux-saga/effects";

import {
  deleteUserFromUserListInDB,
  addUserToUserListFromDB,
  getUserListFromDB,
  getUserListCount,
  filterUserList,
  addTestUserToDB
} from "../utils/database.js";

import {
  deleteUserFromList,
  searchUsersByName,
  getUsersWithDB,
  addUserToList,
  getTestUsers,
  updateUser,
  setLoading,
  setTotal,
  setError
} from "../store/userListModule.js";

function* getUserListWithDB(action) {
  yield put(setLoading());

  try {
    const { pageNumber, pageSize } = action.payload;

    const userList = yield call(() =>
      getUserListFromDB({ pageNumber, pageSize })
    );

    yield put(getUsersWithDB(userList));

    const userListCount = yield call(() => getUserListCount());

    yield put(setTotal(userListCount));
  } catch {
    yield put(setError());
  }
}

function* addUserToDatabaseList() {
  const temporaryUser = yield select(state => state.temporaryUserData.userData);

  try {
    yield call(() => addUserToUserListFromDB(temporaryUser));

    const userList = yield call(() =>
      getUserListFromDB({ pageNumber: 1, pageSize: 10 })
    );

    yield put(getUsersWithDB(userList));

    const userListCount = yield call(() => getUserListCount());

    yield put(setTotal(userListCount));
  } catch {
    yield put(setError());
  }
}

function* deleteUserFromDB(action) {
  const userID = action.payload.id;

  try {
    yield call(() => deleteUserFromUserListInDB(userID));

    const userList = yield call(() =>
      getUserListFromDB({ pageNumber: 1, pageSize: 10 })
    );

    const userListCount = yield call(() => getUserListCount());

    yield put(setTotal(userListCount));

    yield put(getUsersWithDB(userList));
  } catch {
    yield put(setError());
  }
}

function* getFilteredUserList(action) {
  const { keywords, pageNumber, pageSize } = action.payload;

  yield delay(500);

  yield put(setLoading());

  try {
    const { userList, userListCount } = yield call(() =>
      filterUserList({ keywords, pageNumber, pageSize })
    );

    yield put(setTotal(userListCount));

    yield put(getUsersWithDB(userList));
  } catch {
    yield put(setError());
  }
}

function* putTestUserListToDB(action) {
  const testUsers = action.payload;

  yield call(() => testUsers.forEach(user => addTestUserToDB(user)));
}

export default function* userListSagas() {
  yield all([
    takeLatest(updateUser.type, getUserListWithDB),

    takeLatest(addUserToList.type, addUserToDatabaseList),

    takeEvery(deleteUserFromList.type, deleteUserFromDB),

    takeLatest(getTestUsers.type, putTestUserListToDB),

    takeLatest(searchUsersByName.type, getFilteredUserList)
  ]);
}
