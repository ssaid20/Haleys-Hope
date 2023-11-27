import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatDate3 } from "../../lib/utils";

const GORT_5Graph = ({ testData }) => {
  console.log("GORTDATA", testData); // Log to verify the data structure
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "GORT-5 Test Comparison",
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
        name: formatDate3(test.date),
        data: [
          test.rate_percentile_rank,
          test.accuracy_percentile_rank,
          test.fluency_percentile_rank,
          test.comprehension_percentile_rank,
          test.oral_reading_percentile_rank,
        ],
      }));

      const averages = seriesData[0].data.map(
        (_, i) => seriesData.reduce((acc, test) => acc + test.data[i], 0) / seriesData.length
      );

      const averageSeries = {
        type: "line",
        step: "center",
        name: "Average",
        data: averages,
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: "white",
        },
      };

      // New code to calculate growth rates
      const growthRates = testData.slice(1).map((test, index) => {
        const previousTest = testData[index];
        return {
          rate: test.rate_percentile_rank - previousTest.rate_percentile_rank,
          accuracy: test.accuracy_percentile_rank - previousTest.accuracy_percentile_rank,
          fluency: test.fluency_percentile_rank - previousTest.fluency_percentile_rank,
          comprehension: test.comprehension_percentile_rank - previousTest.comprehension_percentile_rank,
          oralReading: test.oral_reading_percentile_rank - previousTest.oral_reading_percentile_rank,
        };
      });

      const growthRateSeries = growthRates.map((growth, index) => ({
        type: "line",
        name: `Growth from Test ${index + 1} to ${index + 2}`,
        data: [growth.rate, growth.accuracy, growth.fluency, growth.comprehension, growth.oralReading],
      }));

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [...seriesData, averageSeries, ...growthRateSeries],
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
