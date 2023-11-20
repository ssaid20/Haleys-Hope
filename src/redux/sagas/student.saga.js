import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

// Saga to fetch all students
function* fetchStudents() {
  try {
    const response = yield call(axios.get, "/api/students");
    yield put({ type: "SET_STUDENTS", payload: response.data });
  } catch (error) {
    console.log("Error fetching students", error);
  }
}

// Saga to fetch archived students
function* fetchArchivedStudents() {
  try {
    const response = yield call(axios.get, "/api/students/archived-students");
    yield put({ type: "SET_ARCHIVED_STUDENTS", payload: response.data });
  } catch (error) {
    console.log("Error fetching students", error);
  }
}

// Saga to fetch a specific student
function* fetchStudent(action) {
  try {
    const response = yield call(
      axios.get,
      `/api/students/${action.payload.id}`
    );
    yield put({ type: "SET_CURRENT_STUDENT", payload: response.data });
  } catch (error) {
    console.log("Error fetching specific student", error);
  }
}

// Saga to add a new student
function* addStudent(action) {
  try {
    yield call(axios.post, "/api/students", action.payload);
    yield put({ type: "FETCH_STUDENTS" });
  } catch (error) {
    console.log("Error adding student", error);
  }
}

// Saga to update a student's information
function* updateStudent(action) {
  console.log("Update student payload:", action.payload);
  try {
    yield call(axios.put, `/api/students/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_STUDENTS" });
    yield put({ type: "FETCH_STUDENT", payload: { id: action.payload.id } });
  } catch (error) {
    console.log("Error updating student", error);
  }
}

// Saga to update an archived student's information
function* updateArchivedStudent(action) {
  console.log("Update archived student payload:", action.payload);
  try {
    yield call(
      axios.put,
      `/api/students/archived-students/${action.payload.id}`,
      action.payload
    );
    yield put({ type: "FETCH_ARCHIVED_STUDENTS" });
    yield put({ type: "FETCH_STUDENT", payload: { id: action.payload.id } });
  } catch (error) {
    console.log("Error updating student", error);
  }
}

// Saga to soft delete (archive) a student
function* deleteStudent(action) {
  try {
    yield call(axios.delete, `/api/students/${action.payload}`);
    yield put({ type: "FETCH_STUDENTS" });
  } catch (error) {
    console.log("Error deleting student", error);
  }
}

function* studentSaga() {
  yield takeLatest("FETCH_STUDENTS", fetchStudents);
  yield takeLatest("FETCH_STUDENT", fetchStudent);
  yield takeLatest("FETCH_ARCHIVED_STUDENTS", fetchArchivedStudents);
  yield takeLatest("ADD_STUDENT", addStudent);
  yield takeLatest("UPDATE_STUDENT", updateStudent);
  yield takeLatest("UPDATE_ARCHIVED_STUDENT", updateArchivedStudent);
  yield takeLatest("DELETE_STUDENT", deleteStudent);
}

export default studentSaga;
