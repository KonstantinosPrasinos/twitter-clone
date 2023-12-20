import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Validation from '../functions/LoginValidation.js'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors,SetErrors]=useState({});
    const navigate = useNavigate();
    
   

    const handleLogin = async () => {

        e.preventDefault();
        SetErrors(Validation(values));

        try {
            const response = await axios.post("http://localhost:3000/api/login", { username, password });
      
            if (response.data.success) {
              console.log('Login successful');
            } else {
              console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
        

    };


    const handleClick = () => {
        navigate("/Register");
    };

      

    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>Login to TSIOY</h2>
            <from  className={"Vertical-Flex-Container"} onSubmit={handleLogin}>
                <label htmlFor="Username">Username or Email</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" id="username" name="username" />
                {errors.username && <span className="error"> {errors.username} </span>}
                <label htmlFor="Password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" id="password" name="password" />
                {errors.password && <span className="error"> {errors.password} </span>}
                <button type="Login">Log In</button>  
            </from>
            <button onClick={handleClick}>Don't have an account register here.</button>
        </div>    
    );
}

export default Login