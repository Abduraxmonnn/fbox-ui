import React, {useCallback, useEffect, useState} from 'react';
import {Chart, registerables} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {APIv1} from "../../../../api";

Chart.register(...registerables, ChartDataLabels);

const ClickTransactionsPieChart = ({period}) => {
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);

    const fetchClickData = useCallback(async () => {
        try {
            let url = period ? `/analysis/transactions/counts/click/?period=${period}` : '/analysis/transactions/counts/click/'
            const response = await APIv1.get(url, {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const usersData = response.data;

            setFetchedData({
                'success': usersData.success,
                'failure': usersData.failure,
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [userData.token, period]);

    useEffect(() => {
        if (!userData.token) return;

        fetchClickData()
    }, [userData.token, period])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    const data = {
        labels: ['Success', 'Failure'],
        datasets: [
            {
                label: '# of Votes',
                data: [fetchedData.success, fetchedData.failure],
                borderWidth: 2,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
            },
        ],
    };

    return (
        <Pie data={data}/>
    );
};

export default ClickTransactionsPieChart;

