import React from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { clearProfilePicture, clearRole, clearToken, clearUserID, clearUsername } from "../Store/TokenStore";

const Dashboard = () =>
{
  const token = useSelector((state) => state.auth.token); 
  const userID = useSelector((state) => state.auth.userID); // Access userID
  const username = useSelector((state) => state.auth.username);
  const profilePicture = useSelector((state) => state.auth.profilePicture);
  const role = useSelector((state) => state.auth.role);
  
  const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearToken()); // Clear the token on logout
        dispatch(clearUserID()); 
        dispatch(clearUsername()); 
        dispatch(clearRole()); 
        dispatch(clearProfilePicture()); 
      };

    return(
        <Container>
            <h1>Welcome to dashboard</h1>
            <p>Token: {token}</p>
            <p>ID: {userID}</p>
            <p>username: {username}</p>
            <p>PP: {profilePicture}</p>
            <p>role: {role}</p>
            <button onClick={handleLogout}>Logout</button>
        </Container>
    )
}

export default Dashboard;