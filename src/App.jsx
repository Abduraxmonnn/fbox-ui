import { Switch, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sms from './pages/Sms'
import Devices from './pages/Devices'
import './App.css'
import { SignIn } from './components'
import RootLayout from './layout/RootLayout'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/devices' element={<Devices />} />
					<Route path='/sign_in' element={<SignIn />} />
					<Route path='/sms' element={<Sms />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App;
