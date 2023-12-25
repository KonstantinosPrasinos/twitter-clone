import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";

const Home = () => {
    return <div className="mainContainer">
        <CreatePostForm />
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
    </div>
};

export default Home;