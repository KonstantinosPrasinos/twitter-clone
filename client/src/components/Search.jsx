import React, { useEffect, useState} from 'react';
import {withinLimits} from "../functions/withinLimits.js";
const maxQueryLength = 50;
const minQueryLength = 0;
const Search = () => {
    const [searchQuery,setSearchQuery] = useState("");
    const [searchResults,setSearchResults] = useState({users: [], posts: []});
    const [error,setError] = useState(null);

    const handleInput = (e) =>
    {
        const inputQuery = e.target.value;
        if (withinLimits(inputQuery,minQueryLength,maxQueryLength))
        {
            setSearchQuery(inputQuery);
            setError(null);
        }
        else setError(`Search query must be between ${minQueryLength} and ${maxQueryLength} characters.`);

    };

    const handleSearch = async () =>{
        try{
            const response =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/search`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery }),
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
        if (withinLimits(searchQuery, minQueryLength, maxQueryLength)) {
            handleSearch();
            setError(null);
        }
        else setError(`Search query must be between ${minQueryLength} and ${maxQueryLength} characters.`);
    }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInput}
        placeholder="Awesome Search... "
      />

      <button onClick={handleSearch}>Search</button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        <h2>Users</h2>
        <ul>
          {searchResults.users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Posts</h2>
        <ul>
          {searchResults.posts.map((post) => (
            <li key={post.id}>
              <p>{post.content}</p>
              <p>Author: {post.users.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;