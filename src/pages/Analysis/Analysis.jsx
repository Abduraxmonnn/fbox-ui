import React from 'react'

import PieChart from '../../components/AnalysisStats/PieChart'
import BarChart from '../../components/AnalysisStats/BarChart'
import {useNavigate} from "react-router-dom";
import Orders from "../../components/Analysis/Orders";
import TransactionFinancialCard from "../../components/AnalysisStats/TransactionFinancial/TransactionFinancialCard";
import Period from "../../components/AnalysisStats/Period";
import TransactionCountCard from "../../components/AnalysisStats/TransactionCount/TransactionCountCard";
import './Analysis.css'

const Analysis = () => {
    const navigate = useNavigate();

    const handleNavigate = (targetRoute) => {
        navigate(targetRoute);
    };

    return (
        <section className='content_container'>
            <div className='box'>
                <Period/>
            </div>
            <div className="upper-container">
                <div className='box'>
                    <TransactionFinancialCard/>
                </div>
                <div className='box'>
                    <TransactionCountCard/>
                </div>
            </div>
            <div className='graphBox'>
                <div className='box'>
                    <h1>Active Devices</h1>
                    <PieChart/>
                </div>
                <div className='box'>
                    <h1>Completed Payments</h1>
                    <BarChart/>
                </div>
            </div>
            <div className='content'>
                <div className='orders'>
                    <h1 onClick={() => handleNavigate("/orders")}>Orders</h1>
                    <Orders/>
                </div>
            </div>
        </section>
    )
}

export default Analysis;
