import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import AssessmentGort from "./AssessmentGort";
import AssessmentCtoppE from "./AssessmentCtoppE";
import AssessmentCtoppS from "./AssessmentCtoppS";
import AssessmentWistE from "./AssessmentWistE";
import AssessmentWistS from "./AssessmentWistS";
import { Button } from "../ui/button";
// TODO: CHANGE ROUTE FOR GET TO DO EACH TEST SEPARATELY TO
// MAKE SURE IF ONE DOES NOT EXIST, IT WILL STILL WORK
/*  
WILL NEED TO CHANGE THE SAGAS AND REDUCERS AS WELL AS GET REQUESTS
TO GET EACH TEST SEPARATELY (IF THEY EXIST) AND SAVE IN STORE. THAT WAY 
CONDITIONALLY RENDERING EACH OF THESE COMPONENTS WILL BE EASIER AND THE CTOPP AND WIST
TESTS CAN BE DIFFERENTIATED UNLIKE NOW.
*/
const AssessmentContainer = () => {
  useEffect(() => {}, []);
  //TODO FIX THIS HISTORY.PUSH TO GO TO THE STUDENTS DETAIL PAGE
  const history = useHistory();
  const goBack = () => history.goBack();
  return (
    <>
      {/* FIGURE OUT HOW TO GET BACK TO THE STUDENT DETAIL VIEW */}
      <Button
        onClick={goBack}
        variant="outline"
        className=" text-xs px-2 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
      >
        Back to Student
      </Button>
     <div className="assessmentContainer">

      <div className="assessmentCards">
        <AssessmentCtoppE />
    
      </div>{" "}
      <div className="assessmentCards">
        <AssessmentCtoppS />
        </div>{" "}
      <div className="assessmentCards">
        <AssessmentWistE />
      </div>{" "}
      <div className="assessmentCards">
        <AssessmentWistS />
      </div>{" "}
      <div className="assessmentCards">
        <AssessmentGort />
      </div>
      </div>
    </>
  );
};
export default AssessmentContainer;
