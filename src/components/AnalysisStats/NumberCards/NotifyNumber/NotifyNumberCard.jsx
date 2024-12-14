import CountUp from "react-countup";
import {Mail, MessageSquareMore} from 'lucide-react';
import '../BaseNumberCardStyle.css'
import './NotifyNumberCard.css'

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const NotifyNumberCard: React.FC<TransactionCountCardProps> = ({
                                                                   smsCount = 159,
                                                                   emailCount = 23
                                                               }) => {
    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">No. of sent Notify</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">SMS</span>
                    <div className="transaction-metrics__count">
                        <MessageSquareMore className="transaction-metrics__icon transaction-metrics__icon--sms"/>
                        <CountUp
                            end={smsCount}
                            duration={3}
                        />
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Email</span>
                    <div className="transaction-metrics__count">
                        <Mail className="transaction-metrics__icon transaction-metrics__icon--email"/>
                        <CountUp
                            end={emailCount}
                            duration={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyNumberCard;
