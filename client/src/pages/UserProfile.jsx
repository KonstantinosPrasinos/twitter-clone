import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import {FaHome} from "react-icons/fa";
import PostList from "../components/PostList.jsx";

const UserProfile = () => {
    const params = useParams()
    const location = useLocation()
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [selectedTab, setSelectedTab] = useState('posts')
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
                <div className={"Panel-Thin"}>
                    <h2>{params.username}</h2>
                    <div className={"Horizontal-Flex-Container Space-Between"}>
                        <div className={"Horizontal-Flex-Container"}>
                            <span className={"low-opacity"}>Following: </span>
                            <span className={"low-opacity"}>Followers: </span>
                        </div>
                        <div className={"profile-date"}>Joined on: {!isLoading && (new Date(userData.user.created_at)).toLocaleDateString()}</div>
                    </div>
                    <div className={"Tab-Navigation Horizontal-Flex-Container"}>
                        <div
                            className={selectedTab === 'posts' ? "Tab-Navigation-Selected-Tab" : ""}
                            onClick={() => setSelectedTab('posts')}
                        >Posts</div>
                        <div
                            className={selectedTab === 'replies' ? "Tab-Navigation-Selected-Tab" : ""}
                            onClick={() => setSelectedTab('replies')}
                        >Replies</div>
                        <div
                            className={selectedTab === 'likes' ? "Tab-Navigation-Selected-Tab" : ""}
                            onClick={() => setSelectedTab('likes')}
                        >Likes</div>
                    </div>
                </div>

                {isLoading && <div>Loading...</div>}
                {!isLoading && <PostList posts={userData.posts} />}
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