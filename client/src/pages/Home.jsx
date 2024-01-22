import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from '../components/LogoutButton';
import ViewPostsForm from "../components/ViewPostsForm.jsx";
import {useNavigate} from "react-router-dom";
import {FaHome} from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate("/")
    }

    return <div className="mainContainer">
        <div className={"mainContainer-left-bar"}>
            <div className={"Vertical-Flex-Container"}>
                <CreatePostForm />
                <ViewPostsForm />
            </div>
        </div>
        <div className={"mainContainer-right-bar Vertical-Flex-Container"}>
            <button className={"Horizontal-Flex-Container logout-button"} onClick={handleHomeClick}>
                <FaHome />
                Home
            </button>
            <LogoutButton />
        </div>
    </div>
};

export default Home;