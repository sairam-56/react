const initialState = {
  list: { redux: 1, tailwind: 1 },
  data: [],
  loading: false,
  error: null,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DATA_FETCH":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "GET_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GET_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD":
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload]: state.list[action.payload]
            ? state.list[action.payload] + 1
            : 1,
        },
      };

    case "REMOVE":
      const newList = { ...state.list };
      delete newList[action.payload];
      return {
        ...state,
        list: newList,
      };

    case "CLEAR":
      return {
        ...state,
        list: {},
      };

    default:
      return state;
  }
}

export default counterReducer;

// import { createSlice } from "@reduxjs/toolkit";
// // import { GET_LIST_FETCH } from "./actions";

// const counterSlice = createSlice({
//   name: "counter",
//   initialState: {
//     list: { redux: 1, tailwind: 1 },
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     getDataFetch: (state, action) => {
//       state.loading = true;
//     },
//     getDataSuccess: (state, action) => {
//       state.loading = false;
//       state.data = action.payload;
//     },
//     getDataFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     add: (state, action) => {
//       if (Object.hasOwn(state.list, action.payload)) {
//         state.list[action.payload] += 1;
//       } else {
//         state.list[action.payload] = 1;
//       }
//     },
//     remove: (state, action) => {
//       delete state.list[action.payload];
//     },
//     clear: (state) => {
//       state.list = {};
//     },
//   },
// });

// export const {
//   add,
//   remove,
//   clear,
//   getDataFailure,
//   getDataFetch,
//   getDataSuccess,
// } = counterSlice.actions;

// export default counterSlice.reducer;
