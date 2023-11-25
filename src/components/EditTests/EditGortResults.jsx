import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { formatDate, formatDate2, formatDateForInput } from "../../lib/utils";
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

const EditGortResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedTest = useSelector((store) => store.gortReducer.selectedTest[0]);
  const users = useSelector((store) => store.allUsersReducer.users);
  const student = useSelector((store) => store.user);

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_GORT_RESULTS", payload: testId.id });
  }, [dispatch]);
  useEffect(() => {
    if (selectedTest) {
      setNewGort({
        ...selectedTest,
        date: formatDateForInput(selectedTest.date), // Assuming formatDate converts the date to the required format
      });
      setSelectedExaminerId(selectedTest.examiner_id.toString());
    }
  }, [selectedTest]);
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
    grade: "",
  });
  const [selectedExaminerId, setSelectedExaminerId] = useState("");
  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewGort((prevGort) => ({
      ...prevGort,
      examiner_id: examinerId,
    }));
  };

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = { ...newGort };
    // Handle date field separately
    if (name === "date") {
      updatedValue[name] = value;
    } else {
      // Check if the value is not an empty string
      if (value !== "") {
        // Convert to number if the field is numeric and not empty
        updatedValue[name] = parseInt(value, 10);
      } else {
        // If the field is empty, set it to an empty string
        updatedValue[name] = value;
      }

      // Calculate sum of scaled scores
      if (
        [
          "rate_scaled_score",
          "accuracy_scaled_score",
          "fluency_scaled_score",
          "comprehension_scaled_score",
        ].includes(name)
      ) {
        updatedValue.sum_scaled_score =
          (updatedValue.rate_scaled_score || 0) +
          (updatedValue.accuracy_scaled_score || 0) +
          (updatedValue.fluency_scaled_score || 0) +
          (updatedValue.comprehension_scaled_score || 0);
      }
    }
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Validate date
      if (name === "date") {
        if (!value) {
          newErrors.date = "Date is required";
        } else if (new Date(value) > new Date()) {
          newErrors.date = "Date cannot be in the future";
        } else {
          newErrors.date = "";
        }
      }
      //validate examiner id
      if (name === "examiner_id") {
        if (!value) {
          newErrors.examiner_id = "Examiner is required";
        } else {
          newErrors.examiner_id = "";
        }
      }

      return newErrors;
    });
    setNewGort(updatedValue);
  }; //end handle change

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

    const submissionData = {
      ...newGort,
      examiner_id: selectedExaminerId,
    };

    dispatch({
      type: "UPDATE_GORT",
      payload: { ...submissionData, id: testId.id },
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Successfully Saved", severity: "success" } });

    history.push(`/students/${selectedTest.student_id}`);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  if (!selectedTest) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {/* <h1 className="text-2xl text-center mb-4">
        Test on: {formatDate(selectedTest.date)}{" "}
      </h1> */}
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        Go Back
      </Button>
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">
        {" "}
        Edit GORT from: {formatDate2(selectedTest.date)}{" "}
      </h1>
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
              </FormControl>
            </Grid>
            {/* Examiner ID Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Examiner:</FormLabel>
                <Select value={selectedExaminerId} onChange={handleExaminerChange}>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Grade Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Grade:</FormLabel>
                <TextField
                  type="number"
                  id="grade"
                  name="grade"
                  value={newGort.grade}
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
                  value={newGort.sum_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
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
          </Grid>

          <Button type="submit" variant="contained" color="primary" className="mt-4">
            Save Changes
          </Button>
          <Button onClick={handleGoBack}>Go Back</Button>
        </form>
      </Paper>
    </>
  );
};

export default EditGortResults;
