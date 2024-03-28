//TODO: look into actions

import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchCronJobSaga() {
  try {
    const cronJob = yield axios.get("/api/cron");
    console.log("getting cronJob", cronJob.data);
    yield put({ type: "SET_CRON_JOBS", payload: cronJob.data });
  } catch (error) {
    console.log("error in fetchCronJobSaga", error);
  }
}

function* addCronJob(action) {
  try {
    yield call(axios.post, "/api/cron", action.payload);
    yield put({
      type: "FETCH_CRON_JOBS",
    });
  } catch (error) {
    console.log("Error adding cronJob", error);
  }
}

function* updateCronJob(action) {
  try {
    yield call(axios.put, `/api/cron/update`, action.payload);
    yield put({
      type: "FETCH_CRON_JOBS",
    });
  } catch (error) {
    console.log("Error updating cronJob data", error);
  }
}

export default function* cronJobSagas() {
  yield takeEvery("FETCH_CRON_JOBS", fetchCronJobSaga);
  yield takeEvery("UPDATE_CRON_JOB", updateCronJob);
  yield takeEvery("ADD_CRON_JOB", addCronJob);
}
