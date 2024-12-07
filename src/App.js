import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/LoginPage';
import Dashboard from './Pages/Dashboard';
import AddRecipe from './Pages/Feed/AddRecipe'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <Router>
    <Routes>
        {/* Define routes */}
        <Route path="/" element={<Login />} /> {/* Login page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
        <Route path="/AddRecipe" Component={AddRecipe} />
    </Routes>
</Router>
  );
}

export default App;
