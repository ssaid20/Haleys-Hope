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

const EditSecondaryWistResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedTest = useSelector((store) => store.secondaryWistReducer.selectedTest[0]);
  const users = useSelector((store) => store.allUsersReducer.users);
  const student = useSelector((store) => store.user);

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_SECONDARY_WIST_RESULTS", payload: testId.id });
  }, [dispatch]);
  useEffect(() => {
    if (selectedTest) {
      //   setNewWist(selectedTest);
      // }if (selectedTest) {
      setNewWist({
        ...selectedTest,
        date: formatDateForInput(selectedTest.date), // Assuming formatDate converts the date to the required format
      });
      setSelectedExaminerId(selectedTest.examiner_id.toString());
    }
  }, [selectedTest]);
  const [newWist, setNewWist] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
    fundamental_literacy: "",
    fundamental_literacy_percentile: "",
    fundamental_literacy_standard_score: "",
    id: "",
    letter_sounds: "",
    pseudo_words: "",
    read_irregular_words: "",
    read_regular_words: "",
    sound_symbol_knowledge: "",
    sound_symbol_knowledge_percentile: "",
    sound_symbol_knowledge_standard_score: "",
    spell_irregular_words: "",
    spell_regular_words: "",
    spelling: "",
    spelling_percentile: "",
    spelling_standard_score: "",
    student_id: "",
    word_identification: "",
    word_identification_percentile: "",
    word_identification_standard_score: "",
    grade: "",
  });
  const [selectedExaminerId, setSelectedExaminerId] = useState("");
  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewWist((prevWist) => ({
      ...prevWist,
      examiner_id: examinerId,
    }));
  };

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = { ...newWist };
    // Handle date field separately
    if (name === "date") {
      updatedValue[name] = value;
    } else {
      // Convert to number if the field is numeric
      updatedValue[name] = parseInt(value, 10); // Check if the value is not an empty string
      if (value !== "") {
        // Convert to number if the field is numeric and not empty
        updatedValue[name] = parseInt(value, 10);
      } else {
        // If the field is empty, set it to an empty string
        updatedValue[name] = value;
      } // Calculate word identification
      if (name === "read_regular_words" || name === "read_irregular_words") {
        updatedValue.word_identification =
          (updatedValue.read_regular_words || 0) + (updatedValue.read_irregular_words || 0);
      }

      // Calculate spelling
      if (name === "spell_regular_words" || name === "spell_irregular_words") {
        updatedValue.spelling =
          (updatedValue.spell_regular_words || 0) + (updatedValue.spell_irregular_words || 0);
      }

      // Calculate fundamental literacy
      if (
        name === "read_regular_words" ||
        name === "read_irregular_words" ||
        name === "spell_regular_words" ||
        name === "spell_irregular_words"
      ) {
        updatedValue.fundamental_literacy =
          (updatedValue.word_identification || 0) + (updatedValue.spelling || 0);
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

    const submissionData = {
      ...newWist,
      examiner_id: selectedExaminerId,
    };
    console.log("update wist edit page, sub data, testId", submissionData, testId.id);
    dispatch({
      type: "UPDATE_SECONDARY_WIST",
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
        Edit Secondary WIST from: {formatDate2(selectedTest.date)}{" "}
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
                  value={newWist.date}
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
                  value={newWist.grade}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Read Regular Words Field */}
            <Grid container spacing={3}>
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
                    InputProps={{
                      readOnly: true,
                    }}
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
                    InputProps={{
                      readOnly: true,
                    }}
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
                    InputProps={{
                      readOnly: true,
                    }}
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
                    InputProps={{
                      readOnly: true,
                    }}
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
              {/* ... other fields ... */}
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

export default EditSecondaryWistResults;
