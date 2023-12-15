import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {

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