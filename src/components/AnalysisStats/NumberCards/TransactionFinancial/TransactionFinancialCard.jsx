import CountUp from 'react-countup';
import {ArrowUpRight, ArrowDownRight} from 'lucide-react';
import React, {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../../../api";
import {Skeleton} from "antd";
import {useTranslation} from 'react-i18next';
import './TransactionFinancial.css';

interface TransactionFinancialCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const TransactionFinancialCard: React.FC<TransactionFinancialCardProps> = ({startPeriod, endPeriod}) => {
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            let url = (startPeriod && endPeriod) ? `/analysis/transactions/amount/?start_period=${startPeriod}&end_period=${endPeriod}` : '/analysis/transactions/amount/'
            const response = await APIv1.get(url, {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const responseData = response.data;

            setFetchedData({
                'successAmount': responseData.success,
                'failureAmount': responseData.failure,
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
        <div className="analysis__metrics__card-transaction__financial analysis__metrics__card">
            <h2>{t("analysis.numbersStats.mainTitles.transactionsFinancialTitle")}</h2>
            <div className="analysis__metrics__container">
                <div className="analysis__metrics__card">
                    <span className="analysis__metrics__label">{t("common.success")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--success">
                        <ArrowUpRight className="analysis__metrics__icon"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 100, height: 24}}/>
                        ) : (
                            <CountUp end={fetchedData.successAmount} duration={2.5} separator="," suffix=" UZS"/>
                        )}
                    </div>
                </div>
                <div className="analysis__metrics__card">
                    <span className="analysis__metrics__label">{t("common.failure")}</span>
                    <div className="analysis__metrics__value analysis__metrics__value--failure">
                        <ArrowDownRight className="analysis__metrics__icon"/>
                        {loading ? (
                            <Skeleton.Button active style={{width: 100, height: 24}}/>
                        ) : (
                            <CountUp end={fetchedData.failureAmount} duration={2.5} separator="," suffix=" UZS"/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TransactionFinancialCard;
