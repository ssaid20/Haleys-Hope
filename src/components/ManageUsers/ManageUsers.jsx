import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils"; // Assuming you have a similar utility for users
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import { Button } from "../ui/button";
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

///*******  need to move edit button to each user and tie their id  */
// Define the columns for the user table
const columns = [
  { id: "username", label: "Username", minWidth: 170 },
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
  { id: "role_id", label: "Role", minWidth: 100 },
];

const ManageUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((store) => store.allUsersReducer.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
    return () => console.log("blah blah blah");
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.id, e.target.value);
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to close the Sheet and reset editing user
  const handleCloseSheet = () => {
    setEditingUserId(null);
  };

  // New state to control the visibility of the Sheet
  const [editingUserId, setEditingUserId] = useState(null);

  // Modified handleEditClick function
  const handleEditClick = (user) => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      role_id: user.role_id,
    });
    setEditingUserId(user.id); // Set the editing user's ID
  };

  console.log("logging Users in manage users", users);

  // State to hold form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role_id: "",
  });

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_USER",
      payload: { id: userId, ...formData },
    });
  };

  useEffect(() => {
    if (users) {
      setFormData({
        first_name: users.first_name || "",
        last_name: users.last_name || "",
        role_id: users.role_id || "",
      });
    }
  }, [users]);

  return (
    <div>
      <div>
        <h1>hello world</h1>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="user table">
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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  const formattedUser = {
                    ...user,
                    first_name: `${user.first_name}`,
                    last_name: `${user.last_name}`,
                    role_id: `${user.role_id}`,
                  };

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                      {columns.map((column) => {
                        const value = formattedUser[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button
                          onClick={() => handleEditClick(user)}
                          variant="outline"
                          className=" text-m px-5 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                        >
                          <img
                            src="/assets/icons/edit.svg"
                            alt="Edit Icon"
                            className="w-4 h-4"
                          />
                          <span>Edit User</span>
                        </Button>
                      </TableCell>
                      {editingUserId === user.id && (
                        <Sheet isOpen={editingUserId === user.id}>
                          <SheetTrigger asChild></SheetTrigger>
                          <SheetContent side="top" style={sheetStyle}>
                            <SheetHeader>
                              <SheetTitle>Edit User</SheetTitle>
                              <SheetDescription>
                                Make changes to the user's profile here.
                              </SheetDescription>
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
                                <Input
                                  id="last_name"
                                  value={formData.last_name}
                                  onChange={handleInputChange}
                                />

                                <Label htmlFor="Role">Role</Label>
                                <Input
                                  id="grade"
                                  type="number"
                                  value={formData.role_id}
                                  onChange={handleInputChange}
                                />

                                <Label htmlFor="pretestPassed">Role</Label>
                                <select
                                  id="role_id"
                                  value={formData.role_id}
                                  onChange={handleInputChange}
                                >
                                  <option value="academic_assessment_coordinator">
                                    Academic Assessment Coordinator
                                  </option>
                                  <option value="dyslexia_specialist">
                                    Dyslexia Specialist
                                  </option>
                                  <option value="literacy_coach_manager">
                                    Literacy Coach Manager
                                  </option>
                                  <option value="lead_performing_agent">
                                    Literacy Performing Agent
                                  </option>
                                  <option value="admin">Admin</option>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ManageUsers;
