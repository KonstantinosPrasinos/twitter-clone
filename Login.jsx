import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showWarning,SetsShowWarning]=useState(false);
    const navigate = useNavigate();
    
   

    const handleLogin = () => {

        e.preventDefault();
        
        if(username.length === 0 ) {
            return;
        }

        if(password.length === 0) {

            return;
        }

    };


    const handleClick = () => {
        navigate("/Register");
    };

      

    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>Login to TSIOY</h2>
            <from  className={"Vertical-Flex-Container"} onSubmt={handleLogin}>
                <label for="Username">Username or Email</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" id="username" name="username" />
                <label for="Password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" id="password" name="password" />
                <button type="Login">Log In</button>  
            </from>
            <button onClick={handleClick}>Don't have an account register here.</button>
        </div>    
    );
}

export default Login