import React, { useEffect, useState, useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";
import { Paper } from "@mui/material";

const AssessmentCtoppE = () => {
  const { date } = useParams();
  console.log("assessment date", date);
  const assessments = useSelector((store) => store.youngerCtoppReducer.list);
  const selectedTest = assessments.find((assessment) => assessment.date === date);
  console.log("selected test is:", selectedTest, assessments);
  if (!selectedTest) {
    return <></>;
  } else {
    return (
      <Paper style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        <p style={{ textAlign: "center", textDecoration: "underline", fontWeight: "bold" }}>
          {" "}
          CTOPP-2 Ages 4-6
        </p>
        <div
          className="assessmentCard" //this div is card for CTOPP
        >
          <table>
            <thead>
              <tr>
                <th style={{ width: "271.69px" }}></th>
                <th style={{ width: "50px" }}>%ile</th>
                <th>SS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "left", fontWeight: "bold" }}>Phonological Awareness: </td>
                <td style={{ fontWeight: "bold" }}>{selectedTest.phonological_awareness_percentile}</td>
                <td style={{ fontWeight: "bold" }}>{selectedTest.phonological_awareness_composite}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Elison</td>
                <td>-</td>
                <td>{selectedTest.elison_scaled_score}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Blending</td>
                <td>-</td>
                <td>{selectedTest.blending_words_scaled_score}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Phoneme Isolation</td>
                <td>-</td>
                <td>{selectedTest.phoneme_isolation_scaled_score}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", fontWeight: "bold" }}>Phonological Memory: </td>
                <td style={{ fontWeight: "bold" }}>{selectedTest.phonological_memory_percentile}</td>
                <td style={{ fontWeight: "bold" }}>{selectedTest.phonological_memory_composite}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Memory for Digits</td>
                <td>-</td>
                <td>{selectedTest.memory_for_digits_scaled_score}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Non-Word Repetition</td>
                <td>-</td>
                <td>{selectedTest.nonword_repetition_scaled_score}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", fontWeight: "bold" }}>Rapid Symbolic Naming: </td>
                <td style={{ fontWeight: "bold" }}>{selectedTest.rapid_symbolic_naming_percentile}</td>
                <td style={{ fontWeight: "bold" }}>{selectedTest.rapid_symbolic_naming_composite}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Rapid Digit</td>
                <td>-</td>
                <td>{selectedTest.rapid_digit_naming_scaled_score}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Rapid Letter</td>
                <td>-</td>
                <td>{selectedTest.rapid_letter_naming_scaled_score}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Paper>
    );
  }
};
export default AssessmentCtoppE;
