import React, {useContext} from 'react';
import {FaHome, FaUser} from "react-icons/fa";
import LogoutButton from "./LogoutButton.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";

const Navbar = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const handleHomeClick = () => {
        navigate("/")
    }

    const handleProfileClick = () => {
        navigate(`/user/${userContext.state.username}`, {state: {user_id: userContext.state.user_id}})
    }

    return (
        <nav className={"Vertical-Flex-Container Big-Gap"}>
            <button className={"Horizontal-Flex-Container logout-button"} onClick={handleHomeClick}>
                <FaHome />
                Home
            </button>
            <button className={"Horizontal-Flex-Container logout-button"} onClick={handleProfileClick}>
                <FaUser />
                Profile
            </button>
            <LogoutButton />
        </nav>

    );
};

export default Navbar;
