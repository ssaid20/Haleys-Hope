import { takeLatest, put, call, take } from "redux-saga/effects";
import axios from "axios";

//saga for fetching data
function* fetchElementaryWist(action) {
  try {
    const response = yield call(
      axios.get,
      `/api/elementary_wist/${action.payload}`
    );
    yield put({ type: "SET_ELEMENTARY_WIST", payload: response.data });
  } catch (error) {
    console.log("Error fetching elementary wist data", error);
  }
}
//saga for fetching a specific test data
function* fetchElementaryWistResult(action) {
  try {
    const response = yield call(
      axios.get,
      `/api/elementary_wist/elementaryWistResults/${action.payload}`
    );

    yield put({ type: "SET_ELEMENTARY_WIST_RESULTS", payload: response.data });
  } catch (error) {
    console.log("Error fetching elementary wist data", error);
  }
}
//saga for adding data to wist
function* addElementaryWist(action) {
  try {
    yield call(axios.post, "/api/elementary_wist", action.payload);
    yield put({
      type: "FETCH_ELEMENTARY_WIST",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error adding elementary wist data", error);
  }
}
// saga for updating wist need student id as well as test id
function* updateElementaryWist(action) {
  try {
    yield call(
      // axios.put,

      // `/api/elementary_wist/${action.payload.student_id}/${action.payload.id}`,
      // action.payload
      axios.put(
        `/api/elementary_wist/${action.payload.student_id}/${action.payload.id}`,
        action.payload
      )
    );
    yield put({
      type: "FETCH_ELEMENTARY_WIST",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error updating elementary wist data", error);
  }
}
// saga for deleting an individual wist test for a student. needs student id and test id
function* deleteElementaryWist(action) {
  try {
    yield call(
      axios.delete,
      `/api/elementary_wist/${action.payload.student_id}/${action.payload.id}`
    );
    yield put({
      type: "FETCH_ELEMENTARY_WIST",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error deleting elementary wist data", error);
  }
}
// watcher saga
function* elementaryWistSaga() {
  yield takeLatest("FETCH_ELEMENTARY_WIST", fetchElementaryWist);
  yield takeLatest("ADD_ELEMENTARY_WIST", addElementaryWist);
  yield takeLatest("UPDATE_ELEMENTARY_WIST", updateElementaryWist);
  yield takeLatest("DELETE_ELEMENTARY_WIST", deleteElementaryWist);
  yield takeLatest("FETCH_ELEMENTARY_WIST_RESULTS", fetchElementaryWistResult);
}

export default elementaryWistSaga;
