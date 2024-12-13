import React from 'react';
import {useNavigate} from "react-router-dom";
import PieChart from '../../components/AnalysisStats/PieChart';
import BarChart from '../../components/AnalysisStats/BarChart';
import Orders from "../../components/Analysis/Orders";
import TransactionFinancialCard from '../../components/AnalysisStats/TransactionFinancial/TransactionFinancialCard';
import Period from '../../components/AnalysisStats/Period';
import TransactionCountCard from '../../components/AnalysisStats/TransactionCount/TransactionCountCard';
import './Analysis.css';

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
                </div>
                <div className='analysis__metric-card'>
                    <TransactionCountCard/>
                </div>
            </div>

            <div className='analysis__charts'>
                <div className='analysis__chart-card'>
                    <h2 className='analysis__chart-title'>Active Devices</h2>
                    <div className='analysis__chart-content'>
                        <PieChart/>
                    </div>
                </div>
                <div className='analysis__chart-card analysis__chart-card--wide'>
                    <h2 className='analysis__chart-title'>Completed Payments</h2>
                    <div className='analysis__chart-content'>
                        <BarChart/>
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