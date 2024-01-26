import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // Adjust the formatting as needed
};

const PostList = ({ posts }) => {

  const navigate = useNavigate();

  const handleClick = (post_id) => {
    navigate("/Comments/${post_id}");
  };

  return (
    <div className="Feed Post-Container">
      {posts.map((post) => (
        <div key={post.isRepost ? `repost_${post.repost_id}` : `post_${post.post_id}`}>
          <div className="Single-Post-Container">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className={"post-username"}>{post.isRepost ? post.reposted_username : post.username}</h2>
                <span style={{ fontSize: '12px',fontWeight: 'bold' }}>{formatCreatedAt(post.created_at)}</span>
              </div>
              <p style={{ fontSize: '16px', fontStyle: 'italic' }}>{post.isRepost ? `${post.original_username} 'Said:'` : 'Said:'}</p>
              <p>{post.content}</p>
              {post.isRepost && <p style={{ fontSize: '16px', fontStyle: 'italic' }}>#Repost</p>}
              {<button onClick={handleClick}>Comments</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
