import logo from './logo.svg';
import './App.css';
import Login from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
        {/* Define routes */}
        <Route path="/" element={<Login />} /> {/* Login page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
    </Routes>
</Router>
  );
}

export default App;
