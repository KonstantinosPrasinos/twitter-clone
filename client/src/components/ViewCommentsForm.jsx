import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from "../context/AlertContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

const ViewCommentsForm = ({ post_id }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust the formatting as needed
  };

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feed/${userContext.state.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setFeed(data.posts);
        } else {
          if (response.status === 401) {
            alertContext.addAlert("Session expired. Please log in again.");
            await logout();
          } else {
            alertContext.addAlert("Failed to fetch replies");
          }
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
        alertContext.addAlert("Failed to fetch replies");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);


  const filteredReplies = feed.reduce((accumulator, post) => {
    if (post.post_id === post_id && post.replies) {
      accumulator.push(...post.replies);
    }
    return accumulator;
  }, []);

  return (
    <div className={"Vertical-Flex-Container"}>
      <h2 style={{ textAlign: 'left' }}>Replies</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          <div className="Feed Post-Container">
            {filteredReplies.length > 0 ? (
              filteredReplies.map(reply => (
                <div key={reply.created_at}>
                  <div className="Single-Post-Container" key={reply.post_id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {reply.username}
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{formatCreatedAt(reply.created_at)}</span>
                    </div>
                    <p>{reply.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments for this post...yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCommentsForm;
