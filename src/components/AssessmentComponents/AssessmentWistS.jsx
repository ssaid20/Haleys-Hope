import React, { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";

const AssessmentWistS = () => {
  const { date } = useParams();
  console.log("assessment date", date);
  const assessments = useSelector(
    (store) => store.assessmentReducer.olderAssessment
  );
  const selectedTest = assessments.find(
    (assessment) => assessment.date === date
  );
  console.log("selected test is:", selectedTest, assessments);
  // TODO: DOUBLE CHECK TO MAKE SURE IT IS GETTING FROM THE CORRECT WIST
  return (
    <div style={{ border: "1px solid black" }}>
      <p style={{ color: "brown" }}> WIST Ages 11-18</p>
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
              <td>Word Identification: </td>
              <td>{selectedTest.word_identification_percentile}</td>
              <td>{selectedTest.word_identification_standard_score}</td>
            </tr>
            <tr>
              <td>Spelling: </td>
              <td>{selectedTest.spelling_percentile}</td>
              <td>{selectedTest.spelling_standard_score}</td>
            </tr>
            <tr>
              <td>Fundamental Literacy Ability Index: </td>
              <td>{selectedTest.fundamental_literacy_percentile}</td>
              <td>{selectedTest.fundamental_literacy_standard_score}</td>
            </tr>
            <tr>
              <td>Sound to Symbol Knowledge: </td>
              <td>{selectedTest.sound_symbol_knowledge_percentile}</td>
              <td>{selectedTest.sound_symbol_knowledge_standard_score}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentWistS;
