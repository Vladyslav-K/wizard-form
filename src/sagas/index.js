import {
  takeLatest,
  takeEvery,
  select,
  call,
  all,
  put
} from "redux-saga/effects";

import { checkObjectPropsIsNotEmpty } from "../utils/helpers.js";

import {
  deleteTemporaryUserFromDB,
  getTemporaryUserFromDB,
  putTemporaryUserToDB,
  deleteUserFromUserListInDB,
  addUserToUserListFromDB,
  updateUserListInDB,
  getUserListFromDB,
  getUserListCount,
  filterUserList,
  getCurrentUserFromDB,
  addTestUserToDB
} from "../utils/database.js";

import {
  syncTemporaryUserDataWithDatabase,
  getTemporaryUserDataWithDatabase,
  databaseHasTemporaryUserData,
  removeTemporaryUserData,
  setTemporaryUserData,
  temporaryUserFetchingError,
  temporaryUserIsLoading
} from "../domain/temporaryUserDomain/temporaryUserActions.js";

import {
  syncUserListWithDatabase,
  userListFetchingError,
  updateUserListFromDB,
  removeUserFromList,
  userListIsLoading,
  searchUsersByName,
  setUserListTotal,
  addUserToList,
  getTestUsers
} from "../domain/userListDomain/userListActions.js";

import {
  saveCurrentUserToList,
  setCurrentUserData,
  getUserFromList,
  currentUserFetchingError,
  currentUserIsLoading
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
  yield put(databaseHasTemporaryUserData(false));
  yield put(temporaryUserIsLoading());

  try {
    const dataWithDatabase = yield call(() => getTemporaryUserFromDB());

    delete dataWithDatabase.id;

    yield put(syncTemporaryUserDataWithDatabase(dataWithDatabase));
  } catch {
    yield put(temporaryUserFetchingError());
  }
}

function* syncDatabaseTemporaryUserDataWithRedux(action) {
  const currentData = yield select(state => state.temporaryUserData.userData);

  const databaseHasUserData = yield select(
    state => state.temporaryUserData.databaseHasUserData
  );

  if (databaseHasUserData) {
    yield call(() => removeTemporaryUser());
  }

  yield call(() => putTemporaryUserToDB(currentData));
}

function* syncReduxUserListWithDatabase(action) {
  yield put(userListIsLoading());

  try {
    const { pageNumber, pageSize } = action.payload;

    const userListWithDB = yield call(() =>
      getUserListFromDB({ pageNumber, pageSize })
    );

    yield put(syncUserListWithDatabase(userListWithDB));

    const userListCount = yield call(() => getUserListCount());

    yield put(setUserListTotal(userListCount));
  } catch {
    yield put(userListFetchingError());
  }
}

function* putUserToDatabaseUserList() {
  const userData = yield select(state => state.temporaryUserData.userData);

  try {
    yield call(() => addUserToUserListFromDB(userData));

    const userListWithDB = yield call(() =>
      getUserListFromDB({ pageNumber: 1, pageSize: 10 })
    );

    yield put(syncUserListWithDatabase(userListWithDB));

    const userListCount = yield call(() => getUserListCount());

    yield put(setUserListTotal(userListCount));
  } catch {
    yield put(userListFetchingError());
  }
}

function* removeUserFromDatabaseUserList(action) {
  const userId = action.payload.id;

  try {
    yield call(() => deleteUserFromUserListInDB(userId));

    const userListWithDB = yield call(() =>
      getUserListFromDB({ pageNumber: 1, pageSize: 10 })
    );

    yield put(syncUserListWithDatabase(userListWithDB));

    const userListCount = yield call(() => getUserListCount());

    yield put(setUserListTotal(userListCount));
  } catch {
    yield put(userListFetchingError());
  }
}

function* getCurrentUserFromDatabase(action) {
  yield put(currentUserIsLoading());

  const userId = action.payload.id;

  try {
    const userData = yield call(() => getCurrentUserFromDB(userId));
    yield put(setCurrentUserData(userData));
  } catch {
    yield put(currentUserFetchingError());
  }
}

function* changeUserDataAfterEditing(action) {
  const userId = action.payload.id;
  const userData = action.payload.userData;

  try {
    yield call(() => updateUserListInDB(userId, userData));

    const userListWithDB = yield call(() =>
      getUserListFromDB({ pageNumber: 1, pageSize: 10 })
    );

    yield put(syncUserListWithDatabase(userListWithDB));

    const userListCount = yield call(() => getUserListCount());

    yield put(setUserListTotal(userListCount));
  } catch {
    yield put(userListFetchingError());
  }
}

function* putTestUserListToDatabase(action) {
  const testUserList = action.payload;

  yield call(() => testUserList.forEach(user => addTestUserToDB(user)));
}

function* getFilteredUserList(action) {
  const keywords = action.payload;

  if (keywords === "") {
    try {
      const userListWithDB = yield call(() =>
        getUserListFromDB({ pageNumber: 1, pageSize: 10 })
      );

      yield put(syncUserListWithDatabase(userListWithDB));

      const userListCount = yield call(() => getUserListCount());

      yield put(setUserListTotal(userListCount));
    } catch {
      yield put(userListFetchingError());
    }
  } else {
    try {
      const userListWithDB = yield call(() => filterUserList(keywords));

      yield put(syncUserListWithDatabase(userListWithDB));

      const userListCount = userListWithDB.length;

      yield put(setUserListTotal(userListCount));
    } catch {
      yield put(userListFetchingError());
    }
  }
}

export default function* rootSaga() {
  yield all([
    call(() => checkTemporaryUserDataInDatabase()),

    takeLatest(
      getTemporaryUserDataWithDatabase.type,
      syncReduxTemporaryUserDataWithDatabase
    ),

    takeLatest(
      setTemporaryUserData.type,
      syncDatabaseTemporaryUserDataWithRedux
    ),

    takeLatest(updateUserListFromDB.type, syncReduxUserListWithDatabase),

    takeLatest(removeTemporaryUserData.type, removeTemporaryUser),

    takeLatest(addUserToList.type, putUserToDatabaseUserList),

    takeEvery(removeUserFromList.type, removeUserFromDatabaseUserList),

    takeLatest(saveCurrentUserToList.type, changeUserDataAfterEditing),

    takeLatest(getUserFromList.type, getCurrentUserFromDatabase),

    takeLatest(getTestUsers.type, putTestUserListToDatabase),

    takeLatest(searchUsersByName.type, getFilteredUserList)
  ]);
}
