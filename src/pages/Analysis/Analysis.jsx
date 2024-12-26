import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Orders from "../../components/Analysis/Orders";
import './Analysis.css';
import {analysisStats} from "../../components/AnalysisStats";

const {
    Period,
    TransactionFinancialCard,
    TransactionNumberCard,
    DeviceStatusCard,
    NotifyNumberCard,
    PayMeTransactionsPieChart,
    ClickTransactionsPieChart,
    UzumTransactionsPieChart,
    AnorTransactionsPieChart,
} = analysisStats;

const Analysis = () => {
    const [period, setPeriod] = useState("");
    const navigate = useNavigate();

    const handleNavigate = (targetRoute) => {
        navigate(targetRoute);
    };

    const handleChangePeriod = (value) => setPeriod(value);

    return (
        <div className='analysis'>
            <div className='analysis__header'>
                <Period handleChangePeriod={handleChangePeriod}/>
            </div>

            <div className="analysis__metrics">
                <div className='analysis__metric-card'>
                    <TransactionFinancialCard period={period}/>
                    <TransactionNumberCard period={period}/>
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
                            <PayMeTransactionsPieChart period={period} offset="up"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>Click</h3>
                            <ClickTransactionsPieChart period={period} offset="down"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>Uzum</h3>
                            <UzumTransactionsPieChart period={period} offset="up"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>Anor</h3>
                            <AnorTransactionsPieChart period={period} offset="down"/>
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
    )
        ;
};

export default Analysis;