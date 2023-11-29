import React from "react";
import OlderCtoppGraph from "../../Graph/OlderCtoppGraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import WISTGraph from "../../Graph/WISTGraph";
import GORT_5Graph from "../../Graph/GORT_5Graph";
import CombinedGraph from "../../Graph/CombinedGraph";
import YoungCtoppGraph from "../../Graph/YoungCtoppGraph";
import ElementarWistCtoppGraph from "../../Graph/ElementarWistCtoppGraph";

const GraphTab = () => {
  const dispatch = useDispatch();
  const ctoppTests = useSelector((store) => store.olderCtoppReducer.list); // Get data from store
  const wistTests = useSelector((store) => store.secondaryWistReducer.list); // Get data from store
  const gortTests = useSelector((store) => store.gortReducer.list); // Get data from store
  const yctoppTests = useSelector((store) => store.youngerCtoppReducer.list); // Get data from store
  const elwist = useSelector((store) => store.elementaryWistReducer.list); // Get data from store
  const student = useParams();
  console.log("AllCtopp", ctoppTests);
  console.log("AllWist", wistTests);
  console.log("AllGort", gortTests);
  console.log("Yctopp", yctoppTests);
  console.log("Elwist", elwist);
  useEffect(() => {
    dispatch({ type: "FETCH_OLDER_CTOPP_RESULTS", payload: student.id }); // Dispatch action to fetch data
    dispatch({ type: "FETCH_SECONDARY_WIST_RESULTS", payload: student.id }); // Dispatch action to fetch data
    dispatch({ type: "FETCH_GORT_RESULTS", payload: student.id }); // Dispatch action to fetch data
    dispatch({ type: "FETCH_YOUNGER_CTOPP_RESULTS", payload: student.id }); // Dispatch action to fetch data
    dispatch({ type: "FETCH_ELEMENTARY_WIST_RESULTS", payload: student.id }); // Dispatch action to fetch data
  }, [dispatch]);

  // Transform data for Highcharts
  const transformedData = ctoppTests?.map((test) => ({
    date: test.date,
    phonological_awareness_percentile: test.phonological_awareness_percentile,
    phonological_memory_percentile: test.phonological_memory_percentile,
    rapid_symbolic_naming_percentile: test.rapid_symbolic_naming_percentile,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
  }));
  const youngerCtopp = yctoppTests?.map((test) => ({
    date: test.date,
    phonological_awareness_percentile: test.phonological_awareness_percentile,
    phonological_memory_percentile: test.phonological_memory_percentile,
    rapid_symbolic_naming_percentile: test.rapid_symbolic_naming_percentile,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
  }));

  const elwistData = elwist?.map((test) => ({
    date: test.date,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
    sound_symbol_knowledge_percentile: test.sound_symbol_knowledge_percentile,
  }));

  const wistData = wistTests?.map((test) => ({
    date: test.date,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
    sound_symbol_knowledge_percentile: test.sound_symbol_knowledge_percentile,
  }));
  const gortData = gortTests?.map((test) => ({
    date: test.date,
    rate_percentile_rank: test.rate_percentile_rank,
    accuracy_percentile_rank: test.accuracy_percentile_rank,
    fluency_percentile_rank: test.fluency_percentile_rank,
    comprehension_percentile_rank: test.comprehension_percentile_rank,
    oral_reading_percentile_rank: test.oral_reading_percentile_rank,
  }));

  return (
    <div>
      <OlderCtoppGraph testData={transformedData} />
      <YoungCtoppGraph testData={youngerCtopp} />
      <WISTGraph testData={wistData} />
      <ElementarWistCtoppGraph testData={elwistData} />
      <GORT_5Graph testData={gortData} />
      <CombinedGraph
        wistData={wistData}
        olderCtoppData={transformedData}
        gort5Data={gortData}
        elwistData={elwistData}
        youngerCtoppData={youngerCtopp}
      />
    </div>
  );
};

export default GraphTab;
