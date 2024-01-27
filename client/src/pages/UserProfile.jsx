import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";
import CreatePostForm from "../components/CreatePostForm.jsx";
import {FaArrowRight} from "react-icons/fa";
import PostList from "../components/PostList.jsx";
import Dialog from "../components/Dialog.jsx";
import Navbar from "../components/Navbar.jsx";
import Tabs from "../components/Tabs.jsx";
import useLogout from "../hooks/useLogout.jsx";
import {formatNumber} from "../functions/formatNumber.js";

const UserProfile = () => {
    const params = useParams()
    const location = useLocation()
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [selectedTab, setSelectedTab] = useState('Posts')
    const [followerDialogVisible, setFollowerDialogVisible] = useState(false);
    const [followingDialogVisible, setFollowingDialogVisible] = useState(false);
    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);
    const followInfoContainer = useRef();
    const {logout} = useLogout();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isConnectedUser, setIsConnectedUser] = useState(false);

    const {user_id} = location.state;

    const isViewingOwnProfile = user_id === userContext.state.user_id;
    
    useEffect(() => {
        // Reset everything in case of redirection to another user
        setIsLoading(true);
        setFollowingDialogVisible(false);
        setFollowerDialogVisible(false);
        if (userData.user && userContext.state.user_id !== userData.user.user_id) {setIsFollowing(userData.isFollowing);}
    
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
                    if (response.status === 401) {
                        alertContext.addAlert("Session expired. Please log in again.");
                        await logout();
                    } else {
                        alertContext.addAlert("Failed to fetch user");
                    }
                }
            } catch (error) {
                console.error('Error fetching feed:', error);
                alertContext.addAlert("Failed to fetch feed");
            } finally {
                setIsLoading(false);
            }
        };


        fetchProfile();
    }, [params]);

    const handleFollowerClick = (event) => {
        if (isLoading || userData?.followers?.length === 0) return;
        event.stopPropagation()
        if (followingDialogVisible) setFollowingDialogVisible(false)
        setFollowerDialogVisible(current => !current);
    }

    const handleFollowingClick = (event) => {
        if (isLoading || userData?.following?.length === 0) return;
        event.stopPropagation()
        if (followerDialogVisible) setFollowerDialogVisible(false);
        setFollowingDialogVisible(current => !current)
    }

    const handleFollowClick = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userContext.state.user_id}`,
                },
                body: JSON.stringify({
                    follower_user_id: userContext.state.user_id,
                    following_username: params.username,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                alertContext.addAlert(`You are now following ${params.username}.`);
                setIsFollowing(true);
                fetchProfile();
            } else {
                alertContext.addAlert('Failed.User is already following the specified user.');
            }
        } catch (error) {
            console.error('Error following user:', error);
            alertContext.addAlert('Failed to follow user.');
        }
    };

    const handleUnfollowClick = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/unfollow`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userContext.state.user_id}`,
                },
                body: JSON.stringify({
                    follower_user_id: userContext.state.user_id,
                    following_username: params.username,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                alertContext.addAlert(`You are no longer following ${params.username}.`);
                setIsFollowing(false);
                fetchProfile();
            } else {
                alertContext.addAlert('Failed to unfollow user.');
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
            alertContext.addAlert('Failed to unfollow user.');
        }
    };
    
    
      

    return <div className="mainContainer">
        <div className={"mainContainer-left-bar"}>
            <div className={"Vertical-Flex-Container"}>
                <CreatePostForm initialInput={`@${params.username}`} />
                <div className={"Panel-Thin"}>
                    <h2>{params.username}</h2>
                    <div className={"Horizontal-Flex-Container Space-Between"}>
                        <div className={"Horizontal-Flex-Container"} ref={followInfoContainer}>
                            <div className={"Hover-Underline"} onClick={handleFollowingClick}>
                                {"Following: "}
                                {!isLoading ? formatNumber(userData.following.length) : "..."}
                            </div>
                            <div className={"Hover-Underline"} onClick={handleFollowerClick}>
                                {"Followers: "}
                                {!isLoading ? formatNumber(userData.followers.length) : "..."}
                            </div>
                            {!isViewingOwnProfile && (
                                <button onClick={isFollowing ? handleUnfollowClick : handleFollowClick}>
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            )}

                        </div>
                        <div className={"profile-date"}>Joined on: {!isLoading && (new Date(userData.user.created_at)).toLocaleDateString()}</div>
                    </div>
                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={['Posts', 'Likes']} />
                </div>

                {isLoading && <div>Loading...</div>}
                {!isLoading && selectedTab === 'Posts' &&
                    (userData.posts.length > 0 ? <PostList posts={userData.posts} /> : <h3 className={"Panel-Thin"}>{params.username} has made no posts</h3>)
                }
                {!isLoading && selectedTab === 'Likes' &&
                    (userData.likedPosts.length > 0 ? <PostList posts={userData.likedPosts} /> : <h3 className={"Panel-Thin"}>{params.username} has liked no posts</h3>)
                }
            </div>

        </div>
        <div className={"mainContainer-right-bar"}>
            <Navbar />
        </div>
        {!isLoading && followerDialogVisible && <Dialog attachedElementRef={followInfoContainer} collapseDialogFunction={() => setFollowerDialogVisible(false)}>
            <h3>Followers: {userData.followers.length}</h3>
            {userData.followers.map(follower => {
                return <Link
                    className={"Dialog-Option Horizontal-Flex-Container Space-Between"}
                    to={`/user/${follower.username}`}
                    state={{user_id: follower.user_id}}
                    key={follower.user_id}
                >
                    {follower.username}
                    <span
                        className={"hidden-right-arrow"}
                    ><FaArrowRight/></span>
                </Link>
            })}
        </Dialog>}
        {!isLoading && followingDialogVisible && <Dialog attachedElementRef={followInfoContainer} collapseDialogFunction={() => setFollowingDialogVisible(false)}>
            <h3>Following: {userData.following.length}</h3>
            {userData.following.map(following => {
                return <Link
                    className={"Dialog-Option Horizontal-Flex-Container Space-Between"}
                    to={`/user/${following.username}`}
                    state={{user_id: following.user_id}}
                    key={following.user_id}
                >
                    {following.username}
                    <span
                        className={"hidden-right-arrow"}
                    ><FaArrowRight/></span>
                </Link>
            })}
        </Dialog>}
    </div>
};

export default UserProfile;