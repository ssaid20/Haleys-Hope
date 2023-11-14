import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

// Saga for fetching older_ctopp data
function* fetchOlderCtopp(action) {
  try {
    const response = yield call(axios.get, `/api/old_ctopp/${action.payload}`);
    yield put({ type: "SET_OLDER_CTOPP", payload: response.data });
  } catch (error) {
    console.log("Error fetching older_ctopp data", error);
  }
}

// Saga for adding older_ctopp data
function* addOlderCtopp(action) {
  try {
    yield call(axios.post, "/api/old_ctopp", action.payload);
    yield put({
      type: "FETCH_OLDER_CTOPP",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error adding older_ctopp data", error);
  }
}

// saga for updating older ctopp need student id as well as test id
function* updateOlderCtopp(action) {
  try {
    yield call(
      axios.put,
      `/api/old_ctopp/${action.payload.student_id}/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: "FETCH_OLDER_CTOPP",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error updating older ctopp data", error);
  }
}

// saga for deleting an individual ctopp test for a student. needs student id and test id
function* deleteOlderCtopp(action) {
  try {
    yield call(
      axios.delete,
      `/api/old_ctopp/${action.payload.student_id}/${action.payload.id}`
    );
    yield put({
      type: "FETCH_OLDER_CTOPP",
      payload: action.payload.student_id,
    });
  } catch (error) {
    "Error deleting older ctopp data", error;
  }
}

function* olderCtoppSaga() {
  yield takeLatest("FETCH_OLDER_CTOPP", fetchOlderCtopp);
  yield takeLatest("ADD_OLDER_CTOPP", addOlderCtopp);
  yield takeLatest("UPDATE_OLDER_CTOPP", updateOlderCtopp);
  yield takeLatest("DELETE_OLDER_CTOPP", deleteOlderCtopp);
}

export default olderCtoppSaga;
