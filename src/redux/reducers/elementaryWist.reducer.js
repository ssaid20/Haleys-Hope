const elementaryWistReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ELEMENTARY_WIST":
      return action.payload;
    default:
      return state;
  }
};

export default elementaryWistReducer;
