import React from 'react';
import Search from '../components/Search.jsx';
import LogoutButton from '../components/LogoutButton.jsx';
const Results = () => {
    return (
        <div className="mainContainer">
            <LogoutButton />
            <div >
                <Search isHomePage={false} maxResults={20}/> 
            </div>
            
        </div>
    );
};

export default Results