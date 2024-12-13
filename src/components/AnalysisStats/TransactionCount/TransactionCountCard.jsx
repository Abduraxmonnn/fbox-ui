import React from 'react';
import './TransactionCount.css'

const TransactionCountCard = ({successCount = "528", failureCount = "169"}) => {
    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">Transactions</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Success</span>
                    <div className="transaction-metrics__count">
                        {successCount}
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Failure</span>
                    <div className="transaction-metrics__count">
                        {failureCount}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionCountCard;
