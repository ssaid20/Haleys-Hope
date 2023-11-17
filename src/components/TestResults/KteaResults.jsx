import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";

const KteaResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect selected test, expect empty", selectedTest);
    dispatch({ type: "FETCH_KTEA_RESULTS", payload: testId.id });
    console.log("KTEA TEST ID", testId);
  }, [dispatch]);

  const selectedTest = useSelector(
    (store) => store.kteaReducer.selectedTest[0]
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
        <p>
          Letter and Word Recognition Scaled Score:{" "}
          {selectedTest.lwr_scaled_score}
        </p>
        <p>
          Letter and Word Recognition Percentile: {selectedTest.lwr_percentile}
        </p>
        <p>Spelling Scaled Score: {selectedTest.spelling_scaled_score}</p>
        <p>Spelling Percentile: {selectedTest.spelling_percentile}</p>
      </div>
    </div>
  );
};

export default KteaResults;