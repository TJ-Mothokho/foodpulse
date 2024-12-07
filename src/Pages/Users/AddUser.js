import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";

const AddUser = () =>
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [website, setWebsite] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const data = {
        "username": username,
        "password": password,
        "email": email,
        "dateOfBirth": dateOfBirth,
        "website": website,
        "bio": bio,
        "profilePicture": profilePicture
    }

    const handleSave = () =>
    {
        axios.post('https://localhost7297/api/Users/Add', data)
        .then((result) => toast.success('Successfully added'))
        .catch((error) => toast.error(error))
    }

    return(
        <Container className="mt-3">
            <form>
                <Row>
                    <Col>
                        <label className="form-label">Username:</label>
                        <input className="form-control" type="text" value={username} onChange={setUsername((e) => e.target.value)} />
                    </Col>

                    <Col>
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" value={password} onChange={setPassword((e) => e.target.value)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Email:</label>
                        <input className="form-control" type="email" value={email} onChange={setEmail((e) => e.target.value)} />
                    </Col>

                    <Col>
                        <label className="form-label">Date Of Birth:</label>
                        <input className="form-control" type="Date" value={dateOfBirth} onChange={setDateOfBirth((e) => e.target.value)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Website:</label>
                        <input className="form-control" type="text" value={website} onChange={setWebsite((e) => e.target.value)} />
                    </Col>

                    <Col>
                        <label className="form-label">Bio:</label>
                        <input className="form-control" type="text" value={bio} onChange={setBio((e) => e.target.value)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Profile Picture:</label>
                        <input className="form-control" type="text" value={profilePicture} onChange={setProfilePicture((e) => e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="btn btn-primary" onClick={handleSave}>Add</button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default AddUser;