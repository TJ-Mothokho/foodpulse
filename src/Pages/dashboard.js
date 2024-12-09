import React, {useContext} from "react";
import { TokenContext } from "../TokenContext";
import { Container } from "react-bootstrap";
import { UserIDContext } from "../UserContext/UserIDContext";
import { UsernameContext } from "../UserContext/UsernameContext";
import { ProfilePictureContext } from "../UserContext/ProfilePictureContext";
import { RoleContext } from "../UserContext/RoleContext";

const Dashboard = () =>
{
    const {token} = useContext(TokenContext);
    const {userID} = useContext(UserIDContext);
    const {username} = useContext(UsernameContext);
    const {profilePicture} = useContext(ProfilePictureContext);
    const {role} = useContext(RoleContext);

return(
    <Container>
        <h1>Welcome to dashboard</h1>
        <p>Token: {token}</p>
        <p>ID: {userID}</p>
        <p>username: {username}</p>
        <p>PP: {profilePicture}</p>
        <p>role: {role}</p>
    </Container>
)
}

export default Dashboard;