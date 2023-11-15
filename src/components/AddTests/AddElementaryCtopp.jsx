import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { TextField, Button, FormControl, FormLabel, Paper, Grid } from "@mui/material";

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
      <h1 className="text-3xl text-center mb-4 bg-primary-100">CTOPP-2 Under 7</h1>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4 bg-primary-500">
        GO BACK
      </Button>
      <Paper elevation={3} className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            {/* Adjusting each Grid item to take 4 columns on medium screens */}
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

            {/* Map other fields */}
            {Object.keys(newCtopp).map(key => key !== "student_id" && (
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
                    value={newCtopp[key]}
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
