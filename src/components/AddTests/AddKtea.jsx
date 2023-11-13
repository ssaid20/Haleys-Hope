import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

//component to add a new KTEA test
const AddKtea = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();

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

  const [newKtea, setKTEA] = useState({
    student_id: student.id,
    date: "",
    examiner_id: "",
  });
  const handleGoBack = () => {
    history.push(`/students/${student.id}`);
  };

  //function to handle inputs changing
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
    }

    //function to handle click of submit button
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("New KTEA Entry:", newKtea);
      dispatch({
        type: "ADD_KTEA",
        payload: newKtea,
      });

      history.push(`/students/${student.id}`);
      //history.push back to student details
    };
    console.log("hello world");
    return (
      <>
        <p>Hello World</p>
        <button onClick={handleGoBack}>GO BACK</button>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newKtea.date}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="examiner">Examiner:</label>
            <input
              type="number"
              id="examiner_id"
              name="examiner_id"
              value={newKtea.examiner_id}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="read_regular_words">
              Letter and Word Recognition SS:
            </label>
            <input
              type="number"
              id=""
              name="read_regular_words"
              value={newWist.read_regular_words}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="read_irregular_words">
              Letter and Word Recognition %ile:
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  };
};
export default AddKtea;
