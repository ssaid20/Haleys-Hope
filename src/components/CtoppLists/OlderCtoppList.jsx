import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom";

const OlderCtoppList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tests = useSelector((state) => state.olderCtoppReducer.list);
  const student = useParams();

  // const studentId = useSelector((state) => state.studentId);
  const isLoading = useSelector((state) => state.olderCtoppReducer.isLoading);
  console.log(tests);
  useEffect(() => {
    //need to get student id and pass it in somehow in the dispatch, with a payload: studentId
    dispatch({ type: "FETCH_OLDER_CTOPP", payload: student.id });
  }, [dispatch]);

  //if loading tests, display a loading message
  if (isLoading) return <p>Loading tests...</p>;

  //if there are no tests, display none available for now
  if (tests.length === 0) {
    return <p>No CTOPP 7-24 tests available.</p>;
  }

  const moreDetails = (testId) => {
    history.push(`/olderCtoppResults/${testId}`);
  };

  return (
    <div>
      {tests.map((test) => (
        <div key={test.id} onClick={() => moreDetails(test.id)}>
          <p>
            CTOPP Age 7-24 Date: {formatDate(test.date)} (click for details)
          </p>
        </div>
      ))}
    </div>
  );
};

export default OlderCtoppList;
