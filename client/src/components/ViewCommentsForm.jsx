import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from '../context/AlertContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const ViewCommentsForm = ({ post_id }) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

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
          console.log("Post ID:", post_id);
        } else {
          if (response.status === 401) {
            alertContext.addAlert('Session expired. Please log in again.');
            await logout();
          } else {
            alertContext.addAlert('Failed to fetch replies');
          }
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
        alertContext.addAlert('Failed to fetch replies');
      } finally {
        setLoading(false);
      }
    };

    if (userContext.state.user_id) {
      fetchFeed();
      console.log(userContext.state.user_id);
    }
  }, [userContext.state.user_id, alertContext, post_id]);

  const filteredReplies = feed.reduce((accumulator, post) => {
    if ((post.post_id === post_id || post.repost_id === post_id) && post.replies) {
      accumulator.push(...post.replies);
    }
    return accumulator;
  }, []);

  const handleDeleteClick = async (reply_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/unreply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.state.user_id}`,
        },
        body: JSON.stringify({
          user_id: userContext.state.user_id,
          reply_id: reply_id,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        alertContext.addAlert(`Reply deleted successfully.`);
      } else {
        alertContext.addAlert('Failed to delete reply.');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      alertContext.addAlert('Failed to delete reply.');
    }
  };

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
                      <h2>{reply.username}</h2>
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{formatCreatedAt(reply.created_at)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p>{reply.content}</p>
                      <button onClick={() => handleDeleteClick(reply.reply_id)}>Delete</button>
                      
                    </div>
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
};

export default ViewCommentsForm;
