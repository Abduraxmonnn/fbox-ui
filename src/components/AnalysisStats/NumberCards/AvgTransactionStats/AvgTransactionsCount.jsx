import CountUp from "react-countup";
import {CheckCircle, XCircle} from 'lucide-react';
import '../BaseNumberCardStyle.css'

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const AvgTransactionsCountCard: React.FC<TransactionCountCardProps> = ({period}) => {
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
                            end={25612}
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
                            end={4500}
                            duration={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvgTransactionsCountCard;