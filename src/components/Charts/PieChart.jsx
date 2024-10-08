import React, {useCallback, useEffect, useState} from 'react';
import {Pie} from '@ant-design/plots';
import {APIv1} from "../../api";

const PieChart = () => {
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items && items.token) {
            setUserData(items);
        } else {
            console.error('Token not found in localStorage');
        }
    }, []);

    const fetchUserData = useCallback(async () => {
        if (!userData.token) {
            console.error('Token is missing');
            return;
        }

        try {
            const response = await APIv1.get('/device/status/', {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const usersData = response.data;

            setData([
                {type: 'Online', value: usersData.online},
                {type: 'Offline', value: usersData.offline},
            ]);

            setTotalUsers(usersData.total);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [userData.token]);

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

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
                    text: `Active Users\nTotal: ${totalUsers}`,
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
