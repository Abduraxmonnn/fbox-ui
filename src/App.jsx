import {Route, Routes} from 'react-router-dom'

import './App.css'
import SignIn from './components/SignIn/SignIn';
import RootLayout from './layout/RootLayout'
import {useEffect, useState} from "react";

import {
	Sms,
    Device,
	DeviceDetail,
	AddNewDevice,
	DeviceStatus,
	DeviceStatusDetail,
	Company,
	AddNewCompany,
	CompanyDetail,
	Version,
	Analysis,
	ZReport,
	ZReportDetail,
	Orders,
	OrderDetail,
	Logs,
} from './pages'
import getUser from "./store/utilits";
import LogsDetail from "./pages/Logs/LogsDetail/LogsDetail";

function App() {
    const [user, setUser] = useState(getUser())

    return (
        <div className='App'>
            {user ? (
                <Routes>
                    <Route element={<RootLayout/>}>
                        <Route path='/analysis' element={<Analysis/>}/>
                        <Route path='/devices/company' element={<Company/>}/>
                        <Route path='/devices/device' element={<Device/>}/>
                        <Route path='/devices/version' element={<Version/>}/>
                        <Route path='/devices/status' element={<DeviceStatus/>}/>
                        <Route path='/payments/logs' element={<Logs/>}/>
                        <Route path='/payments/sms' element={<Sms/>}/>
                        <Route path='/orders' element={<Orders serialNumber={null}/>}/>

                        <Route path='/create_device' element={<AddNewDevice/>}/>
                        <Route path='/create_company' element={<AddNewCompany/>}/>

                        <Route path='/order/detail/:id' element={<OrderDetail />}/>
                        <Route path='/company/detail/:id' element={<CompanyDetail/>}/>
                        <Route path='/device/detail/:id' element={<DeviceDetail/>}/>
						<Route path='/device/status/detail/:serial_number' element={<DeviceStatusDetail/>}/>
						<Route path='/payments/logs/detail/:id' element={<LogsDetail/>}/>

                        <Route path='/z-reports' element={<ZReport/>}/>
                        <Route path='/z-reports/detail/:id' element={<ZReportDetail/>}/>
                    </Route>
                    <Route path='/' element={<SignIn/>}/>
                </Routes>
            ) : (
                <Routes>
                    <Route path='/' element={<SignIn/>}/>
                </Routes>
            )}
        </div>
    )
}

export default App;
