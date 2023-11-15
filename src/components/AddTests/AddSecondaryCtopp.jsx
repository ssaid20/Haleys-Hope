import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Paper,
} from "@mui/material";

//component to add a new Secondary ctopp test
const AddSecondaryCtopp = () => {
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

  const [newCtopp, setNewCtopp] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
    elison_scaled_score: null,
    blending_words_scaled_score: null,
    phoneme_isolation_scaled_score: null,
    memory_for_digits_scaled_score: null,
    nonword_repetition_scaled_score: null,
    rapid_digit_naming_scaled_score: null,
    rapid_letter_naming_scaled_score: null,
    blending_nonwords_scaled_score: null,
    segmenting_nonwords_scaled_score: null,
    phonological_awareness_composite: null,
    phonological_memory_composite: null,
    rapid_symbolic_naming_composite: null,
    alt_phonological_awareness_composite: null,
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
    // setNewCtopp((prevCtopp) => ({
    //   ...prevCtopp,
    //   [name]: value === "" ? null : Number(value),
    // }));
    setNewCtopp((prevCtopp) => ({
      ...prevCtopp,
      [name]: value, // Use computed property name to update the state
    }));
  };

  //function to handle click of submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all inputs before submission
    const newErrors = {};
    if (!newCtopp.date) {
      newErrors.date = "Date is required";
    } else if (new Date(newCtopp.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (!newCtopp.examiner_id) {
      newErrors.examiner_id = "Examiner is required";
    }

    setValidationErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed");
      return;
    }

    dispatch({
      type: "ADD_OLDER_CTOPP",
      payload: newCtopp,
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-4 bg-primary-100">
        CTOPP-2 Over 7
      </h1>
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
                  value={newCtopp.date}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!validationErrors.date}
                  helperText={validationErrors.date}
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
                  value={newCtopp.student_id}
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
                  value={newCtopp.examiner_id}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!validationErrors.examiner_id}
                  helperText={validationErrors.examiner_id}
                />
              </FormControl>
            </Grid>

            {/* Elision Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Elision Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="elison_scaled_score"
                  name="elison_scaled_score"
                  value={newCtopp.elison_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Blending Words Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Blending Words Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="blending_words_scaled_score"
                  name="blending_words_scaled_score"
                  value={newCtopp.blending_words_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Phoneme Isolation Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Phoneme Isolation Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="phoneme_isolation_scaled_score"
                  name="phoneme_isolation_scaled_score"
                  value={newCtopp.phoneme_isolation_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Memory for Digits Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Memory for Digits Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="memory_for_digits_scaled_score"
                  name="memory_for_digits_scaled_score"
                  value={newCtopp.memory_for_digits_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Nonword Repetition Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Nonword Repetition Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="nonword_repetition_scaled_score"
                  name="nonword_repetition_scaled_score"
                  value={newCtopp.nonword_repetition_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Rapid Digit Naming Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Digit Naming Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_digit_naming_scaled_score"
                  name="rapid_digit_naming_scaled_score"
                  value={newCtopp.rapid_digit_naming_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Rapid Letter Naming Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Letter Naming Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_letter_naming_scaled_score"
                  name="rapid_letter_naming_scaled_score"
                  value={newCtopp.rapid_letter_naming_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Blending Nonwords Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Blending Nonwords Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="blending_nonwords_scaled_score"
                  name="blending_nonwords_scaled_score"
                  value={newCtopp.blending_nonwords_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Segmenting Nonwords Scaled Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Segmenting Nonwords Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="segmenting_nonwords_scaled_score"
                  name="segmenting_nonwords_scaled_score"
                  value={newCtopp.segmenting_nonwords_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Phonological Awareness Composite Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Phonological Awareness Composite:</FormLabel>
                <TextField
                  type="number"
                  id="phonological_awareness_composite"
                  name="phonological_awareness_composite"
                  value={newCtopp.phonological_awareness_composite}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Phonological Memory Composite Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Phonological Memory Composite:</FormLabel>
                <TextField
                  type="number"
                  id="phonological_memory_composite"
                  name="phonological_memory_composite"
                  value={newCtopp.phonological_memory_composite}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Rapid Symbolic Naming Composite Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Symbolic Naming Composite:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_symbolic_naming_composite"
                  name="rapid_symbolic_naming_composite"
                  value={newCtopp.rapid_symbolic_naming_composite}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Alt Phonological Awareness Composite Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Alt Phonological Awareness Composite:</FormLabel>
                <TextField
                  type="number"
                  id="alt_phonological_awareness_composite"
                  name="alt_phonological_awareness_composite"
                  value={newCtopp.alt_phonological_awareness_composite}
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

export default AddSecondaryCtopp;
