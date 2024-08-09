import React from 'react';
import ReactDOM from 'react-dom';
import {Pie} from '@ant-design/plots';

const PieChart = () => {
    const config = {
        data: [
            {type: 'Online', value: 300},
            {type: 'Offline', value: 100},
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'value',
            style: {
                fontSize: 14,
            },
        },
        legend: {
            position: 'right',
        },
        annotations: [
            {
                type: 'text',
                style: {
                    // text: 'Users',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 40,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return <Pie {...config} />;
};

export default PieChart;