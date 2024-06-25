import {Route, Routes} from 'react-router-dom'

import './App.css'
import SignIn from './components/SignIn/SignIn';
import RootLayout from './layout/RootLayout'
import {useState} from "react";

import {
	Sms,
	Device,
	AddNewDevice,
	DeviceDetail,
	DeviceStatus,
	Company,
	AddNewCompany,
	CompanyDetail,
	Version,
	Analysis,
	ZReport,
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
							<Route path='/company' element={<Company />} />
							<Route path='/company/detail' element={<CompanyDetail />} />
							<Route path='/device' element={<Device />} />
							<Route path='/device/detail/:id' element={<DeviceDetail />} />
							<Route path='/device/status' element={<DeviceStatus />} />
							<Route path='/create_device' element={<AddNewDevice />} />
							<Route path='/create_company' element={<AddNewCompany />} />
							<Route path='/version' element={<Version />} />
							<Route path='/sms' element={<Sms />} />
							<Route path='/z-reports' element={<ZReport />} />
							<Route path='/orders' element={<Orders />} />
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
