import React from 'react';
import {Chart, registerables} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

const PieChart = () => {
    const data = {
        labels: ['Success', 'Failure'],
        datasets: [
            {
                label: '# of Votes',
                data: [250, 126],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={data}/>
    );
};

export default PieChart;

