import React, {Fragment, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Login = () =>
{
    const [token, setToken] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            showRecipes()
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
            <Container className="mt-3">
                <div>
                    <h2 className="display-2 text-center">Login</h2>
                    <form>
                        <div className="mt-3">
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mt-3">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </Container>
        </Fragment>
    );
}



export default Login;