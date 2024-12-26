import React, {useCallback, useEffect, useState} from 'react';
import {Chart, registerables} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {APIv1} from "../../../../api";

Chart.register(...registerables, ChartDataLabels);

const PayMeTransactionsPieChart = ({period}) => {
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);

    const fetchPayMeData = useCallback(async () => {
        try {
            let url = period ? `/analysis/transactions/counts/payme/?period=${period}` : '/analysis/transactions/counts/payme/'
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

        fetchPayMeData()
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
                label: 'No of Transactions',
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

export default PayMeTransactionsPieChart;

