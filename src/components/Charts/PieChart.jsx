import React from 'react';
import {Pie} from '@ant-design/plots';

const PieChart = () => {
    const data = [
        {type: 'Online', value: 300},
        {type: 'Offline', value: 100},
    ];

    const totalUsers = data.reduce((acc, item) => acc + item.value, 0);
    const config = {
        data,
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
                    text: `Online Users\nTotal: ${totalUsers}`,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 18,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return <Pie {...config} />;
};

export default PieChart;