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
const categories = [
  "Phonological Awareness",
  "Phonological Memory",
  "Rapid Symbolic Naming",
  "Alt. Phonological Awareness",
];

function createRowData(category, tests) {
  const categoryMap = {
    "Phonological Awareness": {
      percentile: "phonological_awareness_percentile",
      scaled: "phonological_awareness_composite",
      descriptor: "phonological_awareness_descriptor",
    },
    "Phonological Memory": {
      percentile: "phonological_memory_percentile",
      scaled: "phonological_memory_composite",
      descriptor: "phonological_memory_descriptor",
    },
    "Rapid Symbolic Naming": {
      percentile: "rapid_symbolic_naming_percentile",
      scaled: "rapid_symbolic_naming_composite",
      descriptor: "rapid_symbolic_naming_descriptor",
    },
    "Alt. Phonological Awareness": {
      percentile: "alt_phonological_awareness_percentile",
      scaled: "alt_phonological_awareness_composite",
      descriptor: "alt_phonological_awareness_descriptor",
    },
    // ... other mappings as needed
  };

  return {
    category,
    percentiles: tests.map((test) => test[categoryMap[category].percentile]),
    scaledScores: tests.map((test) => ({
      score: test[categoryMap[category].scaled],
      descriptor: test[categoryMap[category].descriptor], // This assumes descriptor is directly available
    })),
    descriptiveTerms: tests.map((test) =>
      GetCompositeScoreDescription({
        compositeScore: test[categoryMap[category].scaled],
        descriptor: test[categoryMap[category].descriptor],
      })
    ), // Assuming you calculate descriptive terms based on scaled scores
  };
}
const TestHeaderCell = styled(TableCell)(({ theme, color }) => ({
  backgroundColor: color ? color : theme.palette.primary.main,
  color: theme.palette.common.white,
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    maxWidth: "65px"

  },
}));

// const testHeaderColors = [
//   "#778899", // Light Slate Gray
//   "#0f3c5c",
//   "#1277bf",
// ];
const OldCtoppComparison = () => {
  const dispatch = useDispatch();
  const olderCtoppTests = useSelector((store) => store.olderCtoppReducer.list); // Get data from store
  console.log("olderCtoppTests", olderCtoppTests);
  const student = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_OLDER_CTOPP_RESULTS", payload: student.id }); // Dispatch action to fetch data
  }, [dispatch, student.id]);

  // Create rows based on the fetched data
  const rows = categories.map((category) =>
    createRowData(category, olderCtoppTests)
  );
  console.log("rows", rows);

  const sectionHeaderColors = {
    percentile: "#778899", // Example color for Percentile Section
    scaledScore: "#0f3c5c", // Example color for Scaled Score Section
    descriptiveTerm: "#1277bf", // Example color for Descriptive Term Section
  };
  const lightGreyColor = "#F5F5F5"; // Light grey color
  if (olderCtoppTests.length === 0) {
    return (
      <div>
        <p>No CTOPP 7-24 Assessments for this student </p>
      </div>
    );
  } else if (olderCtoppTests.length === 1) {
    return (
      <div>
        <p>Only 1 CTOPP 7-24 exists </p>
      </div>
    );
  } else {
    return (
      <>
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={{ minWidth: 700 }}
            aria-label="Ctopp age 7-24 Comparison Table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell color={lightGreyColor}>
                  Category
                </StyledTableCell>
                {olderCtoppTests.map((test, index) => (
                  <TestHeaderCell
                    align="center"
                    color={sectionHeaderColors.percentile}
                    key={`percentile-header-${index}`}
                  >
                                        {`Test ${index + 1}  %ile`}

                    {/* {`Test ${index + 1} (${formatDate3(test.date)}) Percentile`} */}
                  </TestHeaderCell>
                ))}
                {olderCtoppTests.map((test, index) => (
                  <TestHeaderCell
                    align="center"
                    color={sectionHeaderColors.scaledScore}
                    key={`scaled-score-header-${index}`}
                  >
                        {`Test ${index + 1} SS`}
                    {/* {`Test ${index + 1} (${formatDate3(
                      test.date
                    )}) Scaled Score`} */}
                  </TestHeaderCell>
                ))}
                {olderCtoppTests.map((test, index) => (
                  <TestHeaderCell
                    align="center"
                    color={sectionHeaderColors.descriptiveTerm}
                    key={`descriptive-term-header-${index}`}
                  >
                        {`Test ${index + 1}  Desc.`}
                    {/* {`Test ${index + 1} (${formatDate3(
                      test.date
                    )}) Descriptive`} */}
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

                  {row.scaledScores.map((scoreObj, index) => (
                    <StyledTableCell key={`score-${index}`} align="center">
                      {scoreObj.descriptor
                        ? `${scoreObj.descriptor} ${scoreObj.score}`
                        : scoreObj.score}
                    </StyledTableCell>
                  ))}

                  {/* {row.scaledScores.map((score, index) => {
                  // Assuming you have a way to get the descriptor for each score here. You might need to adjust this based on your actual data structure.
                  // If your tests include a descriptor (e.g., `<` or `>`) for each score, make sure to include that in your data passed to the component.
                  const descriptor = [index].descriptor; // Adjust this line to access the actual descriptor from your tests data structure

                  return (
                    <StyledTableCell key={`score-${index}`} align="center">
                      {descriptor ? `${descriptor}${score}` : score}
                    </StyledTableCell>
                  );
                })} */}

                  {row.descriptiveTerms.map((term, index) => (
                    <StyledTableCell
                      key={`descriptive-${index}`}
                      align="center"
                    >
                      {term}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ breakAfter: "page" }}></div>
      </>
    );
  }
};

export default OldCtoppComparison;
