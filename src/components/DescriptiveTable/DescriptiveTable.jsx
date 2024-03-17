import { Table, TableRow, TableCell } from "@mui/material";
const DescriptiveTable = () => {
  return (
    <div>
      <Table>
        <TableRow>
          <TableCell>Scaled Score</TableCell>
          <TableCell> 1-3 </TableCell>
          <TableCell> 4-5 </TableCell>
          <TableCell> 6-7 </TableCell>
          <TableCell> 8-12 </TableCell>
          <TableCell> 13-14 </TableCell>
          <TableCell> 15-16 </TableCell>
          <TableCell> 17-20</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Descriptive Term</TableCell>
          <TableCell>Very Poor</TableCell>
          <TableCell>Poor</TableCell>
          <TableCell>Below Average</TableCell>
          <TableCell>Average</TableCell>
          <TableCell>Above Average</TableCell>
          <TableCell>Superior</TableCell>
          <TableCell>Very Superior</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Composite Score</TableCell>
          <TableCell>&lt;70</TableCell>
          <TableCell>70-79</TableCell>
          <TableCell>80-89</TableCell>
          <TableCell>90-110</TableCell>
          <TableCell>111-120</TableCell>
          <TableCell>121-130</TableCell>
          <TableCell>&gt;130</TableCell>
        </TableRow>
      </Table>
    </div>
  );
};
export default DescriptiveTable;
