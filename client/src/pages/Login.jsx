import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginApp} from "../functions/LoginApp.js";
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = LoginApp();
    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);


    useEffect(() => {
        if (userContext?.state?.user_id) {
            navigate("/")
        }
    }, [userContext]);
    
  
    const handleLogin = async (event) => {
      event.preventDefault();

      if (username.length === 0) {
            alertContext.addAlert("You must input a username");
            return;
        }

      if (password.length === 0) {
            alertContext.addAlert("You must input a password");
            return;
      }



      const response = await login(username, password);
      
      if (typeof response !== 'string' && response?.user) {
            userContext.dispatch({type: 'SET_USER', payload: response.user});
            navigate("/home");
        } else {
            console.log("Failed to Login")
            alertContext.addAlert("Incorrect User Name or Password");

        }
    };

    const handleClick = () => {
        navigate("/Register");
    };

    return (
        <div className="Vertical-Flex-Container">           
            <svg viewBox="0 0 600 150">
                    <symbol id="s-text">
                        <text textAnchor="middle" x="50%" y="80%"  fontSize="130px">EchoTexts</text>
                    </symbol>
                    <g className = "g-ants">
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                        <use xlinkHref="#s-text" className="text-copy"></use>
                    </g>
            </svg>
            <div className={"Panel Vertical-Flex-Container"}>
                <h3>Sign in to your account</h3>
                <form className={"Vertical-Flex-Container"} onSubmit={handleLogin}>
                    <label htmlFor="Username">Username or Email</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" id="username"
                        name="username" required/>
                    <label htmlFor="Password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password"
                        name="password" required/>
                    <button type="Login">Continue</button>
                </form>
                <button onClick={handleClick}>Don't have an account register here.</button>
            </div>
        </div>
        );
}

export default Login