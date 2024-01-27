import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import { SignIn } from './components'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/sign_in' element={<SignIn />} />
		</Routes>
	)
}

export default App;
