import React, { useEffect, useState, useMemo } from "react";
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
import { useHistory } from "react-router-dom";
import { calculateAge } from "../../lib/utils";
import Fuse from "fuse.js";
import Button from "@mui/material/Button";
import Searchbar from "../shared/Searchbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const columns = [
  // { id: "id", label: "ID", minWidth: 100 }, // took id out student list
  { id: "picture", label: "Picture", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "age", label: "Age", minWidth: 80 },
  { id: "grade", label: "Grade", minWidth: 80 },
  { id: "intake_grade", label: "Intake Grade", minWidth: 80 },
  { id: "city", label: "City", minWidth: 150 },
  { id: "state", label: "State", minWidth: 150 },
  { id: "start_date", label: "Intake Date", minWidth: 130 },
];

const sortOptions = [
  { value: "full_name", label: "Full Name" },
  { value: "first_name", label: "First Name" },
  { value: "last_name", label: "Last Name" },
  { value: "age", label: "Age" },
  { value: "grade", label: "Grade" },
  { value: "intake_grade", label: "Intake Grade" },
  { value: "city", label: "City" },
  { value: "state", label: "State" },
  { value: "start_date", label: "Intake Date" },
  // ... other sort options ...
];

const StudentList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const students = useSelector((store) => store.studentReducer.list);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const processedSearchResults = searchResults.map((result) => result.item);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSortChange = (event) => {
    setSortConfig({ ...sortConfig, key: event.target.value });
  };

  const toggleSortDirection = () => {
    setSortConfig({
      ...sortConfig,
      direction: sortConfig.direction === "ascending" ? "descending" : "ascending",
    });
  };
  const clearSort = () => {
    setSortConfig({ key: null, direction: "ascending" });
  };

  console.log("logging searchResults", processedSearchResults);

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

  // Sorting logic
  const sortedStudents = useMemo(() => {
    let sortableStudents = [...students];
    if (sortConfig.key) {
      sortableStudents.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for specific columns
        if (sortConfig.key === "age") {
          aValue = calculateAge(a.dob);
          bValue = calculateAge(b.dob);
        } else if (sortConfig.key === "full_name") {
          aValue = `${a.first_name} ${a.last_name}`;
          bValue = `${b.first_name} ${b.last_name}`;
        } else if (sortConfig.key === "start_date") {
          aValue = new Date(a.barton_c_date);
          bValue = new Date(b.barton_c_date);
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStudents;
  }, [students, sortConfig]);

  const handleSort = (columnId) => {
    let direction = "ascending";
    if (sortConfig.key === columnId && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnId, direction });
  };

  // Search logic
  // useEffect(() => {
  //   const modifiedStudents = students.map((student) => ({
  //     ...student,
  //     full_name: `${student.first_name} ${student.last_name}`,
  //   }));
  //   const fuse = new Fuse(modifiedStudents, {
  //     keys: ["full_name", "grade"],
  //     threshold: 0.1,
  //   });
  //   if (!searchQuery) {
  //     setSearchResults([]);
  //   } else {
  //     const results = fuse.search(searchQuery);
  //     setSearchResults(results);
  //   }
  // }, [searchQuery, students]);

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
    setPage(0); // Reset to the first page when the query changes
  };

  // Search logic, added intake grade
  useEffect(() => {
    const modifiedStudents = students.map((student) => ({
      ...student,
      full_name: `${student.first_name} ${student.last_name}`,
      // Ensure intake_grade is a string for consistent search behavior
      intake_grade: student.intake_grade === null ? "none" : student.intake_grade.toString(),
    }));
    const fuse = new Fuse(modifiedStudents, {
      keys: ["full_name", "grade", "intake_grade"], // Include intake_grade in search keys
      threshold: 0.1,
    });
    if (!searchQuery) {
      setSearchResults([]);
    } else {
      const results = fuse.search(searchQuery);
      setSearchResults(results);
    }
  }, [searchQuery, students]);

  // const displayedStudents = searchQuery ? processedSearchResults : students;
  const displayedStudents = searchQuery ? searchResults.map((result) => result.item) : sortedStudents;

  // const [showArchived, setShowArchived] = useState(false); //state to show archived students
  // function to toggle archived viewable or not
  const handleToggleArchived = () => {
    history.push("/ArchivedStudents");
    // setShowArchived(!showArchived);
    // if (!showArchived) {
    //   dispatch({ type: "FETCH_ARCHIVED_STUDENTS" });
    // }
  };

  console.log("DISPLAY Students in list", displayedStudents);
  return (
    <>
      {/* <h1 className="text-3xl text-center mb-4">Student List </h1> */}
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">Student List</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Searchbar
          query={searchQuery}
          setQuery={handleSearchInputChange}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Students"
          otherClasses="w-1/3"
        />

        <div>
          <FormControl style={{ minWidth: 120, marginRight: "10px" }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortConfig.key || ""}
              label="Sort By"
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={toggleSortDirection} style={{ margin: "5px" }}>
            {sortConfig.direction === "ascending" ? "Asc" : "Desc"}
          </Button>
          <Button variant="outlined" onClick={clearSort} style={{ margin: "5px" }}>
            Clear
          </Button>
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Button variant="contained" color="primary" onClick={handleToggleArchived} style={{ margin: "10px" }}>
          View Archived Students
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/add-student")}
          style={{ margin: "10px" }}
        >
          {" "}
          Add Student
        </Button>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="student table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => {
                  const formattedStudent = {
                    ...student,
                    name: `${student.first_name} ${student.last_name}`,
                    age: calculateAge(student.dob),
                    city: student.city, // *** need to fix our address input then make function to pull out city and state ***
                    start_date: formatDate(student.start_date), // *** using pretest date, do we need a start date column? ***
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
    </>
  );
};

export default StudentList;
