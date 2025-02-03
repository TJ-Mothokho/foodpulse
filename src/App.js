import './App.css';
import Login from './Pages/Login/LoginPage';
import Profile from './Pages/Users/Profile';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersList from './Pages/Users/UsersList';
import Register from './Pages/Users/Register';
import UserDetails from './Pages/Users/UserDetails';
import Feed from './Pages/Feed/FeedPage';
import { ToastContainer } from 'react-toastify';

function App() {
  localStorage.setItem('apiUrl', 'https://recipesystemapi.azurewebsites.net/api'); //'https://localhost:7297/api'); 

  return (  
        <Router>
          <Routes>
              {/* Define routes */}
              <Route path="/Login" element={<Login />} /> 

              <Route path='/' Component={Feed} />
              <Route path="/Profile/:userID" Component={Profile} />

              <Route path="/Register" Component={Register} />
              <Route path="/Users" Component={UsersList} />
              <Route path="/User/:userID" Component={UserDetails} />
          </Routes>
          <ToastContainer/>
        </Router>
      
  );
}

export default App;
