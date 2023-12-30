import React from 'react';

const Home = () => {
    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
            <LogoutButton />
        </div>
    </div>
};

export default Home;