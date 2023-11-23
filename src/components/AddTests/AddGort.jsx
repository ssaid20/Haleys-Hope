import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Paper,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

//component to add a new Gort test
const AddGort = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();
  const studentGrade = useSelector((store) => store.studentReducer.Details.grade);

  const users = useSelector((store) => store.allUsersReducer.users);

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

  const [selectedExaminerId, setSelectedExaminerId] = useState("");

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
    grade: studentGrade,
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

  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewGort((prevGort) => ({
      ...prevGort,
      examiner_id: examinerId,
    }));
  };

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
    // setNewGort((prevGort) => ({
    //   ...prevGort,
    //   [name]: value, // Use computed property name to update the state
    // }));
    setNewGort((prevGort) => {
      // Update values based on input type
      let updatedValue;
      if (name === "date") {
        updatedValue = value; // For non-numeric fields like date
      } else {
        updatedValue = value === "" ? null : Number(value); // Convert to number for numeric fields
      }

      const updatedValues = {
        ...prevGort,
        [name]: updatedValue,
      };

      // Update sum scaled score for relevant changes
      if (
        [
          "rate_scaled_score",
          "accuracy_scaled_score",
          "fluency_scaled_score",
          "comprehension_scaled_score",
        ].includes(name)
      ) {
        const sum = [
          "rate_scaled_score",
          "accuracy_scaled_score",
          "fluency_scaled_score",
          "comprehension_scaled_score",
        ].reduce((acc, field) => acc + (updatedValues[field] || 0), 0); // Calculate sum

        updatedValues.sum_scaled_score = sum; // Update sum scaled score
      }

      return updatedValues;
    });
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

    // Ensure the examiner_id is updated
    const submissionData = {
      ...newGort,
      examiner_id: selectedExaminerId,
    };

    dispatch({
      type: "ADD_GORT",
      payload: submissionData,
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Test added", severity: "success" } });

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
            {/* Date Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Date:</FormLabel>
                <TextField
                  type="date"
                  id="date"
                  name="date"
                  value={newGort.date}
                  onChange={handleChange}
                  variant="outlined"
                />
                {validationErrors.date && (
                  <div className="text-red-500 text-xs italic">{validationErrors.date}</div>
                )}
              </FormControl>
            </Grid>

            {/* Examiner ID Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Examiner</InputLabel>
                <Select value={selectedExaminerId} label="Examiner" onChange={handleExaminerChange}>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Rate Raw Total */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rate Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="rate_raw_total"
                  name="rate_raw_total"
                  value={newGort.rate_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Rate Percentile Rank */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rate Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="rate_percentile_rank"
                  name="rate_percentile_rank"
                  value={newGort.rate_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Rate Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rate Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="rate_scaled_score"
                  name="rate_scaled_score"
                  value={newGort.rate_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Accuracy Raw Total */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Accuracy Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="accuracy_raw_total"
                  name="accuracy_raw_total"
                  value={newGort.accuracy_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Accuracy Percentile Rank */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Accuracy Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="accuracy_percentile_rank"
                  name="accuracy_percentile_rank"
                  value={newGort.accuracy_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Accuracy Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Accuracy Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="accuracy_scaled_score"
                  name="accuracy_scaled_score"
                  value={newGort.accuracy_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Fluency Raw Total */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fluency Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="fluency_raw_total"
                  name="fluency_raw_total"
                  value={newGort.fluency_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Fluency Percentile Rank */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fluency Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="fluency_percentile_rank"
                  name="fluency_percentile_rank"
                  value={newGort.fluency_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Fluency Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fluency Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="fluency_scaled_score"
                  name="fluency_scaled_score"
                  value={newGort.fluency_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Comprehension Raw Total */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Comprehension Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="comprehension_raw_total"
                  name="comprehension_raw_total"
                  value={newGort.comprehension_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Comprehension Percentile Rank */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Comprehension Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="comprehension_percentile_rank"
                  name="comprehension_percentile_rank"
                  value={newGort.comprehension_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Comprehension Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Comprehension Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="comprehension_scaled_score"
                  name="comprehension_scaled_score"
                  value={newGort.comprehension_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Sum Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sum Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="sum_scaled_score"
                  name="sum_scaled_score"
                  value={newGort.sum_scaled_score || ""} // Handle null or undefined
                  onChange={handleChange}
                  variant="filled"
                  disabled
                  InputProps={{
                    readOnly: true, // Make the field read-only
                  }}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </FormControl>
            </Grid>

            {/* Oral Reading Percentile Rank */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Oral Reading Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="oral_reading_percentile_rank"
                  name="oral_reading_percentile_rank"
                  value={newGort.oral_reading_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Oral Reading Index */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Oral Reading Index:</FormLabel>
                <TextField
                  type="number"
                  id="oral_reading_index"
                  name="oral_reading_index"
                  value={newGort.oral_reading_index}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" className="mt-4">
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default AddGort;
