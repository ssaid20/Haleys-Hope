import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const GORT_5Graph = ({ testData }) => {
  console.log("GORTDATA", testData); // Log to verify the data structure
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Gray Oral Reading Test -5 (GORT-5) Comparisons",
      align: "left",
    },
    xAxis: {
      categories: [
        "Reading Rate",
        "Reading Accuracy",
        "Reading Fluency",
        "Reading Comprehension",
        "Oral Reading Index",
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
          test.rate_percentile_rank, 
          test.accuracy_percentile_rank,
          test.fluency_percentile_rank,
          test.comprehension_percentile_rank,
          test.oral_reading_percentile_rank,
        ],
      }));

      const averages = seriesData[0].data.map(
        (_, i) =>
          seriesData.reduce((acc, test) => acc + test.data[i], 0) /
          seriesData.length
      );

      const averageSeries = {
        type: "line",
        step: 'center',
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

export default GORT_5Graph;
