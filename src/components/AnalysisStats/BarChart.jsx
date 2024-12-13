import React, {useEffect, useRef, useState} from 'react';
import {Chart, registerables} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {APIv1} from '../../api';

Chart.register(...registerables, ChartDataLabels);

const BarChart = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: ['PayMe', 'Click', 'Uzum', 'Anor'],
        maxBarThickness: 8,
        datasets: [],
    });
    const [yAxisMax, setYAxisMax] = useState(4000);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await APIv1.get('/statistics/all-days-payments/');
                const apiData = response.data;

                const payme = apiData?.PAYME_PAYMENT || {};
                const click = apiData?.CLICK_PAYMENT || {};
                const uzum = apiData?.APELSIN_PAYMENT || {};
                const anor = apiData?.ANOR_PAYMENT || {};

                const successData = [
                    payme.success || 0,
                    click.success || 0,
                    uzum.success || 0,
                    anor.success || 0,
                ];
                const failureData = [
                    payme.failure || 0,
                    click.failure || 0,
                    uzum.failure || 0,
                    anor.failure || 0,
                ];

                const maxDataValue = Math.max(
                    ...successData
                );

                const newYAxisMax = Math.ceil(maxDataValue * 1.1);

                setChartData({
                    labels: ['PayMe', 'Click', 'Uzum', 'Anor'],
                    maxBarThickness: 8,
                    datasets: [
                        {label: 'Success', data: successData, backgroundColor: '#09e509'},
                        {label: 'Failure', data: failureData, backgroundColor: '#fc0303'},
                    ],
                });

                setYAxisMax(newYAxisMax);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setLoading(false);
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
                data: [yAxisMax, yAxisMax, yAxisMax, yAxisMax],
                backgroundColor: '#d3d3d3',
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
                        offset: 10,
                        formatter: (value) => value.toLocaleString(),
                    },
                },
                animation: {
                    duration: loading ? 0 : 1000,
                },
            }}
            ref={chartRef}
        />
    );
};

export default BarChart;
