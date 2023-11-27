// Initial state of the Snackbar
const initialState = {
  open: false,
  message: "",
  severity: "info",
};

// Snackbar reducer
const snackbarReducer = (state = initialState, action) => {
  console.log("snackbar reducer running");
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return { ...state, open: true, message: action.payload.message, severity: action.payload.severity };
    case "HIDE_SNACKBAR":
      return { ...state, open: false };
    default:
      return state;
  }
};

export default snackbarReducer;
