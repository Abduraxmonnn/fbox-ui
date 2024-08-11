import React from 'react'

import './Analysis.css'
import PieChart from '../../components/Charts/PieChart'
import BarChart from '../../components/Charts/BarChart'
import Subscription from '../../components/Analysis/Subscription'
import Sms from "../../pages/Sms";
import {useNavigate} from "react-router-dom";
import Orders from "../../components/Analysis/Orders";

const Analysis = () => {
    const navigate = useNavigate();

    const handleNavigate = (targetRoute) => {
        navigate(targetRoute);
    };

    return (
        <section className='content_container'>
            <div className='graphBox'>
                <div className='box'>
                    <h1>Active Users</h1>
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
                    <Orders />
                </div>
                <div className='subscription'>
                    <h1 onClick={() => handleNavigate("/subscription")}>Subscription</h1>
                    <Subscription/>
                </div>
                <div className='sms'>
                    <h1 onClick={() => handleNavigate("/sms")}>SMS</h1>
                    <Sms defaultPaginationSize={10} />
                </div>
            </div>
        </section>
    )
}

export default Analysis;
