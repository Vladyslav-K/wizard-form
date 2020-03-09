import {
  takeLatest,
  takeEvery,
  select,
  delay,
  call,
  all,
  put
} from "redux-saga/effects";

// database methods
import {
  deleteUserFromUserListInDB,
  addUserToUserListFromDB,
  getUserListFromDB,
  getUserListCount,
  filterUserList,
  addTestUserToDB
} from "../utils/database.js";

// user list actions
import {
  deleteUserFromList,
  searchUsersByName,
  getUsersWithDB,
  addUserToList,
  getTestUsers,
  updateUser,
  setTotal
} from "../store/userListModule.js";

// UI actions
import { setLoading, setError, setDisabledTabs } from "../store/UIModule.js";

// temporary user actions
import { removeTemporaryUser } from "./temporaryUserSagas.js";

function* getUserListWithDB(action) {
  yield put(setLoading(true));

  try {
    const { pageNumber, pageSize } = action.payload;

    const userList = yield call(() =>
      getUserListFromDB({ pageNumber, pageSize })
    );

    yield put(getUsersWithDB(userList));

    const userListCount = yield call(() => getUserListCount());

    yield put(setTotal(userListCount));

    yield put(setLoading(false));
  } catch {
    yield put(setError(true));
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

    yield call(() => removeTemporaryUser());

    yield call(() =>
      setDisabledTabs({
        capabilitiesTab: true,
        contactsTab: true,
        profileTab: true
      })
    );
  } catch {
    yield put(setError(true));
  }
}

function* deleteUserFromDB(action) {
  const { pageNumber, pageSize, id } = action.payload;

  try {
    yield call(() => deleteUserFromUserListInDB(id));

    const userList = yield call(() =>
      getUserListFromDB({ pageNumber, pageSize })
    );

    yield put(getUsersWithDB(userList));

    const userListCount = yield call(() => getUserListCount());

    yield put(setTotal(userListCount));

    yield put(setLoading(false));
  } catch {
    yield put(setError(true));
  }
}

function* getFilteredUserList(action) {
  const { keywords, pageNumber, pageSize } = action.payload;

  yield delay(500);

  yield put(setLoading(true));

  try {
    const { userList, userListCount } = yield call(() =>
      filterUserList({ keywords, pageNumber, pageSize })
    );

    yield put(setTotal(userListCount));

    yield put(getUsersWithDB(userList));

    yield put(setLoading(false));
  } catch {
    yield put(setError(true));
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
