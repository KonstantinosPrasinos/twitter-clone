import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem('jwt', responseData.token);
                navigate('/register');
            } else {
                const errorData = await response.json();
                console.error("Login failed: ", errorData.message);
            }
        }
        catch(error)
        {
            console.error("Error during login: ",error);
        }
    };
    return (
        <div className={"Panel Vertical-FLex-Container"}>
            {
            (
                <div>
                    <h1>Login to TSIOY</h1>
                    <label>
                        Username or Email:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Login