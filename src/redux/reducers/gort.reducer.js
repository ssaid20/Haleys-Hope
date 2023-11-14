const initialState = {
  list: [], // Array to store the list of GORT tests
  isLoading: false, // To track the loading state of requests
  error: null, // To store any errors that might occur during requests
  currentRecord: null, // Object to store details of the currently selected record
  selectedTest: [],

};

// defining reducer with the initial state
const gortReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GORT":
      return {
        ...state,
        list: action.payload,
      };

    case "ADD_GORT":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "UPDATE_GORT":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    // I don't think we will need delete
    //   case "DELETE_GORT":
    //     return {
    //       ...state,
    //       list: state.list.filter((item) => item.id !== action.payload.id),
    //     };
    default:
      return state;
  }
};

export default gortReducer;
