import {useState} from "react";

const Register = () => {
    const [formData, setFormData] = useState({username: "", email: "", password: "", repeatPassword: ""});

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevState) => ({...prevState, [name]: value}));
    }

    const handleRegister = (event) => {
        // In order for the page not to refresh, do the following
        event.preventDefault();

        // Check inputs and make request to server
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
                    <input type={"text"} name={"password"} onChange={handleFormChange} />
                </label>
                <label className={"Vertical-Flex-Container"}>
                    <span>Repeat Password</span>
                    <input type={"text"} name={"repeatPassword"} onChange={handleFormChange} />
                </label>
            </form>
            <button type={"submit"} form={"register-form"}>Register</button>
            <div className={"register-or-tag"}>or</div>
            <button>Log in</button>
        </div>
    );
};

export default Register;