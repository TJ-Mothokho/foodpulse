import React, {useContext} from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from "../Store/TokenStore";

const Dashboard = () =>
{
    const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
    //const {token} = useContext(TokenContext);
    // const {userID} = useContext(UserIDContext);
    // const {username} = useContext(UsernameContext);
    // const {profilePicture} = useContext(ProfilePictureContext);
    // const {role} = useContext(RoleContext);

    const handleLogout = () => {
        dispatch(clearToken()); // Clear the token on logout
      };

return(
    <Container>
        <h1>Welcome to dashboard</h1>
        <p>Token: {token}</p>
        <button onClick={handleLogout}>Logout</button>
        {/* <p>ID: {userID}</p>
        <p>username: {username}</p>
        <p>PP: {profilePicture}</p>
        <p>role: {role}</p> */}
    </Container>
)
}

export default Dashboard;