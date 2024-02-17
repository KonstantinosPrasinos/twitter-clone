import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";

const EditProfileButton = () => {
    const navigate = useNavigate();
    return (
        <button className={"Horizontal-Flex-Container edit-profile-button"} onClick={() => navigate("/user/edit-profile")}>
            <FaUserEdit />
            Edit Profile
        </button>
    );
};
export default EditProfileButton;  