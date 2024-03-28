import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import { Button } from "../ui/button";
import { TableRow, TableCell } from "@mui/material";

const KteaList = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.kteaReducer.list);
  const student = useParams();
  const [selectedTest, setSelectedTest] = useState(null);
  // const studentId = useSelector((state) => state.studentId);
  const isLoading = useSelector((state) => state.kteaReducer.isLoading);
  const history = useHistory();
  useEffect(() => {
    //need to get student id and pass it in somehow in the dispatch, with a payload: studentId
    dispatch({ type: "FETCH_KTEA", payload: student.id });
  }, [dispatch]);

  //if loading tests, display a loading message
  if (isLoading) return <p>Loading tests...</p>;
  //if (error) return <p>Error: {error}</p>;

  //if there are no tests, display none available for now
  if (tests.length === 0) {
    return <p>No KTEA-3 tests available.</p>;
  }

  const moreDetails = (testId) => {
    history.push(`/kteaResults/${testId}`);
  };

  return (
    <div>
      <TableCell style={{ width: 250}}>
KTEA - 3
      </TableCell>
      {tests.map((test) => (
            <TableCell style={{ width: 250 }} key={test.id}>
      
              <Button
                variant="outline"
                className=" text-xs px-2 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                onClick={() => moreDetails(test.id)}
              >
                {formatDate(test.date)}
              </Button>
            </TableCell>
      ))}

      {selectedTest && (
        <div>
          <button onClick={() => setSelectedTest(null)}>Close Details</button>
          <div>
            <h2>Test Details:</h2>
            <p>Date: {formatDate(selectedTest.date)}</p>
            <p>Examiner ID: {selectedTest.examiner_id}</p>
            <p>Letter and Word Recognition Scaled Score: {selectedTest.lwc_scaled_score}</p>
            <p>Letter and Word Recognition Percentile: {selectedTest.lwc_percentile}</p>
            <p>Spelling Scaled Score: {selectedTest.spelling_scaled_score}</p>
            <p>Spelling Percentile: {selectedTest.spelling_percentile}</p>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default KteaList;
