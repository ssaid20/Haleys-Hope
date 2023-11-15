const initialState = {
  list: [], // Array to store the list of secondary wist tests
  isLoading: false, // To track the loading state of requests
  error: null, // To store any errors that might occur during requests
  currentRecord: null, // Object to store details of the currently selected record
  selectedTest: [],
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_YOUNG_ASSESSMENT":
      return {
        ...state,
        list: action.payload,
      };
  }
  switch (action.type) {
    case "SET_OLDER_ASSESSMENT":
      return {
        ...state,
        list: action.payload,
      };
  }
};

export default assessmentReducer;
