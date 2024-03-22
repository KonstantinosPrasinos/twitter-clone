import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import CreateCommentForm from "../components/CreateCommentForm.jsx";
import ViewCommentsForm from "../components/ViewCommentsForm.jsx";
import { FaHome } from "react-icons/fa";

const Comments = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [post_id, setPostId] = useState(state?.post_id);
    const [posts, setPosts] = useState(state?.posts); 

    const handleHomeClick = () => {
        navigate("/");
    }

    return (
        <div className="mainContainer">
            <div className={"mainContainer-left-bar"}>
                <div className={"Vertical-Flex-Container"}>
                    <CreateCommentForm post_id={post_id} />
                    <ViewCommentsForm post_id={post_id} posts={posts} />
                </div>
            </div>
            <div className={"mainContainer-right-bar"}>
                <nav className={"Vertical-Flex-Container Big-Gap"}>
                    <button className={"Horizontal-Flex-Container logout-button"} onClick={handleHomeClick}>
                        <FaHome />
                        Back
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Comments;
