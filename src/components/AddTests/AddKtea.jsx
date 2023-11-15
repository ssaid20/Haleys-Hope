import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";

//component to add a new KTEA test
const AddKtea = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();
  console.log("student", student);

  // const todayDate = new Date().toISOString().split("T")[0]; //function to get todays date to auto populate

  useEffect(() => {
    if (student) {
      dispatch({ type: "FETCH_STUDENT", payload: student });
    }
  });
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  });
  useEffect(() => {
    handleGoBack;
  });

  const [newKtea, setKtea] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
    lwr_scaled_score: "",
    lwr_percentile: "",
    spelling_scaled_score: "",
    spelling_percentile: "",
  });
  const handleGoBack = () => {
    history.push(`/students/${student.id}`);
  };

  //function to handle inputs changing
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = { ...newKtea };
    // Handle date field separately
    if (name === "date") {
      updatedValue[name] = value;
    } else {
      // Convert to number if the field is numeric
      updatedValue[name] = value ? parseInt(value, 10) : 0;

      // Convert to number if the field is numeric
      updatedValue[name] = value ? parseInt(value, 10) : 0;
    }
    setKtea(updatedValue);
  };
  //function to handle click of submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New KTEA Entry:", newKtea);
    dispatch({
      type: "ADD_KTEA",
      payload: newKtea,
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-4 bg-primary-100">KTEA</h1>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        GO BACK
      </Button>
      <Paper elevation={3} className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            {/* Date Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Date:</FormLabel>
                <TextField
                  type="date"
                  id="date"
                  name="date"
                  value={newKtea.date}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Student ID Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Student ID:</FormLabel>
                <TextField
                  type="number"
                  id="student_id"
                  name="student_id"
                  value={newKtea.student_id}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Examiner ID Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Examiner ID:</FormLabel>
                <TextField
                  type="number"
                  id="examiner_id"
                  name="examiner_id"
                  value={newKtea.examiner_id}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* LWR Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Letter and Word Recognition Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="lwr_scaled_score"
                  name="lwr_scaled_score"
                  value={newKtea.lwr_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* LWR Percentile */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Letter and Word Recognition Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="lwr_percentile"
                  name="lwr_percentile"
                  value={newKtea.lwr_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Spelling Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_scaled_score"
                  name="spelling_scaled_score"
                  value={newKtea.spelling_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Spelling Percentile */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_percentile"
                  name="spelling_percentile"
                  value={newKtea.spelling_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default AddKtea;
