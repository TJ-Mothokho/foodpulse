import React, {Fragment, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

const Login = () =>
{
    const [token, setToken] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        {setToken(result.data);
            console.log("Token received:", result.data);
            //redirect to new page
            navigate('/dashboard');
        })
        .catch((error) =>
        {console.log(error);})
    }

    const showRecipes = () => {
        axios.get('https://localhost:7297/api/Recipes/GetAll', {
            headers: {
                Authorization: `Bearer ${token}`, 
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
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="floating-input form-control" required />
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
                    <img src="./Assets/Images/login.png" class="img-fluid image-right" alt="imageHere" />
                    </div>
                </div>
            </Container>
        </Fragment>
    );
}



export default Login;