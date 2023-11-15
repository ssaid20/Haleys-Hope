const initialState = {
  list: [], // Array to store the list of older ctopp records
  isLoading: false, // To track the loading state of requests
  error: null, // To store any errors that might occur during requests
  currentRecord: null, // Object to store details of the currently selected older ctopp record
  selectedTest: [],
};

// defining the olderCtoppReducer with the initial state
const olderCtoppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OLDER_CTOPP":
      return {
        ...state,
        list: action.payload,
      };
    case "ADD_OLDER_CTOPP":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "UPDATE_OLDER_CTOPP":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "DELETE_OLDER_CTOPP":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;

    case "SET_OLDER_CTOPP_RESULTS":
      return {
        ...state,
        selectedTest: action.payload,
        isLoading: false,
      };
  }
};

export default olderCtoppReducer;
