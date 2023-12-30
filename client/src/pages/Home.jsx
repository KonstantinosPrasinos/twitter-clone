import React from 'react';
import LogoutButton from '../components/LogoutButton';
const Home = () => {
    return <div className="mainContainer">
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