import React from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import CreateCommentForm from "../components/CreateCommentForm.jsx";
import ViewCommentsForm from "../components/ViewCommentsForm.jsx";


const Comments = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const post_id = state?.post_id;


    const handleBack = () => {
        navigate("/Home");
    };



    return (
        <div className="mainContainer">
            <div className={"mainContainer-left-bar"}>
                <div className={"Vertical-Flex-Container"}>
                    <CreateCommentForm post_id={post_id} />
                    <ViewCommentsForm post_id={post_id} />
                </div>
            </div>
            <div className={"mainContainer-right-bar Vertical-Flex-Container"}>
                <button onClick={handleBack}>Back to Posts.</button>
            </div>
        </div>
    );
};

export default Comments;