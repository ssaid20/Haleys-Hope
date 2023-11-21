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
import ArchivedStudentList from "../ArchivedStudentList/ArchivedStudentList";
import Button from "@mui/material/Button";
import SearchBar from "../shared/SearchBar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import SortIcon from "@mui/icons-material/Sort";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Popper from "@mui/material/Popper";

const columns = [
  // { id: "id", label: "ID", minWidth: 100 }, // took id out student list
  { id: "picture", label: "Picture", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "age", label: "Age", minWidth: 80 },
  { id: "grade", label: "Grade", minWidth: 80 },
  { id: "city", label: "City", minWidth: 150 },
  { id: "state", label: "State", minWidth: 150 },
  { id: "start_date", label: "Start Date", minWidth: 130 },
];

const sortOptions = [
  { value: "full_name", label: "Full Name" },
  { value: "first_name", label: "First Name" },
  { value: "last_name", label: "Last Name" },
  { value: "age", label: "Age" },
  { value: "grade", label: "Grade" },
  { value: "city", label: "City" },
  { value: "state", label: "State" },
  { value: "start_date", label: "Start Date" },
  // ... other sort options ...
];

const CustomTooltip = ({ title, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMouseEnter = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        style={{ zIndex: 1 }}
      >
        <div
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #dadde9",
            padding: "10px",
            fontSize: "1.5rem",
            borderRadius: "4px",
          }}
        >
          {title}
        </div>
      </Popper>
    </div>
  );
};

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

  // const handleSortChange = (event) => {
  //   setSortConfig({ key: event.target.value, direction: sortConfig.direction });
  // };
  const handleSortChange = (event) => {
    setSortConfig({ ...sortConfig, key: event.target.value });
  };

  const toggleSortDirection = () => {
    setSortConfig({
      ...sortConfig,
      direction:
        sortConfig.direction === "ascending" ? "descending" : "ascending",
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
  useEffect(() => {
    const modifiedStudents = students.map((student) => ({
      ...student,
      full_name: `${student.first_name} ${student.last_name}`,
    }));
    const fuse = new Fuse(modifiedStudents, {
      keys: ["full_name", "grade"],
      threshold: 0.1,
    });
    if (!searchQuery) {
      setSearchResults([]);
    } else {
      const results = fuse.search(searchQuery);
      setSearchResults(results);
    }
  }, [searchQuery, students]);

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
    setPage(0); // Reset to the first page when the query changes
  };

  // const displayedStudents = searchQuery ? processedSearchResults : students;
  const displayedStudents = searchQuery
    ? searchResults.map((result) => result.item)
    : sortedStudents;

  const [showArchived, setShowArchived] = useState(false); //state to show archived students
  // function to toggle archived viewable or not
  const handleToggleArchived = () => {
    setShowArchived(!showArchived);
    if (!showArchived) {
      dispatch({ type: "FETCH_ARCHIVED_STUDENTS" });
    }
  };

  console.log("DISPLAY Students in list", displayedStudents);
  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
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
        <Tooltip title="Toggle between ascending and descending sort order">
          <span>
            <IconButton
              onClick={toggleSortDirection}
              disabled={!sortConfig.key}
            >
              <SortIcon color={sortConfig.key ? "primary" : "disabled"} />
            </IconButton>
          </span>
        </Tooltip>
        <CustomTooltip title="Clear current sort settings">
          <IconButton onClick={clearSort}>
            <ClearIcon />
          </IconButton>
        </CustomTooltip>
      </div>
      <div className="mb-8">
        <SearchBar
          query={searchQuery}
          setQuery={handleSearchInputChange} // Updated to use the revised function
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Students"
          otherClasses="w-full"
        />
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleToggleArchived}
          style={{ margin: "10px" }}
        >
          {showArchived ? "View Active Students" : "View Archived Students"}
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
                    start_date: formatDate(student.barton_c_date), // *** using pretest date, do we need a start date column? ***
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
        {showArchived ? <ArchivedStudentList /> : null}
      </Paper>
    </>
  );
};

export default StudentList;
