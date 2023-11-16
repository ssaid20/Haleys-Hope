const initialState = {
  currentUser: {}, // The logged-in user
  users: [], // List of all users (for admin purposes)
};
const allUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_USERS":
      console.log("userReducer set users running");
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default allUsersReducer;
