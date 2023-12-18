import {useState} from "react";
import {useRegister} from "../hooks/useRegister.jsx";
import {useNavigate} from "react-router-dom";
import {validateEmail} from "../functions/validateEmail.js";
import {validatePassword} from "../functions/validatePassword.js";

const Register = () => {
    const [formData, setFormData] = useState({username: "", email: "", password: "", repeatPassword: ""});
    const {isLoading, register} = useRegister();
    const navigate = useNavigate();

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevState) => ({...prevState, [name]: value}));
    }

    const handleRegister = async (event) => {
        // In order for the page not to refresh, do the following
        event.preventDefault();

        // Check inputs and make request to server
        if (formData.username.length === 0) {
            // Display error message
            return;
        }

        if (formData.email.length === 0) {
            // Display error message
            return;
        }
        if (formData.password.length === 0) {
            // Display error message
            return;
        }
        if (formData.repeatPassword.length === 0) {
            // Display error message
            return;
        }

        if (formData.password !== formData.repeatPassword) {
            // Display error message
            console.log("Password and Repeat Password must match")
            return;
        }

        if (!validateEmail(formData.email)) {
            // Display error message
            console.log("Email must be valid")
            return;
        }

        const validatedPasswordResponse = validatePassword(formData.password)

        if (validatedPasswordResponse !== true) {
            // Display error message
            console.log(validatedPasswordResponse);
            return;
        }

        const response = await register(formData.username, formData.email, formData.password);

        if (response === true) {
            navigate("/login");
        } else {
            // Display error message
            console.log("Failed to register account")
        }
    }

    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>ΤΣΙΟΥ</h2>
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
            <button>Log in</button>
        </div>
    );
};

export default Register;