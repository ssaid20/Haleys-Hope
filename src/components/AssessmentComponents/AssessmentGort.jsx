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
        <p style={{ textAlign: "center" }}> GORT-5</p>
        <div className="assessmentCard" //this div is card for GORT 
        >
          <table>
            <thead>
              <tr>
                <th style={{width: "271.69px"}}></th>
                <th style={{width: "50px" }}>%ile</th>
                <th>SS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{textAlign: "left", fontWeight: "bold" }}>Reading Rate: </td>
                <td style={{fontWeight: "bold"}}>{selectedTest.rate_percentile_rank}</td>
                <td style={{fontWeight: "bold"}}>{selectedTest.rate_scaled_score}</td>
              </tr>
              <tr>
                <td style={{textAlign: "left", fontWeight: "bold" }}>Reading Accuracy: </td>
                <td style={{fontWeight: "bold"}}>{selectedTest.accuracy_percentile_rank}</td>
                <td style={{fontWeight: "bold"}}>{selectedTest.accuracy_scaled_score}</td>
              </tr>
              <tr>
                <td style={{textAlign: "left", fontWeight: "bold" }}>Reading Fluency: </td>
                <td style={{fontWeight: "bold"}}>{selectedTest.fluency_percentile_rank}</td>
                <td style={{fontWeight: "bold"}}>{selectedTest.fluency_scaled_score}</td>
              </tr>
              <tr>
                <td style={{textAlign: "left", fontWeight: "bold" }}>Reading Comprehension: </td>
                <td style={{fontWeight: "bold"}}>{selectedTest.comprehension_percentile_rank}</td>
                <td style={{fontWeight: "bold"}}>{selectedTest.comprehension_scaled_score}</td>
              </tr>
              <tr>
                <td style={{textAlign: "left", fontWeight: "bold" }}>Oral Reading Index : </td>
                <td style={{fontWeight: "bold"}}>{selectedTest.oral_reading_percentile_rank}</td>
                <td style={{fontWeight: "bold"}}>{selectedTest.oral_reading_index}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default AssessmentGort;
