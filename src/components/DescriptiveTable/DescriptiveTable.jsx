import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

const DescriptiveTable = () => {
  return (
    <TableContainer component={Paper} elevation={3} style={{ border: '2px solid #e0e0e0', borderRadius: '8px', marginTop:'20px' }}>
      <Table aria-label="descriptive table" size='small'>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "12px" }}>Scaled Score</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>1-3</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>4-5</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>6-7</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>8-12</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>13-14</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>15-16</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>17-20</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "12px" }}>Descriptive Term</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>Very Poor</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>Poor</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>Below Average</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>Average</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>Above Average</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>Superior</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>Very Superior</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", fontSize: "12px" }}>Composite Score</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>&lt;70</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>70-79</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>80-89</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>90-110</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>111-120</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>121-130</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>&gt;130</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DescriptiveTable;
