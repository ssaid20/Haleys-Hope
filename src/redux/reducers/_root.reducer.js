import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import elementaryWistReducer from "./elementaryWist.reducer";
import secondaryWistReducer from "./secondaryWist.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  elementaryWistReducer, // Manages the state related to elementary WIST, including a list of all test records, //may add the currently selected record for viewing and editing
  secondaryWistReducer, // Manages the state related to secondary WIST, including a list of all test records //may add the currently selected record for viewing and editing
});

export default rootReducer;
