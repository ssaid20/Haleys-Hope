import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../Utilities/formatDate";

const ElementaryWistList = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.elementaryWistReducer.list);
  const [selectedTest, setSelectedTest] = useState(null);
  // const studentId = useSelector((state) => state.studentId);
  const isLoading = useSelector(
    (state) => state.elementaryWistReducer.isLoading
  );
  //const error = useSelector((state) => state.elementaryWist.error);
  console.log(tests);
  useEffect(() => {
    console.log("dispatching fetch_elementary_wist");
    //need to get student id and pass it in somehow in the dispatch, with a payload: studentId
    dispatch({ type: "FETCH_ELEMENTARY_WIST", payload: 1 });
  }, [dispatch]);

  //if loading tests, display a loading message
  if (isLoading) return <p>Loading tests...</p>;
  //if (error) return <p>Error: {error}</p>;

  //if there are no tests, display none available for now
  if (tests.length === 0) {
    return <p>No tests available.</p>;
  }

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  return (
    <div>
      {tests.map((test) => (
        <div key={test.id} onClick={() => handleTestClick(test)}>
          <p>Test Date: {formatDate(test.date)} (click for details)</p>
        </div>
      ))}

      {selectedTest && (
        <div>
          <button onClick={() => setSelectedTest(null)}>Close Details</button>
          <div>
            <h2>Test Details:</h2>
            <p>Date: {formatDate(selectedTest.date)}</p>
            <p>Examiner ID: {selectedTest.examiner_id}</p>
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
            <p>
              Spelling Standard Score: {selectedTest.spelling_standard_score}
            </p>
            <p>Student ID: {selectedTest.student_id}</p>
            <p>Word Identification: {selectedTest.word_identification}</p>
            <p>
              Word Identification Percentile:{" "}
              {selectedTest.word_identification_percentile}
            </p>
            <p>
              Word Identification Standard Score:{" "}
              {selectedTest.word_identification_standard_score}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElementaryWistList;
