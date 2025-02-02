import CountUp from "react-countup";
import {CheckCircle, XCircle} from 'lucide-react';
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Skeleton} from "antd";
import {APIv1} from "../../../api";
import './BaseNumberCardStyle.css'

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const TransactionNumberCard: React.FC<TransactionCountCardProps> = ({startPeriod, endPeriod}) => {
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            let url = (startPeriod && endPeriod) ? `/analysis/transactions/counts/?start_period=${startPeriod}&end_period=${endPeriod}` : '/analysis/transactions/counts/'
            const response = await APIv1.get(url, {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const responseData = response.data;

            setFetchedData({
                'successCount': responseData.success,
                'failureCount': responseData.failure,
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, [userData.token, startPeriod, endPeriod]);

    useEffect(() => {
        if (!userData.token) return;

        fetchData()
    }, [userData.token, startPeriod, endPeriod])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    return (
        <div className="analysis__metrics__card">
            <h2>{t("analysis.numbersStats.mainTitles.transactionsCountsTitle")}</h2>
            <div className="analysis__metrics__container">
                <div className="analysis__metrics__card">
                    <span className="analysis__metrics__label">{t("common.success")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--success">
                        <CheckCircle className="analysis__metrics__icon"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 60, height: 24}}/>
                        ) : (
                            <CountUp end={fetchedData.successCount} duration={5}/>
                        )}
                    </div>
                </div>
                <div className="analysis__metrics__card">
                    <span className="analysis__metrics__label">{t("common.failure")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--failure">
                        <XCircle className="analysis__metrics__icon"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 60, height: 24}}/>
                        ) : (
                            <CountUp end={fetchedData.failureCount} duration={5}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionNumberCard;
