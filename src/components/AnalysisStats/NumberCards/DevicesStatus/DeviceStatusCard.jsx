import CountUp from "react-countup";
import {MonitorCheck, MonitorDot, Unplug} from 'lucide-react';
import {useTranslation} from "react-i18next";
import React, {useCallback, useEffect, useState} from "react";
import {Skeleton} from "antd";
import {APIv1} from "../../../../api";
import '../BaseNumberCardStyle.css'

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const DeviceStatusCard: React.FC<TransactionCountCardProps> = () => {
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDeviceData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await APIv1.get('/device/status/activity', {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const responseData = response.data;

            setData({
                activeCount: responseData.active,
                inactiveCount: responseData.inactive,
                disconnectedCount: responseData.disconnected,
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
        <div className="analysis__metrics__card">
            <h2>{t("analysis.numbersStats.mainTitles.devicesStatusTitle")}</h2>
            <div className="analysis__metrics__container">
                <div className="analysis__metrics__card">
                    <span className="analysis__metrics__label">{t("common.active")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--active">
                        <MonitorCheck className="analysis__metrics__icon" color={"#28a745"}/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 60, height: 24}}/>
                        ) : (
                            <CountUp end={data.activeCount} duration={3}/>
                        )}
                    </div>
                </div>
                <div className="analysis__metrics__card">
                    <span className="analysis__metrics__label">{t("common.inactive")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--inactive">
                        <MonitorDot className="analysis__metrics__icon" color={"#6c757d"}/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 60, height: 24}}/>
                        ) : (
                            <CountUp end={data.inactiveCount} duration={3}/>
                        )}
                    </div>
                </div>
                <div className="analysis__metrics__card">
                    <span className="analysis__metrics__label">{t("common.disconnected")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--inactive">
                        <Unplug className="analysis__metrics__icon" color={"#dc3545"}/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 60, height: 24}}/>
                        ) : (
                            <CountUp end={data.disconnectedCount} duration={3}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceStatusCard;
