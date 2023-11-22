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
import { getDescriptiveTerm } from "../../lib/utils";

const StyledTableCell = styled(TableCell)(({ theme, color }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: color ? color : theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
const categories = [
  "Reading Rate",
  "Reading Accuracy",
  "Reading Fluency",
  "Reading Comprehension",
];

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
  };
}
const DarkBlueHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#0f3c5c", // Dark blue color
  color: theme.palette.common.white,
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
  },
}));

// New function to create data for the new table
function createSummaryRowData(tests) {
  return tests.map((test) => ({
    date: formatDate3(test.date),
    sumScaledScore: test.sum_scaled_score,
    oralReadingPercentileRank: test.oral_reading_percentile_rank,
    oralReadingIndex: test.oral_reading_index,
    descriptiveTerm: getDescriptiveTerm(test.oral_reading_index),
  }));
}
const TestHeaderCell = styled(TableCell)(({ theme, color }) => ({
  backgroundColor: color ? color : theme.palette.primary.main,
  color: theme.palette.common.white,
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
  },
}));

const testHeaderColors = [
  "#778899", // Light Slate Gray
  "#0f3c5c",
  "#1277bf",
];

const DottedBorderTableCell = styled(TableCell)(({ theme }) => ({
  borderRight: "1px dotted #000", // Adjust color as needed
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

  // Function to get the average scaled score for a category
  const getAverageScaledScore = (scaledScores) => {
    const validScores = scaledScores.filter((score) => score != null);
    const total = validScores.reduce((acc, score) => acc + score, 0);
    return validScores.length > 0
      ? Math.round(total / validScores.length)
      : null;
  };
  const lightGreyColor = "#F5F5F5"; // Light grey color
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="GORT-5 Comparison Table">
          <TableHead>
            <TableRow>
              <StyledTableCell color={lightGreyColor}>Category</StyledTableCell>
              {gortTests.map((test, index) => (
                <TestHeaderCell
                  key={`test-head-${index}`}
                  colSpan={2}
                  align="center"
                  color={testHeaderColors[index % testHeaderColors.length]}
                >
                  {`Test ${index + 1} (${formatDate3(test.date)})`}
                </TestHeaderCell>
              ))}
              <StyledTableCell align="right" color={lightGreyColor}>
                Descriptive Term
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell color={lightGreyColor}></StyledTableCell>
              {gortTests.flatMap(() => [
                <StyledTableCell align="right">%ile</StyledTableCell>,
                <StyledTableCell align="right">Scaled Score</StyledTableCell>,
              ])}
              <StyledTableCell color={lightGreyColor}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                <StyledTableCell component="th" scope="row">
                  {row.category}
                </StyledTableCell>
                {gortTests.flatMap((_, testIndex) => [
                  <StyledTableCell align="right">
                    {row.percentiles[testIndex]}
                  </StyledTableCell>,
                  testIndex === gortTests.length - 1 ? (
                    <StyledTableCell align="right">
                      {row.scaledScores[testIndex]}
                    </StyledTableCell>
                  ) : (
                    <DottedBorderTableCell align="right">
                      {row.scaledScores[testIndex]}
                    </DottedBorderTableCell>
                  ),
                ])}
                <StyledTableCell align="right">
                  {getDescriptiveTerm(getAverageScaledScore(row.scaledScores))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {/* GORT Summary Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="GORT Summary Table">
          <TableHead>
            <TableRow>
              <DarkBlueHeaderCell>Test</DarkBlueHeaderCell>
              <DarkBlueHeaderCell align="right">Date</DarkBlueHeaderCell>
              <DarkBlueHeaderCell align="right">
                Sum Scaled Score
              </DarkBlueHeaderCell>
              <DarkBlueHeaderCell align="right">
                Oral Reading %ile Rank
              </DarkBlueHeaderCell>
              <DarkBlueHeaderCell align="right">
                Oral Reading Index
              </DarkBlueHeaderCell>
              <DarkBlueHeaderCell align="right">
                Descriptive Term
              </DarkBlueHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaryRows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {`Test ${index + 1}`}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.sumScaledScore}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.oralReadingPercentileRank}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.oralReadingIndex}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.descriptiveTerm}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}