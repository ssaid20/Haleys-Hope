import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import elementaryWistSaga from "./elementaryWist.saga";
import secondaryWistSaga from "./secondaryWist.saga";
import gortSaga from "./gort.saga";
import youngerCtoppSaga from "./youngerCtopp.saga";
import olderCtoppSaga from "./olderCtopp.saga";
import studentSaga from "./student.saga";
import kteaSaga from "./ktea.saga";
import assessmentSaga from "./assessment.saga";
import coachSaga from "./coach.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    elementaryWistSaga(),
    secondaryWistSaga(),
    gortSaga(),
    youngerCtoppSaga(),
    olderCtoppSaga(),
    studentSaga(),
    kteaSaga(),
    assessmentSaga(),

    coachSaga(),
  ]);
}
