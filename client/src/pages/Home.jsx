import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from '../components/LogoutButton';
import ViewPostsForm from "../components/ViewPostsForm.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
    return <div className="mainContainer">
        <CreatePostForm />
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
        <LogoutButton />
        <ViewPostsForm />
    </div>
};

export default Home;