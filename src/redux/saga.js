import { call, put, takeEvery } from "redux-saga/effects";
// import { getListFetch } from "./actions";
import { getDataFailure, getDataFetch, getDataSuccess } from "./slice";

async function dataFetch() {
  const response = await fetch("https://www.reddit.com/r/reactjs.json");
  return await response.json();
}

function* getDataWorker() {
  try {
    const data = yield call(dataFetch);
    yield put(getDataSuccess(data));
    console.log("data", data);
  } catch (error) {
    yield put(getDataFailure(error.message));
  }
}
export function* watchDataFetch() {
  yield takeEvery(getDataFetch.type, getDataWorker);
}
