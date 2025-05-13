import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import { GET_DATA_FETCH } from "./type";

async function dataFetch() {
  const response = await fetch("https://www.reddit.com/r/reactjs.json");
  return await response.json();
}

function* getDataWorker() {
  try {
    const data = yield call(dataFetch);

    yield put(actions.getDataSuccess(data));

    console.log("data", data);
  } catch (error) {
    yield put(actions.getDatFailure(error.message));
  }
}
export function* watchDataFetch() {
  yield takeEvery(GET_DATA_FETCH, getDataWorker);
}
