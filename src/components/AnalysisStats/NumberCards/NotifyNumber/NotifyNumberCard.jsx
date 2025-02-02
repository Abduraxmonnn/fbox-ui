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
        <div className="analysis__metrics__card-notify__count analysis__metrics__card">
            <h2>{t("analysis.numbersStats.mainTitles.notifyTitle")}</h2>
            <div className="analysis__metrics__container">
                <div className="analysis__metrics__card">
                    <span
                        className="analysis__metrics__label">{t("analysis.numbersStats.mainSubtitles.notifySms")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--sms">
                        <MessageSquareMore className="analysis__metrics__icon"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 60, height: 24}}/>
                        ) : (
                            <CountUp end={data.smsCount} duration={3}/>
                        )}
                    </div>
                </div>
                <div className="analysis__metrics__card">
                    <span
                        className="analysis__metrics__label">{t("analysis.numbersStats.mainSubtitles.notifyEmail")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--email">
                        <Mail className="analysis__metrics__icon"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 60, height: 24}}/>
                        ) : (
                            <CountUp end={data.emailCount} duration={3}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyNumberCard;
