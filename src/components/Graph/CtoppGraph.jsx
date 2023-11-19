import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const OlderCtoppGraph = ({ testData }) => {
  console.log("testData", testData); // Log to verify the data structure
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "CTOPP OVER-7 Test Comparisons",
      align: "left",
    },
    xAxis: {
      categories: [
        "Phonological Awareness",
        "Phonological Memory",
        "Rapid Symbolic Naming",
      ],
    },
    yAxis: {
      title: {
        text: "Percentile",
      },
    },
    tooltip: {
      valueSuffix: " percentile",
    },
    plotOptions: {
      series: {
        borderRadius: "25%",
      },
    },
    series: [],
  });

  useEffect(() => {
    if (testData && testData.length > 0) {
      const seriesData = testData.map((test, index) => ({
        type: "column",
        name: `Test ${index + 1}`,
        data: [
          test.phonological_awareness_percentile, // Corrected property name
          test.phonological_memory_percentile, // Corrected property name
          test.rapid_symbolic_naming_percentile, // Corrected property name
        ],
      }));

      const averages = seriesData[0].data.map(
        (_, i) =>
          seriesData.reduce((acc, test) => acc + test.data[i], 0) /
          seriesData.length
      );

      const averageSeries = {
        type: "line",
        name: "Average",
        data: averages,
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: "white",
        },
      };

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [...seriesData, averageSeries],
      }));
    }
  }, [testData]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default OlderCtoppGraph;
