import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import addIcon from '../../Components/Images/plus-circle.svg'
import { useNavigate } from "react-router-dom";

const AddUser = () =>
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [website, setWebsite] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const navigate = useNavigate();

    const data = {
        "username": username,
        "password": password,
        "email": email,
        "dateOfBirth": dateOfBirth,
        "website": website,
        "bio": bio,
        "profilePicture": profilePicture
    }

    const handleImageChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    // const handleSave = () =>
    // {
    //     axios.post('https://localhost:7297/api/Users/Add', data)
    //     .then((result) => toast.success(result.data))
    //     .catch((error) => toast.error(error))
    //     console.log(data.dateOfBirth);
    // }

    const handleSave = () => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("website", website);
        formData.append("bio", bio);
        formData.append("profilePicture", profilePicture);

        axios.post('https://localhost:7297/api/Users/Add', formData)
        .then((result) => toast.success("added"))
        .catch((error) => toast.error(error))
        alert("done");
    }

    return(
        <Container className="mt-3">
            <form>
                <Row>
                    <Col>
                        <label className="form-label">Username:</label>
                        <input className="form-control" type="text" value={username} autoComplete="off" autoCorrect="false" onChange={(e) => setUsername(e.target.value)} />
                    </Col>

                    <Col>
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Email:</label>
                        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Col>

                    <Col>
                        <label className="form-label">Date Of Birth:</label>
                        <input className="form-control" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Website:</label>
                        <input className="form-control" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </Col>

                    <Col>
                        <label className="form-label">Bio:</label>
                        <input className="form-control" type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label className="form-label">Profile Picture:</label>
                        <input className="form-control" type="file" onChange={handleImageChange} />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <button className="btn btn-primary" onClick={handleSave}><img src={addIcon} alt='add button' /> Add</button>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => navigate('/')}> Back </button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default AddUser;