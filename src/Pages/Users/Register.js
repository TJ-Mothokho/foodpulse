import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Card, Modal, Row, Col, Form } from "react-bootstrap";
import addIcon from '../../Components/Images/plus-circle.svg'
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [website, setWebsite] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    
    const [showUsername, setShowUsername] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDOB, setShowDOB] = useState(false);
    const [showWebsite, setShowWebsite] = useState(false);
    const [showBio, setShowBio] = useState(false);
    const [showProfilePicture, setShowProfilePicture] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handleShowUsername();
      }, []);

    const handleCancel = () => {
        navigate('/');
    }


    //Username
    const handleShowUsername = () => {
        setShowUsername(true);
    };

    const handleUsername_next = () => {
        setShowUsername(false);
        setShowEmail(true);
    };

    const handleUsername_back = () => {
        setShowUsername(false);
        handleCancel();
    };

    const handleClose = () => {
        setShowUsername(false);
        setShowEmail(false);
        handleCancel();
    };

    //Email
    const handleShowEmail = () => {
        setShowEmail(true);
    };

    const handleEmail_next = () => {
        setShowEmail(false);
        setShowPassword(true);
    };

    const handleEmail_back = () => {
        setShowEmail(false);
        setShowUsername(true);
    };

    return(
        <div>
            <Modal show={showUsername} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>What should we call you?</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row className="mt-4">
                            <Col>
                                <label className="form-Label">Username: </label>
                                <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Col>
                        </Row>

                        {/* <Row className="mt-4">
                            <Col className="col-7">
                            <label className="form-Label">Image: </label>
                            <input className="form-control" type="file"  onChange={handleImageChange} />
                            </Col>
                        </Row> */}


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUsername_back}>Back</Button>
                        <Button variant="primary" onClick={handleUsername_next}>Next</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Email */}
            <Modal show={showEmail} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>What is your Email Address?</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row className="mt-4">
                            <Col>
                                <label className="form-Label">Email: </label>
                                <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Row>

                        {/* <Row className="mt-4">
                            <Col className="col-7">
                            <label className="form-Label">Image: </label>
                            <input className="form-control" type="file"  onChange={handleImageChange} />
                            </Col>
                        </Row> */}


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEmail_back}>Back</Button>
                        <Button variant="primary" onClick={handleEmail_next}>Next</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
      </div>
    );
};

export default RegisterUser;