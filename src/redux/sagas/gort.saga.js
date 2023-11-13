import { takeLatest, put, call, take } from "redux-saga/effects";
import axios from "axios";

//saga for fetching data
function* fetchGort(action) {
  console.log("payload in Gort saga:", action.payload);
  try {
    const response = yield call(axios.get, `/api/gort/${action.payload}`);
    yield put({ type: "SET_GORT", payload: response.data });
  } catch (error) {
    console.log("Error fetching GORT data", error);
  }
}

//saga for adding data to GORT
function* addGort(action) {
  try {
    yield call(axios.post, "/api/gort", action.payload);
    yield put({
      type: "FETCH_GORT",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error adding GORT data", error);
  }
}
// saga for updating GORT need student id as well as test id
function* updateGort(action) {
  try {
    yield call(
      axios.put,
      `/api/gort/${action.payload.student_id}/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: "FETCH_GORT",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error updating GORT data", error);
  }
}
// saga for deleting an individual GORT test for a student. needs student id and test id
function* deleteGort(action) {
  try {
    yield call(
      axios.delete,
      `/api/gort/${action.payload.student_id}/${action.payload.id}`
    );
    yield put({
      type: "FETCH_GORT",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error deleting GORT data", error);
  }
}
// watcher saga
function* gortSaga() {
  yield takeLatest("FETCH_GORT", fetchGort);
  yield takeLatest("ADD_GORT", addGort);
  yield takeLatest("UPDATE_GORT", updateGort);
  yield takeLatest("DELETE_GORT", deleteGort);
}

export default gortSaga;