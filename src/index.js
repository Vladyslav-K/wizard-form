import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

//service worker
import * as serviceWorker from "./serviceWorker";

// redux-saga and redux-toolkit methods
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// normalize styles
import "./normalize.css";

// store reducers
import temporaryUserReducer from "./store/temporaryUserModule.js";
import currentUserReducer from "./store/currentUserModule.js";
import userListReducer from "./store/userListModule.js";
import UIModule from "./store/UIModule.js";

import rootSaga from "./sagas/rootSaga.js";

import App from "./pages/App";

const reducer = {
  temporaryUserData: temporaryUserReducer,
  currentUserData: currentUserReducer,
  listOfUsers: userListReducer,
  UIModule
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
  sagaMiddleware
];

export const store = configureStore({
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

serviceWorker.register();
