import axios from "axios";
import { put, call, take, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

// Saga to fetch all users
function* fetchAllUsers() {
  try {
    const response = yield call(axios.get, "/api/user/allUsers");
    yield put({ type: "SET_ALL_USERS", payload: response.data });
  } catch (error) {
    console.log("Error fetching all users in saga", error);
  }
}

// Saga to fetch all users
function* fetchArchivedUsers() {
  try {
    const response = yield call(axios.get, "/api/user/archivedUsers");
    yield put({ type: "SET_ARCHIVED_USERS", payload: response.data });
  } catch (error) {
    console.log("Error fetching archived users", error);
  }
}

function* updateUser(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // Send a PUT request to update the user's information
    const response = yield axios.put(
      `/api/user/${action.payload.id}`,
      action.payload,
      config
    );
    yield put({ type: "FETCH_ALL_USERS", payload: response.data });
  } catch (error) {
    console.log("User update request failed", error);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeLatest("FETCH_ALL_USERS", fetchAllUsers);
  yield takeLatest("UPDATE_USER", updateUser);
  yield takeLatest("FETCH_ARCHIVED_USERS", fetchArchivedUsers);
}

export default userSaga;
