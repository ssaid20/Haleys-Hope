import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams } from "react-router-dom/";

const GortList = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.gortReducer.list);
  const student = useParams();
  const [selectedTest, setSelectedTest] = useState(null);
  // const studentId = useSelector((state) => state.studentId);
  const isLoading = useSelector(
    (state) => state.gortReducer.isLoading
  );

  useEffect(() => {
    //need to get student id and pass it in somehow in the dispatch, with a payload: studentId
    dispatch({ type: "FETCH_GORT", payload: student.id });
  }, [dispatch]);

  //if loading tests, display a loading message
  if (isLoading) return <p>Loading tests...</p>;
  //if (error) return <p>Error: {error}</p>;

  //if there are no tests, display none available for now
  if (tests.length === 0) {
    return <p>No GORT-5 tests available.</p>;
  }

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  return (
    <div>
      {tests.map((test) => (
        <div key={test.id} onClick={() => handleTestClick(test)}>
          <p>
            GORT Date: {formatDate(test.date)} (click for details)
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
            <p>Sum Scaled Score: {selectedTest.sum_scaled_score}</p>
            <p>Oral Reading Percentile: {selectedTest.oral_reading_percentile}</p>
            <p>Oral Reading Index: {selectedTest.oral_reading_index}</p>
            <p>Rate Raw Total: {selectedTest.rate_raw_total}</p>
            <p>Accuracy Raw Total: {selectedTest.accuracy_raw_totl}</p>
            <p>Fluency Raw Total: {selectedTest.fluency_raw_total}</p>
            <p>Comprehension Raw Total: {selectedTest.comprehension_raw_total}</p>
            <p>Rate Percentile Rank: {selectedTest.rate_percentile_rank}</p>
            <p>Accuracy Percentile Rank: {selectedTest.accuracy_percentile_rank}</p>
            <p>Fluency Percentile Rank: {selectedTest.fluency_percentile_rank}</p>
            <p>Comprehension Percentile Rank: {selectedTest.comprehension_percentile_rank}</p>
            <p>Rate Scaled Score: {selectedTest.rate_scaled_score}</p>
            <p>Accuracy Scaled Score: {selectedTest.accuracy_scaled_score}</p>
            <p>Fluency Scaled Score: {selectedTest.fluency_scaled_score}</p>
            <p>Comprehension Scaled Score: {selectedTest.comprehension_scaled_score}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default GortList;
