import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import StudentDetails from "../StudentDetails/StudentDetails";
import AddElementaryWist from "../AddTests/AddElementaryWist";
import AddSecondaryWist from "../AddTests/AddSecondaryWist";
import AddYoungerCtopp from "../AddTests/AddYoungerCtopp";
import AddOlderCtopp from "../AddTests/AddOlderCtopp";
import AddGort from "../AddTests/AddGort";
import AddKtea from "../AddTests/AddKtea";
import ElementaryWistResults from "../TestResults/ElementaryWistResults";
import GortResults from "../TestResults/GortResults";
import SecondaryWistResults from "../TestResults/SecondaryWistResults";
import YoungerCtoppResults from "../TestResults/YoungerCtoppResults";
import OlderCtoppResults from "../TestResults/OlderCtoppResults";
import ManageUsers from "../ManageUsers/ManageUsers";
import CoachList from "../CoachList/CoachList";
import AddCoach from "../AddCoach/AddCoach";
import AssessmentContainer from "../AssessmentComponents/AssessmentContainer";

import "./App.css";
import KteaResults from "../TestResults/KteaResults";
import StudentForm from "../Forms/StudentForm";
import EditElementaryWistResults from "../EditTests/EditElementaryWistResults";
import EditSecondaryWistResults from "../EditTests/EditSecondaryWistResults";
import EditYoungerCtoppResults from "../EditTests/EditYoungerCtoppResults";
import EditOlderCtoppResults from "../EditTests/EditOlderCtoppResults";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, []);

  console.log(
    "%cGreat Job Team!",
    "color: green; font-style: italic; background-color: yellow; padding: 4px; border-radius: 5px; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 0px blue;"
  );

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/students"
          >
            <UserPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addElementaryWist/:id">
            <AddElementaryWist />
          </ProtectedRoute>
          <ProtectedRoute exact path="/ElementaryWistResults/:id">
            <ElementaryWistResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/EditElementaryWistResults/:id">
            <EditElementaryWistResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addSecondaryWist/:id">
            <AddSecondaryWist />
          </ProtectedRoute>
          <ProtectedRoute exact path="/SecondaryWistResults/:id">
            <SecondaryWistResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/EditSecondaryWistResults/:id">
            <EditSecondaryWistResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addGort/:id">
            <AddGort />
          </ProtectedRoute>
          <ProtectedRoute exact path="/GortResults/:id">
            <GortResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addYoungerCtopp/:id">
            <AddYoungerCtopp />
          </ProtectedRoute>
          <ProtectedRoute exact path="/EditYoungerCtoppResults/:id">
            <EditYoungerCtoppResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addOlderCtopp/:id">
            <AddOlderCtopp />
          </ProtectedRoute>
          <ProtectedRoute exact path="/YoungerCtoppResults/:id">
            <YoungerCtoppResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/OlderCtoppResults/:id">
            <OlderCtoppResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/EditOlderCtoppResults/:id">
            <EditOlderCtoppResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/addKtea/:id">
            <AddKtea />
          </ProtectedRoute>
          <ProtectedRoute exact path="/kteaResults/:id">
            <KteaResults />
          </ProtectedRoute>
          <ProtectedRoute exact path="/add-student">
            <StudentForm />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/manageUsers">
            <ManageUsers />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/coaches">
            <CoachList />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/addCoach">
            <AddCoach />
          </ProtectedRoute>
          <ProtectedRoute exact path="/AssessmentResults/:date">
            <AssessmentContainer />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/students/:id"
            component={StudentDetails}
          />

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/students" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Login page
              <LoginPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
