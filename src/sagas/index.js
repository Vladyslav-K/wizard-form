import { all, takeLatest, select } from "redux-saga/effects";

import { syncDatabaseWithAccountData } from "../domain/accountFormDomain/accountFormActions";
import { syncDatabaseWithProfileData } from "../domain/profileFormDomain/profileFormActions";
import database from "../utils/database";

function* addAccountDataToDatabase() {
  const accountData = yield select(state => state.account);

  database.accountData.put({ ...accountData, id: 1 });
}

function* addProfileDataToDatabase() {
  const profileData = yield select(state => state.profile);

  database.profileData.put({ ...profileData, id: 1 });
}

export default function* rootSaga() {
  yield all([
    takeLatest(syncDatabaseWithAccountData.type, addAccountDataToDatabase),
    takeLatest(syncDatabaseWithProfileData.type, addProfileDataToDatabase)
  ]);
}
