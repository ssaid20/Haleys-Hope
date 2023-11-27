const initialState = {
  list: [], // Array of all students
  Details: [], // Array of specific student details
  currentStudent: null, // Details of the selected student
  isLoading: false,
  error: null,
  archivedList: [], //list of all archived students
  picture: [],
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
        Details: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_ARCHIVED_STUDENTS":
      return {
        ...state,
        archivedList: action.payload,
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
    case "ADD_PICTURE":
      return {
        ...state,
        picture: [...state.picture, action.payload],
        isLoading: false,
        error: null,
      };
    case "DELETE_PICTURE":
      return {
        ...state,
        picture: state.picture.filter((pic) => pic.id !== action.payload.id),
        isLoading: false,
        error: null,
      };
    case "SET_STUDENT_PICTURES":
      return {
        ...state,
        picture: action.payload, // action.payload should be an array of picture data
        isLoading: false,
        error: null,
      };
      case "UPLOAD_STUDENT_PICTURE":
        const updatedList = state.list.map((student) => {
          if (student.id === action.payload.id.id) { // Ensure you're comparing the correct IDs
            return { ...student, picture: action.payload.url };
          }
          return student;
        });
      
        let updatedDetails = state.Details;
        if (state.Details.id === action.payload.id.id) {
          updatedDetails = { ...state.Details, picture: action.payload.url };
        }
      
        return {
          ...state,
          list: updatedList,
          Details: updatedDetails,
          isLoading: false,
          error: null,
        };
    default:
      return state;
  }
};

export default studentReducer;
