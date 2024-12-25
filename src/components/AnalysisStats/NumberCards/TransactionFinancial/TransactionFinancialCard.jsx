import CountUp from 'react-countup';
import {ArrowUpRight, ArrowDownRight} from 'lucide-react';
import './TransactionFinancial.css';
import {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../../../api";

interface TransactionFinancialCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const TransactionFinancialCard: React.FC<TransactionFinancialCardProps> = () => {
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await APIv1.get('/analysis/transactions/amount/', {
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
        }
    }, [userData.token]);

    useEffect(() => {
        if (!userData.token) return;

        fetchData()
    }, [userData.token])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    return (
        <div className="payment-income">
            <h2 className="payment-income__title">Payment Income</h2>

            <div className="payment-income__metrics">
                <div className="payment-income__card">
                    <span className="payment-income__label">Success</span>
                    <div className="payment-income__amount success">
                        <span className="payment-income__arrow"><ArrowUpRight/></span>
                        {/*<span className="payment-income__value">{successAmount} UZS</span>*/}
                        <CountUp
                            end={fetchedData.successAmount}
                            duration={2.5}
                            separator=","
                            suffix=" UZS"
                            className="transaction-financial-card__value"
                        />
                    </div>
                </div>

                <div className="payment-income__card">
                    <span className="payment-income__label">Failure</span>
                    <div className="payment-income__amount failure">
                        <span className="payment-income__arrow"><ArrowDownRight/></span>
                        {/*<span className="payment-income__value">{failureAmount} UZS</span>*/}
                        <CountUp
                            end={fetchedData.failureAmount}
                            duration={2.5}
                            separator=","
                            suffix=" UZS"
                            className="transaction-financial-card__value"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionFinancialCard;
