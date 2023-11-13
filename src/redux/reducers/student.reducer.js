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
    case "ADD_STUDENT":
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: null,
      };
    case "UPDATE_STUDENT":
      return {
        ...state,
        list: state.list.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
        isLoading: false,
        error: null,
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        list: state.list.filter((student) => student.id !== action.payload.id),
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default studentReducer;
