import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

// Saga for fetching older_ctopp data
function* fetchOlderCtopp(action) {
  try {
    const response = yield call(
      axios.get,
      `/api/older_ctopp/${action.payload}`
    );
    yield put({ type: "SET_OLDER_CTOPP", payload: response.data });
  } catch (error) {
    console.log("Error fetching older_ctopp data", error);
  }
}

// Saga for adding older_ctopp data
function* addOlderCtopp(action) {
  try {
    yield call(axios.post, "/api/older_ctopp", action.payload);
    yield put({
      type: "FETCH_OLDER_CTOPP",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error adding older_ctopp data", error);
  }
}

function* olderCtoppSaga() {
  yield takeLatest("FETCH_OLDER_CTOPP", fetchOlderCtopp);
  yield takeLatest("ADD_OLDER_CTOPP", addOlderCtopp);
}

export default olderCtoppSaga;