import CountUp from "react-countup";
import {MonitorCheck, MonitorDot} from 'lucide-react';
import '../BaseNumberCardStyle.css'
import './DeviceStatusCard.css'
import React, {useCallback, useEffect, useState} from "react";
import {Skeleton} from "antd";
import {APIv1} from "../../../../api";

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const DeviceStatusCard: React.FC<TransactionCountCardProps> = () => {
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDeviceData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await APIv1.get('/device/status/', {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const responseData = response.data;

            setData({
                activeCount: responseData.online,
                inactiveCount: responseData.offline,
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, [userData.token]);

    useEffect(() => {
        if (!userData.token) return;

        fetchDeviceData()
    }, [userData.token])


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">Active Devices</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Active</span>
                    <div className="transaction-metrics__count">
                        <MonitorCheck className="transaction-metrics__icon transaction-metrics__icon--active"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 100, height: 30}}/>
                        ) : (
                            <CountUp
                                end={data.activeCount}
                                duration={3}
                            />
                        )}
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Inactive</span>
                    <div className="transaction-metrics__count">
                        <MonitorDot className="transaction-metrics__icon transaction-metrics__icon--inactive"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 100, height: 30}}/>
                        ) : (
                            <CountUp
                                end={data.inactiveCount}
                                duration={3}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceStatusCard;
