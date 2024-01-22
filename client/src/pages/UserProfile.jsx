import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import {FaHome} from "react-icons/fa";

const UserProfile = () => {
    const params = useParams()
    const location = useLocation()
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);

    const {user_id} = location.state;

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/")
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userContext.state.user_id}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data)
                } else {
                    alertContext.addAlert("Failed to fetch user");
                }
            } catch (error) {
                console.error('Error fetching feed:', error);
                alertContext.addAlert("Failed to fetch feed");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return <div className="mainContainer">
        <div className={"mainContainer-left-bar"}>
            <div className={"Vertical-Flex-Container"}>
                <CreatePostForm initialInput={`@${params.username}`} />
                {params.username}
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

export default UserProfile;