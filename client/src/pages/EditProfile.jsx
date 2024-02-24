import {useContext, useState} from "react";
import {validateEmail} from "../functions/validateEmail.js";
import {validatePassword} from "../functions/validatePassword.js";
import {AlertContext} from "../context/AlertContext.jsx";



const EditProfile = () => {

    const [formData, setFormData] = useState({username: "", email: "", password: ""});
    const alertContext = useContext(AlertContext);

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevState) => ({...prevState, [name]: value}));
    }

    const handleEditProfile = async (event) => {
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
        if (!validateEmail(formData.email)) {
            alertContext.addAlert("Your email must be valid e.g. name@domain.com");
            return;
        }
    
        const validatedPasswordResponse = validatePassword(formData.password)
    
        if (validatedPasswordResponse !== true) {
            alertContext.addAlert(validatedPasswordResponse);
            return;
        }
    
        
        
    }


    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>Edit Profile </h2>
            <form onSubmit={handleEditProfile} className={"Vertical-Flex-Container"} id={"edit-form"}>
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
            </form>
            <button type={"submit"} form={"edit-form"}>Save Changes</button>
        </div>
    );
};

export default EditProfile;