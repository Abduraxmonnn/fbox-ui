import CountUp from "react-countup";
import {MonitorCheck, MonitorDot} from 'lucide-react';
import '../BaseNumberCardStyle.css'
import './DeviceStatusCard.css'

interface TransactionCountCardProps {
    successAmount?: number;
    failureAmount?: number;
}

const DeviceStatusCard: React.FC<TransactionCountCardProps> = ({
                                                                       activeCount = 45,
                                                                       inactiveCount = 27
                                                                   }) => {
    return (
        <div className="transaction-metrics">
            <h2 className="transaction-metrics__title">Active Devices</h2>

            <div className="transaction-metrics__container">
                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Active</span>
                    <div className="transaction-metrics__count">
                        <MonitorCheck className="transaction-metrics__icon transaction-metrics__icon--active"/>
                        <CountUp
                            end={activeCount}
                            duration={3}
                        />
                    </div>
                </div>

                <div className="transaction-metrics__card">
                    <span className="transaction-metrics__label">Inactive</span>
                    <div className="transaction-metrics__count">
                        <MonitorDot className="transaction-metrics__icon transaction-metrics__icon--inactive"/>
                        <CountUp
                            end={inactiveCount}
                            duration={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeviceStatusCard;
