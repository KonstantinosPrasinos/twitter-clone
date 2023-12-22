import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from '../functions/LoginValidation.js'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors,SetErrors]=useState({});
    const navigate = useNavigate();
    
   

    const handleLogin = async () => {

        event.preventDefault();
        /*SetErrors(Validation(values));*/

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


    const handleClick = () => {
        navigate("/Register");
    };

      

    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>Login to TSIOY</h2>
            <form  className={"Vertical-Flex-Container"} onSubmit={handleLogin}>
                <label htmlFor="Username">Username or Email</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" id="username" name="username" required />
                {errors.username && <span className="error"> {errors.username} </span>}
                <label htmlFor="Password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" id="password" name="password" required />
                {errors.password && <span className="error"> {errors.password} </span>}
                <button type="Login">Log In</button>  
            </form>
            <button onClick={handleClick}>Don't have an account register here.</button>
            
        </div>    
    );
}

export default Login