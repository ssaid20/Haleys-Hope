import { takeLatest, put, call, take } from "redux-saga/effects";
import axios from "axios";
import { SpatialTrackingTwoTone } from "@mui/icons-material";

function* fetchYoungerCtopp(action) {
  try {
    const response = yield call(
      axios.get,
      `/api/young_ctopp/${action.payload}`
    );
    yield put({ type: "SET_YOUNGER_CTOPP", payload: response.data });
  } catch (error) {
    console.log("Error fetching younger_ctopp data", error);
  }
}

//saga for fetching a specific test data
function* fetchYoungerCtoppResult(action) {
  console.log("Action.payload in fetch saga", action.payload);
  try {
    const response = yield call(
      axios.get,
      `/api/young_ctopp/youngerCtoppResults/${action.payload}`
    );
    console.log(
      "fetch younger ctopp result saga action.payload",
      action.payload
    );
    yield put({ type: "SET_YOUNGER_CTOPP_RESULTS", payload: response.data });
  } catch (error) {
    console.log("Error fetching younger ctopp data", error);
  }
}

// Saga for adding younger_ctopp data
function* addYoungerCtopp(action) {
  try {
    yield call(axios.post, "/api/young_ctopp", action.payload);
    console.log(
      "POST request to /api/younger_ctopp successful",
      action.payload
    );
    yield put({
      type: "FETCH_YOUNGER_CTOPP",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error adding younger_ctopp data", error);
  }
}
// saga for updating younger ctopp need student id as well as test id
function* updateYoungerCtopp(action) {
  try {
    yield call(
      axios.put,
      `/api/young_ctopp/${action.payload.student_id}/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: "FETCH_YOUNGER_CTOPP",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error updating younger ctopp data", error);
  }
}

// saga for deleting an individual ctopp test for a student. needs student id and test id
function* deleteYoungerCtopp(action) {
  try {
    yield call(
      axios.delete,
      `/api/young_ctopp/${action.payload.student_id}/${action.payload.id}`
    );
    yield put({
      type: "FETCH_YOUNGER_CTOPP",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error deleting younger ctopp data", error);
  }
}

// watcher saga
function* youngerCtoppSaga() {
  yield takeLatest("FETCH_YOUNGER_CTOPP", fetchYoungerCtopp);
  yield takeLatest("ADD_YOUNGER_CTOPP", addYoungerCtopp);
  yield takeLatest("UPDATE_YOUNGER_CTOPP", updateYoungerCtopp);
  yield takeLatest("DELETE_YOUNGER_CTOPP", deleteYoungerCtopp);
  yield takeLatest("FETCH_YOUNGER_CTOPP_RESULTS", fetchYoungerCtoppResult);
}

export default youngerCtoppSaga;
