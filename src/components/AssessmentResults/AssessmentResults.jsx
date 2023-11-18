import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";

const AssessmentResults = () => {
  const olderAssessment = useSelector(
    (store) => store.assessmentReducer.olderAssessment
  );
  const youngerAssessment = useSelector(
    (store) => store.assessmentReducer.youngerAssessment
  );
  const history = useHistory();

  console.log("younger assessment ", youngerAssessment);
  console.log("older assessment ", olderAssessment);

  const studentId = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("theStudentId ISSSS", studentId.id);
  }, []);

  const moreDetails = (test) => {
    history.push(`/AssessmentResults/${test.date}`);
  };
  // map through all of the tests and based on date add to a new object. then
  // pass each test.id to component to render that section of the assessment?
  return (
    <div>
      <p style={{ color: "brown" }}>Hello Assessments</p>

      <div>
        {olderAssessment.map((test) => (
          <div key={test.date} onClick={() => moreDetails(test)}>
            <p>Assessment Date: {formatDate(test.date)} (click for details)</p>
          </div>
        ))}
      </div>
      <div>
        {youngerAssessment.map((test) => (
          <div key={test.date} onClick={() => moreDetails(test)}>
            <p>Assessment: {formatDate(test.date)} (click for details)</p>
          </div>
        ))}
      </div>

      {/* <AssessmentGort />
        <AssessmentWistE />  TODO: Add components as cards for each test based on date
        <AssessmentWistS />
        <AssessmentCtoppE />
        <AssessmentCtoppS />
        <AssessmentGort />

        TODO: ADD NEW COMPONENTS FOR TESTS AND THEY WILL HAVE ACCESS TO ALL OF THE TEST INFO
         */}
    </div>
  );
};

export default AssessmentResults;
