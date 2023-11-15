{
  /* <ProtectedRoute exact path="/YoungerCtoppResults/:id">
            <YoungerCtoppResults />
          </ProtectedRoute> */
}
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";

const YoungerCtoppResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect selected test, expect empty", selectedTest);
    dispatch({ type: "FETCH_YOUNGER_CTOPP_RESULTS", payload: testId.id });
  }, [dispatch]);

  const selectedTest = useSelector(
    (store) => store.youngerCtoppReducer.selectedTest[0]
  );

  console.log("##########", selectedTest);

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }
  console.log("selectedtestyboi", selectedTest);

  const goBack = () => history.push("/students/:id");

  return (
    <div>
      {/* <MiniStudentCard /> */}

      <div>
        <button onClick={goBack}>Back to Tests List</button>
        <h2>Test Details:</h2>
        <p>Date: {formatDate(selectedTest.date)}</p>
        <p>Examiner ID: {selectedTest.examiner_id}</p>
        <p>Elison Scaled Score: {selectedTest.elison_scaled_score}</p>
        <p>
          Blending Words Scaled Score:{" "}
          {selectedTest.blending_words_scaled_score}
        </p>
        <p>
          Sound Matching Scaled Score:{" "}
          {selectedTest.sound_matching_scaled_score}
        </p>
        <p>
          Memory For Digits Scaled Score:{" "}
          {selectedTest.memory_for_digits_scaled_score}
        </p>
        <p>
          Non-Word Repitition Scaled Score:{" "}
          {selectedTest.nonword_repetition_scaled_score}
        </p>
        <p>
          Rapid Digit Naming Scaled Score:{" "}
          {selectedTest.rapid_digit_naming_scaled_score}
        </p>
        <p>
          Rapid Letter Naming Scaled Score:{" "}
          {selectedTest.rapid_letter_naming_scaled_score}
        </p>
        <p>
          Rapid Color Naming Scaled Score:{" "}
          {selectedTest.rapid_color_naming_scaled_score}
        </p>
        <p>
          Rapid Object Naming Scaled Score: {selectedTest.rapid_object_naming}
        </p>
        <p>
          Blending Non-Words Scaled Score:{" "}
          {selectedTest.blending_nonwords_scaled_score}
        </p>
        <p>
          Phonological Awareness Composite:{" "}
          {selectedTest.phonological_awareness_composite}
        </p>
        <p>
          Phonological Memory Composite:{" "}
          {selectedTest.phonological_memory_composite}
        </p>
        <p>
          Rapid Symbolic Naming Composite:{" "}
          {selectedTest.rapid_symbolic_naming_composite}
        </p>
        <p>
          Rapid Non-Symbolic Naming Composite:{" "}
          {selectedTest.rapid_non_symbolic_naming_composite}
        </p>
      </div>
    </div>
  );
};

export default YoungerCtoppResults;
