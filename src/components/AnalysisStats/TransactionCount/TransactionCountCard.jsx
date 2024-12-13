import {CheckCircle, XCircle} from 'lucide-react';
import './TransactionCount.css'

const TransactionCountCard = ({successCount = "528", failureCount = "169"}) => {
    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">No. of Payments</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Success</span>
                    <div className="transaction-metrics__count">
                        <CheckCircle className="transaction-metrics__icon transaction-metrics__icon--success"/>
                        {successCount}
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Failure</span>
                    <div className="transaction-metrics__count">
                        <XCircle className="transaction-metrics__icon transaction-metrics__icon--failure"/>
                        {failureCount}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionCountCard;
