import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const { loggedIn, email } = props
    const navigate = useNavigate();

    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
    </div>
};

export default Home;