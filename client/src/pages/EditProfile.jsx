import {useContext, useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import {validateEmail} from "../functions/validateEmail.js";
//import {validatePassword} from "../functions/validatePassword.js";
import {AlertContext} from "../context/AlertContext.jsx";



const EditProfile = () => {

    const [formData, setFormData] = useState({username: "", email: ""/*, password: ""*/});
    const alertContext = useContext(AlertContext);
    const { user_id } = useParams();
    const user_id_int = parseInt(user_id, 10);
    

    
    useEffect(() => {
        // Fetch user data on component mount
        fetchUserData();
      }, [user_id_int]);

    const fetchUserData = async () => {
        try {
          // Make a GET request to fetch user data
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/data/${user_id_int}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${parseInt(user_id_int)}`,
            },
            credentials: 'include',
          });
    
          if (response.ok) {
            const userData = await response.json();
            // Set the fetched username and email in the state
            setFormData({
              username: userData.username,
              email: userData.email,
            });
          } else {
            if (response.status === 401) {
              alertContext.addAlert("Session expired. Please log in again.");
              await logout();
            } else {
              alertContext.addAlert("Failed to fetch user data");
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          alertContext.addAlert("Failed to fetch user data");
        }

        
      };

    

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
        
        if (!validateEmail(formData.email)) {
            alertContext.addAlert("Your email must be valid e.g. name@domain.com");
            return;
        }
    
        
    }

    


    return (
        <div className={"Panel Vertical-Flex-Container"}>
            <h2>Edit Profile </h2>
            <form onSubmit={handleEditProfile} className={"Vertical-Flex-Container"} id={"edit-form"}>
                <label className={"Vertical-Flex-Container"}>
                    <span>Username</span>
                    <input type={"text"} name={"username"} value={formData.username} onChange={handleFormChange} />
                </label>
                <label className={"Vertical-Flex-Container"}>
                    <span>Email</span>
                    <input type={"text"} name={"email"} value={formData.email} onChange={handleFormChange} />
                </label>
            </form>
            <button type={"submit"} form={"edit-form"}>Save Changes</button>
        </div>
    );
};

export default EditProfile;