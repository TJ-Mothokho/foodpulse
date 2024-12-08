import React, {useContext} from "react";
import { TokenContext } from "../TokenContext";
import { Container } from "react-bootstrap";

const Dashboard = () =>
{
    const {token} = useContext(TokenContext);

return(
    <Container>
        <h1>Welcome to dashboard</h1>
        <p>Token: {token}</p>
    </Container>
)
}

export default Dashboard;