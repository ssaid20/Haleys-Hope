import { takeLatest, put, call, take } from "redux-saga/effects";
import axios from "axios";

//saga for fetching data
function* fetchYoungerAssessment(action) {
    console.log("in fetchyoungerassessment-------------------------");

  try {
    console.log("in fetchyoungerassessment-------------------------");
    const response = yield call(
      axios.get,
      `/api/assessment/younger/${action.payload}` // student ID
    );
    yield put({ type: "SET_YOUNGER_ASSESSMENT", payload: response.data });
  } catch (error) {
    console.log("Error fetching younger assessment data", error);
  }
}
//saga for fetching a specific test data
function* fetchOlderAssessment(action) {
  console.log("Action.payload in fetch saga for older assessment", action.payload);
  try {
    const response = yield call(
      axios.get,
      `/api/assessment/older/${action.payload}` // student ID
    );

    yield put({ type: "SET_OLDER_ASSESSMENT", payload: response.data });
  } catch (error) {
    console.log("Error fetching older assessment data", error);
  }
}
// watcher saga
function* assessmentSaga() {
  yield takeLatest("FETCH_YOUNGER_ASSESSMENT", fetchYoungerAssessment);
  yield takeLatest("FETCH_OLDER_ASSESSMENT", fetchOlderAssessment);
}

export default assessmentSaga;
