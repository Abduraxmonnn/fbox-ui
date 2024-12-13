import React, {useEffect, useRef, useState} from 'react';
import {Chart, registerables} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {APIv1} from '../../api';

Chart.register(...registerables, ChartDataLabels);

const BarChart = () => {
    const chartRef = useRef(null); // Reference to the canvas element
    const [chartData, setChartData] = useState({
        labels: ['PayMe', 'Click', 'Uzum', 'Anor'],
        maxBarThickness: 8,
        datasets: [],
    });
    const [yAxisMax, setYAxisMax] = useState(4000); // Default max value
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIv1.get('/statistics/all-days-payments/');
                const apiData = response.data;

                const maxDataValue = Math.max(
                    ...Object.values(apiData).map((payment) => payment.success)
                );

                const newYAxisMax = Math.ceil(maxDataValue * 1.1);

                const successData = [
                    apiData.PAYME_PAYMENT.success,
                    apiData.CLICK_PAYMENT.success,
                    apiData.APELSIN_PAYMENT.success,
                    apiData.ANOR_PAYMENT.success,
                ];
                const failureData = [
                    apiData.PAYME_PAYMENT.failure,
                    apiData.CLICK_PAYMENT.failure,
                    apiData.APELSIN_PAYMENT.failure,
                    apiData.ANOR_PAYMENT.failure,
                ];

                setChartData({
                    labels: ['PayMe', 'Click', 'Uzum', 'Anor'],
                    maxBarThickness: 8,
                    datasets: [
                        {label: 'Success', data: successData, backgroundColor: '#09e509'},
                        {label: 'Failure', data: failureData, backgroundColor: '#fc0303'},
                    ],
                });

                setYAxisMax(newYAxisMax);
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const placeholderData = {
        labels: ['PayMe', 'Click', 'Uzum', 'Anor'],
        maxBarThickness: 8,
        datasets: [
            {
                label: 'Loading...',
                data: [yAxisMax, yAxisMax, yAxisMax, yAxisMax], // Full columns
                backgroundColor: '#d3d3d3', // Gray color for loading
            },
        ],
    };

    return (
        <Bar
            data={loading ? placeholderData : chartData}
            options={{
                scales: {
                    y: {
                        max: yAxisMax,
                    },
                },
                plugins: {
                    datalabels: {
                        display: true,
                        color: 'black',
                        anchor: 'end',
                        align: 'end',
                        offset: 10, // Move labels outside the bar
                        formatter: (value) => value.toLocaleString(),
                    },
                },
                animation: {
                    duration: loading ? 0 : 1000, // No animation for loading state
                },
            }}
            ref={chartRef}
        />
    );
};

export default BarChart;
