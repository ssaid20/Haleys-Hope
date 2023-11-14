import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

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
    deleteme: null,
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
      <button onClick={handleGoBack}>GO BACK</button>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newCtopp.date}
            onChange={handleChange}
          />
          {validationErrors.date && (
            <div className="error">{validationErrors.date}</div>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="examiner">Examiner:</label>
          <input
            type="number"
            id="examiner_id"
            name="examiner_id"
            value={newCtopp.examiner_id}
            onChange={handleChange}
          />
          {validationErrors.examiner_id && (
            <div className="error">{validationErrors.examiner_id}</div>
          )}
        </div>
        <div>
          <strong>Subtest</strong>
        </div>
        <div className="input-field">
          <label htmlFor="elison_scaled_score">Elison Scaled Score:</label>
          <input
            type="number"
            id="elison_scaled_score"
            name="elison_scaled_score"
            value={newCtopp.elison_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="blending_words_scaled_score">
            Blending Words Scaled Score:
          </label>
          <input
            type="number"
            id="blending_words_scaled_score"
            name="blending_words_scaled_score"
            value={newCtopp.blending_words_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="phoneme_isolation_scaled_score">
            Phoneme Isolation Scaled Score:
          </label>
          <input
            type="number"
            id="phoneme_isolation_scaled_score"
            name="phoneme_isolation_scaled_score"
            value={newCtopp.phoneme_isolation_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="memory_for_digits_scaled_score">
            Memory For Digits Scaled Score:
          </label>
          <input
            type="number"
            id="memory_for_digits_scaled_score"
            name="memory_for_digits_scaled_score"
            value={newCtopp.memory_for_digits_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="nonword_repetition_scaled_score">
            Nonword Repetition Scaled Score:
          </label>
          <input
            type="number"
            id="nonword_repetition_scaled_score"
            name="nonword_repetition_scaled_score"
            value={newCtopp.nonword_repetition_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="rapid_digit_naming_scaled_score">
            Rapid Digit Naming Scaled Score:
          </label>
          <input
            type="number"
            id="rapid_digit_naming_scaled_score"
            name="rapid_digit_naming_scaled_score"
            value={newCtopp.rapid_digit_naming_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="rapid_letter_naming_scaled_score">
            Rapid Letter Naming Scaled Score:
          </label>
          <input
            type="number"
            id="rapid_letter_naming_scaled_score"
            name="rapid_letter_naming_scaled_score"
            value={newCtopp.rapid_letter_naming_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div>
          <strong>Supplemental</strong>
        </div>
        <div className="input-field">
          <label htmlFor="blending_nonwords_scaled_score">
            Blending Nonwords Scaled Score:
          </label>
          <input
            type="number"
            id="blending_nonwords_scaled_score"
            name="blending_nonwords_scaled_score"
            value={newCtopp.blending_nonwords_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="segmenting_nonwords_scaled_score">
            Segmenting Nonwords Scaled Score:
          </label>
          <input
            type="number"
            id="segmenting_nonwords_scaled_score"
            name="segmenting_nonwords_scaled_score"
            value={newCtopp.segmenting_nonwords_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div>
          <strong>Composite</strong>
        </div>
        <div className="input-field">
          <label htmlFor="phonological_awareness_composite">
            Phonological Awareness Composite:
          </label>
          <input
            type="number"
            id="phonological_awareness_composite"
            name="phonological_awareness_composite"
            value={newCtopp.phonological_awareness_composite}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="phonological_memory_composite">
            Phonological Memory Composite:
          </label>
          <input
            type="number"
            id="phonological_memory_composite"
            name="phonological_memory_composite"
            value={newCtopp.phonological_memory_composite}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="rapid_symbolic_naming_composite">
            Rapid Symbolic Naming Composite:
          </label>
          <input
            type="number"
            id="rapid_symbolic_naming_composite"
            name="rapid_symbolic_naming_composite"
            value={newCtopp.rapid_symbolic_naming_composite}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="alt_phonological_awareness_composite">
            Alt Phonological Awareness:
          </label>
          <input
            type="number"
            id="alt_phonological_awareness_composite"
            name="alt_phonological_awareness_composite"
            value={newCtopp.alt_phonological_awareness_composite}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddSecondaryCtopp;