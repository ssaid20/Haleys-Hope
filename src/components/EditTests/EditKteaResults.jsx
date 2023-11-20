import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { formatDate, formatDate2 } from "../../lib/utils";
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

const EditKteaResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedTest = useSelector(
    (store) => store.kteaReducer.selectedTest[0]
  );
  const users = useSelector((store) => store.allUsersReducer.users);
  const student = useSelector((store) => store.user);

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_KTEA_RESULTS", payload: testId.id });
  }, [dispatch]);
  useEffect(() => {
    if (selectedTest) {
      setNewKtea({
        ...selectedTest,
        date: formatDate(selectedTest.date), // Assuming formatDate converts the date to the required format
      });
      setSelectedExaminerId(selectedTest.examiner_id.toString());
    }
  }, [selectedTest]);
  const [newKtea, setNewKtea] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
    lwr_scaled_score: "",
    lwr_percentile: "",
    spelling_scaled_score: "",
    spelling_percentile: "",
  });
  const [selectedExaminerId, setSelectedExaminerId] = useState("");
  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewKtea((prevKtea) => ({
      ...prevKtea,
      examiner_id: examinerId,
    }));
  };

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = { ...newKtea };
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
    setNewKtea(updatedValue);
  }; //end handle change

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all inputs before submission
    const newErrors = {};
    if (!newKtea.date) {
      newErrors.date = "Date is required";
    } else if (new Date(newKtea.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (!newKtea.examiner_id) {
      newErrors.examiner_id = "Examiner is required";
    }

    setValidationErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed");
      return;
    }

    const submissionData = {
      ...newKtea,
      examiner_id: selectedExaminerId,
    };

    dispatch({
      type: "UPDATE_KTEA",
      payload: { ...submissionData, id: testId.id },
    });

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
      <h1 className="text-3xl text-center mb-4">
        Edit KTEA from: {formatDate2(selectedTest.date)}
      </h1>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        Go Back
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
                  value={newKtea.date}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            {/* Examiner ID Field */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Examiner</InputLabel>
                <Select
                  value={selectedExaminerId}
                  label="Examiner"
                  onChange={handleExaminerChange}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* LWR Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Letter and Word Recognition Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="lwr_scaled_score"
                  name="lwr_scaled_score"
                  value={newKtea.lwr_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* LWR Percentile */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Letter and Word Recognition Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="lwr_percentile"
                  name="lwr_percentile"
                  value={newKtea.lwr_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Spelling Scaled Score */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_scaled_score"
                  name="spelling_scaled_score"
                  value={newKtea.spelling_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* Spelling Percentile */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_percentile"
                  name="spelling_percentile"
                  value={newKtea.spelling_percentile}
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
            Save Changes
          </Button>
          <Button onClick={handleGoBack}>Go Back</Button>
        </form>
      </Paper>
    </>
  );
};

export default EditKteaResults;
