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
