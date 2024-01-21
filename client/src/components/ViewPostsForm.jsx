import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from "../context/AlertContext.jsx";
import {UserContext} from "../context/UserContext.jsx";
import PostList from "./PostList.jsx";

const ViewPostsForm = () => {
  const [formattedFeed, setFormattedFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feed`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userContext.state.user_id}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setFormattedFeed(data.posts);
        } else {
          alertContext.addAlert("Failed to fetch feed");
        }
      } catch (error) {
        console.error('Error fetching feed:', error);
        alertContext.addAlert("Failed to fetch feed");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className={"Vertical-Flex-Container"}>
      <h2 style={{ textAlign: 'left' }}>Recommended Posts</h2>
      {loading && <p>Loading...</p>}
      {!loading && <PostList posts={formattedFeed} />}
    </div>
  );
};

export default ViewPostsForm;