import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils"; // Assuming you have a similar utility for coaches
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { Button } from "../ui/button";
import { Button as MUIButton } from "@mui/material";
import { Button as Button2 } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const sheetStyle = {
  backgroundColor: "white",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // to add some shadow
  maxHeight: "80vh", // Example: 80% of the viewport height
  overflowY: "auto", // Enables vertical scrolling
};

// Define the columns for the coach table
const columns = [
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
];
// function to see and manage all coaches
const CoachList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const coaches = useSelector((store) => store.coachReducer.list);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showArchivedCoaches, setShowArchivedCoaches] = useState(false);
  const archivedCoaches = useSelector((store) => store.coachReducer.archivedCoaches);
  console.log("logging archived coaches", archivedCoaches);
  useEffect(() => {
    dispatch({ type: "FETCH_COACHES" });
    dispatch({ type: "FETCH_ARCHIVED_COACHES" });
  }, [dispatch]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // useMemo hook for sorted coaches
  const sortedCoaches = useMemo(() => {
    let sortableCoaches = [...coaches];
    if (sortConfig.key) {
      sortableCoaches.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCoaches;
  }, [coaches, sortConfig]);

  // Function to handle sorting
  const handleSortChange = (event) => {
    setSortConfig({ key: event.target.value, direction: sortConfig.direction });
  };

  const toggleSortDirection = () => {
    setSortConfig({
      key: sortConfig.key,
      direction: sortConfig.direction === "ascending" ? "descending" : "ascending",
    });
  };

  const clearSort = () => {
    setSortConfig({ key: null, direction: "ascending" });
  };

  //handles pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //updated input change with id being a number
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let updatedValue = value;

    if (id === "is_active") {
      // Convert the value to a boolean
      updatedValue = value === "true"; // "true" for active, "false" for inactive
    }

    setFormData({ ...formData, [id]: updatedValue });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // New state to control the visibility of the Sheet
  const [editingCoachId, setEditingCoachId] = useState(null);

  // Modified handleEditClick function
  const handleEditClick = (coach) => {
    console.log("Edit clicked for coach:", coach.id);
    setFormData({
      first_name: coach.first_name,
      last_name: coach.last_name,
      is_active: coach.is_active,
    });
    setEditingCoachId(coach.id); // Set the editing coach's ID
  }; // end handleEditClick

  console.log("logging Coaches in coach list", coaches);

  // State to hold form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    is_active: "",
  });

  const addCoach = () => {
    history.push("./addCoach");
  };

  // Adjusted handleSubmit function
  const handleSubmit = () => {
    console.log("Submitting for coach:", editingCoachId);
    dispatch({
      type: "UPDATE_COACH",
      payload: { id: editingCoachId, ...formData },
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Coach Updated", severity: "success" } });

    setEditingCoachId(null); // Close the sheet after submitting
  }; // end handleSubmit

  // Function to toggle the display of archived coaches
  const toggleArchivedCoaches = () => {
    setShowArchivedCoaches(!showArchivedCoaches);
    dispatch({ type: "FETCH_ARCHIVED_COACHES" });
  };

  useEffect(() => {
    if (coaches) {
      setFormData({
        first_name: coaches.first_name || "",
        last_name: coaches.last_name || "",
        role_id: coaches.is_active || "",
      });
    }
  }, [coaches]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4"> Manage Coaches </h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FormControl style={{ minWidth: 120, marginRight: "10px" }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortConfig.key || ""}
              label="Sort By"
              onChange={handleSortChange}
            >
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {column.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button2 variant="outlined" onClick={toggleSortDirection} style={{ margin: "5px" }}>
            {sortConfig.direction === "ascending" ? "Asc" : "Desc"}
          </Button2>
          <Button2 variant="outlined" onClick={clearSort} style={{ margin: "5px" }}>
            Clear
          </Button2>

          <button
            onClick={addCoach}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add A Coach
          </button>
        </div>
      </div>
      {/* <div className="bg-white shadow-md rounded my-6"> */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer className="max-h-max">
          <Table stickyHeader aria-label="coach table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCoaches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((coach) => {
                const formattedCoach = {
                  ...coach,
                  first_name: `${coach.first_name}`,
                  last_name: `${coach.last_name}`,
                  is_active: `${coach.is_active}`,
                };

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={coach.id}>
                    {columns.map((column) => {
                      const value = formattedCoach[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Button
                        onClick={() => handleEditClick(coach)}
                        variant="outline"
                        className=" text-m px-5 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                      >
                        <EditIcon /> &nbsp;
                        <span>Edit Coach</span>
                      </Button>
                    </TableCell>
                    {console.log("Sheet should open:", Boolean(editingCoachId))}{" "}
                    {editingCoachId && (
                      <Sheet open={Boolean(editingCoachId)} onOpenChange={setEditingCoachId}>
                        <SheetContent side="top" style={sheetStyle}></SheetContent>
                        <SheetContent side="top" style={sheetStyle}>
                          <SheetHeader>
                            <SheetTitle>Edit Coach</SheetTitle>
                            <SheetDescription>Make changes to the coach's profile here.</SheetDescription>
                          </SheetHeader>
                          <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                              />

                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="last_name" value={formData.last_name} onChange={handleInputChange} />
                              <Label htmlFor="is active">Is Active?</Label>
                              <select
                                id="is_active"
                                value={formData.is_active.toString()} // Convert boolean to string for the select value
                                onChange={handleInputChange}
                              >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                              </select>
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button onClick={handleSubmit} type="submit">
                                Save Changes
                              </Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <div className="flex justify-between items-center mt-4"> */}
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

      {/* this button opens up a table of archived coaches */}
      {/* <Button
        onClick={toggleArchivedCoaches}
        className={`mt-6 ${
          showArchivedCoaches ? "bg-red-500" : "bg-green-500"
        } hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300`}
      ></Button> */}
      <MUIButton
        variant="contained"
        color="primary"
        onClick={toggleArchivedCoaches}
        style={{ margin: "10px" }}
      >
        {showArchivedCoaches ? "Hide Archived Coaches" : "Show Archived Coaches"}
      </MUIButton>

      {showArchivedCoaches && (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
          <div className="bg-white shadow-md rounded my-6">
            <TableContainer className="max-h-max">
              <Table stickyHeader aria-label="archived coaches table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {archivedCoaches.map((coach) => {
                    const formattedCoach = {
                      ...coach,
                      first_name: `${coach.first_name}`,
                      last_name: `${coach.last_name}`,
                    };

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={coach.id}>
                        {columns.map((column) => {
                          const value = formattedCoach[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <Button
                            onClick={() => handleEditClick(coach)}
                            variant="outline"
                            className=" text-m px-5 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                          >
                            <EditIcon /> &nbsp;
                            <span>Edit Coach</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      )}
    </div>
  );
}; // end CoachList

export default CoachList;
