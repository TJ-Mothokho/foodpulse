//React
import React, {Fragment, useState, useContext} from "react";
import apiClient, {apiEndpoints} from "../../Api/api";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

//Auth
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../Store/TokenStore';
import { setUserID, clearUserID } from '../../Store/TokenStore';
import { setUsername, clearUsername } from '../../Store/TokenStore';
import { setRole, clearRole } from '../../Store/TokenStore';
import { setProfilePicture, clearProfilePicture } from '../../Store/TokenStore';

//Media
import image from './Assets/Images/login.png';

const Login = () =>
{
    const tokenDispatch = useDispatch(); // For token actions
    const userIDDispatch = useDispatch();
    const usernameDispatch = useDispatch();
    const roleDispatch = useDispatch();
    const profilePictureDispatch = useDispatch();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = async (event) =>
    {
        event.preventDefault();
        //const url = 'https://localhost:7297/api/Auth/Login'
        const data = {
            "username": username,
            "password": password
        }

        try {
            const result = await apiClient.post(apiEndpoints.login, data); // Make the API call
            tokenDispatch(setToken(result.data.token)); // Save token
            userIDDispatch(setUserID(result.data.userID));
            usernameDispatch(setUsername(result.data.username));
            profilePictureDispatch(setProfilePicture(result.data.profilePicture));
            roleDispatch(setRole(result.data.role));
            navigate('/')
          } catch (error) {
            toast.error("Invalid username or password!"); // Show error toast
            console.error(error); // For debugging
          }

    }


    return(
        <Fragment>
            <Container className="mt-5">
                <div className="row border mx-5">
                    <div className="col-7">
                        <div>
                            <h2 className="display-2 text-center">Login</h2>
                            <form>
                                <div className="mt-3">
                                    <label className="floating-label form-label">Username:</label>
                                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="floating-input form-control" autoComplete="off" autoSave="off" autoCorrect="off" required />
                                </div>
                                <div className="mt-3">
                                    <label className="floating-label form-label">Password:</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="floating-input form-control" autocomplete="new-password" autoSave="off" autoCorrect="off" required />
                                </div>
                                <div className="row">
                                <div class="col-lg-6">
                                          <div class="custom-control custom-checkbox mb-3">
                                             <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                             <label class="custom-control-label control-label-1" for="customCheck1">Remember Me</label>
                                          </div>
                                       </div>
                                       <div class="col-lg-6">
                                          <a href="auth-recoverpw.html" class="float-right">Forgot Password?</a>
                                       </div>
                                </div>
                                <button className="btn btn-primary mt-1" onClick={handleLogin}>Login</button>
                                <p class="mt-3">
                                    Create an Account <a href="/Register" class="text-underline">Sign Up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                    <img src={image} class="img-fluid image-right" alt="imageHere" />
                    </div>
                </div>
            </Container>
        </Fragment>
    );
}



export default Login;