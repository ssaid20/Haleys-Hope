import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate3 } from "../../lib/utils";
import { GetCompositeScoreDescription } from "../../lib/GetCompositeScoreDescription";
import { GetScaledScoreDescription } from "../../lib/GetScaledScoreDescription";

const StyledTableCell = styled(TableCell)(({ theme, color }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: color ? color : theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Categories
const categories = ["Reading Rate", "Reading Accuracy", "Reading Fluency", "Reading Comprehension"];

function createRowData(category, tests) {
  const categoryMap = {
    "Reading Rate": {
      percentile: "rate_percentile_rank",
      scaled: "rate_scaled_score",
    },
    "Reading Accuracy": {
      percentile: "accuracy_percentile_rank",
      scaled: "accuracy_scaled_score",
    },
    "Reading Fluency": {
      percentile: "fluency_percentile_rank",
      scaled: "fluency_scaled_score",
    },
    "Reading Comprehension": {
      percentile: "comprehension_percentile_rank",
      scaled: "comprehension_scaled_score",
    },
  };

  return {
    category,
    percentiles: tests.map((test) => test[categoryMap[category].percentile]),
    scaledScores: tests.map((test) => test[categoryMap[category].scaled]),
    descriptiveTerms: tests.map(
      (test) => GetScaledScoreDescription({ scaledScore: test[categoryMap[category].scaled] }) // Assuming you calculate descriptive terms based on scaled scores
    ),
  };
}
const DarkBlueHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#0f3c5c", // Dark blue color
  color: theme.palette.common.white,
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
  },
}));

// New function to create data for the new table
function createSummaryRowData(tests) {
  if (!tests || tests.length === 0) {
    return [];
  } else {
    return tests.map((test) => ({
      date: formatDate3(test.date),
      sumScaledScore: test.sum_scaled_score,
      oralReadingPercentileRank: test.oral_reading_percentile_rank,
      oralReadingIndex: test.oral_reading_index,
      ori_descriptor: test.ori_descriptor,
      compositeTerms: GetCompositeScoreDescription({
        compositeScore: test.oral_reading_index,
        descriptor: test.ori_descriptor,
      }), // Assuming you calculate descriptive terms based on scaled scores
    }));
  }
}

const TestHeaderCell = styled(TableCell)(({ theme, color }) => ({
  backgroundColor: color ? color : theme.palette.primary.main,
  color: theme.palette.common.white,
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    maxWidth: "65px"

  },
}));

const testHeaderColors = [
  "#778899", // Light Slate Gray
  "#0f3c5c",
  "#1277bf",
];

const DottedBorderTableCell = styled(TableCell)(({ theme }) => ({
  bordercenter: "1px dotted #000", // Adjust color as needed
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
}));

export default function GortComparisonTable() {
  const dispatch = useDispatch();
  const gortTests = useSelector((store) => store.gortReducer.list); // Get data from store
  const student = useParams();
  console.log("AllGort", gortTests);

  useEffect(() => {
    dispatch({ type: "FETCH_GORT_RESULTS", payload: student.id }); // Dispatch action to fetch data
  }, [dispatch, student.id]);

  // Create rows based on the fetched data
  const rows = categories.map((category) => createRowData(category, gortTests));
  console.log("rows", rows);
  const summaryRows = createSummaryRowData(gortTests);

  const sectionHeaderColors = {
    percentile: "#778899", // Example color for Percentile Section
    scaledScore: "#0f3c5c", // Example color for Scaled Score Section
    descriptiveTerm: "#1277bf", // Example color for Descriptive Term Section
  };

  const lightGreyColor = "#F5F5F5"; // Light grey color
  if (gortTests.length === 0) {
    return (
      <div>
        <p>No GORT Assessments for this student </p>
      </div>
    );
  } else if (gortTests.length === 1) {
    return (
      <div>
        <p>Only 1 GORT Test exists </p>
      </div>
    );
  } else {
    return (
      <>
        <TableContainer component={Paper}>
          <Table size="small" sx={{ minWidth: 700 }} aria-label="GORT-5 Comparison Table">
            <TableHead>
              <TableRow>
                <StyledTableCell color={lightGreyColor}>Category</StyledTableCell>
                {gortTests.map((test, index) => (
                  <TestHeaderCell
                    align="center"
                    color={sectionHeaderColors.percentile}
                    key={`percentile-header-${index}`}
                  >
                                        {`Test ${index + 1} %ile`}

                    {/* {`Test ${index + 1} (${formatDate3(test.date)}) Percentile`} */}
                  </TestHeaderCell>
                ))}
                {gortTests.map((test, index) => (
                  <TestHeaderCell
                    align="center"
                    color={sectionHeaderColors.scaledScore}
                    key={`scaled-score-header-${index}`}
                  >
                                        {`Test ${index + 1} SS`}

                    {/* {`Test ${index + 1} (${formatDate3(test.date)}) Scaled Score`} */}
                  </TestHeaderCell>
                ))}
                {gortTests.map((test, index) => (
                  <TestHeaderCell
                    align="center"
                    color={sectionHeaderColors.descriptiveTerm}
                    key={`descriptive-term-header-${index}`}
                  >
                                        {`Test ${index + 1} Desc.`}

                    {/* {`Test ${index + 1} (${formatDate3(test.date)}) Descriptive Term`} */}
                  </TestHeaderCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                  <StyledTableCell component="th" scope="row">
                    {row.category}
                  </StyledTableCell>
                  {row.percentiles.map((percentile, index) => (
                    <StyledTableCell key={`percentile-${index}`} align="center">
                      {percentile}
                    </StyledTableCell>
                  ))}
                  {row.scaledScores.map((score, index) => (
                    <StyledTableCell key={`score-${index}`} align="center">
                      {score}
                    </StyledTableCell>
                  ))}
                  {row.descriptiveTerms.map((term, index) => (
                    <StyledTableCell key={`descriptive-${index}`} align="center">
                      {term}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        {/* GORT Summary Table */}
        <TableContainer component={Paper}>
          <Table size="small" sx={{ minWidth: 400 }} aria-label="GORT Summary Table">
            <TableHead>
              <TableRow>
                <DarkBlueHeaderCell>Test</DarkBlueHeaderCell>
                <DarkBlueHeaderCell align="center">Date</DarkBlueHeaderCell>
                <DarkBlueHeaderCell align="center">Sum Scaled Score</DarkBlueHeaderCell>
                <DarkBlueHeaderCell align="center">Oral Reading %ile Rank</DarkBlueHeaderCell>
                <DarkBlueHeaderCell align="center">Oral Reading Index</DarkBlueHeaderCell>
                <DarkBlueHeaderCell align="center">Descriptive Term</DarkBlueHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaryRows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {`Test ${index + 1}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">{row.sumScaledScore}</StyledTableCell>
                  <StyledTableCell align="center">{row.oralReadingPercentileRank}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.ori_descriptor} &nbsp; {row.oralReadingIndex}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.compositeTerms}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ breakAfter: "page" }}></div>
      </>
    );
  }
}
