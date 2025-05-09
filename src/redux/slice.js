import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    list: { redux: 1, tailwind: 1 },
  },
  reducers: {
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

export const { add, remove, clear } = counterSlice.actions;

export default counterSlice.reducer;
