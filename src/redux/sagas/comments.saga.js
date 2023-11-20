import { call, put, take, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchCommentsSaga(action) {
  try {
    const studentId = action.payload; // Get the student ID from the action payload
    console.log(studentId);
    const response = yield call(axios.get, `/api/comments/${studentId}`);
    yield put({ type: "FETCH_COMMENTS_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("Error in fetchCommentsSaga", error);
    yield put({ type: "FETCH_COMMENTS_FAILURE", payload: error });
  }
}

function* addCommentSaga(action) {
  try {
    const response = yield call(axios.post, "/api/comments", action.payload);
    yield put({ type: "ADD_COMMENT_SUCCESS", payload: response.data });
    yield put({ type: "FETCH_COMMENTS", payload: action.payload.student_id });
  } catch (error) {
    yield put({ type: "ADD_COMMENT_FAILURE", payload: error });
  }
}

function* updateCommentSaga(action) {
  try {
    const { student_id, comment_id, comments, name, date } = action.payload;
    console.log("update saga action.payload", action.payload);

    const response = yield call(
      axios.put,
      `/api/comments/${student_id}/${comment_id}`,
      { comments, name, date }
    );

    yield put({ type: "UPDATE_COMMENT_SUCCESS", payload: response.data });
    yield put({ type: "FETCH_COMMENTS", payload: action.payload.student_id });
  } catch (error) {
    yield put({ type: "UPDATE_COMMENT_FAILURE", payload: error });
  }
}

function* deleteCommentSaga(action) {
  try {
    const commentId = action.payload;
    yield call(axios.delete, `/api/comments/${commentId}`);
    yield put({ type: "DELETE_COMMENT_SUCCESS", payload: commentId });
    yield put({ type: "FETCH_COMMENTS", payload: action.payload.student_id });
  } catch (error) {
    yield put({ type: "DELETE_COMMENT_FAILURE", payload: error });
  }
}

function* commentsSaga() {
  yield takeEvery("FETCH_COMMENTS", fetchCommentsSaga);
  yield takeEvery("ADD_COMMENT", addCommentSaga);
  yield takeEvery("UPDATE_COMMENT", updateCommentSaga);
  yield takeEvery("DELETE_COMMENT", deleteCommentSaga);
}

export default commentsSaga;
