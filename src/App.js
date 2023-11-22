import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import UserSignUp from './pages/user/UserSignUp';
import UserLogin from './pages/user/UserLogin';
import UserDashboard from './pages/user/UserDashboard';
import UserPublicProfile from './pages/user/UserPublicProfile';
import UsersAll from './pages/user/UsersAll';
import GatheringCreate from './pages/gathering/GatheringCreate';
import GatheringDetails from './pages/gathering/GatheringDashboard';
import GatheringEdit from './pages/gathering/GatheringEdit';
import RecipiesAll from './pages/recipe/RecipiesAll';
import RecipeDetails from './pages/recipe/RecipeDetails';
import RecipeEdit from './pages/recipe/RecipeEdit';
import RecipeAdd from './pages/recipe/RecipeAdd';
import Unauthorized from './pages/error/Unauthorized';
import NotFound from './pages/error/NotFound';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import G4GApi from './api/G4GApi';
import UserContext from './context/UserContext';



function App() {

  const initialState = 
    JSON.parse(localStorage.getItem("currUser")) || {};

  const [ user, setUser ] = useState(initialState)

  useEffect(()=>{
    localStorage.setItem('currUser', JSON.stringify(user))
    G4GApi.token = user.token
  }, [user])

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
            <Route exact path='/users/profile/:username' element={<UserPublicProfile />} />
            <Route exact path='/users' element={<UsersAll />} />
            <Route exact path='/gatherings/create' element={<GatheringCreate />} />
            <Route exact path='/gatherings/:gatheringId' element={<GatheringDetails />} />
            <Route exact path='/gatherings/:gatheringId/edit' element={<GatheringEdit />} />
            <Route exact path='/recipes' element={<RecipiesAll />} />
            <Route exact path='/recipes/:recipeId' element={<RecipeDetails />} />
            <Route exact path='/recipies/:recipeId/edit' element={<RecipeEdit />} />
            <Route exact path='/recipies/add' element={<RecipeAdd />} />
            <Route exact path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<NotFound />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
