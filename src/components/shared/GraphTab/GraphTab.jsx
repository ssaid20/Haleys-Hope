import React from "react";
import OlderCtoppGraph from "../../Graph/CtoppGraph";
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
    phonological_awareness_percentile: test.phonological_awareness_percentile,
    phonological_memory_percentile: test.phonological_memory_percentile,
    rapid_symbolic_naming_percentile: test.rapid_symbolic_naming_percentile,
  }));

  return (
    <div>
      <OlderCtoppGraph testData={transformedData} />
    </div>
  );
};

export default GraphTab;
