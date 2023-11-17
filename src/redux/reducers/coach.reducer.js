const initialState = {
  list: [], // Array of all coaches
  Details: [], // Array of specific coach details
  currentCoach: null, // Details of the selected coach
  isLoading: false,
  error: null,
  archivedCoaches: [],
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COACHES":
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_CURRENT_COACH":
      return {
        ...state,
        Details: action.payload,
        isLoading: false,
        error: null,
      };
    case "ADD_COACH":
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: null,
      };
    case "UPDATE_COACH":
      return {
        ...state,
        list: state.list.map((coach) =>
          coach.id === action.payload.id ? action.payload : coach
        ),
        isLoading: false,
        error: null,
      };
    case "DELETE_COACH":
      return {
        ...state,
        list: state.list.filter((coach) => coach.id !== action.payload.id),
        isLoading: false,
        error: null,
      };
    case "SET_ARCHIVED_COACHES":
      return {
        ...state,
        archivedCoaches: action.payload,
      };
    default:
      return state;
  }
};

export default coachReducer;
