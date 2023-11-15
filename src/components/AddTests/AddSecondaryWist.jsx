import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { TextField, Button, Grid, FormControl, FormLabel, Paper } from "@mui/material";
import "./AddElementaryWist.css";

//component to add a new secondary wist test
const AddSecondaryWist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

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

  const [newWist, setNewWist] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
    read_regular_words: null,
    read_irregular_words: null,
    word_identification: null,
    word_identification_percentile: null,
    word_identification_standard_score: null,
    spell_regular_words: null,
    spell_irregular_words: null,
    spelling: null,
    spelling_percentile: null,
    spelling_standard_score: null,
    fundamental_literacy: null,
    fundamental_literacy_percentile: null,
    fundamental_literacy_standard_score: null,
    pseudo_words: null,
    letter_sounds: null,
    sound_symbol_knowledge: null,
    sound_symbol_knowledge_percentile: null,
    sound_symbol_knowledge_standard_score: null,
  });
  const handleGoBack = () => {
    history.push(`/students/${student.id}`);
  };

  //function to handle inputs changing
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = { ...newWist };
    // Handle date field separately
    if (name === "date") {
      updatedValue[name] = value;
    } else {
      // Convert to number if the field is numeric
      updatedValue[name] = value ? parseInt(value, 10) : 0;

      // Convert to number if the field is numeric
      updatedValue[name] = value ? parseInt(value, 10) : 0;

      // Calculate word identification
      if (name === "read_regular_words" || name === "read_irregular_words") {
        updatedValue.word_identification =
          (updatedValue.read_regular_words || 0) +
          (updatedValue.read_irregular_words || 0);
      }

      // Calculate spelling
      if (name === "spell_regular_words" || name === "spell_irregular_words") {
        updatedValue.spelling =
          (updatedValue.spell_regular_words || 0) +
          (updatedValue.spell_irregular_words || 0);
      }

      // Calculate fundamental literacy
      if (
        name === "read_regular_words" ||
        name === "read_irregular_words" ||
        name === "spell_regular_words" ||
        name === "spell_irregular_words"
      ) {
        updatedValue.fundamental_literacy =
          (updatedValue.word_identification || 0) +
          (updatedValue.spelling || 0);
      }

      // Calculate sound symbol knowledge
      if (name === "pseudo_words" || name === "letter_sounds") {
        updatedValue.sound_symbol_knowledge =
          (updatedValue.pseudo_words || 0) + (updatedValue.letter_sounds || 0);
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
    setNewWist(updatedValue);
  }; //end handle change

  //function to handle click of submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all inputs before submission
    const newErrors = {};
    if (!newWist.date) {
      newErrors.date = "Date is required";
    } else if (new Date(newWist.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (!newWist.examiner_id) {
      newErrors.examiner_id = "Examiner is required";
    }

    setValidationErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed");
      return;
    }
    dispatch({
      type: "ADD_SECONDARY_WIST",
      payload: newWist,
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-4 bg-primary-100">SECONDARY WIST </h1>
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
                  value={newWist.date}
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
                  value={newWist.student_id}
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
                  value={newWist.examiner_id}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!validationErrors.examiner_id}
                  helperText={validationErrors.examiner_id}
                />
              </FormControl>
            </Grid>

            {/* Read Regular Words Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Read Regular Words:</FormLabel>
                <TextField
                  type="number"
                  id="read_regular_words"
                  name="read_regular_words"
                  value={newWist.read_regular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Read Irregular Words Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Read Irregular Words:</FormLabel>
                <TextField
                  type="number"
                  id="read_irregular_words"
                  name="read_irregular_words"
                  value={newWist.read_irregular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Word Identification Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Word Identification:</FormLabel>
                <TextField
                  type="number"
                  id="word_identification"
                  name="word_identification"
                  value={newWist.word_identification}
                  onChange={handleChange}
                  variant="outlined"
                  disabled
                />
              </FormControl>
              </Grid>
            {/* Word Identification Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Word Identification Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="word_identification_percentile"
                  name="word_identification_percentile"
                  value={newWist.word_identification_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Word Identification Standard Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Word Identification Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="word_identification_standard_score"
                  name="word_identification_standard_score"
                  value={newWist.word_identification_standard_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Spell Regular Words Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spell Regular Words:</FormLabel>
                <TextField
                  type="number"
                  id="spell_regular_words"
                  name="spell_regular_words"
                  value={newWist.spell_regular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Spell Irregular Words Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spell Irregular Words:</FormLabel>
                <TextField
                  type="number"
                  id="spell_irregular_words"
                  name="spell_irregular_words"
                  value={newWist.spell_irregular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Spelling Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling:</FormLabel>
                <TextField
                  type="number"
                  id="spelling"
                  name="spelling"
                  value={newWist.spelling}
                  onChange={handleChange}
                  variant="outlined"
                  disabled
                />
              </FormControl>
              </Grid>
            {/* Spelling Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_percentile"
                  name="spelling_percentile"
                  value={newWist.spelling_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Spelling Standard Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_standard_score"
                  name="spelling_standard_score"
                  value={newWist.spelling_standard_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Fundamental Literacy Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fundamental Literacy:</FormLabel>
                <TextField
                  type="number"
                  id="fundamental_literacy"
                  name="fundamental_literacy"
                  value={newWist.fundamental_literacy}
                  onChange={handleChange}
                  variant="outlined"
                  disabled
                />
              </FormControl>
              </Grid>
            {/* Fundamental Literacy Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fundamental Literacy Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="fundamental_literacy_percentile"
                  name="fundamental_literacy_percentile"
                  value={newWist.fundamental_literacy_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Fundamental Literacy Standard Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fundamental Literacy Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="fundamental_literacy_standard_score"
                  name="fundamental_literacy_standard_score"
                  value={newWist.fundamental_literacy_standard_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Pseudo Words Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Pseudo Words:</FormLabel>
                <TextField
                  type="number"
                  id="pseudo_words"
                  name="pseudo_words"
                  value={newWist.pseudo_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Letter Sounds Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Letter Sounds:</FormLabel>
                <TextField
                  type="number"
                  id="letter_sounds"
                  name="letter_sounds"
                  value={newWist.letter_sounds}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Sound Symbol Knowledge Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sound Symbol Knowledge:</FormLabel>
                <TextField
                  type="number"
                  id="sound_symbol_knowledge"
                  name="sound_symbol_knowledge"
                  value={newWist.sound_symbol_knowledge}
                  onChange={handleChange}
                  variant="outlined"
                  disabled
                />
              </FormControl>
              </Grid>
            {/* Sound Symbol Knowledge Percentile Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sound Symbol Knowledge Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="sound_symbol_knowledge_percentile"
                  name="sound_symbol_knowledge_percentile"
                  value={newWist.sound_symbol_knowledge_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
              </Grid>
            {/* Sound Symbol Knowledge Standard Score Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sound Symbol Knowledge Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="sound_symbol_knowledge_standard_score"
                  name="sound_symbol_knowledge_standard_score"
                  value={newWist.sound_symbol_knowledge_standard_score}
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

export default AddSecondaryWist;
