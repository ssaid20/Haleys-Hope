import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { GetCompositeScoreDescription } from "../../lib/GetCompositeScoreDescription";
import { GetScaledScoreDescription } from "../../lib/GetScaledScoreDescription";
import EditIcon from "@mui/icons-material/Edit";
import MicroStudentCard from "../Cards/MicroStudentCard";
import PrintButton2 from "../PrintButton/PrintButton2";
import DescriptiveTable from "../DescriptiveTable/DescriptiveTable";

const OlderCtoppResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const examiners = useSelector((store) => store.allUsersReducer.users);

  useEffect(() => {
    dispatch({ type: "FETCH_OLDER_CTOPP_RESULTS", payload: testId.id });
  }, [dispatch]);

  const selectedTest = useSelector((store) => store.olderCtoppReducer.selectedTest[0]);

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  // Find the examiner based on examiner_id
  const examiner = examiners.find((user) => user.id === selectedTest.examiner_id);

  const goBack = () => history.push(`/students/${selectedTest.student_id}`);

  return (
    <div style={{ padding: "20px" }}>
      <Button
        className="noPrint"
        variant="contained"
        color="primary"
        onClick={goBack}
        style={{ marginRight: "20px" }}
      >
        Back to Tests List
      </Button>
      <PrintButton2 />
      {/* <h1 className="text-3xl text-center mb-4">CTOPP 7-24 Results </h1> */}
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">
        <img
          src="/assets/images/site-logo.png"
          width={180}
          height={180}
          className="logo-image print-logo"
          alt="Haley's Hope Logo"
        />{" "}
        CTOPP 7-24 Results{" "}
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div className="screen-view">
            <MiniStudentCard />
          </div>
          <div className="print-view">
            <MicroStudentCard />
          </div>{" "}
        </div>
        <div>
          <Paper
            style={{
              fontSize: "12px",
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

              {/* {examiner ? (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner: {examiner.first_name} {examiner.last_name}
                </Typography>
              ) : (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner ID: {selectedTest.examiner_id}
                </Typography>
              )} */}
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                Grade When Given: {selectedTest.grade} &nbsp;
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
        {/* <h2
          className="noPrint"
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          Sub-test Performance
        </h2> */}
        <div>
          <Button
            className="noPrint"
            variant="contained"
            color="primary"
            onClick={() => history.push(`/EditOlderCtoppResults/${selectedTest.id}`)}
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
          <Table size="small">
            <TableHead>
              <TableRow style={{ backgroundColor: "lightgrey" }}>
                <TableCell style={{ fontWeight: "bold", fontSize: "12px" }}>Sub Test</TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Scaled Score
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Descriptive Term
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <strong>Core</strong>
                </TableCell>
                <TableCell style={{fontSize: "12px" }} align="center"></TableCell>
                <TableCell style={{fontSize: "12px" }} align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Elison Scaled Score (EL)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.elison_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.elison_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Blending Words (BW)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.blending_words_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.blending_words_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Phoneme Isolation (PI)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.phoneme_isolation_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.phoneme_isolation_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Memory For Digits (MD)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.memory_for_digits_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.memory_for_digits_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Non-Word Repitition (NR)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.nonword_repetition_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.nonword_repetition_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Rapid Digit Naming (RD)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.rapid_digit_naming_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.rapid_digit_naming_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Rapid Letter Naming (RL)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.rapid_letter_naming_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.rapid_letter_naming_scaled_score} />
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell align="center">
                  <strong>Supplemental</strong>
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Blending Non-Words (BN)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.blending_nonwords_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.blending_nonwords_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{fontSize: "12px" }}>Segmenting Non-Words (SN)</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.segmenting_nonwords_scaled_score}</TableCell>
                <TableCell style={{fontSize: "12px" }} align="center">
                  <GetScaledScoreDescription scaledScore={selectedTest.segmenting_nonwords_scaled_score} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* <div style={{ breakBefore: "page" }}></div> */}

          {/* <Typography
            variant="h6"
            align="center"
            style={{
              marginBottom: "10px",
              marginTop: "75px",
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
              marginLeft: "50px",
            }}
          >
            Composite Performance
          </Typography> */}
          <Table size="small">
            <TableHead
              style={{
                backgroundColor: "#e0e0e0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Composite
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>
                  %ile Rank
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Composite Score
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Descriptive Term
                </TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell style={{fontSize: "12px" }}>Phonological Awareness</TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.phonological_awareness_percentile}</TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">
                {selectedTest.phonological_awareness_descriptor}&nbsp;
                {selectedTest.phonological_awareness_composite}
              </TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">
                <GetCompositeScoreDescription
                  compositeScore={selectedTest.phonological_awareness_composite}
                  descriptor={selectedTest.phonological_awareness_descriptor}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontSize: "12px" }}>Phonological Memory</TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.phonological_memory_percentile}</TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">
                {selectedTest.phonological_memory_descriptor}&nbsp;
                {selectedTest.phonological_memory_composite}
              </TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">
                <GetCompositeScoreDescription
                  compositeScore={selectedTest.phonological_memory_composite}
                  descriptor={selectedTest.phonological_memory_descriptor}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontSize: "12px" }}>Rapid Symbolic Naming</TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.rapid_symbolic_naming_percentile}</TableCell>
              <TableCell  style={{fontSize: "12px" }} align="center">
                {selectedTest.rapid_symbolic_naming_descriptor}&nbsp;
                {selectedTest.rapid_symbolic_naming_composite}
              </TableCell>
              <TableCell  style={{fontSize: "12px" }} align="center">
                <GetCompositeScoreDescription
                  compositeScore={selectedTest.rapid_symbolic_naming_composite}
                  descriptor={selectedTest.rapid_symbolic_naming_descriptor}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{fontSize: "12px" }}>Alt. Phonological Awareness</TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">{selectedTest.alt_phonological_awareness_percentile}</TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">
                {selectedTest.alt_phonological_awareness_descriptor}&nbsp;
                {selectedTest.alt_phonological_awareness_composite}
              </TableCell>
              <TableCell style={{fontSize: "12px" }} align="center">
                <GetCompositeScoreDescription
                  compositeScore={selectedTest.alt_phonological_awareness_composite}
                  descriptor={selectedTest.alt_phonological_awareness_descriptor}
                />
              </TableCell>
            </TableRow>
          </Table>
          <DescriptiveTable />
        </Paper>
      </div>
    </div>
  );
};

export default OlderCtoppResults;
