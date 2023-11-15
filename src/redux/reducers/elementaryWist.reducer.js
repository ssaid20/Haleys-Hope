const initialState = {
  list: [], // Array to store the list of elementary wist tests
  isLoading: false, // To track the loading state of requests
  error: null, // To store any errors that might occur during requests
  currentRecord: null, // Object to store details of the currently selected record
  selectedTest: [],
};

// defining reducer with the initial state
const elementaryWistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ELEMENTARY_WIST":
      return {
        ...state,
        list: action.payload,
      };
    // *****
    // this setup below allows to manage both list of all wist records and the details of a specific record in redux state. not sure yet if we need this
    //  *****
    // case "SET_CURRENT_ELEMENTARY_WIST_RECORD":
    //   return {
    //     ...state,
    //     currentRecord: action.payload,
    //   };
    // case "CLEAR_CURRENT_ELEMENTARY_WIST_RECORD":
    //   return {
    //     ...state,
    //     currentRecord: null,
    //   };
    case "ADD_ELEMENTARY_WIST":
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case "UPDATE_ELEMENTARY_WIST":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "DELETE_ELEMENTARY_WIST":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;

    case "SET_ELEMENTARY_WIST_RESULTS":
      return {
        ...state,
        selectedTest: action.payload,
        isLoading: false,
      };
  }
};

export default elementaryWistReducer;
