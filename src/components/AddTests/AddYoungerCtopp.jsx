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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

//component to add a new younger ctopp test
const AddYoungerCtopp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();
  const users = useSelector((store) => store.allUsersReducer.users);

  const [selectedExaminerId, setSelectedExaminerId] = useState("");
  const studentGrade = useSelector((store) => store.studentReducer.Details.grade);

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
    grade: studentGrade,
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
    rapid_non_symbolic_naming_composite: null,
    phonological_awareness_percentile: null,
    phonological_memory_percentile: null,
    rapid_symbolic_naming_percentile: null,
    rapid_non_symbolic_naming_percentile: null,
    phonological_awareness_descriptor: null,
    phonological_memory_descriptor: null,
    rapid_symbolic_naming_descriptor: null,
    rapid_non_symbolic_naming_descriptor: null,
  });

  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewCtopp((prevCtopp) => ({
      ...prevCtopp,
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

    // Ensure the examiner_id is updated
    const submissionData = {
      ...newCtopp,
      examiner_id: selectedExaminerId,
    };

    dispatch({
      type: "ADD_YOUNGER_CTOPP",
      payload: submissionData,
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Test added", severity: "success" } });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  return (
    <>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        GO BACK
      </Button>
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">Add CTOPP 4-6</h1>

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

            {/* Examiner ID Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Examiner</FormLabel>
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
                  value={newCtopp.grade}
                  onChange={handleChange}
                  variant="outlined"
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
            {/* Rapid Color Naming Scaled Score*/}
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
            {/* Blending Non-Words Scaled Score*/}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Blending Non-Words Scaled Score:</FormLabel>
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
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>&lt; or &gt; for Phonological Awareness</FormLabel>
                <Select
                  labelId="phonological-awareness-label"
                  id="phonological_awareness_descriptor"
                  value={newCtopp.phonological_awareness_descriptor || ""}
                  label="phonological_awareness_descriptor"
                  onChange={(event) =>
                    setNewCtopp({ ...newCtopp, phonological_awareness_descriptor: event.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>{" "}
                  {/* Optional: Allow no selection */}
                  <MenuItem value="<">&lt;</MenuItem>
                  <MenuItem value=">">&gt;</MenuItem>
                </Select>
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
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Phonological Memory</FormLabel>

                <Select
                  labelId="phonological-memory-label"
                  id="phonological_memory_descriptor"
                  value={newCtopp.phonological_memory_descriptor || ""}
                  label="phonological_memory_descriptor"
                  onChange={(event) =>
                    setNewCtopp({ ...newCtopp, phonological_memory_descriptor: event.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>{" "}
                  {/* Optional: Allow no selection */}
                  <MenuItem value="<">&lt;</MenuItem>
                  <MenuItem value=">">&gt;</MenuItem>
                </Select>
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
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Rapid Symbolic Naming</FormLabel>

                <Select
                  labelId="rapid-symbolic-label"
                  id="rapid_symbolic_naming_descriptor"
                  value={newCtopp.rapid_symbolic_naming_descriptor || ""}
                  label="rapid_symbolic_naming_descriptor"
                  onChange={(event) =>
                    setNewCtopp({ ...newCtopp, rapid_symbolic_naming_descriptor: event.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>{" "}
                  {/* Optional: Allow no selection */}
                  <MenuItem value="<">&lt;</MenuItem>
                  <MenuItem value=">">&gt;</MenuItem>
                </Select>
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
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Rapid Non-Symbolic Naming</FormLabel>

                <Select
                  labelId="rapid-nonsymbolic-label"
                  id="rapid_non_symbolic_naming_descriptor"
                  value={newCtopp.rapid_non_symbolic_naming_descriptor || ""}
                  label="rapid_non_symbolic_naming_descriptor"
                  onChange={(event) =>
                    setNewCtopp({ ...newCtopp, rapid_non_symbolic_naming_descriptor: event.target.value })
                  }
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>{" "}
                  {/* Optional: Allow no selection */}
                  <MenuItem value="<">&lt;</MenuItem>
                  <MenuItem value=">">&gt;</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Rapid Non-symbolic Naming Composite */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Non-Symbolic Naming Composite:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_non_symbolic_naming_composite"
                  name="rapid_non_symbolic_naming_composite"
                  value={newCtopp.rapid_non_symbolic_naming_composite}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Phonological Awareness Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Phonological Awareness Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="phonological_awareness_percentile"
                  name="phonological_awareness_percentile"
                  value={newCtopp.phonological_awareness_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Phonological Memory Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Phonological Memory Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="phonological_memory_percentile"
                  name="phonological_memory_percentile"
                  value={newCtopp.phonological_memory_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Rapid Symbolic Naming Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Symbolic Naming Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_symbolic_naming_percentile"
                  name="rapid_symbolic_naming_percentile"
                  value={newCtopp.rapid_symbolic_naming_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Rapid Non-Symbolic Naming Percentile */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Rapid Non-Symbolic Naming Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="rapid_non_symbolic_naming_percentile"
                  name="rapid_non_symbolic_naming_percentile"
                  value={newCtopp.rapid_non_symbolic_naming_percentile}
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

export default AddYoungerCtopp;
