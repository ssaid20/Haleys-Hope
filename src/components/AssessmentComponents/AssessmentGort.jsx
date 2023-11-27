import React, { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";

const AssessmentGort = () => {
  const { date } = useParams();
  console.log("assessment date", date);
  const assessments = useSelector(
    (store) => store.gortReducer.list
  );
  const selectedTest = assessments.find(
    (assessment) => assessment.date === date
  );
  console.log("selected test is:", selectedTest, assessments);
if (!selectedTest) {
  return <></>
  // <div>No GORT for this date</div>

}


  if (!assessments) {
    return <div>No Gort for this date</div>;
  } else {
    return (
      <div style={{ border: "1px solid black" }}>
        <p style={{ color: "brown" }}> GORT-5</p>
        <div className="assessmentCard" //this div is card for GORT 
        >
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Percentile</th>
                <th>Scaled Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reading Rate: </td>
                <td>{selectedTest.rate_percentile_rank}</td>
                <td>{selectedTest.rate_scaled_score}</td>
              </tr>
              <tr>
                <td>Reading Accuracy: </td>
                <td>{selectedTest.accuracy_percentile_rank}</td>
                <td>{selectedTest.accuracy_scaled_score}</td>
              </tr>
              <tr>
                <td>Reading Fluency: </td>
                <td>{selectedTest.fluency_percentile_rank}</td>
                <td>{selectedTest.fluency_scaled_score}</td>
              </tr>
              <tr>
                <td>Reading Comprehension: </td>
                <td>{selectedTest.comprehension_percentile_rank}</td>
                <td>{selectedTest.comprehension_scaled_score}</td>
              </tr>
              <tr>
                <td>Oral Reading Index : </td>
                <td>{selectedTest.oral_reading_percentile_rank}</td>
                <td>{selectedTest.oral_reading_index}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default AssessmentGort;
