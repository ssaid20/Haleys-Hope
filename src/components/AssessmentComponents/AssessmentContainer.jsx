import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import AssessmentGort from "./AssessmentGort";
import AssessmentCtoppE from "./AssessmentCtoppE";
import AssessmentCtoppS from "./AssessmentCtoppS";
import AssessmentWistE from "./AssessmentWistE";
import AssessmentWistS from "./AssessmentWistS";
// TODO: CHANGE ROUTE FOR GET TO DO EACH TEST SEPARATELY TO
// MAKE SURE IF ONE DOES NOT EXIST, IT WILL STILL WORK
/*  
WILL NEED TO CHANGE THE SAGAS AND REDUCERS AS WELL AS GET REQUESTS
TO GET EACH TEST SEPARATELY (IF THEY EXIST) AND SAVE IN STORE. THAT WAY 
CONDITIONALLY RENDERING EACH OF THESE COMPONENTS WILL BE EASIER AND THE CTOPP AND WIST
TESTS CAN BE DIFFERENTIATED UNLIKE NOW.
*/
const AssessmentContainer = () => {
    useEffect(() => {
      }, []);
      //TODO FIX THIS HISTORY.PUSH TO GO TO THE STUDENTS DETAIL PAGE
    const history = useHistory();
    const goBack = () => history.goBack();
  return (
    <div>
        {/* FIGURE OUT HOW TO GET BACK TO THE STUDENT DETAIL VIEW */}
                <button onClick={goBack}>Back to Student</button>  

      <AssessmentGort />
      <AssessmentWistE />
      <AssessmentWistS />
      <AssessmentCtoppE />
      <AssessmentCtoppS />
    </div>
  );
};
export default AssessmentContainer;
