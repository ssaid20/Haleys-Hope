// import { useParams, useHistory } from "react-router-dom";
// import { useEffect, useReducer } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { formatDate } from "../../lib/utils";
// import MiniStudentCard from "../Cards/MiniStudentCard";
// import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
// import { GetCompositeScoreDescription } from "../../lib/GetCompositeScoreDescription";
// import EditIcon from "@mui/icons-material/Edit";

// const KteaResults = () => {
//   const testId = useParams();
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const examiners = useSelector((store) => store.allUsersReducer.users);

//   useEffect(() => {
//     dispatch({ type: "FETCH_KTEA_RESULTS", payload: testId.id });
//   }, [dispatch]);

//   const selectedTest = useSelector((store) => store.kteaReducer.selectedTest[0]);

//   if (!selectedTest || Object.keys(selectedTest).length === 0) {
//     return <h1>Loading...</h1>;
//   }

//   // Find the examiner based on examiner_id
//   const examiner = examiners.find((user) => user.id === selectedTest.examiner_id);

//   const goBack = () => history.push(`/students/${selectedTest.student_id}`);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Button variant="contained" color="primary" onClick={goBack} style={{ marginRight: "20px" }}>
//         Back to Tests List
//       </Button>
//       {/* <h1 className="text-3xl text-center mb-4">KTEA Results </h1> */}
//       <h1 className="text-4xl font-bold text-center text-primary-500 my-4">KTEA Results </h1>

//       <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",

//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <MiniStudentCard />
//         </div>
//         <div>
//           <Paper
//             style={{
//               fontSize: "18px",
//               alignItems: "center",
//               justifyContent: "center",

//               padding: "10px",
//               maxWidth: "400px",
//               backgroundColor: "#fff",
//               borderRadius: "8px",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 padding: "28px",
//               }}
//             >
//               <Typography variant="h6" style={{ marginBottom: "10px" }}>
//                 Date: {formatDate(selectedTest.date)} &nbsp;
//               </Typography>

//               {examiner ? (
//                 <Typography variant="h6" style={{ marginBottom: "10px" }}>
//                   Examiner: {examiner.first_name} {examiner.last_name}
//                 </Typography>
//               ) : (
//                 <Typography variant="h6" style={{ marginBottom: "10px" }}>
//                   Examiner ID: {selectedTest.examiner_id}
//                 </Typography>
//               )}
//               <Typography variant="h6" style={{ marginBottom: "10px" }}>
//                 Grade When Test Given: {selectedTest.grade} &nbsp;
//               </Typography>
//             </div>
//           </Paper>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           gap: "350px",
//           justifyContent: "center",
//           // paddingRight: "150px",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",

//             fontWeight: "bold",
//             fontSize: "20px",
//           }}
//         >
//           Performance Summary
//         </h2>
//         <div>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => history.push(`/EditKteaResults/${selectedTest.id}`)}
//             // style={{ marginTop: "20px", marginRight: "50px" }}
//           >
//             <EditIcon /> &nbsp; Edit Test
//           </Button>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           marginTop: "10px",
//         }}
//       >
//         <Paper
//           style={{
//             width: "100%",
//             maxWidth: "1000px",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow style={{ backgroundColor: "lightgrey" }}>
//                 <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Assessment Area</TableCell>
//                 <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
//                   Scaled Score
//                 </TableCell>
//                 <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
//                   Percentile Rank
//                 </TableCell>

//                 <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
//                   Descriptive Term
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>Letter and Word Recognition</TableCell>
//                 <TableCell align="right">{selectedTest.lwr_scaled_score}</TableCell>
//                 <TableCell align="right">{selectedTest.lwr_percentile}</TableCell>
//                 <TableCell align="right" style={{ fontWeight: "bold" }}>
//                   <GetCompositeScoreDescription compositeScore={selectedTest.lwr_scaled_score} />
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Spelling</TableCell>
//                 <TableCell align="right">{selectedTest.spelling_scaled_score}</TableCell>
//                 <TableCell align="right">{selectedTest.spelling_percentile}</TableCell>
//                 <TableCell align="right" style={{ fontWeight: "bold" }}>
//                   <GetCompositeScoreDescription compositeScore={selectedTest.spelling_scaled_score} />
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </Paper>
//       </div>
//     </div>
//   );
// };

// export default KteaResults;

import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";
import { Button, Table, TableBody, TableCell, TableRow, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const KteaResults = () => {
  const { id: testId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const examiners = useSelector((store) => store.allUsersReducer.users);

  useEffect(() => {
    dispatch({ type: "FETCH_KTEA_RESULTS", payload: testId });
  }, [dispatch, testId]);

  const selectedTest = useSelector((store) => store.kteaReducer.selectedTest[0]);

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  const examiner = examiners.find((user) => user.id === selectedTest.examiner_id);

  const goBack = () => history.push(`/students/${selectedTest.student_id}`);

  return (
    <div style={{ padding: "20px" }}>
      <Button variant="contained" color="primary" onClick={goBack} style={{ marginBottom: "20px" }}>
        Back to Tests List
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        KTEA Results
      </Typography>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <MiniStudentCard />
        <Paper style={{ padding: "20px", maxWidth: "400px" }}>
          <Typography variant="h6">Date: {formatDate(selectedTest.date)}</Typography>
          <Typography variant="h6">
            Examiner:{" "}
            {examiner ? `${examiner.first_name} ${examiner.last_name}` : `ID: ${selectedTest.examiner_id}`}
          </Typography>
          <Typography variant="h6">Grade When Test Given: {selectedTest.grade}</Typography>
        </Paper>
      </div>

      <Paper style={{ maxWidth: "600px", margin: "auto" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Letter and Word Recognition Scaled Score</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{selectedTest.lwr_scaled_score}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Letter and Word Recognition % ile</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{selectedTest.lwr_percentile}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Spelling Scaled Score</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{selectedTest.spelling_scaled_score}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Spelling % ile</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{selectedTest.spelling_percentile}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/EditKteaResults/${testId}`)}
          startIcon={<EditIcon />}
        >
          Edit Test
        </Button>
      </div>
    </div>
  );
};

export default KteaResults;
