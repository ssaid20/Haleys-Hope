import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { GetCompositeScoreDescription } from "../../lib/GetCompositeScoreDescription";
import { GetScaledScoreDescription } from "../../lib/GetScaledScoreDescription";
import EditIcon from "@mui/icons-material/Edit";

const YoungerCtoppResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const examiners = useSelector((store) => store.allUsersReducer.users);

  useEffect(() => {
    console.log("useEffect selected test, expect empty", selectedTest);
    dispatch({ type: "FETCH_YOUNGER_CTOPP_RESULTS", payload: testId.id });
  }, [dispatch]);

  const selectedTest = useSelector((store) => store.youngerCtoppReducer.selectedTest[0]);

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }
  // Find the examiner based on examiner_id
  const examiner = examiners.find((user) => user.id === selectedTest.examiner_id);
  const goBack = () => history.push(`/students/${selectedTest.student_id}`);

  return (
    <div style={{ padding: "20px" }}>
      <Button variant="contained" color="primary" onClick={goBack} style={{ marginRight: "20px" }}>
        Back to Tests List
      </Button>
      {/* <h1 className="text-3xl text-center mb-4">CTOPP 4-6 Results </h1> */}
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">CTOPP 4-6 Results </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <MiniStudentCard />
        </div>
        <div>
          <Paper
            style={{
              fontSize: "18px",
              alignItems: "center",
              justifyContent: "center",

              padding: "10px",
              maxWidth: "400px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "28px",
              }}
            >
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                Date: {formatDate(selectedTest.date)} &nbsp;
              </Typography>
              {examiner ? (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner: {examiner.first_name} {examiner.last_name}
                </Typography>
              ) : (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner ID: {selectedTest.examiner_id}
                </Typography>
              )}
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                Grade When Test Given: {selectedTest.grade} &nbsp;
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "350px",
          justifyContent: "center",
          // paddingRight: "150px",
        }}
      >
        <h2
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Sub-test Performance
        </h2>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/EditYoungerCtoppResults/${selectedTest.id}`)}
            // style={{ marginTop: "20px", marginRight: "50px" }}
          >
            <EditIcon /> &nbsp; Edit Test
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
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
              <TableRow style={{ backgroundColor: "lightgrey" }}>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Subtest</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Scaled Score
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Descriptive Term
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Core</strong>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Elison Scaled Score (EL)</TableCell>
                <TableCell align="right">{selectedTest.elison_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.elison_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Blending Words (BW)</TableCell>
                <TableCell align="right">{selectedTest.blending_words_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.blending_words_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sound Matching (SM)</TableCell>
                <TableCell align="right">{selectedTest.sound_matching_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.sound_matching_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Memory For Digits (MD)</TableCell>
                <TableCell align="right">{selectedTest.memory_for_digits_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.memory_for_digits_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Non-Word Repitition (NR)</TableCell>
                <TableCell align="right">{selectedTest.nonword_repetition_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.nonword_repetition_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rapid Digit Naming (RD)</TableCell>
                <TableCell align="right">{selectedTest.rapid_digit_naming_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.rapid_digit_naming_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rapid Letter Naming (RL)</TableCell>
                <TableCell align="right">{selectedTest.rapid_letter_naming_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.rapid_letter_naming_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rapid Color Naming (RC)</TableCell>
                <TableCell align="right">{selectedTest.rapid_color_naming_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.rapid_color_naming_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rapid Object Naming (RO)</TableCell>
                <TableCell align="right">{selectedTest.rapid_object_naming}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.rapid_object_naming} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Supplemental</strong>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Blending Non-Words (BN)</TableCell>
                <TableCell align="right">{selectedTest.blending_nonwords_scaled_score}</TableCell>
                <TableCell align="right">
                  <GetScaledScoreDescription scaledScore={selectedTest.blending_nonwords_scaled_score} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography
            variant="h6"
            align="center"
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "left",
              marginLeft: "50px",
            }}
          >
            Composite Performance
          </Typography>
          <Table>
            <TableHead
              style={{
                backgroundColor: "#e0e0e0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Composite
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  %ile Rank
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Composite Score
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Descriptive Term
                </TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell>Phonological Awareness</TableCell>
              <TableCell align="right">{selectedTest.phonological_awareness_percentile}</TableCell>
              <TableCell align="right">{selectedTest.phonological_awareness_composite}</TableCell>
              <TableCell align="right">
                <GetCompositeScoreDescription
                  compositeScore={selectedTest.phonological_awareness_composite}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phonological Memory</TableCell>
              <TableCell align="right">{selectedTest.phonological_memory_percentile}</TableCell>
              <TableCell align="right">{selectedTest.phonological_memory_composite}</TableCell>
              <TableCell align="right">
                <GetCompositeScoreDescription compositeScore={selectedTest.phonological_memory_composite} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rapid Symbolic Naming</TableCell>
              <TableCell align="right">{selectedTest.rapid_symbolic_naming_percentile}</TableCell>
              <TableCell align="right">{selectedTest.rapid_symbolic_naming_composite}</TableCell>
              <TableCell align="right">
                <GetCompositeScoreDescription compositeScore={selectedTest.rapid_symbolic_naming_composite} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rapid Non-Symbolic Naming</TableCell>
              <TableCell align="right">{selectedTest.rapid_non_symbolic_naming_percentile}</TableCell>
              <TableCell align="right">{selectedTest.rapid_non_symbolic_naming_composite}</TableCell>
              <TableCell align="right">
                <GetCompositeScoreDescription
                  compositeScore={selectedTest.rapid_non_symbolic_naming_composite}
                />
              </TableCell>
            </TableRow>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default YoungerCtoppResults;
