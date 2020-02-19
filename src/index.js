import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./normalize.css";
import * as serviceWorker from "./serviceWorker";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { temporaryUserReducers } from "./domain/temporaryUserDomain/temporaryUserReducers.js";
import { submittedFormsReducers } from "./domain/submittedFormsDomain/submittedFormsReducers.js";

import rootSaga from "./sagas";

import App from "./pages/App";

const reducer = {
  temporaryUserData: temporaryUserReducers,
  submitted: submittedFormsReducers
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
  sagaMiddleware
];

const store = configureStore({
  reducer,
  middleware,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
