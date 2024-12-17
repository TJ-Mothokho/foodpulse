import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard';
import AddRecipe from './Pages/Feed/AddRecipe'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './Pages/Users/AddUser';
import AppNavbar from './Components/Navbar';
import UsersList from './Pages/Users/UsersList';
import UserDetails from './Pages/Users/UserDetails';
import Feed from './Pages/Feed/FeedPage';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  

  return (  
    <Router>
        <AppNavbar/>
    <Routes>
        {/* Define routes */}
        <Route path="/Login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 

        <Route path='/' Component={Feed} />
        <Route path="/Recipe/Add" Component={AddRecipe} />

        <Route path="/Register" Component={AddUser} />
        <Route path="/Users" Component={UsersList} />
        <Route path="/User/:userID" Component={UserDetails} />
    </Routes>
<ToastContainer/>
</Router>
      
  );
}

export default App;
