const initialState = {
  comments: [],
  loading: false,
  error: null,
};

function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_COMMENTS":
      return { ...state, loading: true };
    case "FETCH_COMMENTS_SUCCESS":
      return { ...state, loading: false, comments: action.payload };
    case "FETCH_COMMENTS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "ADD_COMMENT":
      console.log("add comment comments reducer");
      return { ...state, loading: true };
    case "ADD_COMMENT_SUCCESS":
      console.log("action.payload in commentsReducer", action.payload);
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload],
      };
    case "ADD_COMMENT_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_COMMENT":
      return { ...state, loading: true };
    case "UPDATE_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case "UPDATE_COMMENT_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_COMMENT":
      return { ...state, loading: true };
    case "DELETE_COMMENT_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    case "DELETE_COMMENT_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default commentsReducer;
