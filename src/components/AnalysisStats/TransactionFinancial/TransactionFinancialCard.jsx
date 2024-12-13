import {ArrowUpRight, ArrowDownRight} from 'lucide-react';
import './TransactionFinancial.css';

const TransactionFinancialCard = ({successAmount = "2,546,000", failureAmount = "791,020"}) => {
    return (
        <div className="payment-income">
            <h2 className="payment-income__title">Payment Income</h2>

            <div className="payment-income__metrics">
                <div className="payment-income__card">
                    <span className="payment-income__label">Success</span>
                    <div className="payment-income__amount success">
                        <span className="payment-income__arrow"><ArrowUpRight/></span>
                        <span className="payment-income__value">{successAmount} UZS</span>
                    </div>
                </div>

                <div className="payment-income__card">
                    <span className="payment-income__label">Failure</span>
                    <div className="payment-income__amount failure">
                        <span className="payment-income__arrow"><ArrowDownRight/></span>
                        <span className="payment-income__value">{failureAmount} UZS</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionFinancialCard;