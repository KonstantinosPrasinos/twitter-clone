import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from "../context/AlertContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

const ViewCommentsForm = ({post_id}) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);



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
          setFormattedFeed(data.posts);
        } else {
          if (response.status === 401) {
            alertContext.addAlert("Session expired. Please log in again.");
            await logout();
          } else {
            alertContext.addAlert("Failed to fetch feed");
          }
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
    <div className="comment-list">
      <h3>Comments:</h3>
      {replies.map((reply) => (
        <div key={reply.replies_id} className="comment-item">
          <p>{reply.content}</p>
          <p>Posted by: {reply.user_id}</p>
          <p>Posted at: {new Date(reply.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewCommentsForm;