import {Route, Routes} from 'react-router-dom'

import Sms from './pages/Sms'
import Devices from './pages/Devices'
import Company from './pages/Company'
import DeviceStatus from './pages/DeviceStatus'
import Version from './pages/Version'

import './App.css'
import SignIn from './components/SignIn/SignIn';
import AddNewDevice from './pages/AddNewDevice'
import AddNewCompany from "./pages/AddNewCompany";
import RootLayout from './layout/RootLayout'
import Analysis from './pages/Analysis/Analysis'
import {useState} from "react";

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
                    <Route element={<RootLayout/>}>
                        <Route path='/analysis' element={<Analysis/>}/>
                        <Route path='/company' element={<Company/>}/>
                        <Route path='/devices' element={<Devices/>}/>
                        <Route path='/devices/status' element={<DeviceStatus/>}/>
                        <Route path='/create_device' element={<AddNewDevice/>}/>
                        <Route path='/create_company' element={<AddNewCompany/>}/>
                        <Route path='/version' element={<Version/>}/>
                        <Route path='/sms' element={<Sms/>}/>
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
