import { takeLatest, put, call, take } from "redux-saga/effects";
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

// watcher saga
function* youngerCtoppSaga() {
  yield takeLatest("FETCH_YOUNGER_CTOPP", fetchYoungerCtopp);
  yield takeLatest("ADD_YOUNGER_CTOPP", addYoungerCtopp);
}

export default youngerCtoppSaga;
