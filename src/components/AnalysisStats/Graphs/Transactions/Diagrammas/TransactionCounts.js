import React, {useEffect} from 'react';
import { Line } from '@antv/g2plot';
import localData from './fakeData.json';
import localData2 from './fake_data.json';

const AreaChartComponent = () => {
    useEffect(() => {
        const linePlot = new Line('container', {
            data: localData,
            xField: 'year',
            yField: 'gdp',
            seriesField: 'name',
            yAxis: {
                label: {
                    formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
                },
            },
            legend: {
                position: 'top',
            },
            smooth: true,
            // 配置折线趋势填充
            area: {
                style: {
                    fillOpacity: 0.15,
                },
            },
            animation: {
                appear: {
                    animation: 'wave-in',
                    duration: 3000,
                },
            },
        })
        linePlot.render();

        // Cleanup function to destroy the chart if the component unmounts
        return () => {
            if (window?.area) {
                window.area.destroy();
            }
        };
    }, []);

    return <div id="container" style={{height: '600px', width: '75%'}}></div>;
};

export default AreaChartComponent;
