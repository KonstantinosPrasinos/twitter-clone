import React, { useEffect, useState} from 'react';
import {withinLimits} from "../functions/withinLimits.js";
import { FaSearch } from 'react-icons/fa';
import PostList from './PostList.jsx';
const maxQueryLength = 50;
const minQueryLength = 1;
const Search = () => {
    const [searchQuery,setSearchQuery] = useState("");
    const [searchResults,setSearchResults] = useState({users: [], posts: []});
    const [error,setError] = useState(null);
    const [activeTab, setActiveTab] = useState('users');

    const handleInput = (e) =>
    {
        const inputQuery = e.target.value;
        if (withinLimits(inputQuery,0,maxQueryLength))
        {
            setSearchQuery(inputQuery);
            setError(null);
        }
        else setError(`Search query can't be more than ${maxQueryLength} characters.`);

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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
            setError(null)
        } 
        catch (error) {
            console.error('Error during search:', error);
        }
    };
    useEffect(() => {
      if (searchQuery === "") {
        setSearchResults({ users: [], posts: [] });
        setError(null);
      } 
      else if (withinLimits(searchQuery, minQueryLength, maxQueryLength)) {
        handleSearch()
        setError(null);
      }
      else setError(`Search query must be between ${minQueryLength} and ${maxQueryLength} characters.`);
  }, [searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="search-container">
      <input className="search-input"
        type="text"
        value={searchQuery}
        onChange={handleInput}
        placeholder="Search Τσίου... "
      />

      <button disabled={!withinLimits(searchQuery, minQueryLength, maxQueryLength)} onClick={handleSearch} >
        <FaSearch />
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div className="results-container">
        <div className="tab-buttons">
          <button onClick={() => handleTabChange('users')}  disabled={activeTab === 'users'}>
            Users
          </button>
          <button onClick={() => handleTabChange('posts')} disabled={activeTab === 'posts'} >
            Posts
          </button>
      </div>
      {activeTab === 'users' && (
        <div>
          <h2>People</h2>
          <ul>
            {searchResults.users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === 'posts' && <PostList posts={searchResults.posts} />}
    </div>
    </div>
  );
};

export default Search;