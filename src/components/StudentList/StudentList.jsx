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
import { calculateAge } from "../../lib/utils";

const columns = [
  // { id: "id", label: "ID", minWidth: 100 }, // took id out student list
  { id: "picture", label: "Picture", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "age", label: "Age", minWidth: 80 },
  { id: "grade", label: "Grade", minWidth: 80 },
  { id: "city", label: "City", minWidth: 150 },
  { id: "state", label: "State", minWidth: 150 },
  { id: "start_date", label: "Start Date", minWidth: 130 },
  // { id: "gender", label: "Gender", minWidth: 100 },

  // { id: "dob", label: "Date of Birth", minWidth: 130 },
  // { id: "school", label: "School", minWidth: 160 },
  // { id: "address", label: "Address", minWidth: 200 },
  // { id: "county", label: "County", minWidth: 150 },
  // { id: "zip_code", label: "Zip Code", minWidth: 120 }, // may be able to grab city and state from here
  // { id: "on_site", label: "Status", minWidth: 120 }, *** only need on more details ***
];

const StudentList = () => {
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
  // function to calculate a students age using dob
  // function calculateAge(dob) {
  //   const birthday = new Date(dob);
  //   const today = new Date();
  //   let age = today.getFullYear() - birthday.getFullYear();
  //   const m = today.getMonth() - birthday.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
  //     age--;
  //   }
  //   return age;
  // }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log("logging Students in list", students);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 840 }}>
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
                  age: calculateAge(student.dob),
                  city: student.address, // *** need to fix our address input then make function to pull out city and state ***
                  //on_site: student.on_site ? "On-Site" : "Virtual", *** only need on more details ***
                  // dob: formatDate(student.dob), // formatting date *** only need on more details ***
                  start_date: formatDate(student.pretest_date), // *** using pretest date, do we need a start date column? ***
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

export default StudentList;
