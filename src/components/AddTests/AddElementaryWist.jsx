import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { TextField, Button, Grid, FormControl, FormLabel, Paper } from "@mui/material";
import "./AddElementaryWist.css";

//component to add a new elementary wist test
const AddElementaryWist = () => {
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
      type: "ADD_ELEMENTARY_WIST",
      payload: newWist,
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  return (
    <>
    <h1 className="text-3xl text-center mb-4 bg-primary-100">ELEMENTARY WIST </h1>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        GO BACK
      </Button>
      <Paper elevation={3} className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            {/* Dynamically generate Grid items for each field */}
            {Object.keys(newWist).map(key => (
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
                    value={newWist[key]}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      readOnly: key === 'word_identification' || key === 'spelling' || key === 'fundamental_literacy' || key === 'sound_symbol_knowledge', // Making the input read-only for calculated fields
                    }}
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

export default AddElementaryWist;
