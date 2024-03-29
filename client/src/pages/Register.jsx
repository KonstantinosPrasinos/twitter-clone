import {useContext, useState} from "react";
import {useRegister} from "../hooks/useRegister.jsx";
import {useNavigate} from "react-router-dom";
import {validateEmail} from "../functions/validateEmail.js";
import {validatePassword} from "../functions/validatePassword.js";
import {AlertContext} from "../context/AlertContext.jsx";

const Register = () => {
    const [formData, setFormData] = useState({username: "", email: "", password: "", repeatPassword: ""});
    const {isLoading, register} = useRegister();
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevState) => ({...prevState, [name]: value}));
    }

    const handleRegister = async (event) => {
        // In order for the page not to refresh, do the following
        event.preventDefault();

        // Check inputs and make request to server
        if (formData.username.length === 0) {
            alertContext.addAlert("You must input a username");
            return;
        }

        if (formData.email.length === 0) {
            alertContext.addAlert("You must input an email");
            return;
        }
        if (formData.password.length === 0) {
            alertContext.addAlert("You must input a password");
            return;
        }
        if (formData.repeatPassword.length === 0) {
            alertContext.addAlert("You must repeat your password");
            return;
        }

        if (formData.password !== formData.repeatPassword) {
            alertContext.addAlert("Your password and repeat password must match");
            return;
        }

        if (!validateEmail(formData.email)) {
            alertContext.addAlert("Your email must be valid e.g. name@domain.com");
            return;
        }

        const validatedPasswordResponse = validatePassword(formData.password)

        if (validatedPasswordResponse !== true) {
            alertContext.addAlert(validatedPasswordResponse);
            return;
        }

        const response = await register(formData.username, formData.email, formData.password);

        if (response === true) {
            navigate("/login");
            alertContext.addAlert("Account created successfully!");
        } else {
            alertContext.addAlert("Failed to register your account");
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>Create your account</h2>
            <form onSubmit={handleRegister} className={"Vertical-Flex-Container"} id={"register-form"}>
                <label className={"Vertical-Flex-Container"}>
                    <span>Username</span>
                    <input type={"text"} name={"username"} onChange={handleFormChange} />
                </label>
                <label className={"Vertical-Flex-Container"}>
                    <span>Email</span>
                    <input type={"text"} name={"email"} onChange={handleFormChange} />
                </label>
                <label className={"Vertical-Flex-Container"}>
                    <span>Password</span>
                    <input type={"password"} name={"password"} onChange={handleFormChange} />
                </label>
                <label className={"Vertical-Flex-Container"}>
                    <span>Repeat Password</span>
                    <input type={"password"} name={"repeatPassword"} onChange={handleFormChange} />
                </label>
            </form>
            <button type={"submit"} form={"register-form"}>Register</button>
            <div className={"register-or-tag"}>or</div>
            <button onClick={handleLogin}>Already have an account? Log in here</button>
        </div>
    );
};

export default Register;