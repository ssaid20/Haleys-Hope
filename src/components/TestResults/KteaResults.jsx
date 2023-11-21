import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";

const KteaResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const examiners = useSelector((store) => store.allUsersReducer.users);

  useEffect(() => {
    dispatch({ type: "FETCH_KTEA_RESULTS", payload: testId.id });
  }, [dispatch]);

  const selectedTest = useSelector(
    (store) => store.kteaReducer.selectedTest[0]
  );

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  // Find the examiner based on examiner_id
  const examiner = examiners.find(
    (user) => user.id === selectedTest.examiner_id
  );

  const goBack = () => history.push(`/students/${selectedTest.student_id}`);

  return (
    <div>
      {/* <MiniStudentCard /> */}

      <div>
        <button onClick={goBack}>Back to Tests List</button>
        <h2>Test Details:</h2>
        <p>Date: {formatDate(selectedTest.date)}</p>
        {examiner ? (
          <p>
            Examiner: {examiner.first_name} {examiner.last_name}
          </p>
        ) : (
          <p>Examiner ID: {selectedTest.examiner_id}</p>
        )}
        <p>
          Letter and Word Recognition Scaled Score:{" "}
          {selectedTest.lwr_scaled_score}
        </p>
        <p>
          Letter and Word Recognition Percentile: {selectedTest.lwr_percentile}
        </p>
        <p>Spelling Scaled Score: {selectedTest.spelling_scaled_score}</p>
        <p>Spelling Percentile: {selectedTest.spelling_percentile}</p>
        <button
          onClick={() => history.push(`/EditKteaResults/${selectedTest.id}`)}
        >
          Edit Test
        </button>
      </div>
    </div>
  );
};

export default KteaResults;
