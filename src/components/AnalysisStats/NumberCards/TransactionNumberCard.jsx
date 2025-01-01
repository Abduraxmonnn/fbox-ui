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

const TransactionNumberCard: React.FC<TransactionCountCardProps> = ({period}) => {
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            let url = period ? `/analysis/transactions/counts/?period=${period}` : '/analysis/transactions/counts/'
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
    }, [userData.token, period]);

    useEffect(() => {
        if (!userData.token) return;

        fetchData()
    }, [userData.token, period])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">{t("analysis.numbersStats.mainTitles.transactionsCountsTitle")}</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">{t('common.success')}</span>
                    <div className="transaction-metrics__count">
                        <CheckCircle className="transaction-metrics__icon transaction-metrics__icon--success"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 100, height: 30}}/>
                        ) : (
                            <CountUp
                                end={fetchedData.successCount}
                                duration={5}
                            />
                        )}
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">{t('common.failure')}</span>
                    <div className="transaction-metrics__count">
                        <XCircle className="transaction-metrics__icon transaction-metrics__icon--failure"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 100, height: 30}}/>
                        ) : (
                            <CountUp
                                end={fetchedData.failureCount}
                                duration={5}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionNumberCard;
