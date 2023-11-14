import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { TextField, Button, Grid, FormControl, FormLabel, Paper } from "@mui/material";

//component to add a new Gort test
const AddGort = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

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

  const [newGort, setNewGort] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
    sum_scaled_score: null,
    oral_reading_percentile_rank: null,
    oral_reading_index: null,
    rate_raw_total: null,
    accuracy_raw_total: null,
    fluency_raw_total: null,
    rate_percentile_rank: null,
    accuracy_percentile_rank: null,
    fluency_percentile_rank: null,
    comprehension_percentile_rank: null,
    comprehension_raw_total: null,
    rate_scaled_score: null,
    accuracy_scaled_score: null,
    fluency_scaled_score: null,
    comprehension_scaled_score: null,
  });
  const handleGoBack = () => {
    history.push(`/students/${student.id}`);
  };

  //function to handle inputs changing
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      return newErrors;
    });
    // setNewGort((prevCtopp) => ({
    //   ...prevCtopp,
    //   [name]: value === "" ? null : Number(value),
    // }));
    setNewGort((prevGort) => ({
      ...prevGort,
      [name]: value, // Use computed property name to update the state
    }));
  };

  //function to handle click of submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all inputs before submission
    const newErrors = {};
    if (!newGort.date) {
      newErrors.date = "Date is required";
    } else if (new Date(newGort.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (!newGort.examiner_id) {
      newErrors.examiner_id = "Examiner is required";
    }

    setValidationErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed");
      return;
    }

    dispatch({
      type: "ADD_GORT",
      payload: newGort,
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-4 bg-primary-100">GORT-5 </h1>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        GO BACK
      </Button>
      <Paper elevation={3} className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            {/* Dynamically generate Grid items for each field */}
            {Object.keys(newGort).map(key => (
              <Grid item xs={12} md={4} key={key}>
                <FormControl fullWidth>
                  <FormLabel>
                    {key
                      .split("_")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                    :
                  </FormLabel>
                  <TextField
                    type="number"
                    id={key}
                    name={key}
                    value={newGort[key]}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  {validationErrors[key] && (
                    <div className="text-red-500 text-xs italic">
                      {validationErrors[key]}
                    </div>
                  )}
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

export default AddGort;
