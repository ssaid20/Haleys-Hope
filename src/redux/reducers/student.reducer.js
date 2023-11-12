const initialState = {
  list: [], // Array of all students
  currentStudent: null, // Details of the selected student
  isLoading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_CURRENT_STUDENT":
      return {
        ...state,
        currentStudent: action.payload,
        isLoading: false,
        error: null,
      };
    // Handle other action types like FETCH_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT
    // You can set isLoading to true when fetching and handle errors accordingly
    default:
      return state;
  }
};

export default studentReducer;
