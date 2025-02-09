import {Route, Routes} from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn/SignIn';
import RootLayout from './layout/RootLayout'
import {useState} from "react";

import {
    Sms,
    SmsDetail,
    AddNewDevice,
    Device,
    DeviceDetail,
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
    Feedbacks,
    UserProfile,
    Email,
    EmailDetail
} from './pages'
import getUser from "./store/utilits";
import LogsDetail from "./pages/Logs/LogsDetail/LogsDetail";
import ProductDetail from "./pages/Products/ProductDetail/ProductDetail";
import Products from "./pages/Products/Products";

function App() {
    const [user, setUser] = useState(getUser())

    return (
        <div className='App'>
            {user ? (
                <Routes>
                    <Route element={<RootLayout/>}>
                        <Route path='/analysis' element={<Analysis/>}/>
                        <Route path='/profile' element={<UserProfile/>}/>
                        <Route path='/devices/company' element={<Company/>}/>
                        <Route path='/devices/version' element={<Version/>}/>
                        <Route path='/devices' element={<Device/>}/>
                        <Route path='/payments/logs' element={<Logs/>}/>
                        <Route path='/payments/sms' element={<Sms/>}/>
                        <Route path='/email/list' element={<Email/>}/>
                        <Route path='/orders' element={<Orders serialNumber={null}/>}/>
                        <Route path='/feedback' element={<Feedbacks/>}/>
                        <Route path='/products' element={<Products/>}/>

                        <Route path='/create/device' element={<AddNewDevice/>}/>
                        <Route path='/create_company/:id?' element={<AddNewCompany/>}/>
'
                        <Route path='/order/detail/:id' element={<OrderDetail/>}/>
                        <Route path='/company/detail/:id' element={<CompanyDetail/>}/>
                        <Route path='/device/detail/:serial_number' element={<DeviceDetail/>}/>
                        <Route path='/payments/logs/detail/:id' element={<LogsDetail/>}/>
                        <Route path='/payments/sms/detail/:id' element={<SmsDetail/>}/>
                        <Route path='/payments/email/detail/:id' element={<EmailDetail/>}/>
                        <Route path='/product/detail/:id' element={<ProductDetail/>}/>

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
