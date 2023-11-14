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
            {/* Dynamically generate Grid items for each field */}
            {Object.keys(newKtea).map((key) => (
              <Grid item xs={12} md={4} key={key}>
                <FormControl fullWidth>
                  <FormLabel>
                    {key
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    :
                  </FormLabel>
                  <TextField
                    type="number"
                    id={key}
                    name={key}
                    value={newKtea[key]}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
            ))}
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
