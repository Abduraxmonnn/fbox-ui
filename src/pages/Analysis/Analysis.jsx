import React from 'react'

import './Analysis.css'
import PieChart from '../../components/Charts/PieChart'
import BarChart from '../../components/Charts/BarChart'
import ZReport from '../../components/Analysis/ZReport'
import Subscription from '../../components/Analysis/Subscription'
import Sms from "../../components/Analysis/Sms";

const Analysis = () => {
	return (
		<section className='content_container'>
			<div className='graphBox'>
				<div className='box'>
					<h1>Online Users</h1>
					<PieChart />
				</div>
				<div className='box'>
					<h1>Completed Payments</h1>
					<BarChart />
				</div>
			</div>
			<div className='content'>
				<div className='zReport'>
					<h1>Z-Report</h1>
					<ZReport />
				</div>
				<div className='subscription'>
					<h1>Subscription</h1>
					<Subscription />
				</div>
				<div className='sms'>
					<h1>SMS</h1>
					<Sms />
				</div>
			</div>
		</section>
	)
}

export default Analysis;
