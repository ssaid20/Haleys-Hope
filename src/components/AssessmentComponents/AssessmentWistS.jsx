import React, { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";
import { Paper } from "@mui/material";

const AssessmentWistS = () => {
  const { date } = useParams();
  console.log("assessment date", date);
  const assessments = useSelector(
    (store) => store.secondaryWistReducer.list
  );
  const selectedTest = assessments.find(
    (assessment) => assessment.date === date
  );
  console.log("selected test is:", selectedTest, assessments);
  if (!selectedTest) {
    return <></>
    //  <div>No WIST 11-18 for this date</div>;
  }
  return (
    <Paper style={{boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"}}>
      <p style={{ textAlign: "center", textDecoration:"underline", fontWeight: "bold" }}> WIST Ages 11-18</p>
      <div  className="assessmentCard"//this div is card for WIST
      >
        <table>
          <thead>
            <tr>
              <th></th>
              <th style={{width: "50px"}}>%ile</th>
              <th>SS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign: "left", fontWeight: "bold"}}>Word Identification: </td>
              <td style={{fontWeight: "bold"}}>{selectedTest.word_identification_percentile}</td>
              <td style={{fontWeight: "bold"}}>{selectedTest.word_identification_standard_score}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Read Regular Words: </td>
              <td>-</td>
              <td>{selectedTest.read_regular_words}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Read Irregular Words: </td>
              <td>-</td>
              <td>{selectedTest.read_irregular_words}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left", fontWeight: "bold"}}>Spelling: </td>
              <td style={{fontWeight: "bold"}}>{selectedTest.spelling_percentile}</td>
              <td style={{fontWeight: "bold"}}>{selectedTest.spelling_standard_score}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Regular:</td>
              <td>-</td>
              <td>{selectedTest.spell_regular_words}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Irregular:</td>
              <td>-</td>
              <td>{selectedTest.spell_irregular_words}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left", fontWeight: "bold"}}>Fundamental Literacy Ability Index: </td>
              <td style={{fontWeight: "bold"}}>{selectedTest.fundamental_literacy_percentile}</td>
              <td style={{fontWeight: "bold"}}>{selectedTest.fundamental_literacy_standard_score}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Word Identification: </td>
              <td>-</td>
              <td>{selectedTest.word_identification}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Spelling: </td>
              <td>-</td>
              <td>{selectedTest.spelling}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left", fontWeight: "bold"}}>Sound to Symbol Knowledge: </td>
              <td style={{fontWeight: "bold"}}>{selectedTest.sound_symbol_knowledge_percentile}</td>
              <td style={{fontWeight: "bold"}}>{selectedTest.sound_symbol_knowledge_standard_score}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Pseudo Words: </td>
              <td>-</td>
              <td>{selectedTest.pseudo_words}</td>
            </tr>
            <tr>
              <td style={{textAlign: "left"}}>Letter Sounds: </td>
              <td>-</td>
              <td>{selectedTest.letter_sounds}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default AssessmentWistS;
