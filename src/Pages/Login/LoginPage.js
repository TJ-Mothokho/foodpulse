import React, {Fragment, useState, useContext} from "react";
import { TokenContext } from "../../TokenContext";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import image from './Assets/Images/login.png'
import { UserContext } from "../../UserContext";

const Login = () =>
{
    const {setUserID} = useContext(UserContext);
    const {setUsername} = useContext(UserContext);
    const {setProfilePicture} = useContext(UserContext);
    const {setRole} = useContext(UserContext);

    const {setToken} = useContext(TokenContext);
    
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [data, setData] = useState('');
    


    const navigate = useNavigate();

    const handleLogin = (event) =>
    {
        event.preventDefault();
        const url = 'https://localhost:7297/api/Auth/Login'
        const data = {
            "username": username,
            "password": password
        }

        axios.post(url, data)
        .then((result) =>
        {
            setData(result.data);
            assignData();
            //redirect to new page
            navigate('/dashboard');
        })
        .catch((error) =>
        {console.log(error);})
    }

    const assignData = () =>
    {
        if (data.length > 0) {
            data.map((items) =>
        {
            setUserID(items.userID);
            setUsername(items.username);
            setProfilePicture(items.profilePicture);
            setRole(items.role);
            setToken(items.token); 
        });
        };
    }

    const showRecipes = () => {
        axios.get('https://localhost:7297/api/Recipes/GetAll', {
            headers: {
                Authorization: `Bearer ${setToken}`, 
            },
        })
        .then((result) => {
            console.log(result.data); //just to double check
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
        });
    };

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
                                    <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="floating-input form-control" required />
                                </div>
                                <div className="mt-3">
                                    <label className="floating-label form-label">Password:</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="floating-input form-control" required />
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