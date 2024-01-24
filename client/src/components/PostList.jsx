import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // Adjust the formatting as needed
};

const PostList = ({ posts }) => {
  const userContext = useContext(UserContext);

  const [formattedPosts, setFormattedPosts] = useState(posts);

  const handlePostLike = (postId, isRepost) => {
    let hasLikedPost = null;

    setFormattedPosts(currentPosts => currentPosts.map(currentPost => {
      // If it's not the interacted post return it
      if (isRepost) {
        if (currentPost.repost_id !== postId) return currentPost;
      } else {
        if (currentPost.isRepost || currentPost.post_id !== postId) return currentPost;
      }

      // If it is the interacted post
      if (!currentPost.likes) {
        // Post has no likes, so add a like to the client and then to the server
        hasLikedPost = true;
        return {...currentPost, likes: [{user_id: userContext.state.user_id, username: userContext.state.username}]}
      } else {
        // Post has likes
        if (currentPost.likes.map(like => like.user_id).includes(userContext.state.user_id)) {
          // Post had it's like by the user removed
          hasLikedPost = false;
          return {...currentPost, likes: currentPost.likes.filter(like => like.username !== userContext.state.username)}
        } else {
          // Post had a like add by the user
          hasLikedPost = true;
          return {...currentPost, likes: [...currentPost.likes, {user_id: userContext.state.user_id, username: userContext.state.username}]}
        }
      }
    }))

    if (hasLikedPost === null) return;

    if (hasLikedPost) {
      // Send like request to server
    } else {
      // Send remove like request to server
    }
  }

  return (
    <div className="Feed Post-Container">
      {formattedPosts.map((post) => (
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
              <div className={"Horizontal-Flex-Container"}>
                <button
                    className={`
                      Horizontal-Flex-Container
                      Basic-Button
                      ${post.likes.map(like => like.username).includes(userContext.state?.username) ? "post-action-completed" : ""}`
                    }
                    onClick={() => handlePostLike(post.isRepost ? post.repost_id : post.post_id, post.isRepost)}>
                  {!post?.likes && <><FaRegHeart /> <span className={"Align-Text-Center"}>0</span></>}
                  {post?.likes && <>
                    {post.likes.map(like => like.username).includes(userContext.state?.username) ? <FaHeart /> : <FaRegHeart />}
                    <span className={"Align-Text-Center"}>{post.likes.length}</span>
                  </>}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
