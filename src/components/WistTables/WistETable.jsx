import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

const tableStyle = {
  border: "1px solid black",
  borderCollapse: "collapse", // Collapse borders to avoid double borders
};
const cellStyle = {
  border: "1px solid black",
  padding: "22px",
  textAlign: "center",
};
const cellStyle1 = {
  border: "1px solid black",
  padding: "22px",
  textAlign: "center",
  backgroundColor: "#EFB11A",
};
const cellStyle2 = {
  border: "1px solid black",
  padding: "22px",
  textAlign: "center",
  backgroundColor: "#E47026",
};

const WistETable = ({ test }) => {
  const dispatch = useDispatch();
  console.log("west e table test:", test);
  let studentId = { id: test.student_id };
  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT", payload: studentId });
  });
  const student = useSelector((store) => store.studentReducer.Details.grade);
  console.log("******* student", student);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Raw Score Intervals for Grade Levels
      </Typography>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Item Sets</th>
            <th style={cellStyle}>Raw Score</th>

            <th colSpan="2" style={cellStyle}>
              Level of Functioning <br />{" "}
              <span
                style={{
                  display: "flex",
                  justifyContent: "spaceBetween",
                  paddingTop: "10px",
                  gap: "44px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "spaceBetween",
                  }}
                >
                  {" "}
                  Below{" "}
                </span>
                <span
                  style={{
                    display: "flex",
                  }}
                >
                  {" "}
                  At/Above
                </span>
              </span>
            </th>

            {/* &lt; is for the < character &gt; is for > character */}
            <th style={cellStyle}>&lt;2</th>
            <th style={cellStyle}>2</th>
            <th style={cellStyle}>3</th>
            <th style={cellStyle}>4</th>
            <th style={cellStyle}>5</th>
            <th style={cellStyle}>6</th>
            <th style={cellStyle}>&gt;6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <tr>
              <td>test</td>
              <td>test</td>
            </tr> */}

            <td style={cellStyle}>Read Regular Words</td>
            <td style={cellStyle}>{test.read_regular_words} </td>
            <td style={cellStyle}>below</td>
            <td style={cellStyle}>at/above</td>
            <td style={test.read_regular_words < 64 ? cellStyle1 : cellStyle}>
              &lt;64
            </td>
            <td
              style={
                test.read_regular_words >= 64 && test.read_regular_words <= 73
                  ? cellStyle1
                  : cellStyle
              }
            >
              64-73
            </td>
            <td
              style={
                test.read_regular_words >= 74 && test.read_regular_words <= 82
                  ? cellStyle1
                  : cellStyle
              }
            >
              74-82
            </td>
            <td
              style={
                test.read_regular_words >= 83 && test.read_regular_words <= 91
                  ? cellStyle1
                  : cellStyle
              }
            >
              83-91
            </td>
            <td
              style={
                test.read_regular_words >= 92 && test.read_regular_words <= 97
                  ? cellStyle1
                  : cellStyle
              }
            >
              92-97
            </td>
            <td
              style={
                test.read_regular_words >= 98 && test.read_regular_words <= 99
                  ? cellStyle1
                  : cellStyle
              }
            >
              98-99
            </td>
            <td style={test.read_regular_words > 99 ? cellStyle1 : cellStyle}>
              &gt;99
            </td>
          </tr>
          <tr>
            <td>Read Irregular Words</td>
            <td style={cellStyle}>{test.read_irregular_words}</td>
            <td style={cellStyle}> below</td>
            <td style={cellStyle}>at above</td>
            <td style={test.read_irregular_words < 22 ? cellStyle1 : cellStyle}>
              &lt;22
            </td>
            <td
              style={test.read_irregular_words === 22 ? cellStyle1 : cellStyle}
            >
              22
            </td>
            <td
              style={test.read_irregular_words === 23 ? cellStyle1 : cellStyle}
            >
              23
            </td>
            <td
              style={test.read_irregular_words === 24 ? cellStyle1 : cellStyle}
            >
              24
            </td>
            <td
              style={test.read_irregular_words === 25 ? cellStyle1 : cellStyle}
            >
              25
            </td>
            <td
              style={test.read_irregular_words === 26 ? cellStyle1 : cellStyle}
            >
              26
            </td>
            <td style={test.read_irregular_words > 26 ? cellStyle1 : cellStyle}>
              &gt;26
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>Spell Regular Words</td>
            <td style={cellStyle}>{test.spell_regular_words}</td>
            <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td>
            <td style={test.spell_regular_words < 30 ? cellStyle1 : cellStyle}>
              &lt;30
            </td>
            <td
              style={
                test.spell_regular_words >= 30 && test.spell_regular_words <= 43
                  ? cellStyle1
                  : cellStyle
              }
            >
              30-43
            </td>
            <td
              style={
                test.spell_regular_words >= 44 && test.spell_regular_words <= 56
                  ? cellStyle1
                  : cellStyle
              }
            >
              44-56
            </td>
            <td
              style={
                test.spell_regular_words >= 57 && test.spell_regular_words <= 68
                  ? cellStyle1
                  : cellStyle
              }
            >
              57-68
            </td>
            <td
              style={
                test.spell_regular_words >= 69 && test.spell_regular_words <= 79
                  ? cellStyle1
                  : cellStyle
              }
            >
              69-79
            </td>
            <td
              style={
                test.spell_regular_words >= 80 && test.spell_regular_words <= 83
                  ? cellStyle1
                  : cellStyle
              }
            >
              80-83
            </td>
            <td style={test.spell_regular_words > 83 ? cellStyle1 : cellStyle}>
              &gt;83
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>Spell Irregular Words</td>
            <td style={cellStyle}>{test.spell_irregular_words}</td>
            <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td>
            <td
              style={test.spell_irregular_words < 12 ? cellStyle1 : cellStyle}
            >
              &lt;12
            </td>
            <td
              style={
                test.spell_irregular_words >= 12 &&
                test.spell_irregular_words <= 14
                  ? cellStyle1
                  : cellStyle
              }
            >
              12-14
            </td>
            <td
              style={
                test.spell_irregular_words >= 15 &&
                test.spell_irregular_words <= 17
                  ? cellStyle1
                  : cellStyle
              }
            >
              15-17
            </td>
            <td
              style={
                test.spell_irregular_words >= 18 &&
                test.spell_irregular_words <= 20
                  ? cellStyle1
                  : cellStyle
              }
            >
              18-20
            </td>
            <td
              style={
                test.spell_irregular_words >= 12 &&
                test.spell_irregular_words <= 23
                  ? cellStyle1
                  : cellStyle
              }
            >
              21-23
            </td>
            <td
              style={
                test.spell_irregular_words >= 24 &&
                test.spell_irregular_words <= 25
                  ? cellStyle1
                  : cellStyle
              }
            >
              24-25
            </td>
            <td
              style={test.spell_irregular_words > 25 ? cellStyle1 : cellStyle}
            >
              &gt;25
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>Pseudo Words</td>
            <td style={cellStyle}>{test.pseudo_words}</td>
            <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td>
            <td style={test.pseudo_words < 25 ? cellStyle1 : cellStyle}>
              &lt;25
            </td>
            <td
              style={
                test.pseudo_words >= 25 && test.pseudo_words <= 26
                  ? cellStyle1
                  : cellStyle
              }
            >
              25-26
            </td>
            <td
              style={
                test.pseudo_words >= 27 && test.pseudo_words <= 29
                  ? cellStyle1
                  : cellStyle
              }
            >
              27-29
            </td>
            <td
              style={
                test.pseudo_words >= 30 && test.pseudo_words <= 31
                  ? cellStyle1
                  : cellStyle
              }
            >
              {" "}
              30-31
            </td>
            <td
              style={
                test.pseudo_words >= 32 && test.pseudo_words <= 33
                  ? cellStyle1
                  : cellStyle
              }
            >
              32-33
            </td>
            <td
              style={
                test.pseudo_words >= 34 && test.pseudo_words <= 36
                  ? cellStyle1
                  : cellStyle
              }
            >
              34-36
            </td>
            <td style={test.pseudo_words > 36 ? cellStyle1 : cellStyle}>
              &gt;36
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>Letter Sounds</td>
            <td style={cellStyle}>{test.letter_sounds}</td>
            <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td>
            <td style={test.letter_sounds < 68 ? cellStyle1 : cellStyle}>
              &lt;68
            </td>
            <td
              style={
                test.letter_sounds >= 68 && test.letter_sounds <= 69
                  ? cellStyle1
                  : cellStyle
              }
            >
              68-69
            </td>
            <td style={test.letter_sounds === 70 ? cellStyle1 : cellStyle}>
              70
            </td>
            <td style={test.letter_sounds === 71 ? cellStyle1 : cellStyle}>
              71
            </td>
            <td
              style={
                test.letter_sounds >= 72 && test.letter_sounds <= 73
                  ? cellStyle1
                  : cellStyle
              }
            >
              72-73
            </td>
            <td style={test.letter_sounds === 74 ? cellStyle1 : cellStyle}>
              74
            </td>
            <td style={test.letter_sounds > 74 ? cellStyle1 : cellStyle}>
              &gt;74
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default WistETable;
