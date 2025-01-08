import CountUp from "react-countup";
import {Skeleton} from "antd";
import {Mail, MessageSquareMore} from 'lucide-react';
import {useTranslation} from "react-i18next";
import React, {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../../../api";
import '../BaseNumberCardStyle.css'
import './NotifyNumberCard.css'

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const NotifyNumberCard: React.FC<TransactionCountCardProps> = ({startPeriod, endPeriod}) => {
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifyData = useCallback(async () => {
        setLoading(true);
        try {
            let url = (startPeriod && endPeriod) ? `/analysis/notify/counts/?start_period=${startPeriod}&end_period=${endPeriod}` : '/analysis/notify/counts/';
            const response = await APIv1.get(url, {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const responseData = response.data;

            setData({
                smsCount: responseData.sms,
                emailCount: responseData.email,
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, [userData.token, startPeriod, endPeriod]);

    useEffect(() => {
        if (!userData.token) return;

        fetchNotifyData()
    }, [userData.token, startPeriod, endPeriod])


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">{t("analysis.numbersStats.mainTitles.notifyTitle")}</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span
                        className="transaction-metrics__label">{t("analysis.numbersStats.mainSubtitles.notifySms")}</span>
                    <div className="transaction-metrics__count">
                        <MessageSquareMore className="transaction-metrics__icon transaction-metrics__icon--sms"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 150, height: 30}}/>
                        ) : (
                            <CountUp
                                end={data.smsCount}
                                duration={3}
                            />
                        )}
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span
                        className="transaction-metrics__label">{t("analysis.numbersStats.mainSubtitles.notifyEmail")}</span>
                    <div className="transaction-metrics__count">
                        <Mail className="transaction-metrics__icon transaction-metrics__icon--email"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 150, height: 30}}/>
                        ) : (
                            <CountUp
                                end={data.emailCount}
                                duration={3}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyNumberCard;
