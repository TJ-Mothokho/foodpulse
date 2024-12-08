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

function App() {
  return (
    
    <Router>
      <AppNavbar/>
    <Routes>
        {/* Define routes */}
        <Route path="/Login" element={<Login />} /> {/* Login page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
        <Route path="/AddRecipe" Component={AddRecipe} />
        <Route path="/Register" Component={AddUser} />
        <Route path="/Users" Component={UsersList} />
        <Route path="/User/:userID" Component={UserDetails} />
    </Routes>
    
</Router>
  );
}

export default App;
