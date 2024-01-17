import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from "../context/AlertContext.jsx";
import {UserContext} from "../context/UserContext.jsx";

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
  }, [alertContext]);

  return (
    <div>
      <h1>Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {formattedFeed.map((post) => (
            <div key={post.isRepost ? post.repost_id : post.post_id}>
              <h2>{post.isRepost ? post.reposted_username : post.username}</h2>
              <p>{post.content}</p>
              {post.isRepost && <p>Original User: {post.original_username}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPostsForm;
