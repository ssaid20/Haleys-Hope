import React, { useEffect, useState, useHistory} from "react";
import { useSelector, useDispatch  } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";


const AssessmentResults = () => {
    const store = useSelector((store) => store);
    console.log("assessment STORE",store);

    const studentId = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("theStudentId ISSSS", studentId.id);
    dispatch({ type: "FETCH_YOUNGER_ASSESSMENT", payload: studentId.id });
    dispatch({ type: "FETCH_OLDER_ASSESSMENT", payload: studentId.id });

  }, []);

//   const moreDetails = (testId) => {
// history.push(`/AssessmentResults/${testId}`);
// };
  // map through all of the tests and based on date add to a new object. then 
  // pass each test.id to component to render that section of the assessment?
    return (
      <div>
        <p style={{ color: 'brown' }}>Hello Assessments
        </p>

    <div>
      {/* {.map((test) => (
        <div key={test.id} onClick={() => moreDetails(test.id)}>
          <p>Wist Age 7-11 Date: {formatDate(test.date)} (click for details)</p>
        </div>
      ))} */}
    </div>
  {/* ); */}
{/* }; */}

        {/* <AssessmentGort />
        <AssessmentWistE />  TODO: Add components as cards for each test based on date
        <AssessmentWistS />
        <AssessmentCtoppE />
        <AssessmentCtoppS />
        <AssessmentGort />

        TODO: ADD NEW COMPONENTS FOR TESTS AND THEY WILL HAVE ACCESS TO ALL OF THE TEST INFO
         */}



      </div>
    )}




export default AssessmentResults;