import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import UserSignUp from './pages/user/UserSignUp';
import UserLogin from './pages/user/UserLogin';
import UserDashboard from './pages/user/UserDashboard';
import GatheringCreate from './pages/gathering/GatheringCreate';
import GatheringDashboard from './pages/gathering/GatheringDashboard';
import Unauthorized from './pages/error/Unauthorized';
import NotFound from './pages/error/NotFound';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import G4GApi from './api/G4GApi';
import UserContext from './context/UserContext';
import EditUser from './pages/user/EditUser';
import NetworkError from './pages/error/NetworkError'
import GeneralError from './pages/error/GeneralError';



function App() {

	const initialState = 
		JSON.parse(localStorage.getItem("currUser")) || {};

	const [ user, setUser ] = useState(initialState);

	useEffect(()=>{
		localStorage.setItem('currUser', JSON.stringify(user))
		G4GApi.token = user.token
	}, [user]);

	return (
		<div className="App">
			<UserContext.Provider value={{user, setUser}}>
				<BrowserRouter>
					<NavBar />
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route exact path='/login' element={<UserLogin />} />
						<Route exact path='/signup' element={<UserSignUp />} />
						<Route exact path='/users/:username/dashboard' element={<UserDashboard />} />
						<Route exact path='/users/:username/edit' element={<EditUser />} />
						<Route exact path='/gatherings/create' element={<GatheringCreate />} />
						<Route exact path='/gatherings/:eventId' element={<GatheringDashboard />} />
						<Route exact path='/error/unauthorized' element={<Unauthorized />} />
						<Route exact path='/error/network'element={<NetworkError />} />
						<Route exact path='/error/general' element={<GeneralError />} />
						<Route path='*' element={<NotFound />} /> 
					</Routes>
					<Footer />
				</BrowserRouter>
			</UserContext.Provider>
		</div>
	);
}

export default App;
