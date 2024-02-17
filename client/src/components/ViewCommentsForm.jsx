import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { AlertContext } from '../context/AlertContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { MdDelete } from "react-icons/md";

const ViewCommentsForm = ({ post_id, posts }) => {
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust the formatting as needed
  };

  const filteredReplies = posts.reduce((accumulator, post) => {
    if ((post.post_id === post_id || post.repost_id === post_id) && post.replies) {
      accumulator.push(...post.replies);
    }
    return accumulator;
  }, []);

  const handleDeleteClick = async (reply_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/unreply/${reply_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.state.user_id}`,
        },
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
      <div>
        <div className="Feed Post-Container">
          {filteredReplies.length > 0 ? (
            filteredReplies.map(reply => (
              <div key={reply.created_at}>
                <div className="Single-Post-Container" key={reply.post_id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Link to user profile */}
                    <Link
                      className={"clickable-username"}
                      to={`/user/${reply.username}`}
                      state={{ user_id: reply.user_id }}
                    >
                      <h2>{reply.username}</h2>
                    </Link>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{formatCreatedAt(reply.created_at)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>{reply.content}</p>
                    {userContext.state.user_id === reply.user_id && (
                      <button className="Horizontal-Flex-Container logout-button"
                        onClick={() => handleDeleteClick(reply.reply_id)}>
                        <MdDelete />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No comments for this post...yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCommentsForm;
