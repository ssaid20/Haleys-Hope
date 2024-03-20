import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";

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
  backgroundColor: "#61e2ff",
};
const cellStyle2 = {
  border: "1px solid black",
  padding: "22px",
  textAlign: "center",
  backgroundColor: "#caccca",
};

const WistSTable = ({ test }) => {
  const dispatch = useDispatch();
  let studentId = { id: test.student_id };
  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT", payload: studentId });
  });
  const student = useSelector((store) => store.studentReducer.Details.grade);

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
      <table style={tableStyle} >
        <thead>
          <tr>
            <th style={cellStyle}>Item Sets</th>
            <th style={cellStyle}>Raw Score</th>
            {/* <th colSpan="2" style={cellStyle}>
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
            </th> */}
            {/* &lt; is for the < character */}
            <th style={test.grade < 5 ? cellStyle2 : cellStyle}>&lt;5</th>
            <th style={test.grade === 5 ? cellStyle2 : cellStyle}>5</th>
            <th style={test.grade === 6 ? cellStyle2 : cellStyle}>6</th>
            <th style={test.grade === 7 ? cellStyle2 : cellStyle}>7</th>
            <th style={test.grade === 8 ? cellStyle2 : cellStyle}>8</th>
            <th style={test.grade === 9 ? cellStyle2 : cellStyle}>9</th>
            <th style={test.grade === 10 ? cellStyle2 : cellStyle}>10</th>
            <th style={test.grade === 11 ? cellStyle2 : cellStyle}>11</th>
            <th style={test.grade > 12 ? cellStyle2 : cellStyle}>12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={cellStyle}>Read Regular Words</td>
            <td style={cellStyle}>{test.read_regular_words} </td>
            {/* <td style={cellStyle}>below</td>
            <td style={cellStyle}>at/above</td> */}
            <td style={test.read_regular_words < 75 ? cellStyle1 : cellStyle}>&lt;75</td>
            <td
              style={test.read_regular_words >= 75 && test.read_regular_words <= 79 ? cellStyle1 : cellStyle}
            >
              75-79
            </td>
            <td
              style={test.read_regular_words >= 80 && test.read_regular_words <= 84 ? cellStyle1 : cellStyle}
            >
              80-84
            </td>
            <td
              style={test.read_regular_words >= 85 && test.read_regular_words <= 89 ? cellStyle1 : cellStyle}
            >
              85-89
            </td>
            <td
              style={test.read_regular_words >= 90 && test.read_regular_words <= 91 ? cellStyle1 : cellStyle}
            >
              90-91
            </td>
            <td style={test.read_regular_words === 92 ? cellStyle1 : cellStyle}>92</td>
            <td
              style={test.read_regular_words >= 93 && test.read_regular_words <= 94 ? cellStyle1 : cellStyle}
            >
              93-94
            </td>
            <td
              style={test.read_regular_words >= 95 && test.read_regular_words <= 96 ? cellStyle1 : cellStyle}
            >
              95-96
            </td>
            <td style={test.read_regular_words > 96 ? cellStyle1 : cellStyle}>&gt;96</td>
          </tr>
          <tr>
            <td style={cellStyle}>Read Irregular Words</td>
            <td style={cellStyle}>{test.read_irregular_words}</td>
            {/* <td style={cellStyle}> below</td>
            <td style={cellStyle}>at above</td> */}
            <td style={test.read_irregular_words < 25 ? cellStyle1 : cellStyle}>&lt;25</td>
            <td style={test.read_irregular_words === 25 ? cellStyle1 : cellStyle}>25</td>
            <td style={test.read_irregular_words === 26 ? cellStyle1 : cellStyle}>26</td>
            <td style={test.read_irregular_words === 27 ? cellStyle1 : cellStyle}>27</td>
            <td style={test.read_irregular_words === 28 ? cellStyle1 : cellStyle}>28</td>
            <td style={test.read_irregular_words === 29 ? cellStyle1 : cellStyle}>29</td>
            <td style={test.read_irregular_words === 30 ? cellStyle1 : cellStyle}>30</td>
            <td style={cellStyle}>-</td>
            <td style={cellStyle}>-</td>
          </tr>
          <tr>
            <td style={cellStyle}>Spell Regular Words</td>
            <td style={cellStyle}>{test.spell_regular_words}</td>
            {/* <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td> */}
            <td style={test.spell_regular_words < 58 ? cellStyle1 : cellStyle}>&lt;58</td>
            <td
              style={
                test.spell_regular_words >= 58 && test.spell_regular_words <= 59 ? cellStyle1 : cellStyle
              }
            >
              58-59
            </td>
            <td
              style={
                test.spell_regular_words >= 60 && test.spell_regular_words <= 62 ? cellStyle1 : cellStyle
              }
            >
              60-62
            </td>
            <td
              style={
                test.spell_regular_words >= 63 && test.spell_regular_words <= 67 ? cellStyle1 : cellStyle
              }
            >
              63-67
            </td>
            <td
              style={
                test.spell_regular_words >= 68 && test.spell_regular_words <= 70 ? cellStyle1 : cellStyle
              }
            >
              68-70
            </td>
            <td
              style={
                test.spell_regular_words >= 71 && test.spell_regular_words <= 73 ? cellStyle1 : cellStyle
              }
            >
              71-73
            </td>
            <td
              style={
                test.spell_regular_words >= 74 && test.spell_regular_words <= 75 ? cellStyle1 : cellStyle
              }
            >
              74-75
            </td>
            <td
              style={
                test.spell_regular_words >= 76 && test.spell_regular_words <= 79 ? cellStyle1 : cellStyle
              }
            >
              76-79
            </td>
            <td style={test.spell_regular_words > 79 ? cellStyle1 : cellStyle}>&gt;79</td>
          </tr>
          <tr>
            <td style={cellStyle}>Spell Irregular Words</td>
            <td style={cellStyle}>{test.spell_irregular_words}</td>
            {/* <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td> */}
            <td style={test.spell_irregular_words < 21 ? cellStyle1 : cellStyle}>&lt;21</td>
            <td
              style={
                test.spell_irregular_words >= 21 && test.spell_irregular_words <= 23 ? cellStyle1 : cellStyle
              }
            >
              21-23
            </td>
            <td
              style={
                test.spell_irregular_words >= 24 && test.spell_irregular_words <= 25 ? cellStyle1 : cellStyle
              }
            >
              24-25
            </td>
            <td style={test.spell_irregular_words === 26 ? cellStyle1 : cellStyle}>26</td>
            <td style={test.spell_irregular_words === 27 ? cellStyle1 : cellStyle}>27</td>
            <td style={test.spell_irregular_words === 28 ? cellStyle1 : cellStyle}>28</td>
            <td style={test.spell_irregular_words === 29 ? cellStyle1 : cellStyle}>29</td>
            <td style={test.spell_irregular_words === 30 ? cellStyle1 : cellStyle}>30</td>
            <td style={cellStyle}>-</td>
          </tr>
          <tr>
            <td style={cellStyle}>Pseudo Words</td>
            <td style={cellStyle}>{test.pseudo_words}</td>
            {/* <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td> */}
            <td style={test.pseudo_words < 32 ? cellStyle1 : cellStyle}>&lt;32</td>
            <td style={test.pseudo_words >= 32 && test.pseudo_words <= 33 ? cellStyle1 : cellStyle}>32-33</td>
            <td style={test.pseudo_words >= 34 && test.pseudo_words <= 36 ? cellStyle1 : cellStyle}>34-36</td>
            <td style={test.pseudo_words === 37 ? cellStyle1 : cellStyle}>37</td>
            <td style={test.pseudo_words >= 38 && test.pseudo_words <= 39 ? cellStyle1 : cellStyle}>38-39</td>
            <td style={test.pseudo_words >= 40 && test.pseudo_words <= 40 ? cellStyle1 : cellStyle}>40-41</td>
            <td style={test.pseudo_words >= 42 && test.pseudo_words <= 43 ? cellStyle1 : cellStyle}>42-43</td>
            <td style={test.pseudo_words >= 44 && test.pseudo_words <= 45 ? cellStyle1 : cellStyle}>
              {" "}
              44-45
            </td>
            <td style={test.pseudo_words > 45 ? cellStyle1 : cellStyle}>&gt;45</td>
          </tr>
          <tr>
            <td style={cellStyle}>Letter Sounds</td>
            <td style={cellStyle}>{test.letter_sounds}</td>
            {/* <td style={cellStyle}>below</td>
            <td style={cellStyle}>at above</td> */}
            <td style={test.letter_sounds < 72 ? cellStyle1 : cellStyle}>&lt;72</td>
            <td style={test.letter_sounds >= 72 && test.letter_sounds <= 73 ? cellStyle1 : cellStyle}>
              72-73
            </td>
            <td style={test.letter_sounds === 74 ? cellStyle1 : cellStyle}>74</td>
            <td style={test.letter_sounds === 75 ? cellStyle1 : cellStyle}>75</td>
            <td style={test.letter_sounds === 76 ? cellStyle1 : cellStyle}>76</td>
            <td style={test.letter_sounds === 77 ? cellStyle1 : cellStyle}>77</td>
            <td style={test.letter_sounds === 78 ? cellStyle1 : cellStyle}>78</td>
            <td style={test.letter_sounds === 79 ? cellStyle1 : cellStyle}>79</td>
            <td style={test.letter_sounds > 79 ? cellStyle1 : cellStyle}>&gt;79</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default WistSTable;
