import CountUp from "react-countup";
import {CheckCircle, XCircle} from 'lucide-react';
import './BaseNumberCardStyle.css'
import {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../../api";

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const TransactionNumberCard: React.FC<TransactionCountCardProps> = () => {
    const [userData, setUserData] = useState({});
    const [fetchedData, setFetchedData] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await APIv1.get('/analysis/transactions/counts/', {
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
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">No. of Payments</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Success</span>
                    <div className="transaction-metrics__count">
                        <CheckCircle className="transaction-metrics__icon transaction-metrics__icon--success"/>
                        {/*{successCount}*/}
                        <CountUp
                            end={fetchedData.successCount}
                            duration={5}
                        />
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Failure</span>
                    <div className="transaction-metrics__count">
                        <XCircle className="transaction-metrics__icon transaction-metrics__icon--failure"/>
                        {/*{failureCount}*/}
                        <CountUp
                            end={fetchedData.failureCount}
                            duration={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionNumberCard;
