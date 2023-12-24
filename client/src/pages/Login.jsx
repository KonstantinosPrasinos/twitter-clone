import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {LoginApp} from "../functions/LoginApp.jsx";


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const  login = LoginApp();
    
   

    const handleLogin = async (event) => {

      event.preventDefault();

      const response = await login(username, password);

        if (response === true) {
            navigate("/home");
        } else {
            console.log("Failed to Login")
        }
    

        

    };


    const handleClick = () => {
        navigate("/Register");
    };

      

    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>Login to TSIOY</h2>
            <form  className={"Vertical-Flex-Container"} onSubmit={handleLogin}>
                <label htmlFor="Username">Username or Email</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" id="username" name="username" required />
                <label htmlFor="Password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" id="password" name="password" required />
                <button type="Login">Log In</button>  
            </form>
            <button onClick={handleClick}>Don't have an account register here.</button>
            
        </div>    
    );
}

export default Login