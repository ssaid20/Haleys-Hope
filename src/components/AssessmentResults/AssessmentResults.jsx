import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";


const AssessmentResults = () => {

    // map through all of the tests and based on date add to a new object. then 
    // pass each test.id to component to render that section of the assessment?
    return (
      <div>
        <p style={{ color: 'brown' }}>Hello Assessments
        </p>

        {/* <AssessmentGort />
        <AssessmentWistE />  TODO: Add components as cards for each test based on date
        <AssessmentWistS />
        <AssessmentCtoppE />
        <AssessmentCtoppS />
         */}


      </div>
    )}




export default AssessmentResults;