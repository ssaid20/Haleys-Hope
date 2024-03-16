import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { formatDate2, formatDateForInput } from "../../lib/utils";
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

const EditOlderCtoppResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedTest = useSelector((store) => store.olderCtoppReducer.selectedTest[0]);
  const users = useSelector((store) => store.allUsersReducer.users);
  const student = useSelector((store) => store.user);

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_OLDER_CTOPP_RESULTS", payload: testId.id });
  }, [dispatch]);
  useEffect(() => {
    if (selectedTest) {
      //   setNewCtopp(selectedTest);
      // }if (selectedTest) {
      setNewCtopp({
        ...selectedTest,
        date: formatDateForInput(selectedTest.date), // Assuming formatDate converts the date to the required format
      });
      setSelectedExaminerId(selectedTest.examiner_id.toString());
    }
  }, [selectedTest]);
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
    phonological_awareness_percentile: null,
    phonological_memory_percentile: null,
    rapid_symbolic_naming_percentile: null,
    alt_phonological_awareness_percentile: null,
    grade: "",
    phonological_awareness_descriptor: null,
    phonological_memory_descriptor: null,
    rapid_symbolic_naming_descriptor: null,
    alt_phonological_awareness_descriptor: null,
  });
  const [selectedExaminerId, setSelectedExaminerId] = useState("");
  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewCtopp((prevCtopp) => ({
      ...prevCtopp,
      examiner_id: examinerId,
    }));
  };

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = { ...newCtopp };
    // Handle date field separately
    if (name === "date") {
      updatedValue[name] = value;
    } else {
      // Convert to number if the field is numeric
      // Check if the value is not an empty string
      if (value !== "") {
        // Convert to number if the field is numeric and not empty
        updatedValue[name] = parseInt(value, 10);
      } else {
        // If the field is empty, set it to an empty string
        updatedValue[name] = value;
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
    setNewCtopp(updatedValue);
  }; //end handle change

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

    const submissionData = {
      ...newCtopp,
      examiner_id: selectedExaminerId,
    };
    console.log("update ctopp edit page, sub data, testId", submissionData, testId.id);
    dispatch({
      type: "UPDATE_OLDER_CTOPP",
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
        Edit CTOPP Age 7-24 from: {formatDate2(selectedTest.date)}{" "}
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
                  value={newCtopp.date}
                  onChange={handleChange}
                  variant="outlined"
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

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>&lt; or &gt; for Phonological Awareness</FormLabel>
                <Select
                  labelId="phonological-awareness-composite-descriptor-label"
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
                <FormLabel>&lt; or &gt; for Phonological Memory</FormLabel>
                <Select
                  labelId="phonological-awareness-memory-descriptor-label"
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
                <FormLabel>&lt; or &gt; for Rapid Symbolic Naming</FormLabel>
                <Select
                  labelId="rapid-symbolic-naming-descriptor-label"
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
                <FormLabel>&lt; or &gt; for Alt Phonological Awareness</FormLabel>
                <Select
                  labelId="rapid-symbolic-naming-descriptor-label"
                  id="alt_phonological_awareness_descriptor"
                  value={newCtopp.alt_phonological_awareness_descriptor || ""}
                  label="alt_phonological_awareness_descriptor"
                  onChange={(event) =>
                    setNewCtopp({ ...newCtopp, alt_phonological_awareness_descriptor: event.target.value })
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
            {/* Alt Phonological Awareness Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Alt Phonological Awareness Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="alt_phonological_awareness_percentile"
                  name="alt_phonological_awareness_percentile"
                  value={newCtopp.alt_phonological_awareness_percentile}
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

export default EditOlderCtoppResults;
