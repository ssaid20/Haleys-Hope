import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

function* fetchYoungerCtopp(action) {
  try {
    const response = yield call(
      axios.get,
      `/api/younger_ctopp/${action.payload}`
    );
    yield put({ type: "SET_YOUNGER_CTOPP", payload: response.data });
  } catch (error) {
    console.log("Error fetching younger_ctopp data", error);
  }
}
// Saga for adding younger_ctopp data
function* addYoungerCtopp(action) {
  try {
    yield call(axios.post, "/api/younger_ctopp", action.payload);
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
      `/api/younger_ctopp/${action.payload.student_id}/${action.payload.id}`,
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
      `/api/younger_ctopp/${action.payload.student_id}/${action.payload.id}`
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
}

export default youngerCtoppSaga;
