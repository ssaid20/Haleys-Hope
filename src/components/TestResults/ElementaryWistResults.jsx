import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";

const ElementaryWistResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const examiners = useSelector((store) => store.allUsersReducer.users);

  useEffect(() => {
    dispatch({ type: "FETCH_ELEMENTARY_WIST_RESULTS", payload: testId.id });
  }, [dispatch]);

  const selectedTest = useSelector(
    (store) => store.elementaryWistReducer.selectedTest[0]
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
        {/* <p>Examiner ID: {selectedTest.examiner_id}</p> */}
        {examiner ? (
          <p>
            Examiner: {examiner.first_name} {examiner.last_name}
          </p>
        ) : (
          <p>Examiner ID: {selectedTest.examiner_id}</p>
        )}
        <p>Fundamental Literacy: {selectedTest.fundamental_literacy}</p>
        <p>
          Fundamental Literacy Percentile:{" "}
          {selectedTest.fundamental_literacy_percentile}
        </p>
        <p>
          Fundamental Literacy Standard Score:{" "}
          {selectedTest.fundamental_literacy_standard_score}
        </p>
        <p>Letter Sounds: {selectedTest.letter_sounds}</p>
        <p>Pseudo Words: {selectedTest.pseudo_words}</p>
        <p>Read Irregular Words: {selectedTest.read_irregular_words}</p>
        <p>Read Regular Words: {selectedTest.read_regular_words}</p>
        <p>Sound Symbol Knowledge: {selectedTest.sound_symbol_knowledge}</p>
        <p>
          Sound Symbol Knowledge Percentile:{" "}
          {selectedTest.sound_symbol_knowledge_percentile}
        </p>
        <p>
          Sound Symbol Knowledge Standard Score:{" "}
          {selectedTest.sound_symbol_knowledge_standard_score}
        </p>
        <p>Spell Irregular Words: {selectedTest.spell_irregular_words}</p>
        <p>Spell Regular Words: {selectedTest.spell_regular_words}</p>
        <p>Spelling: {selectedTest.spelling}</p>
        <p>Spelling Percentile: {selectedTest.spelling_percentile}</p>
        <p>Spelling Standard Score: {selectedTest.spelling_standard_score}</p>

        <p>Word Identification: {selectedTest.word_identification}</p>
        <p>
          Word Identification Percentile:{" "}
          {selectedTest.word_identification_percentile}
        </p>
        <p>
          Word Identification Standard Score:{" "}
          {selectedTest.word_identification_standard_score}
        </p>
        <button
          onClick={() =>
            history.push(`/EditElementaryWistResults/${selectedTest.id}`)
          }
        >
          Edit Test
        </button>
      </div>
    </div>
  );
};

export default ElementaryWistResults;
