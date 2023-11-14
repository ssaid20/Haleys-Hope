import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";

const KteaList = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.kteaReducer.list);
  const student = useParams();
  const [selectedTest, setSelectedTest] = useState(null);
  // const studentId = useSelector((state) => state.studentId);
  const isLoading = useSelector(
    (state) => state.kteaReducer.isLoading
  );

  useEffect(() => {
    //need to get student id and pass it in somehow in the dispatch, with a payload: studentId
    dispatch({ type: "FETCH_KTEA", payload: student.id });
  }, [dispatch]);

  //if loading tests, display a loading message
  if (isLoading) return <p>Loading tests...</p>;
  //if (error) return <p>Error: {error}</p>;

  //if there are no tests, display none available for now
  if (tests.length === 0) {
    return <p>No KTEA-3 tests available.</p>;
  }

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  return (
    <div>
      {tests.map((test) => (
        <div key={test.id} onClick={() => handleTestClick(test)}>
          <p>
            KTEA-3 Date: {formatDate(test.date)} (click for details)
          </p>
        </div>
      ))}

      {selectedTest && (
        <div>
          <button onClick={() => setSelectedTest(null)}>Close Details</button>
          <div>
            <h2>Test Details:</h2>
            <p>Date: {formatDate(selectedTest.date)}</p>
            <p>Examiner ID: {selectedTest.examiner_id}</p>
            <p>Letter and Word Recognititon Scaled Score: {selectedTest.lwc_scaled_score}</p>
            <p>Letter and Word Recognititon Percentile: {selectedTest.lwc_percentile}</p>
            <p>Spelling Scaled Score: {selectedTest.spelling_scaled_score}</p>
            <p>Spelling Percentile: {selectedTest.spelling_percentile}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default KteaList;
