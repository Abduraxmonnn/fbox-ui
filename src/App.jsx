import { Switch, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sms from './pages/Sms'
import Devices from './pages/Devices'
import './App.css'
import { SignIn } from './components'
import AddNewDevice from './pages/AddNewDevice'
import RootLayout from './layout/RootLayout'
import Analysis from './pages/Analysis'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/analysis' element={<Analysis />} />
					<Route path='/devices' element={<Devices />} />
					<Route path='/create_device' element={<AddNewDevice />} />
					<Route path='/sign_in' element={<SignIn />} />
					<Route path='/sms' element={<Sms />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App;
