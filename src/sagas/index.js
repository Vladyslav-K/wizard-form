import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { setAccountData, syncAccountDataWithDatabase } from "../domain/actions";
import database from "../utils/database";

function* syncAccountDataFromDatabase() {
  const accountData = yield call(() => database.table("accountData").toArray());

  yield put(syncAccountDataWithDatabase(...accountData));
}

function* addAccountDataToDatabase(data) {
  const accountData = yield select(state => state.accountData);

  database.accountData.put({ ...accountData, id: 1 });
}

export default function* rootSaga() {
  yield all([
    call(() => syncAccountDataFromDatabase()),
    takeLatest(setAccountData.type, addAccountDataToDatabase)
  ]);
}
