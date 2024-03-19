import { Table, TableRow, TableCell } from "@mui/material";
const DescriptiveTable = () => {
  return (
    <div>
      <Table>
        <TableRow>
          <TableCell>Scaled Score</TableCell>
          <TableCell align="center"> 1-3 </TableCell>
          <TableCell align="center"> 4-5 </TableCell>
          <TableCell align="center"> 6-7 </TableCell>
          <TableCell align="center"> 8-12 </TableCell>
          <TableCell align="center"> 13-14 </TableCell>
          <TableCell align="center"> 15-16 </TableCell>
          <TableCell align="center"> 17-20</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Descriptive Term</TableCell>
          <TableCell align="center">Very Poor</TableCell>
          <TableCell align="center">Poor</TableCell>
          <TableCell align="center">Below Average</TableCell>
          <TableCell align="center">Average</TableCell>
          <TableCell align="center">Above Average</TableCell>
          <TableCell align="center">Superior</TableCell>
          <TableCell align="center">Very Superior</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Composite Score</TableCell>
          <TableCell align="center">&lt;70</TableCell>
          <TableCell align="center">70-79</TableCell>
          <TableCell align="center">80-89</TableCell>
          <TableCell align="center">90-110</TableCell>
          <TableCell align="center">111-120</TableCell>
          <TableCell align="center">121-130</TableCell>
          <TableCell align="center">&gt;130</TableCell>
        </TableRow>
      </Table>
    </div>
  );
};
export default DescriptiveTable;
