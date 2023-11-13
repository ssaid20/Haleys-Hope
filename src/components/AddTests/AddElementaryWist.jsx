import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

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

    console.log("New WIST Entry:", newWist);
    dispatch({
      type: "ADD_ELEMENTARY_WIST",
      payload: newWist,
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
            value={newWist.date}
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
            value={newWist.examiner_id}
            onChange={handleChange}
          />
          {validationErrors.examiner_id && (
            <div className="error">{validationErrors.examiner_id}</div>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="read_regular_words">Read Regular Words:</label>
          <input
            type="number"
            id="read_regular_words"
            name="read_regular_words"
            value={newWist.read_regular_words}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="read_irregular_words">Read Irregular Words:</label>
          <input
            type="number"
            id="read_irregular_words"
            name="read_irregular_words"
            value={newWist.read_irregular_words}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="word_identification">Word Identification:</label>
          <input
            type="number"
            id="word_identification"
            name="word_identification"
            value={newWist.word_identification}
            readOnly // Making the input read-only
          />
        </div>
        <div className="input-field">
          <label htmlFor="word_identification_percentile">
            Word Identification Percentile:
          </label>
          <input
            type="number"
            id="word_identification_percentile"
            name="word_identification_percentile"
            value={newWist.word_identification_percentile}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="word_identification_standard_score">
            Word Identification Standard Score:
          </label>
          <input
            type="number"
            id="word_identification_standard_score"
            name="word_identification_standard_score"
            value={newWist.word_identification_standard_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="spell_regular_words">Spell Regular Words:</label>
          <input
            type="number"
            id="spell_regular_words"
            name="spell_regular_words"
            value={newWist.spell_regular_words}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="spell_irregular_words">Spell Irregular Words:</label>
          <input
            type="number"
            id="spell_irregular_words"
            name="spell_irregular_words"
            value={newWist.spell_irregular_words}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="spelling">Spelling:</label>
          <input
            type="number"
            id="spelling"
            name="spelling"
            value={newWist.spelling}
            readOnly // Making the input read-only
          />
        </div>
        <div className="input-field">
          <label htmlFor="spelling_percentile">Spelling Percentile:</label>
          <input
            type="number"
            id="spelling_percentile"
            name="spelling_percentile"
            value={newWist.spelling_percentile}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="spelling_standard_score">
            Spelling Standard Score:
          </label>
          <input
            type="number"
            id="spelling_standard_score"
            name="spelling_standard_score"
            value={newWist.spelling_standard_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="fundamental_literacy">Fundamental Literacy:</label>
          <input
            type="number"
            id="fundamental_literacy"
            name="fundamental_literacy"
            value={newWist.fundamental_literacy}
            readOnly // Making the input read-only
          />
        </div>
        <div className="input-field">
          <label htmlFor="fundamental_literacy">
            Fundamental Literacy Percentile:
          </label>
          <input
            type="number"
            id="fundamental_literacy_percentile"
            name="fundamental_literacy_percentile"
            value={newWist.fundamental_literacy_percentile}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="fundamental_literacy_standard_score">
            Fundamental Literacy Standard Score:
          </label>
          <input
            type="number"
            id="fundamental_literacy_standard_score"
            name="fundamental_literacy_standard_score"
            value={newWist.fundamental_literacy_standard_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="pseudo_words">Pseudo Words:</label>
          <input
            type="number"
            id="pseudo_words"
            name="pseudo_words"
            value={newWist.pseudo_words}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="letter_sounds">Letter Sounds:</label>
          <input
            type="number"
            id="letter_sounds"
            name="letter_sounds"
            value={newWist.letter_sounds}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="sound_symbol_knowledge">
            Sound Symbol Knowledge:
          </label>
          <input
            type="number"
            id="sound_symbol_knowledge"
            name="sound_symbol_knowledge"
            value={newWist.sound_symbol_knowledge}
            readOnly // Making the input read-only
          />
        </div>
        <div className="input-field">
          <label htmlFor="sound_symbol_knowledge_percentile">
            Sound Symbol Knowledge Percentile:
          </label>
          <input
            type="number"
            id="sound_symbol_knowledge_percentile"
            name="sound_symbol_knowledge_percentile"
            value={newWist.sound_symbol_knowledge_percentile}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="sound_symbol_knowledge_standard_score">
            Sound Symbol Knowledge Standard Score:
          </label>
          <input
            type="number"
            id="sound_symbol_knowledge_standard_score"
            name="sound_symbol_knowledge_standard_score"
            value={newWist.sound_symbol_knowledge_standard_score}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddElementaryWist;
