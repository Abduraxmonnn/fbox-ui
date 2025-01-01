import CountUp from 'react-countup';
import {ArrowUpRight, ArrowDownRight} from 'lucide-react';
import './TransactionFinancial.css';
import React, {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../../../api";
import {Skeleton} from "antd";
import { useTranslation } from 'react-i18next';

interface TransactionFinancialCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const TransactionFinancialCard: React.FC<TransactionFinancialCardProps> = ({period}) => {
    const { t } = useTranslation();
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            let url = period ? `/analysis/transactions/amount/?period=${period}` : '/analysis/transactions/amount/'
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
        <div className="payment-income">
            <h2 className="payment-income__title">{t('analysis.title')}</h2>

            <div className="payment-income__metrics">
                <div className="payment-income__card">
                    <span className="payment-income__label">Success</span>
                    <div className="payment-income__amount success">
                        <span className="payment-income__arrow">
                          <ArrowUpRight/>
                        </span>
                        {loading ? (
                            <Skeleton.Button active style={{width: 200, height: 30}}/>
                        ) : (
                            <CountUp
                                end={fetchedData.successAmount}
                                duration={2.5}
                                separator=","
                                suffix=" UZS"
                                className="transaction-financial-card__value"
                            />
                        )}
                    </div>
                </div>

                <div className="payment-income__card">
                    <span className="payment-income__label">Failure</span>
                    <div className="payment-income__amount failure">
                        <span className="payment-income__arrow">
                          <ArrowDownRight/>
                        </span>
                        {loading ? (
                            <Skeleton.Button active style={{width: 200, height: 30}}/>
                        ) : (
                            <CountUp
                                end={fetchedData.failureAmount}
                                duration={2.5}
                                separator=","
                                suffix=" UZS"
                                className="transaction-financial-card__value"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionFinancialCard;
