import React from 'react';
import {useNavigate} from "react-router-dom";
import CreateCommentForm from "../components/CreateCommentForm.jsx";
import ViewCommentsForm from "../components/ViewCommentsForm.jsx";


const Home = (post_id) => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/Home");
    };



    return <div className="mainContainer">
        <div className={"mainContainer-left-bar"}>
            <div className={"Vertical-Flex-Container"}>
                <CreateCommentForm />
                <ViewCommentsForm />
            </div>
        </div>
        <div className={"mainContainer-right-bar Vertical-Flex-Container"}>
            <button onClick={handleBack}>Back to Posts.</button>
        </div>
    </div>
};

export default Home;