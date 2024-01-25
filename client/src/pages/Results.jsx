import React from 'react';
import Search from '../components/Search.jsx';
import LogoutButton from '../components/LogoutButton.jsx';
const Results = () => {
    return (
        <div className="mainContainer">
            <LogoutButton />
            <div >
                <Search customStyle={{position:'relative', top:  '0',right:'20%', width:'130%'}} maxResults={20}/> 
            </div>
            
        </div>
    );
};

export default Results