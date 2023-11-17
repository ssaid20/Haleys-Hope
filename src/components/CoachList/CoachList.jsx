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

const columns = [{ id: "name", label: "Name", minWidth: 170 }];

const CoachList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const coaches = useSelector((store) => store.coachReducer.list);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    console.log("*1* fetch coaches use effect");
    dispatch({ type: "FETCH_COACHES" });
  }, [dispatch]);

  // Handlers for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log("logging Coaches in list", coaches);
  return (
    // <div>hello</div>
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label="coaches table">
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
            {coaches
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((coach) => {
                const formattedCoach = {
                  ...coach,
                  name: `${coach.first_name} ${coach.last_name}`,
                };

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={coaches.id}
                    onClick={() => history.push(`/coaches/${coach.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {columns.map((column) => {
                      const value = formattedCoach[column.id];
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
        count={coaches.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CoachList;
