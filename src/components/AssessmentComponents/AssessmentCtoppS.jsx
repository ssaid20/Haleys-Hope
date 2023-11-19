import React, { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";

const AssessmentCtoppS = () => {
  const { date } = useParams();
  console.log("assessment date", date);
  const assessments = useSelector(
    (store) => store.assessmentReducer.olderAssessment
  );
  const selectedTest = assessments.find(
    (assessment) => assessment.date === date
  );
  console.log("selected test is:", selectedTest, assessments);
  // TODO: DOUBLE CHECK TO MAKE SURE IT IS GETTING FROM THE CORRECT CTOPP
  return (
    <div style={{ border: "1px solid black" }}>
      <p style={{ color: "brown" }}> CTOPP-2 Ages 7-24</p>
      <div //this div is card for WIST
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
              <td>Phonological Awareness: </td>
              <td>{selectedTest.phonological_awareness_percentile}</td>
              <td>{selectedTest.phonological_awareness_composite}</td>
            </tr>
            <tr>
              <td>Phonological Memory: </td>
              <td>{selectedTest.phonological_memory_percentile}</td>
              <td>{selectedTest.phonological_memory_composite}</td>
            </tr>
            <tr>
              <td>Rapid Symbolic Naming: </td>
              <td>{selectedTest.rapid_symbolic_naming_percentile}</td>
              <td>{selectedTest.rapid_symbolic_naming_composite}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentCtoppS;
