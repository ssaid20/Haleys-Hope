import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatDate3 } from "../../lib/utils";
const ElementarWistCtoppGraph = ({ testData }) => {
  console.log("WISTDATA", testData); // Log to verify the data structure
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Elementary Wist Test Comparisons",
      align: "left",
    },
    xAxis: {
      categories: [
        "Reading Words in Isolation",
        "Spelling",
        "Fundamental Literacy Ability Index",
        "Sound to Symbol Knowledge",
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
          test.word_identification_percentile, // Corrected property name
          test.spelling_percentile, // Corrected property name
          test.fundamental_literacy_percentile, // Corrected property name
          test.sound_symbol_knowledge_percentile, // Corrected property name
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
      const growthRates = testData.slice(1).map((test, index) => {
        const previousTest = testData[index];
        return {
          readingWords: test.word_identification_percentile - previousTest.word_identification_percentile,
          spelling: test.spelling_percentile - previousTest.spelling_percentile,
          fundamentalLiteracy: test.fundamental_literacy_percentile - previousTest.fundamental_literacy_percentile,
          soundSymbol: test.sound_symbol_knowledge_percentile - previousTest.sound_symbol_knowledge_percentile,
        };
      });

      const growthRateSeries = growthRates.map((growth, index) => ({
        type: 'line',
        name: `Growth from Test ${index + 1} to ${index + 2}`,
        data: [
          growth.readingWords, 
          growth.spelling,
          growth.fundamentalLiteracy,
          growth.soundSymbol
        ],
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

export default ElementarWistCtoppGraph;