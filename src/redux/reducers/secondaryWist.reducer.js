const initialState = {
  list: [], // Array to store the list of elementary wist tests
  isLoading: false, // To track the loading state of requests
  error: null, // To store any errors that might occur during requests
  currentRecord: null, // Object to store details of the currently selected record
  selectedTest: [],

};

const secondaryWistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SECONDARY_WIST":
      return {
        ...state,
        list: action.payload,
      };
    // *****
    // this setup below allows to manage both list of all wist records and the details of a specific record in redux state. not sure yet if we need this
    //  *****
    // case "SET_CURRENT_SECONDARY_WIST_RECORD":
    //   return {
    //     ...state,
    //     currentRecord: action.payload,
    //   };
    // case "CLEAR_CURRENT_SECONDARY_WIST_RECORD":
    //   return {
    //     ...state,
    //     currentRecord: null,
    //   };
    case "ADD_SECONDARY_WIST":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "UPDATE_SECONDARY_WIST":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "DELETE_SECONDARY_WIST":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default secondaryWistReducer;
