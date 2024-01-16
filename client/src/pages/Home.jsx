import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from '../components/LogoutButton';

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
    </div>
};

export default Home;