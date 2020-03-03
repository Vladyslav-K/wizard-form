import { fork } from "redux-saga/effects";

import temporaryUserSagas from "./temporaryUserSagas.js";
import currentUserSagas from "./currentUserSagas.js";
import userListSagas from "./userListSagas.js";

export default function* rootSaga() {
  yield fork(temporaryUserSagas);
  yield fork(currentUserSagas);
  yield fork(userListSagas);
}
