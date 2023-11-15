import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  Paper,
  Grid,
} from "@mui/material";

//component to add a new elementary ctopp test
const AddElementaryCtopp = () => {
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
    sound_matching_scaled_score: null,
    memory_for_digits_scaled_score: null,
    nonword_repetition_scaled_score: null,
    rapid_digit_naming_scaled_score: null,
    rapid_letter_naming_scaled_score: null,
    rapid_color_naming_scaled_score: null,
    rapid_object_naming: null,
    blending_nonwords_scaled_score: null,
    phonological_awareness_composite: null,
    phonological_memory_composite: null,
    rapid_symbolic_naming_composite: null,
    rapid_non_symbolic_naming: null,
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
      type: "ADD_YOUNGER_CTOPP",
      payload: newCtopp,
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };
  return (
    <>
      <h1 className="text-3xl text-center mb-4 bg-primary-100">
        CTOPP-2 Under 7
      </h1>
      <Button
        variant="outlined"
        onClick={handleGoBack}
        className="mb-4 bg-primary-500"
      >
        GO BACK
      </Button>
      <Paper elevation={3} className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            {/* Individual Grid Items for Each Field */}
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
                />
                {validationErrors.date && (
                  <div className="text-red-500 text-xs italic">
                    {validationErrors.date}
                  </div>
                )}
              </FormControl>
            </Grid>

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
                />
                {validationErrors.examiner_id && (
                  <div className="text-red-500 text-xs italic">
                    {validationErrors.examiner_id}
                  </div>
                )}
              </FormControl>
            </Grid>

            {/* Repeat for other fields in newCtopp */}
            {/* Elison Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Elison Scaled Score:</FormLabel>
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

            {/* Blending Words Scaled Score */}
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

            {/* Sound Matching Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sound Matching Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="sound_matching_scaled_score"
                  name="sound_matching_scaled_score"
                  value={newCtopp.sound_matching_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Memory For Digits Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Memory For Digits Scaled Score:</FormLabel>
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

            {/* Nonword Repetition Scaled Score */}
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

            {/* Rapid Digit Naming Scaled Score */}
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

            {/* Rapid Letter Naming Scaled Score */}
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

            {/* Rapid Color Naming Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Color Naming Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_color_naming_scaled_score"
                  name="rapid_color_naming_scaled_score"
                  value={newCtopp.rapid_color_naming_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Rapid Object Naming */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Object Naming:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_object_naming"
                  name="rapid_object_naming"
                  value={newCtopp.rapid_object_naming}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Blending Nonwords Scaled Score */}
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

            {/* Phonological Awareness Composite */}
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

            {/* Phonological Memory Composite */}
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

            {/* Rapid Symbolic Naming Composite */}
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

            {/* Rapid Non Symbolic Naming */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Non Symbolic Naming:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_non_symbolic_naming"
                  name="rapid_non_symbolic_naming"
                  value={newCtopp.rapid_non_symbolic_naming}
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

export default AddElementaryCtopp;
// newYCtopp.elison_scaled_score,
// newYCtopp.blending_words_scaled_score,
// newYCtopp.sound_matching_scaled_score,
// newYCtopp.memory_for_digits_scaled_score,
// newYCtopp.nonword_repetition_scaled_score,
// newYCtopp.rapid_digit_naming_scaled_score,
// newYCtopp.rapid_letter_naming_scaled_score,
// newYCtopp.rapid_color_naming_scaled_score,
// newYCtopp.rapid_object_naming,
// newYCtopp.blending_nonwords_scaled_score,
// newYCtopp.phonological_awareness_composite,
// newYCtopp.phonological_memory_composite,
// newYCtopp.rapid_symbolic_naming_composite,
