import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils"; 
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "picture", label: "Picture", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "grade", label: "Grade", minWidth: 100 },
  { id: "gender", label: "Gender", minWidth: 100 },
  { id: "dob", label: "Date of Birth", minWidth: 130 },
  { id: "school", label: "School", minWidth: 160 },
  { id: "address", label: "Address", minWidth: 200 },
  { id: "county", label: "County", minWidth: 150 },
  { id: "zip_code", label: "Zip Code", minWidth: 120 },
  { id: "on_site", label: "Status", minWidth: 120 },
];

const StudentCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const students = useSelector((store) => store.studentReducer.list);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENTS" });
  }, [dispatch]);

  // Handlers for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="student table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => {
                const formattedStudent = {
                  ...student,
                  name: `${student.first_name} ${student.last_name}`,
                  on_site: student.on_site ? "On-Site" : "Virtual",
                  dob: formatDate(student.dob), // Assuming formatDate is your date formatting function
                  picture: (
                    <img
                      src={student.picture}
                      alt={`${student.first_name} ${student.last_name}`}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ),
                };

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={student.id}
                    onClick={() => history.push(`/students/${student.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {columns.map((column) => {
                      const value = formattedStudent[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StudentCard;
