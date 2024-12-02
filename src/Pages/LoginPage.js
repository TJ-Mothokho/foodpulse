import React, {useState} from "react";
import axios from "axios";


const Login = ({setToken}) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("https://localhost:7297/api/Auth/Login", 
                {
                    username, password,
                });
            setToken(response.data)
            setError("no error");
        }
        catch{
            console.log(error)
            setError("Invalid username or passwordx");
        }
    };

    return(
        <div>
            <h1 className="display-2">Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label className="form-label">Username:</label>
                    <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label className="form-label">Password:</label>
                    <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{color:"red"}}>{error}</p>}
        </div>
    );
}

export default Login;