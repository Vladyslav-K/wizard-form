import { all, call, select, debounce } from "redux-saga/effects";

import { setAccountData } from "../domain/actions";
import database from "../utils/database";

function* addAccountDataToDatabase() {
  const accountData = yield select(state => state.accountData);

  database.accountData.put({ ...accountData, id: 1 });
}

function* debounceAddAccountDataToDatabase() {
  yield debounce(200, setAccountData.type, addAccountDataToDatabase);
}

export default function* rootSaga() {
  yield all([call(() => debounceAddAccountDataToDatabase())]);
}
