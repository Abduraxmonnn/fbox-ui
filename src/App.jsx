import {Route, Routes} from 'react-router-dom'

import './App.css'
import SignIn from './components/SignIn/SignIn';
import RootLayout from './layout/RootLayout'
import {useState} from "react";

import {
	Sms,
	Subscription,
	AddNewDevice,
	SubscriptionDetail,
	DeviceStatus,
	Company,
	AddNewCompany,
	CompanyDetail,
	Version,
	Analysis,
	ZReport,
	ZReportDetail,
	Orders
} from './pages'

function getUser() {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(user);
    } else {
        user = null;
    }
    return user;
}

function App() {
    const [user, setUser] = useState(getUser())

    return (
			<div className='App'>
				{user ? (
					<Routes>
						<Route element={<RootLayout />}>
							<Route path='/analysis' element={<Analysis />} />
							<Route path='/devices/company' element={<Company />} />
							<Route path='/devices/subscription' element={<Subscription />} />
							<Route path='/devices/version' element={<Version />} />
							<Route path='/devices/status' element={<DeviceStatus />} />
							<Route path='/payments/sms' element={<Sms />} />
							<Route path='/orders' element={<Orders />} />

							<Route path='/create_device' element={<AddNewDevice />} />
							<Route path='/create_company' element={<AddNewCompany />} />

							<Route path='/company/detail/:id' element={<CompanyDetail />} />
							<Route path='/subscription/detail/:id' element={<SubscriptionDetail />} />

							<Route path='/z-reports' element={<ZReport />} />
							<Route path='/z-reports/detail/:id' element={<ZReportDetail />} />
						</Route>
						<Route path='/' element={<SignIn />} />
					</Routes>
				) : (
					<Routes>
						<Route path='/' element={<SignIn />} />
					</Routes>
				)}
			</div>
		)
}

export default App;
