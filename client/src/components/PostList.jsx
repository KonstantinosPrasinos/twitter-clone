import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useCallback, useContext, useRef, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import useLogout from "../hooks/useLogout.jsx";
import {AlertContext} from "../context/AlertContext.jsx";
import {formatNumber} from "../functions/formatNumber.js";
import {debounce} from "../functions/debounce.js";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // Adjust the formatting as needed
};

const PostList = ({ posts }) => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const likeChanges = useRef({});
  const postsBeforeLikeChanges = useRef([]);

  const {logout} = useLogout();

  const [formattedPosts, setFormattedPosts] = useState(posts);

  const handleLikeRequest = useCallback(debounce(async () => {
    if (!likeChanges.current) return;

    for (const postId in likeChanges.current) {
      console.log("making requests")
      const {newValue: hasLikedPost} = likeChanges.current[postId];

      let response;

      // Make the like/unlike request to the server.
      if (hasLikedPost) {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/like`, {
          method: 'POST',
          body: JSON.stringify({user_id: userContext.state?.user_id, post_id: parseInt(postId)}),
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/unlike`, {
          method: 'POST',
          body: JSON.stringify({user_id: userContext.state?.user_id, post_id: parseInt(postId)}),
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
          alertContext.addAlert("Session expired. Please log in again.");
          await logout();
        }

        if (hasLikedPost) {
          alertContext.addAlert("Failed to add like to post");
        } else {
          alertContext.addAlert("Failed to remove the like from the post");
        }

        // Reset post data to previous values
        setFormattedPosts(postsBeforeLikeChanges.current);
      }

      postsBeforeLikeChanges.current = [];
      likeChanges.current = {};
    }
  }), [])

  const handlePostLike = async (postId, isRepost) => {
    let hasLikedPost = null;

    // Create a copy of the posts before the interaction is handled in case the interaction must be undone
    if (!postsBeforeLikeChanges.current.length) {
      postsBeforeLikeChanges.current = [...formattedPosts]
    }

    // Add (or remove) the like to the post optimistically
    const newPosts = formattedPosts.map(currentPost => {
      // If it's not the interacted post return it
      if (isRepost) {
        if (currentPost.repost_id !== postId) return currentPost;
      } else {
        if (currentPost.isRepost || currentPost.post_id !== postId) {
          return currentPost
        }
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
    })

    setFormattedPosts(newPosts);

    if (hasLikedPost === null) return;

    if (likeChanges.current.hasOwnProperty(postId)) {
      if (likeChanges.current[postId].initialValue === hasLikedPost) {
        delete likeChanges.current[postId];
      } else {
        likeChanges.current[postId].newValue = hasLikedPost;
      }

    } else {
      likeChanges.current[postId] = {initialValue: !hasLikedPost, newValue: hasLikedPost}
    }

    handleLikeRequest();
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
                      ${post?.likes && post.likes.map(like => like.username).includes(userContext.state?.username) ? "post-action-completed" : ""}`
                    }
                    onClick={() => handlePostLike(post.isRepost ? post.repost_id : post.post_id, post.isRepost)}>
                  {!post?.likes && <><FaRegHeart /> <span className={"Align-Text-Center"}>0</span></>}
                  {post?.likes && <>
                    {post.likes.map(like => like.username).includes(userContext.state?.username) ? <FaHeart /> : <FaRegHeart />}
                    <span className={"Align-Text-Center"}>{formatNumber(post.likes.length)}</span>
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
