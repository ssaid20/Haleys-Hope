import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const CtoppGraph = ({ testData }) => {
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "CTOPP Test Comparisons",
      align: "left",
    },
    xAxis: {
      categories: ["Phonological Awareness", "Phonological Memory", "Rapid Symbolic Naming"],
    },
    yAxis: {
      title: {
        text: "Percentile",
      },
    },
    tooltip: {
      valueSuffix: " percentile",
    },
    series: [],
  });

  useEffect(() => {
    if (testData) {
        console.log("Test Data",testData);
      const seriesData = testData.map((test, index) => ({
        name: `Test ${index + 1}`,
        data: [
          test.phonological_awareness_composite,
          test.phonological_memory_composite,
          test.rapid_symbolic_naming_composite,
        ],
      }));

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: seriesData,
      }));
    }
  }, [testData]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CtoppGraph;
