import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

const DescriptiveTable = () => {
  const cellStyle = {
    fontWeight: "bold",
    fontSize: "12px",
    borderRight: "1px solid #e0e0e0",
  };

  const lastCellStyle = {
    ...cellStyle,
    borderRight: "none", // Remove the border for the last cell
  };

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      style={{ border: "2px solid #e0e0e0", borderRadius: "8px", marginTop: "20px" }}
    >
      <Table aria-label="descriptive table" size="small">
        <TableBody>
          <TableRow>
            {/* Use the spread operator to apply styles */}
            <TableCell style={{ ...cellStyle }}>Scaled Score</TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              1-3
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              4-5
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              6-7
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              8-12
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              13-14
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              15-16
            </TableCell>
            <TableCell style={{ ...lastCellStyle }} align="center">
              17-20
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...cellStyle, backgroundColor: "transparent" }}>Descriptive Term</TableCell>
            <TableCell style={{ ...cellStyle, backgroundColor: "#ffcccc" }} align="center">
              Very Poor
            </TableCell>
            <TableCell style={{ ...cellStyle, backgroundColor: "#ffebcc" }} align="center">
              Poor
            </TableCell>
            <TableCell style={{ ...cellStyle, backgroundColor: "#ffffcc" }} align="center">
              Below Average
            </TableCell>
            <TableCell style={{ ...cellStyle, backgroundColor: "#cce5ff" }} align="center">
              Average
            </TableCell>
            <TableCell style={{ ...cellStyle, backgroundColor: "#ccffcc" }} align="center">
              Above Average
            </TableCell>
            <TableCell style={{ ...cellStyle, backgroundColor: "#99cc99" }} align="center">
              Superior
            </TableCell>
            <TableCell style={{ ...lastCellStyle, backgroundColor: "#669966" }} align="center">
              Very Superior
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...cellStyle }}>Composite Score</TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              &lt;70
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              70-79
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              80-89
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              90-110
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              111-120
            </TableCell>
            <TableCell style={{ ...cellStyle }} align="center">
              121-130
            </TableCell>
            <TableCell style={{ ...lastCellStyle }} align="center">
              &gt;130
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DescriptiveTable;
