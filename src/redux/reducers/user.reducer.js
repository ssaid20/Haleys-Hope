const initialState = {
  currentUser: {}, // The logged-in user
  users: [], // List of all users (for admin purposes)
};
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "UNSET_USER":
      return {};
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
