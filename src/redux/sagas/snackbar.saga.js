import { takeLatest, put, delay } from "redux-saga/effects";

// Watcher Saga: watches for actions dispatched to the store and starts worker saga
export function* snackbarSaga() {
  console.log("snackbar saga running");
  yield takeLatest("SHOW_SNACKBAR", showSnackbarSaga);
  yield takeLatest("HIDE_SNACKBAR", hideSnackbarSaga);
}

// Helper function to determine delay based on message length
function getDelayDuration(message) {
  return Math.max(3000, message.length * 100); // Minimum 3 seconds, plus more for longer messages
}

// Worker Saga: Show Snackbar
function* showSnackbarSaga(action) {
  // Calculate delay based on message length or severity
  const delayDuration = getDelayDuration(action.payload.message);

  // Wait for the specified duration
  yield delay(delayDuration);

  // Hide the Snackbar
  yield put({ type: "HIDE_SNACKBAR" });
}

// Worker Saga: will be fired on HIDE_SNACKBAR actions
function* hideSnackbarSaga(action) {
  // Logic for hiding Snackbar
}
