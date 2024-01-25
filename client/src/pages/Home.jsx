import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from '../components/LogoutButton';
import ViewPostsForm from "../components/ViewPostsForm.jsx";
import Search from '../components/Search.jsx';
const Home = () => {
    return (
     <div className="mainContainer">
        <div className={"mainContainer-left-bar"}>
        
            <div className={"Vertical-Flex-Container"}>
                <CreatePostForm />
                <ViewPostsForm />
            </div>
        </div>
        <div className={"mainContainer-right-bar Vertical-Flex-Container"}>
            <LogoutButton />
            <Search  maxResults={4}/>
        </div>
     </div>
    );
};

export default Home;