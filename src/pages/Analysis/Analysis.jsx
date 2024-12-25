import React from 'react';
import {useNavigate} from "react-router-dom";
// import ActiveDevicesPieChart from '../../components/AnalysisStats/ActiveDevicesPieChart';
import PayMeTransactionsPieChart from '../../components/AnalysisStats/Graphs/TransactionPieCharts/PayMe';
import Orders from "../../components/Analysis/Orders";
import TransactionFinancialCard
    from '../../components/AnalysisStats/NumberCards/TransactionFinancial/TransactionFinancialCard';
import Period from '../../components/AnalysisStats/Period';
import TransactionNumberCard from '../../components/AnalysisStats/NumberCards/TransactionNumberCard';
import './Analysis.css';
import DeviceStatusCard from "../../components/AnalysisStats/NumberCards/DeviceStatus/DeviceStatusCard";
import NotifyNumberCard from "../../components/AnalysisStats/NumberCards/NotifyNumber/NotifyNumberCard";
import ClickTransactionsPieChart from "../../components/AnalysisStats/Graphs/TransactionPieCharts/Click";
import UzumTransactionsPieChart from "../../components/AnalysisStats/Graphs/TransactionPieCharts/Uzum";
import AnorTransactionsPieChart from "../../components/AnalysisStats/Graphs/TransactionPieCharts/Anor";

const Analysis = () => {
    const navigate = useNavigate();

    const handleNavigate = (targetRoute) => {
        navigate(targetRoute);
    };

    return (
        <div className='analysis'>
            <div className='analysis__header'>
                <Period/>
            </div>

            <div className="analysis__metrics">
                <div className='analysis__metric-card'>
                    <TransactionFinancialCard/>
                    <TransactionNumberCard/>
                </div>
                <div className='analysis__metric-card'>
                    <DeviceStatusCard/>
                    <NotifyNumberCard/>
                </div>
            </div>

            <div className='analysis__charts'>
                <div className='analysis__chart-card analysis__chart-card--wide'>
                    <h2 className='analysis__chart-title'>Completed Payments</h2>
                    <div className='analysis__chart-grid'>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>PayMe</h3>
                            <PayMeTransactionsPieChart offset="up"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>Click</h3>
                            <ClickTransactionsPieChart offset="down"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>Uzum</h3>
                            <UzumTransactionsPieChart offset="up"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>Anor</h3>
                            <AnorTransactionsPieChart offset="down"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='analysis__orders'>
                <div className='analysis__orders-card'>
                    <h2
                        className='analysis__orders-title'
                        onClick={() => handleNavigate("/orders")}
                    >
                        Orders
                    </h2>
                    <Orders/>
                </div>
            </div>
        </div>
    );
};

export default Analysis;