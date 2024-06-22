import React from 'react'

import './Analysis.css'
import PieChart from '../../components/Charts/PieChart'
import BarChart from '../../components/Charts/BarChart'
import ZReport from '../../components/Analysis/ZReport'
import Subscription from '../../components/Analysis/Subscription'
import Sms from "../../pages/Sms";
import {useNavigate} from "react-router-dom";

const Analysis = () => {
    const navigate = useNavigate();

    const handleNavigate = (targetRoute) => {
        navigate(targetRoute);
    };

    return (
        <section className='content_container'>
            <div className='graphBox'>
                <div className='box'>
                    <h1>Online Users</h1>
                    <PieChart/>
                </div>
                <div className='box'>
                    <h1>Completed Payments</h1>
                    <BarChart/>
                </div>
            </div>
            <div className='content'>
                <div className='zReport'>
                    <h1 onClick={() => handleNavigate("/z-reports")}>Z-Report</h1>
                    <ZReport/>
                </div>
                <div className='subscription'>
                    <h1 onClick={() => handleNavigate("/device")}>Subscription</h1>
                    <Subscription/>
                </div>
                <div className='sms'>
                    <h1 onClick={() => handleNavigate("/sms")}>SMS</h1>
                    <Sms defaultPaginationSize={20} />
                </div>
            </div>
        </section>
    )
}

export default Analysis;
