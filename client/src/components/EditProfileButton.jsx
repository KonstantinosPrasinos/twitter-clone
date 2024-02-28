import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";

const EditProfileButton = ({ user_id }) => {
    const navigate = useNavigate();
    
    

    return (
        <button className={"Horizontal-Flex-Container edit-profile-button"} onClick={() => navigate(`/user/edit-profile/${user_id}`)}>
            <FaUserEdit />
            Edit Profile   
        </button>
        
    );
};
export default EditProfileButton;  