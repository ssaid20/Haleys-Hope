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
import { useHistory } from "react-router-dom";
import { Button } from "../ui/button";
import { Button as MUIButton } from "@mui/material";
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

// Define the columns for the user table
const columns = [
  { id: "username", label: "Username", minWidth: 170 },
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
  { id: "role_id", label: "Role", minWidth: 100 },
];
// function to see and manage all users
const ManageUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((store) => store.allUsersReducer.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showArchivedUsers, setShowArchivedUsers] = useState(false);
  const archivedUsers = useSelector((store) => store.allUsersReducer.archivedUsers);
  console.log("logging archived users", archivedUsers);
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
    dispatch({ type: "FETCH_ARCHIVED_USERS" });
  }, []);

  //handles pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //updated input change with id being a number
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // If the input is 'role_id', convert the value to a number
    const updatedValue = id === "role_id" ? parseInt(value, 10) : value;
    setFormData({ ...formData, [id]: updatedValue });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // New state to control the visibility of the Sheet
  const [editingUserId, setEditingUserId] = useState(null);

  // Modified handleEditClick function
  const handleEditClick = (user) => {
    console.log("Edit clicked for user:", user.id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      role_id: user.role_id,
      password: user.password,
    });
    setEditingUserId(user.id); // Set the editing user's ID
  }; // end handleEditClick

  console.log("logging Users in manage users", users);

  // State to hold form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role_id: "",
    password: "",
  });

  // Adjusted handleSubmit function
  const handleSubmit = () => {
    console.log("Submitting for user:", editingUserId);
    dispatch({
      type: "UPDATE_USER",
      payload: { id: editingUserId, ...formData },
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "User Updated", severity: "success" } });

    setEditingUserId(null); // Close the sheet after submitting
  }; // end handleSubmit

  // Function to toggle the display of archived users
  const toggleArchivedUsers = () => {
    setShowArchivedUsers(!showArchivedUsers);
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

  //mapping role id to role name
  const roleMapping = {
    1: "Deactivated",
    2: "Academic Assessment Coordinator",
    3: "Dyslexia Specialist",
    4: "Literacy Coach Manager",
    5: "Lead Performing Agent",
    6: "Admin",
  };

  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Function to open the sheet for changing password
  const handleOpenPasswordSheet = (userId) => {
    setSelectedUserId(userId);
    setIsPasswordSheetOpen(true);
    console.log("pass selected user id:", selectedUserId);
  };

  // Function to handle password change submission
  const handleSubmitPasswordChange = (newPassword) => {
    console.log("New Password for user", selectedUserId, ":", newPassword);
    // dispatch an action to update the password in backend
    setIsPasswordSheetOpen(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">Manage Users </h1>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label="user table">
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
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                const formattedUser = {
                  ...user,
                  first_name: `${user.first_name}`,
                  last_name: `${user.last_name}`,
                  role_id: `${user.role_id}`,
                };

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    {columns.map((column) => {
                      let value = user[column.id];
                      if (column.id === "role_id") {
                        value = roleMapping[value] || "Unknown Role"; // Translate role_id to role name
                      }
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
                        <span>
                          <EditIcon /> &nbsp; Edit User
                        </span>
                      </Button>
                      {/* Change Password Button */}
                      <Button
                        onClick={() => handleOpenPasswordSheet(user.id)}
                        variant="outline"
                        className=" text-m px-5 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                      >
                        Change Password
                      </Button>
                    </TableCell>
                    {console.log("Sheet should open:", Boolean(editingUserId))} {/* Password Change Modal */}
                    {/* Password Change Sheet */}
                    {isPasswordSheetOpen && (
                      <Sheet open={isPasswordSheetOpen} onOpenChange={setIsPasswordSheetOpen}>
                        <SheetContent side="top" style={sheetStyle}>
                          {/* ... Sheet header and description */}

                          <SheetHeader>
                            <SheetTitle>Edit User Password</SheetTitle>
                            <SheetDescription>Change The User's Password Here.</SheetDescription>
                          </SheetHeader>
                          <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Label htmlFor="password">Password</Label>
                              <Input
                                type="password"
                                placeholder="Enter new password"
                                // Add onChange handler as needed
                              />
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button
                                onClick={() => handleSubmitPasswordChange(/* Get new password value here */)}
                                type="submit"
                                className="bg-primary-500 text-white"
                              >
                                Submit New Password
                              </Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    )}
                    {editingUserId && (
                      <Sheet open={Boolean(editingUserId)} onOpenChange={setEditingUserId}>
                        <SheetContent side="top" style={sheetStyle}></SheetContent>
                        <SheetContent side="top" style={sheetStyle}>
                          <SheetHeader>
                            <SheetTitle>Edit User</SheetTitle>
                            <SheetDescription>Make changes to the user's profile here.</SheetDescription>
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
                              {/* <Label htmlFor="Role">Role</Label>
                                <Input
                                  id="grade"
                                  type="number"
                                  value={formData.role_id}
                                  onChange={handleInputChange}
                                /> */}
                              <Label htmlFor="role">Role</Label>
                              <select id="role_id" value={formData.role_id} onChange={handleInputChange}>
                                <option value="1">Deactivated</option>
                                <option value="2">Academic Assessment Coordinator</option>
                                <option value="3">Dyslexia Specialist</option>
                                <option value="4">Literacy Coach Manager</option>
                                <option value="5">Lead Performing Agent</option>
                                <option value="6">Admin</option>
                              </select>
                            </div>
                          </div>
                          <SheetFooter>
                            <SheetClose asChild>
                              <Button
                                onClick={handleSubmit}
                                type="submit"
                                className="bg-primary-500 text-white"
                              >
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
      {/* this button opens up a table of archived users */}
      {/* <Button onClick={toggleArchivedUsers}>
        {showArchivedUsers ? "Hide Archived Users" : "Show Archived Users"}
      </Button> */}
      <MUIButton variant="contained" color="primary" onClick={toggleArchivedUsers} style={{ margin: "10px" }}>
        {showArchivedUsers ? "Hide Archived Users" : "Show Archived Users"}
      </MUIButton>
      {showArchivedUsers && (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="archived user table">
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
                {archivedUsers.map((user) => {
                  const formattedUser = {
                    ...user,
                    first_name: `${user.first_name}`,
                    last_name: `${user.last_name}`,
                    role_id: `${user.role_id}`,
                  };

                  return (
                    // <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    //   {columns.map((column) => {
                    //     const value = formattedUser[column.id];
                    //     return (
                    //       <TableCell key={column.id} align={column.align}>
                    //         {value}
                    //       </TableCell>
                    //     );
                    //   })}
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                      {columns.map((column) => {
                        let value = user[column.id];
                        if (column.id === "role_id") {
                          value = roleMapping[value] || "Unknown Role"; // Translate role_id to role name
                        }
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
                          <span>
                            <EditIcon /> &nbsp; Edit User
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
}; // end manageUsers

export default ManageUsers;
