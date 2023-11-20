import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CombinedGraph = ({ wistData, olderCtoppData, gort5Data }) => {
    const [options, setOptions] = useState({
        chart: {
            type: 'column',
        },
        title: {
            text: 'Combined Test Comparisons',
            align: 'left',
        },
        xAxis: {
            categories: [
                // Specify the categories from all tests
                "Reading Words in Isolation",
                "Spelling",
                "Fundamental Literacy Ability Index",
                "Sound to Symbol Knowledge",
                "Phonological Awareness",
                "Phonological Memory",
                "Rapid Symbolic Naming",
                "Reading Rate",
                "Reading Accuracy",
                "Reading Fluency",
                "Reading Comprehension",
                "Oral Reading Index",
            ],
        },
        yAxis: {
            title: {
                text: 'Percentile',
            },
        },
        tooltip: {
            valueSuffix: ' percentile',
        },
        plotOptions: {
            series: {
                borderRadius: '25%',
            },
        },
        series: [],
    });

    useEffect(() => {
        // Process and combine data from wistData, olderCtoppData, and gort5Data
        const processTestData = (testData, testCategories) => {
            return testData.map(test => testCategories.map(category => test[category]));
        };

        const wistCategories = [
            'word_identification_percentile',
            'spelling_percentile',
            'fundamental_literacy_percentile',
            'sound_symbol_knowledge_percentile'
        ];

        const olderCtoppCategories = [
            'phonological_awareness_percentile',
            'phonological_memory_percentile',
            'rapid_symbolic_naming_percentile'
        ];

        const gort5Categories = [
            'rate_percentile_rank',
            'accuracy_percentile_rank',
            'fluency_percentile_rank',
            'comprehension_percentile_rank',
            'oral_reading_percentile_rank'
        ];

        const wistSeriesData = processTestData(wistData, wistCategories);
        const olderCtoppSeriesData = processTestData(olderCtoppData, olderCtoppCategories);
        const gort5SeriesData = processTestData(gort5Data, gort5Categories);

        const combinedSeries = wistSeriesData.map((data, index) => ({
            type: 'column',
            name: `WIST Test ${index + 1}`,
            data: [...data, ...new Array(7).fill(null)] // Fill the rest of the categories with null
        })).concat(
            olderCtoppSeriesData.map((data, index) => ({
                type: 'column',
                name: `Older CTOPP Test ${index + 1}`,
                data: [...new Array(4).fill(null), ...data, ...new Array(5).fill(null)] // Align the data correctly
            }))
        ).concat(
            gort5SeriesData.map((data, index) => ({
                type: 'column',
                name: `GORT-5 Test ${index + 1}`,
                data: [...new Array(7).fill(null), ...data] // Align the data correctly
            }))
        );

        setOptions((prevOptions) => ({
            ...prevOptions,
            series: combinedSeries
        }));
    }, [wistData, olderCtoppData, gort5Data]);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default CombinedGraph;

