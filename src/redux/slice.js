import { createSlice } from "@reduxjs/toolkit";
// import { GET_LIST_FETCH } from "./actions";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    list: { redux: 1, tailwind: 1 },
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    getDataFetch: (state, action) => {
      state.loading = true;
    },
    getDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    add: (state, action) => {
      if (Object.hasOwn(state.list, action.payload)) {
        state.list[action.payload] += 1;
      } else {
        state.list[action.payload] = 1;
      }
    },
    remove: (state, action) => {
      delete state.list[action.payload];
    },
    clear: (state) => {
      state.list = {};
    },
  },
});

export const {
  add,
  remove,
  clear,
  getDataFailure,
  getDataFetch,
  getDataSuccess,
} = counterSlice.actions;

export default counterSlice.reducer;
