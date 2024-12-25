import CountUp from "react-countup";
import {Mail, MessageSquareMore} from 'lucide-react';
import '../BaseNumberCardStyle.css'
import './NotifyNumberCard.css'
import {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../../../api";

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const NotifyNumberCard: React.FC<TransactionCountCardProps> = () => {
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([]);

    const fetchNotifyData = useCallback(async () => {
        try {
            const response = await APIv1.get('/analysis/notify/counts/', {
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
        }
    }, [userData.token]);

    useEffect(() => {
        if (!userData.token) return;

        fetchNotifyData()
    }, [userData.token])


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">No. of sent Notify</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">SMS</span>
                    <div className="transaction-metrics__count">
                        <MessageSquareMore className="transaction-metrics__icon transaction-metrics__icon--sms"/>
                        <CountUp
                            end={data.smsCount}
                            duration={3}
                        />
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Email</span>
                    <div className="transaction-metrics__count">
                        <Mail className="transaction-metrics__icon transaction-metrics__icon--email"/>
                        <CountUp
                            end={data.emailCount}
                            duration={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyNumberCard;
