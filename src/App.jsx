import { 	Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sms from './pages/Sms'
import Devices from './pages/Devices'
import Company from './pages/Company'
import DeviceStatus from './pages/DeviceStatus'
import Version from './pages/Version'

import './App.css'
import { SignIn } from './components'
import AddNewDevice from './pages/AddNewDevice'
import RootLayout from './layout/RootLayout'
import Analysis from './pages/Analysis/Analysis'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path='/analysis' element={<Analysis />} />
					<Route path='/company' element={<Company />} />
					<Route path='/devices' element={<Devices />} />
					<Route path='/devices/status' element={<DeviceStatus />} />
					<Route path='/create_device' element={<AddNewDevice />} />
					<Route path='/version' element={<Version />} />
					<Route path='/sms' element={<Sms />} />
				</Route>
				{/* <Route path='/' element={<Home />} /> */}
				<Route path='/' element={<SignIn />} />
			</Routes>
		</div>
	)
}

export default App
