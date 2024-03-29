import React, { useContext,useEffect, useState} from 'react';
import {withinLimits} from "../functions/withinLimits.js";
import { FaSearch } from 'react-icons/fa';
import PostList from './PostList.jsx';
import UserList from './UserList.jsx';
import Tabs from './Tabs.jsx';
import {AlertContext} from "../context/AlertContext.jsx";
import useLogout from "../hooks/useLogout.jsx";
import { useNavigate } from 'react-router-dom';
const maxQueryLength = 50;
const minQueryLength = 1;

const Search = ({customStyle,maxResults}) => {
    const [searchQuery,setSearchQuery] = useState("");
    const [searchResults,setSearchResults] = useState({users: [], posts: []});
    const [error,setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Users');
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const {logout} = useLogout();
    const handleInput = (e) =>
    {
        const inputQuery = e.target.value;
        if (withinLimits(inputQuery,0,maxQueryLength))
        {
            setSearchQuery(inputQuery);
            setError(null);
        }
        else  alertContext.addAlert(`Search query can't be more than ${maxQueryLength} characters.`);
    };
    const modifyPostResults = (postResults) => {
      if (postResults) {
        // Modify the posts in the search results to include the author's username directly
        const modifiedPosts = postResults.map(post => ({
          post_id: post.post_id,
          user_id: post.user_id,
          content: post.content,
          created_at: post.created_at,
          username: post.users.username,
        }));
    
        // Return the modified search results
        return modifiedPosts;
      }
    
      return null;
    };

    const handleSearch = async () =>{
        try{
            const response =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/search?searchQuery=${encodeURIComponent(searchQuery)}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!response.ok) {
              if (response.status === 401) {
                alertContext.addAlert('User session has expired. Please sign in');
                await useLogout();
              } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
                await logout();
              }
            }
            const data = await response.json();
            setSearchResults(data);
            setError(null)
        } 
        catch (error) {
            alertContext.addAlert('An error occurred during the search. Please try again later.');
        }
    };
    const handleButtonSearch =  () => {
    
      navigate('/results');

    }
    useEffect(() => {
      if (searchQuery === "") {
        setSearchResults({ users: [], posts: [] });
        setError(null);
      } 
      else if (withinLimits(searchQuery, minQueryLength, maxQueryLength)) {
        handleSearch();
        setError(null);
      }
      else alertContext.addAlert(`Search query must be between ${minQueryLength} and ${maxQueryLength} characters.`);
  }, [searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // Post results need to fit the PostList structure where posts have a username property that represents author
  const modifiedPostResults = modifyPostResults(searchResults.posts);
  return (
    
    <div style={customStyle}>
     <div className='Horizontal-Flex-Container'>
      <input className="search-input"
        type="text"
        value={searchQuery}
        onChange={handleInput}
        placeholder="Search EchoTexts... "
      />
    
      <button disabled={!withinLimits(searchQuery, minQueryLength, maxQueryLength)} onClick={handleButtonSearch} >
        <FaSearch />
      </button>
     </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <Tabs selectedTab={activeTab} setSelectedTab={handleTabChange} tabs={['Users','Posts']} />
      <div className="results-container" >
        {activeTab === 'Users' && searchResults.users && (
          <UserList users={searchResults.users.slice(0,Math.min(searchResults.users.length, maxResults))} />
        )}
        {activeTab === 'Posts' && modifiedPostResults && (
          <PostList posts={modifiedPostResults.slice(0,Math.min(modifiedPostResults.length,maxResults))} />
        )}
      </div>
  </div>
  );
};

export default Search;