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
const categories = [
  "Word Identification",
  "Spelling",
  "Literacy Ability",
  "Sound-Symbol Recognition",
];
function createRowData(category, tests) {
  const categoryMap = {
    "Word Identification": {
      percentile: "",
      scaled: "",
    },
    Spelling: {
      percentile: "",
      scaled: "",
    },
    "Literacy Ability": {
      percentile: "",
      scaled: "",
    },
    "Sound-Symbol Recognition": {
      percentile: "",
      scaled: "",
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
export default function SecondaryWistComparisonTable() {
  const dispatch = useDispatch();
  const secondaryWistTests = useSelector(
    (store) => store.secondaryWistReducer.list
  ); // Get data from store
  const student = useParams();
  console.log("AllSecWist tests maybe?", secondaryWistTests);

  useEffect(() => {
    dispatch({ type: "FETCH_SECONDARY_WIST_RESULTS", payload: student.id }); // Dispatch action to fetch data
  }, [dispatch, student.id]);

  // Create rows based on the fetched data
  const rows = categories.map((category) =>
    createRowData(category, secondaryWistTests)
  );
  console.log("rows", rows);
  const summaryRows = createSummaryRowData(secondaryWistTests);

  const lightGreyColor = "#F5F5F5"; // Light grey color
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="WIST 11-18 (TODO: CHECK AGES) Comparison Table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell color={lightGreyColor}>Category</StyledTableCell>
              {secondaryWistTests.map(
                (test, index)(
                  <TestHeaderCell
                    key={`test-head-${index}`}
                    colSpan={2}
                    align="center"
                    color={testHeaderColors[index % testHeaderColors.length]}
                  >
                    {`Test ${index + 1} (${formatDate3(test.date)})`}
                  </TestHeaderCell>
                )
              )}
              <StyledTableCell align="right" color={lightGreyColor}>
                Descriptive Term
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell color={lightGreyColor}></StyledTableCell>
              {secondaryWistTests.flatMap(() => [
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
                {secondaryWistTests.flatMap((_, testIndex) => [
                    <StyledTableCell align="right">
                        {row.percentiles[tesstIndex]}
                    </StyledTableCell>,
                    testIndex=== secondaryWistTests.length - 1 ? (
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
                    {getDescriptiveTerm(row.scaledScores)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* end of component */}
    </>
  );
}
