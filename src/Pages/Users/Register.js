import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Card, Modal, Row, Col, Form } from "react-bootstrap";
import backButton from '../../Components/Images/arrow-left-circle.svg';
import nextButton from '../../Components/Images/arrow-right-circle.svg';
import { useNavigate } from "react-router-dom";
import './Register.css';

const RegisterUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [website, setWebsite] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    
    const [showUsername, setShowUsername] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDOB, setShowDOB] = useState(false);
    const [showWebsite, setShowWebsite] = useState(false);
    const [showBio, setShowBio] = useState(false);
    const [showProfilePicture, setShowProfilePicture] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handleShowDOB();
    }, []);

    const handleImageChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleCancel = () => {
        navigate('/');
    }

    const handleClose = () => {
        setShowUsername(false);
        setShowEmail(false);
        setShowDOB(false);
        setShowBio(false);
        setShowPassword(false);
        setShowWebsite(false);
        setShowProfilePicture(false);

        handleClear();
        handleCancel();
    };

    const handleClear = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setBio('');
        setWebsite('');
        setDateOfBirth('');
        setProfilePicture(null);
    }

    //Username
    const handleShowUsername = () => {
        setShowUsername(true);
    };

    const handleUsername_next = () => {
        setShowUsername(false);
        handleShowEmail();
    };

    const handleUsername_back = () => {
        setShowUsername(false);
        handleShowDOB();
    };

    //Email
    const handleShowEmail = () => {
        setShowEmail(true);
    };

    const handleEmail_next = () => {

        // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setErrorMessage("");
      setEmail(email);
    } else {
      setErrorMessage("Invalid email. Please ensure your email is correct!");
      setEmail(email);
      return;
    }

        setShowEmail(false);
        handleShowPassword();
    };

    const handleEmail_back = () => {
        setShowEmail(false);
        handleShowUsername();
    };

    //Date of Birth
    const handleShowDOB = () => {
        setShowDOB(true);
    };

    const handleDOB_next = () => {
        setShowDOB(false);
        handleShowUsername();
    };

    const handleDOB_back = () => {
        setShowDOB(false);
        navigate('/');
    };

    //Password
    const handleShowPassword = () => {
        setShowPassword(true);
    };

    const handlePassword_next = () => {
        setShowPassword(false);
        handleShowWebsite();
    };

    const handlePassword_back = () => {
        setShowPassword(false);
        handleShowEmail();
    };

    //Website
    const handleShowWebsite = () => {
        setShowWebsite(true);
    };

    const handleWebsite_next = () => {

        // Basic website validation
    const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
    if (!websiteRegex.test(website)) {
      setErrorMessage("Invalid website. Please ensure your website is correct");
      setWebsite(website);
      return;
    } else {
      setErrorMessage("");
      setWebsite(website);
    };

        setShowWebsite(false);
        handleShowProfilePicture();
    };

    const handleWebsite_back = () => {
        setShowWebsite(false);
        handleShowPassword();
    };

    //Profile Picture
    const handleShowProfilePicture = () => {
        setShowProfilePicture(true);
    };

    const handleProfilePicture_next = () => {
        setShowProfilePicture(false);
        handleShowBio();
    };

    const handleProfilePicture_back = () => {
        setShowDOB(false);
        handleShowWebsite();
    };

    //Bio
    const handleShowBio = () => {
        setShowBio(true);
    };

    const handleBio_next = () => {
        setShowBio(false);
        handleSave();
    };

    const handleBio_back = () => {
        setShowBio(false);
        handleShowProfilePicture();
    };

    const handleSave = () => {
        const sanitizedUsername = username.startsWith('@') ? username.slice(1) : username;
    
        const formData = new FormData();
        formData.append("username", sanitizedUsername);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("website", website);
        formData.append("bio", bio);
        formData.append("profilePicture", profilePicture);
    
        const url = localStorage.getItem('apiUrl');
        axios.post(url + '/Users/Add', formData)
            .then((result) => toast.success("Account Created Successfully"))
            .catch((error) => toast.error(error));
    
        navigate('/login');
        // works
    };    

    //Validation

    //DOB
    const handleDOB = (selectedDate) => {
        setDateOfBirth(selectedDate);
    
        if (!selectedDate) {
          setErrorMessage("Please select your date of birth.");
          return;
        }
    
        const today = new Date();
        const dob = new Date(selectedDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
    
        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
    
        if (age < 16) {
          setErrorMessage("You must be at least 16 years old.");
        } else {
          setErrorMessage(""); // Clear error if validation passes
        }
      };

      /// Username
      const handleUsername = (selectedUsername) => {
        if (!selectedUsername) {
          setErrorMessage("Please enter a username");
          return;
        }
      
        // Ensure '@' prefix
        if (!selectedUsername.startsWith("@")) {
          selectedUsername = "@" + selectedUsername;
        }
      
        // Regex to find invalid characters (anything other than letters, numbers, '_', and '.')
        const invalidChars = /[^a-zA-Z0-9_.@]/;
        if (invalidChars.test(selectedUsername)) {
          setErrorMessage("Invalid character(s). Only letters, numbers, '_', and '.' are allowed.");
          setUsername(selectedUsername);
        } else {
          setErrorMessage("");
          setUsername(selectedUsername);
        }
      };
      
  
  // Email
  const handleEmail = (selectedEmail) => {
    if (!selectedEmail) {
      setErrorMessage("Please enter your email");
      return;
    };
    
    setEmail(selectedEmail); 
    
  };
  
  // Website
  const handleWebsite = (selectedWebsite) => {
    if (!selectedWebsite) {
      setWebsite(""); // Clear website input if empty
      return;
    }
  setWebsite(selectedWebsite);
  setErrorMessage("");
    
  };
  
  // Password
const handlePassword = (selectedPassword) => {
    if (!selectedPassword) {
      setErrorMessage("Please enter your password");
      return;
    }
  
    // Check length
    if (selectedPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long!");
      setPassword(selectedPassword);
      return;
    }
  
    // Check for at least one special character
    const specialCharRegex = /[^a-zA-Z0-9]/;
    if (!specialCharRegex.test(selectedPassword)) {
      setErrorMessage("Password must include at least 1 special character!");
      setPassword(selectedPassword);
      return;
    }
  
    // Check for at least one number
    const numberRegex = /\d/;
    if (!numberRegex.test(selectedPassword)) {
      setErrorMessage("Password must include at least 1 number!");
      setPassword(selectedPassword);
      return;
    }
  
    setErrorMessage("");
    setPassword(selectedPassword);
  };
  
  

    return(
        <div>
            {/* Date of Birth */}
            <Modal show={showDOB} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>How old are you?</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row className="">
                            <Col>
                                <label className="form-Label">Date of Birth: </label>
                                <input className="form-control" type="date" value={dateOfBirth} onChange={(e) => handleDOB(e.target.value)} />
                                {errorMessage && (
                                                <div className="text-danger mt-2">{errorMessage}</div>
                                )}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <img src={backButton} alt="back button" className="arrow-buttons" onClick={handleDOB_back}/>
                        {
                            errorMessage ? (null):(
                                !dateOfBirth ? (null):(
                                    <img src={nextButton} alt="Next button" className="arrow-buttons" onClick={handleDOB_next}/>
                                )
                            )
                        }
                        
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Username */}
            <Modal show={showUsername} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>What should we call you?</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row className="">
                            <Col>
                                <label className="form-Label">Username: </label>
                                <input className="form-control" type="text" value={username.startsWith('@') ? username : '@' + username} placeholder="@..." onChange={(e) => handleUsername(e.target.value)} />
                                {errorMessage && (
                                                <div className="text-danger mt-2">{errorMessage}</div>
                                )}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <img src={backButton} alt="back button" className="arrow-buttons" onClick={handleUsername_back}/>
                        {
                            errorMessage ? (null):(
                                !username ? (null):(
                                    <img src={nextButton} alt="Next button" className="arrow-buttons" onClick={handleUsername_next}/>
                                )
                            )
                        }
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Email */}
            <Modal show={showEmail} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>What is your Email Address?</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <label className="form-Label">Email: </label>
                                <input className="form-control" type="email" value={email} onChange={(e) => handleEmail(e.target.value)} />
                                {errorMessage && (
                                                <div className="text-danger mt-2">{errorMessage}</div>
                                )}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <img src={backButton} alt="back button" className="arrow-buttons" onClick={handleEmail_back}/>
                        {
                            errorMessage ? (null):(
                                !email ? (null):(
                                    <img src={nextButton} alt="Next button" className="arrow-buttons" onClick={handleEmail_next}/>
                                )
                            )
                        }
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Password */}
            <Modal show={showPassword} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create a strong Password.</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <label className="form-Label">Password: </label>
                                <input className="form-control" type="password" value={password} onChange={(e) => handlePassword(e.target.value)} />
                                {errorMessage && (
                                                <div className="text-danger mt-2">{errorMessage}</div>
                                )}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <img src={backButton} alt="back button" className="arrow-buttons" onClick={handlePassword_back}/>
                        {
                            errorMessage ? (null):(
                                !password ? (null):(
                                    <img src={nextButton} alt="Next button" className="arrow-buttons" onClick={handlePassword_next}/>
                                )
                            )
                        }
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Website */}
            <Modal show={showWebsite} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Do you have a website?</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <label className="form-Label">Website Url: </label>
                                <input className="form-control" type="text" value={website} onChange={(e) => handleWebsite(e.target.value)} />
                                {errorMessage && (
                                                <div className="text-danger mt-2">{errorMessage}</div>
                                )}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <img src={backButton} alt="back button" className="arrow-buttons" onClick={handleWebsite_back}/>
                        {
                            errorMessage ? (null):(
                                !website ? (null):(
                                    <img src={nextButton} alt="Next button" className="arrow-buttons" onClick={handleWebsite_next}/>
                                )
                            )
                        }
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Profile Pricture */}
            <Modal show={showProfilePicture} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload your profile Picture?</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <label className="form-Label">Image: </label>
                                <input className="form-control" type="file"  onChange={handleImageChange} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <img src={backButton} alt="back button" className="arrow-buttons" onClick={handleProfilePicture_back}/>
                        {
                            errorMessage ? (null):(
                                <img src={nextButton} alt="Next button" className="arrow-buttons" onClick={handleProfilePicture_next}/>
                            )
                        }
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Bio */}
            <Modal show={showBio} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Describe yourself.</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <label className="form-Label">Bio: </label>
                                <textarea className="form-control" type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <img src={backButton} alt="back button" className="arrow-buttons" onClick={handleBio_back}/>
                        {
                            errorMessage ? (null):(
                                <img src={nextButton} alt="Next button" className="arrow-buttons" onClick={handleBio_next}/>
                            )
                        }
                    </Modal.Footer>
                </Form>
            </Modal>
      </div>
    );
};

export default RegisterUser;