import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { GetCompositeScoreDescription } from "../../lib/GetCompositeScoreDescription";

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
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={goBack}
        style={{ marginRight: "20px" }}
      >
        Back to Tests List
      </Button>
      <div
        style={{
          display: "flex",

          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <MiniStudentCard />
        {/* 
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            marginTop: "20px",
          }}
        > */}

        {/* <Paper
          style={{
            padding: "10px",
            flexGrow: 1,

            maxWidth: "150px",
          }}
        > */}

        {/* </Paper> */}
        {/* </div> */}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Date: {formatDate(selectedTest.date)} &nbsp;</p>

          {examiner ? (
            <p>
              Examiner: {examiner.first_name} {examiner.last_name}
            </p>
          ) : (
            <p>Examiner ID: {selectedTest.examiner_id}</p>
          )}
        </div>
      </div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Elementary WIST Results
      </h1>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Record of Scores: Norm-Referenced Assessment
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          style={{
            width: "100%",
            maxWidth: "1000px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assessment Area</TableCell>
                <TableCell align="right">Raw Score</TableCell>
                <TableCell align="right">Percentile Rank</TableCell>
                <TableCell align="right">Standard Score</TableCell>
                <TableCell align="right">Descriptive Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Read Regular Words</TableCell>
                <TableCell align="right">
                  {selectedTest.read_regular_words}
                </TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Read Irregular Words</TableCell>
                <TableCell align="right">
                  {selectedTest.read_irregular_words}
                </TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Word Identification</TableCell>
                <TableCell align="right">
                  {selectedTest.word_identification}
                </TableCell>
                <TableCell align="right">
                  {selectedTest.word_identification_percentile}
                </TableCell>
                <TableCell align="right">
                  {selectedTest.word_identification_percentile}
                </TableCell>
                <TableCell align="right">
                  <GetCompositeScoreDescription
                    compositeScore={
                      selectedTest.word_identification_standard_score
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spell Regular Words</TableCell>
                <TableCell align="right">
                  {selectedTest.spell_regular_words}
                </TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spell Irregular Words</TableCell>
                <TableCell align="right">
                  {selectedTest.spell_irregular_words}
                </TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spelling</TableCell>
                <TableCell align="right">{selectedTest.spelling}</TableCell>
                <TableCell align="right">
                  {selectedTest.spelling_percentile}
                </TableCell>
                <TableCell align="right">
                  {selectedTest.spelling_standard_score}
                </TableCell>
                <TableCell align="right">
                  <GetCompositeScoreDescription
                    compositeScore={selectedTest.spelling_standard_score}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Word Identification</TableCell>
                <TableCell align="right">
                  {selectedTest.word_identification}
                </TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spelling</TableCell>
                <TableCell align="right">{selectedTest.spelling}</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fundamental Literacy Ability Index</TableCell>
                <TableCell align="right">
                  {selectedTest.fundamental_literacy}
                </TableCell>
                <TableCell align="right">
                  {selectedTest.fundamental_literacy_percentile}
                </TableCell>
                <TableCell align="right">
                  {selectedTest.fundamental_literacy_standard_score}
                </TableCell>
                <TableCell align="right">
                  <GetCompositeScoreDescription
                    compositeScore={
                      selectedTest.fundamental_literacy_standard_score
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pseudo Words</TableCell>
                <TableCell align="right">{selectedTest.pseudo_words}</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Letter Sounds</TableCell>
                <TableCell align="right">
                  {selectedTest.letter_sounds}
                </TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sound Symbol Knowledge</TableCell>
                <TableCell align="right">
                  {selectedTest.sound_symbol_knowledge}
                </TableCell>
                <TableCell align="right">
                  {selectedTest.sound_symbol_knowledge_percentile}
                </TableCell>
                <TableCell align="right">
                  {selectedTest.sound_symbol_knowledge_standard_score}
                </TableCell>
                <TableCell align="right">
                  <GetCompositeScoreDescription
                    compositeScore={
                      selectedTest.sound_symbol_knowledge_standard_score
                    }
                  />
                </TableCell>
              </TableRow>
              {/* Repeat for other test items */}
              {/* ... */}
            </TableBody>
          </Table>
        </Paper>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            history.push(`/EditElementaryWistResults/${selectedTest.id}`)
          }
          style={{ marginTop: "20px" }}
        >
          Edit Test
        </Button>
      </div>
    </div>
  );
};

export default ElementaryWistResults;
