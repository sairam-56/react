import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";

import createSagaMiddleware from "redux-saga";
import { watchDataFetch } from "./saga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(watchDataFetch);
export default store;
