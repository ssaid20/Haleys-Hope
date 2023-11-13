import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./AddElementaryWist.css";

//component to add a new elementary wist test
const AddElementaryWist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useSelector((state) => state.studentReducer.currentStudent);
  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT", payload: { id: 1 } });
  }, [dispatch, 1]);

  console.log("logging student in addwist", student);

  const [newWist, setNewWist] = useState({
    student_id: "",
    date: "",
    examiner_id: "",
    read_regular_words: "",
    read_irregular_words: "",
    word_identification: "",
    word_identification_percentile: "",
    word_identification_standard_score: "",
    spell_regular_words: "",
    spell_irregular_words: "",
    spelling: "",
    spelling_percentile: "",
    spelling_standard_score: "",
    fundamental_literacy: "",
    fundamental_literacy_percentile: "",
    fundamental_literacy_standard_score: "",
    pseudo_words: "",
    letter_sounds: "",
    sound_symbol_knowledge: "",
    sound_symbol_knowledge_percentile: "",
    sound_symbol_knowledge_standard_score: "",
  });

  const handleChange = (e) => {
    setNewWist({
      ...newWist,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New WIST Entry:", newWist);
    dispatch({
      type: "ADD_ELEMENTARY_WIST",
      payload: newWist,
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  //targeting the outer div of each input field: .input-field.student_id {
  // styles for the div wrapping the student_id input }

  //targeting the div that directly contains the input: .input-container.student_id-input {
  //styles for the div wrapping the actual student_id input element }

  // targeting the input element itself: .input-container.student_id-input input {
  // styles for the student_id input element }

  //targeting the label of each input field: .input-field.student_id label {
  // styles for the label of student_id input }

  return (
    <form onSubmit={handleSubmit}>
      {/* Create a unique div for each field in the newWist state */}
      {Object.keys(newWist).map((key) => (
        <div key={key} className={`input-field ${key}`}>
          <label htmlFor={key}>{key.split("_").join(" ")}:</label>
          <div className={`input-container ${key}-input`}>
            <input
              type={key.includes("date") ? "date" : "text"}
              id={key}
              name={key}
              value={newWist[key]}
              onChange={handleChange}
            />
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddElementaryWist;
