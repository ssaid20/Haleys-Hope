import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

//component to add a new Gort test
const AddGort = () => {
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

  const [newGort, setNewGort] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
    sum_scaled_score: null,
    oral_reading_percentile_rank: null,
    oral_reading_index: null,
    rate_raw_total: null,
    accuracy_raw_total: null,
    fluency_raw_total: null,
    rate_percentile_rank: null,
    accuracy_percentile_rank: null,
    fluency_percentile_rank: null,
    comprehension_percentile_rank: null,
    comprehension_raw_total: null,
    rate_scaled_score: null,
    accuracy_scaled_score: null,
    fluency_scaled_score: null,
    comprehension_scaled_score: null,
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
    // setNewGort((prevCtopp) => ({
    //   ...prevCtopp,
    //   [name]: value === "" ? null : Number(value),
    // }));
    setNewGort((prevGort) => ({
      ...prevGort,
      [name]: value, // Use computed property name to update the state
    }));
  };

  //function to handle click of submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all inputs before submission
    const newErrors = {};
    if (!newGort.date) {
      newErrors.date = "Date is required";
    } else if (new Date(newGort.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (!newGort.examiner_id) {
      newErrors.examiner_id = "Examiner is required";
    }

    setValidationErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed");
      return;
    }

    dispatch({
      type: "ADD_GORT",
      payload: newGort,
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
            value={newGort.date}
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
            value={newGort.examiner_id}
            onChange={handleChange}
          />
          {validationErrors.examiner_id && (
            <div className="error">{validationErrors.examiner_id}</div>
          )}
        </div>

        <div className="input-field">
          <label htmlFor="sum_scaled_score">Sum Scaled Score:</label>
          <input
            type="number"
            id="sum_scaled_score"
            name="sum_scaled_score"
            value={newGort.sum_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="oral_reading_percentile_rank">
            Oral Reading Percentile Rank:
          </label>
          <input
            type="number"
            id="oral_reading_percentile_rank"
            name="oral_reading_percentile_rank"
            value={newGort.oral_reading_percentile_rank}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="oral_reading_index">Oral Reading Index:</label>
          <input
            type="number"
            id="oral_reading_index"
            name="oral_reading_index"
            value={newGort.oral_reading_index}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="rate_raw_total">Rate Raw Total:</label>
          <input
            type="number"
            id="rate_raw_total"
            name="rate_raw_total"
            value={newGort.rate_raw_total}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="accuracy_raw_total">Accuracy Raw Total:</label>
          <input
            type="number"
            id="accuracy_raw_total"
            name="accuracy_raw_total"
            value={newGort.accuracy_raw_total}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="fluency_raw_total">Fluency Raw Total:</label>
          <input
            type="number"
            id="fluency_raw_total"
            name="fluency_raw_total"
            value={newGort.fluency_raw_total}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="rate_percentile_rank">Rate Percentile Rank:</label>
          <input
            type="number"
            id="rate_percentile_rank"
            name="rate_percentile_rank"
            value={newGort.rate_percentile_rank}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="accuracy_percentile_rank">
            Accuracy Percentile Rank:
          </label>
          <input
            type="number"
            id="accuracy_percentile_rank"
            name="accuracy_percentile_rank"
            value={newGort.accuracy_percentile_rank}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="fluency_percentile_rank">
            Fluency Percentile Rank:
          </label>
          <input
            type="number"
            id="fluency_percentile_rank"
            name="fluency_percentile_rank"
            value={newGort.fluency_percentile_rank}
            onChange={handleChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="comprehension_percentile_rank">
            Comprehension Percentile Rank:
          </label>
          <input
            type="number"
            id="comprehension_percentile_rank"
            name="comprehension_percentile_rank"
            value={newGort.comprehension_percentile_rank}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="rate_scaled_score">Rate Scaled Score:</label>
          <input
            type="number"
            id="rate_scaled_score"
            name="rate_scaled_score"
            value={newGort.rate_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="comprehension_raw_total">
            Comprehension Raw Total:
          </label>
          <input
            type="number"
            id="comprehension_raw_total"
            name="comprehension_raw_total"
            value={newGort.comprehension_raw_total}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="accuracy_scaled_score">Accuracy Scaled Score:</label>
          <input
            type="number"
            id="accuracy_scaled_score"
            name="accuracy_scaled_score"
            value={newGort.accuracy_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="fluency_scaled_score">Fluency Scaled Score:</label>
          <input
            type="number"
            id="fluency_scaled_score"
            name="fluency_scaled_score"
            value={newGort.fluency_scaled_score}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="comprehension_scaled_score">
            Comprehension Scaled Score:
          </label>
          <input
            type="number"
            id="comprehension_scaled_score"
            name="comprehension_scaled_score"
            value={newGort.comprehension_scaled_score}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddGort;
