import {
  ADD,
  CLEAR,
  GET_DATA_FAILURE,
  GET_DATA_FETCH,
  GET_DATA_SUCCESS,
  REMOVE,
} from "./type";

export const getDataFetch = () => ({ type: GET_DATA_FETCH });
export const getDataSuccess = (payload) => ({
  type: GET_DATA_SUCCESS,
  payload,
});
export const getDatFailure = (payload) => ({ type: GET_DATA_FAILURE, payload });
export const Add = (payload) => ({ type: ADD, payload });
export const Remove = (payload) => ({ type: REMOVE, payload });
export const Clear = () => ({ type: CLEAR });
