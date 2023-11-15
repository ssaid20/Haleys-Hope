import { takeLatest, put, call, take } from "redux-saga/effects";
import axios from "axios";

//saga for fetching data
function* fetchKtea(action) {
  console.log("payload in KTEA saga:", action.payload);
  try {
    const response = yield call(axios.get, `/api/ktea/${action.payload}`);
    yield put({ type: "SET_KTEA", payload: response.data });
  } catch (error) {
    console.log("Error fetching KTEA data", error);
  }
}
// saga for getting specific KTEA
function* fetchKteaResults(action) {
  console.log("Action.payload in fetch saga FOR SPECIFIC KTEA", action.payload);
  try {
    const response = yield call(
      axios.get,
      `/api/ktea/kteaResults/${action.payload}`
    );
    yield put({ type: "SET_KTEA_RESULTS", payload: response.data });
  } catch (error) {
    console.log("Error fetching KTEA data", error);
  }
}

//saga for adding data to KTEA
function* addKtea(action) {
  console.log("ktea saga post action", action.payload);
  try {
    console.log("ktea saga student id",action.payload.student_id);
    yield call(axios.post, "/api/ktea", action.payload);
    yield put({
      type: "FETCH_KTEA",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error adding KTEA data", error);
  }
}
// saga for updating KTEA need student id as well as test id
function* updateKtea(action) {
  try {
    yield call(
      axios.put,
      `/api/ktea/${action.payload.student_id}/${action.payload.id}`,
      action.payload
    );
    yield put({
      type: "FETCH_KTEA",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error updating KTEA data", error);
  }
  yield put({
    type: "ADD_KTEA_ERROR",
    payload: error,
  });
}
// saga for deleting an individual KTEA test for a student. needs student id and test id
function* deleteKtea(action) {
  try {
    yield call(
      axios.delete,
      `/api/ktea/${action.payload.student_id}/${action.payload.id}`
    );
    yield put({
      type: "FETCH_KTEA",
      payload: action.payload.student_id,
    });
  } catch (error) {
    console.log("Error deleting KTEA data", error);
  }
}
// watcher saga
function* kteaSaga() {
  yield takeLatest("FETCH_KTEA", fetchKtea);
  yield takeLatest("ADD_KTEA", addKtea);
  yield takeLatest("UPDATE_KTEA", updateKtea);
  yield takeLatest("DELETE_KTEA", deleteKtea);
  yield takeLatest("FETCH_KTEA_RESULTS", fetchKteaResults)
}

export default kteaSaga;
