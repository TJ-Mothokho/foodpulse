import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UserDetails = () =>
{
    const {userID} = useParams();
    return(
        <Container className="mt-3">
            <h1>Details for {userID}</h1>
        </Container>
    );
}
export default UserDetails;