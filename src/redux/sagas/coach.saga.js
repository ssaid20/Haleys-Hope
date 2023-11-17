import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

// Saga to fetch all coaches
function* fetchCoaches() {
  try {
    const response = yield call(axios.get, "/api/coaches");

    yield put({ type: "SET_COACHES", payload: response.data });
  } catch (error) {
    console.log("Error fetching coaches", error);
  }
}
// Saga to fetch archived coaches
function* fetchArchivedCoaches() {
  try {
    console.log("fetchArchived Coaches saga running");
    const response = yield call(axios.get, "/api/coaches/archivedCoaches");
    yield put({ type: "SET_ARCHIVED_COACHES", payload: response.data });
    // yield put({ type: "FETCH_ARCHIVED_COACHES", payload: response.data });

    console.log("res.data after set archived coaches", response.data);
  } catch (error) {
    console.log("Error fetching archived coaches", error);
  }
}
// Saga to fetch a specific coach
function* fetchCoach(action) {
  try {
    const response = yield call(axios.get, `/api/coaches/${action.payload.id}`);
    yield put({ type: "SET_CURRENT_COACH", payload: response.data });
  } catch (error) {
    console.log("Error fetching specific coach", error);
  }
}

// Saga to add a new coach
function* addCoach(action) {
  try {
    yield call(axios.post, "/api/coaches", action.payload);
    yield put({ type: "FETCH_COACHES" });
  } catch (error) {
    console.log("Error adding coach", error);
  }
}

// Saga to update a coach's information
function* updateCoach(action) {
  console.log("Update coach payload:", action.payload);
  try {
    yield call(axios.put, `/api/coaches/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_COACHES" });
    yield put({ type: "FETCH_COACH", payload: { id: action.payload.id } });
  } catch (error) {
    console.log("Error updating coach", error);
  }
}

// Saga to soft delete (archive) a coach
function* deleteCoach(action) {
  try {
    yield call(axios.delete, `/api/coaches/${action.payload}`);
    yield put({ type: "FETCH_COACHES" });
  } catch (error) {
    console.log("Error deleting coach", error);
  }
}

function* coachSaga() {
  yield takeLatest("FETCH_COACHES", fetchCoaches);
  yield takeLatest("FETCH_COACH", fetchCoach);
  yield takeLatest("ADD_COACH", addCoach);
  yield takeLatest("UPDATE_COACH", updateCoach);
  yield takeLatest("DELETE_COACH", deleteCoach);
  yield takeLatest("FETCH_ARCHIVED_COACHES", fetchArchivedCoaches);
}

export default coachSaga;
