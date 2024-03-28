import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom";
import { TableRow, TableCell } from "@mui/material";
import { Button } from "../ui/button";
const YoungerCtoppList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tests = useSelector((state) => state.youngerCtoppReducer.list);
  const student = useParams();

  // const studentId = useSelector((state) => state.studentId);
  const isLoading = useSelector((state) => state.youngerCtoppReducer.isLoading);
  console.log(tests);
  useEffect(() => {
    //need to get student id and pass it in somehow in the dispatch, with a payload: studentId
    dispatch({ type: "FETCH_YOUNGER_CTOPP", payload: student.id });
  }, [dispatch]);

  //if loading tests, display a loading message
  if (isLoading) return <p>Loading tests...</p>;

  //if there are no tests, display none available for now
  if (tests.length === 0) {
    return <p>No CTOPP 4-6 tests available.</p>;
  }

  const moreDetails = (testId) => {
    history.push(`/YoungerCtoppResults/${testId}`);
  };

  return (
    <div>
      <TableCell style={{ width: 250 }}>CTOPP Age 4-6</TableCell>
      {tests.map((test) => (
        <TableCell key={test.id} style={{ width: 250 }}>
          <Button
            variant="outline"
            className=" text-xs px-2 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
            onClick={() => moreDetails(test.id)}
          >
            {formatDate(test.date)}
          </Button>
        </TableCell>
      ))}
      <hr />
    </div>
  );
};

export default YoungerCtoppList;
