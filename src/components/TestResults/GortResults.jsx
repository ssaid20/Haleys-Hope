import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";

const GortResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect selected test, expect empty", selectedTest);
    dispatch({ type: "FETCH_GORT_RESULTS", payload: testId.id });
    console.log("GORT TEST ID", testId);
  }, [dispatch]);

  const selectedTest = useSelector(
    (store) => store.gortReducer.selectedTest[0]
  );

  console.log("##########", selectedTest);

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }
  console.log("selectedtestyboi", selectedTest);

  const goBack = () => history.push(`/students/${selectedTest.student_id}`);

  return (
    <div>
      {/* <MiniStudentCard /> */}

      <div>
        <button onClick={goBack}>Back to Tests List</button>
        <h2>Test Details:</h2>
        <p>Date: {formatDate(selectedTest.date)}</p>
        <p>Examiner ID: {selectedTest.examiner_id}</p>
        <p>Sum Scaled Score: {selectedTest.sum_scaled_score}</p>
        <p>
          Oral Reading Percentile Rank:{" "}
          {selectedTest.oral_reading_percentile_rank}
        </p>
        <p>Oral Reading Index: {selectedTest.oral_reading_index}</p>
        <p>Rate Raw Total: {selectedTest.rate_raw_total}</p>
        <p>Accuracy Raw Total: {selectedTest.accuracy_raw_total}</p>
        <p>Fluency Raw Total: {selectedTest.fluency_raw_total}</p>
        <p>Comprehension Raw Total: {selectedTest.comprehension_raw_total}</p>
        <p>Rate Percentile Rank: {selectedTest.rate_percentile_rank}</p>
        <p>
          Accuracy Percentile Rank: {selectedTest.accuracy_percentile_rank}
        </p>
        <p>Fluency Percentile Rank: {selectedTest.fluency_percentile_rank}</p>
        <p>
          Comprehension Percentile Rank:{" "}
          {selectedTest.comprehension_percentile_rank}
        </p>
        <p>Rate Scaled Score: {selectedTest.rate_scaled_score}</p>
        <p>Accuracy Scaled Score: {selectedTest.accuracy_scaled_score}</p>
        <p>Fluency Scaled Score: {selectedTest.fluency_scaled_score}</p>
        <p>
          Comprehension Scaled Score: {selectedTest.comprehension_scaled_score}
        </p>
      </div>
    </div>
  );
};

export default GortResults;
