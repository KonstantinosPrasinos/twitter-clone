import React from 'react';
import CreatePostForm from "../components/CreatePostForm.jsx";
import LogoutButton from '../components/LogoutButton.jsx';
import Search from '../components/Search.jsx';
const Home = () => {
    return <div className="mainContainer">
        <CreatePostForm />
        <div className={"titleContainer"}>
        </div>
        <div>
            <Search customStyle={{position:'fixed', top:  '0',right:'0', width:'32%'}} maxResults={4}/>
        </div>
        <LogoutButton />
    </div>
};

export default Home;