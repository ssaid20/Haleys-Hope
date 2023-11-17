import React from "react";
import CtoppGraph from "../../Graph/CtoppGraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const GraphTab = () => {
  const dispatch = useDispatch();
  const ctoppTests = useSelector((store) => store.olderCtoppReducer.list); // Get data from store
  const student = useParams();
  console.log("AllCtopp",ctoppTests);
  useEffect(() => {
    dispatch({ type: "FETCH_OLDER_CTOPP_RESULTS", payload: student.id }); // Dispatch action to fetch data
  }, [dispatch]);

  // Transform data for Highcharts
  const transformedData = ctoppTests.map((test) => ({
    phonological_awareness_percecenile: test.phonological_awareness_percecenile,
    phonological_memory_percentile: test.phonological_memory_percentile,
    rapid_symbolic_naming_percentile: test.rapid_symbolic_naming_percentile,
  }));

  return (
    <div>
      <CtoppGraph testData={transformedData} />
    </div>
  );
};

export default GraphTab;
