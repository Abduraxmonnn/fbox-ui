import {Route, Routes} from 'react-router-dom'
import {useSelector} from 'react-redux';

import Home from './pages/Home'
import Sms from './pages/Sms'
import Devices from './pages/Devices'
import Company from './pages/Company'
import DeviceStatus from './pages/DeviceStatus'
import Version from './pages/Version'

import './App.css'
import SignIn from './components/SignIn/SignIn';
import AddNewDevice from './pages/AddNewDevice'
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
                        <Route path='/version' element={<Version/>}/>
                        <Route path='/sms' element={<Sms/>}/>
                    </Route>
                    {/* <Route path='/' element={<Home />} /> */}
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
