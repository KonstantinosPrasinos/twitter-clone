import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from '../components/LogoutButton';
import ViewPostsForm from "../components/ViewPostsForm.jsx";

const Home = () => {
    return <div className="mainContainer">
        <div className={"mainContainer-left-bar"}>
            <div className={"Vertical-Flex-Container"}>
                <CreatePostForm />
                <ViewPostsForm />
            </div>
        </div>
        <div className={"mainContainer-right-bar Vertical-Flex-Container"}>
            <LogoutButton />
        </div>
    </div>
};

export default Home;