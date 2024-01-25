import React from 'react';
import Search from '../components/Search.jsx';
import LogoutButton from '../components/LogoutButton.jsx';
const Results = () => {
    return (
        <div className="mainContainer">
            <div className={"mainContainer-left-bar "}>
                <Search  maxResults={20}/> 
            </div>
            <div className={"mainContainer-right-bar Vertical-Flex-Container"}>
                <LogoutButton />
            </div>
            
        </div>
    );
};

export default Results