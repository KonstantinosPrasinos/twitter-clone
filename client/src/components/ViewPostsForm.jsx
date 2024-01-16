import React, { useContext,useState, useEffect } from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";

const ViewPostsComponent = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({userId: userContext.state?.id, formattedFeed}),
        });

        if (response.ok) {
          const data = await response.json();
          setFeed(data.posts);
        } else {
            alertContext.addAlert('Failed to fetch feed:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {feed.map((post) => (
            <div key={post.isRepost ? post.repost_id : post.post_id}>
              <h2>{post.username}</h2>
              <p>{post.content}</p>
              {post.isRepost && <p>Reposted by: {post.reposted_username}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPostsComponent;
