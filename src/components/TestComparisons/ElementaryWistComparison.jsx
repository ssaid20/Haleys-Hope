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
const categories = ["Word Identification", "Spelling", "Literacy Ability", "Sound-Symbol Recognition"];
function createRowData(category, tests) {
  const categoryMap = {
    "Word Identification": {
      percentile: "word_identification_percentile",
      standard: "word_identification_standard_score",
    },
    Spelling: {
      percentile: "spelling_percentile",
      standard: "spelling_standard_score",
    },
    "Literacy Ability": {
      percentile: "fundamental_literacy_percentile",
      standard: "fundamental_literacy_standard_score",
    },
    "Sound-Symbol Recognition": {
      percentile: "sound_symbol_knowledge_percentile",
      standard: "sound_symbol_knowledge_standard_score",
    },
  };
  return {
    category,
    percentiles: tests.map((test) => test[categoryMap[category].percentile]),
    standardScores: tests.map((test) => test[categoryMap[category].standard]),
    descriptiveTerms: tests.map((test) =>
      GetCompositeScoreDescription({ compositeScore: test[categoryMap[category].standard] })
    ),
  };
}
const DarkBlueHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#0f3c5c", // Dark blue color
  color: theme.palette.common.white,
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
  },
}));

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
export default function PrimaryWistComparisonTable() {
  const dispatch = useDispatch();
  const primaryWistTests = useSelector((store) => store.elementaryWistReducer.list);
  const student = useParams();
  console.log("AllEleWist tests maybe?", primaryWistTests);

  useEffect(() => {
    dispatch({ type: "FETCH_PRIMARY_WIST_RESULTS", payload: student.id }); // Dispatch action to fetch data
  }, [dispatch, student.id]);

  // Create rows based on the fetched data
  const rows = categories.map((category) => createRowData(category, primaryWistTests));
  console.log("rows", rows);
  const sectionHeaderColors = {
    percentile: "#778899", // Example color for Percentile Section
    standardScore: "#0f3c5c", // Example color for Standard Score Section
    descriptiveTerm: "#1277bf", // Example color for Descriptive Term Section
  };
  const lightGreyColor = "#F5F5F5"; // Light grey color

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="WIST 11-18 (TODO: CHECK AGES) Comparison Table">
          <TableHead>
            <TableRow>
              <StyledTableCell color={lightGreyColor}>Category</StyledTableCell>
              {primaryWistTests.map((test, index) => (
                <TestHeaderCell
                  key={`percentile-header-${index}`}
                  align="center"
                  color={sectionHeaderColors.percentile}
                >
                  {`Test ${index + 1} (${formatDate3(test.date)}) Percentile`}
                </TestHeaderCell>
              ))}
              {primaryWistTests.map((test, index) => (
                <TestHeaderCell
                  align="center"
                  color={sectionHeaderColors.standardScore}
                  key={`standard-score-header-${index}`}
                >
                  {`Test ${index + 1} (${formatDate3(test.date)}) Standard Score`}
                </TestHeaderCell>
              ))}
              {primaryWistTests.map((test, index) => (
                <TestHeaderCell
                  align="center"
                  color={sectionHeaderColors.descriptiveTerm}
                  key={`descriptive-term-header-${index}`}
                >
                  {`Test ${index + 1} (${formatDate3(test.date)}) Descriptive Term`}
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
                  <StyledTableCell align="right">{percentile}</StyledTableCell>
                ))}
                {row.standardScores.map((score, index) => (
                  <StyledTableCell key={`score-${index}`} align="right">
                    {score}
                  </StyledTableCell>
                ))}
                {row.descriptiveTerms.map((term, index) => (
                  <StyledTableCell align="right">
                    {GetCompositeScoreDescription(row.standardScores)}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
          {/* <TableBody>
            {rows.map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                <StyledTableCell component="th" scope="row">
                  {row.category}
                </StyledTableCell>
                {elementaryWistTests.flatMap((_, testIndex) => [
                  <StyledTableCell align="right" key={`percentile-${rowIndex}-${testIndex}`}>
                    {row.percentiles[testIndex]}
                  </StyledTableCell>,
                  <DottedBorderTableCell align="right" key={`standard-${rowIndex}-${testIndex}`}>
                    {row.standardScores[testIndex]}
                  </DottedBorderTableCell>,
                ])}
                <StyledTableCell align="right">
                  {row.descriptiveTerms.map((term, index) => (
                    <span key={`descriptive-${rowIndex}-${index}`}>{term}</span>
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>

      {/* end of component */}
    </>
  );
}
