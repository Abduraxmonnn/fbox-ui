import React, {useCallback, useEffect, useState} from 'react';
import {Pie} from '@ant-design/plots';
import {APIv1} from "../../../api";

const ActiveDevicesPieChart = () => {
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await APIv1.get('/device/recent/status/', {
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
        if (!userData.token) return;

        fetchUserData()
    }, [userData.token])


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

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
                    text: `Active Devices\nTotal: ${totalUsers}`,
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

export default ActiveDevicesPieChart;
