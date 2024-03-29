import {Link,useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart, FaRetweet} from "react-icons/fa";
import {useCallback, useContext, useRef, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import useLogout from "../hooks/useLogout.jsx";
import {AlertContext} from "../context/AlertContext.jsx";
import {formatNumber} from "../functions/formatNumber.js";
import {debounce} from "../functions/debounce.js";
import DeleteButton from "../components/DeleteButton.jsx";
import MoreButtonWithDialog from "../components/MoreButtonWithDialog.jsx";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // Adjust the formatting as needed
};

const PostList = ({ posts }) => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const [formattedPosts, setFormattedPosts] = useState(posts);

  const likeChanges = useRef({});
  const postsBeforeLikeChanges = useRef([]);
  const repostChanges = useRef({});
  const postsBeforeRepostChanges = useRef([]);

  const {logout} = useLogout();
  const navigate = useNavigate();

  const handleLikeRequest = useCallback(debounce(async () => {
    if (!likeChanges.current) return;

    for (const postId in likeChanges.current) {
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
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/unlike/${postId}`, {
          method: 'DELETE',
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

  const handleRepostRequest = useCallback(debounce(async () => {
    if (!repostChanges.current) return;

    for (const postId in repostChanges.current) {
      const {newValue: hasRepostedPost} = repostChanges.current[postId];

      let response;

      // Make the like/unlike request to the server.
      if (hasRepostedPost) {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/repost`, {
          method: 'POST',
          body: JSON.stringify({user_id: userContext.state?.user_id, post_id: parseInt(postId)}),
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/unrepost/${postId}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
          alertContext.addAlert("Session expired. Please log in again.");
          await logout();
        }

        if (hasRepostedPost) {
          alertContext.addAlert("Failed to repost");
        } else {
          alertContext.addAlert("Failed to remove repost");
        }

        // Reset post data to previous values
        setFormattedPosts(postsBeforeRepostChanges.current);
      }

      postsBeforeRepostChanges.current = [];
      repostChanges.current = {};
    }
  }), [])

  const handlePostLike = async (postId) => {
    let hasLikedPost = null;

    // Create a copy of the posts before the interaction is handled in case the interaction must be undone
    if (!postsBeforeLikeChanges.current.length) {
      postsBeforeLikeChanges.current = [...formattedPosts]
    }

    // Add (or remove) the like to the post optimistically
    const newPosts = formattedPosts.map(currentPost => {
      // If it's not the interacted post return it
      if (currentPost.post_id !== postId || currentPost.isRepost) {
        return currentPost
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

  const handlePostRepost = async (postId) => {
    let hasRepostedPost = null;

    if (!postsBeforeRepostChanges.current) {
      postsBeforeRepostChanges.current = [...formattedPosts]
    }

    const newPosts = formattedPosts.map(currentPost => {
      if (currentPost.post_id !== postId || currentPost.isRepost) {
        return currentPost;
      }

      if (currentPost.repostedByUser) {
        hasRepostedPost = false;
        return {...currentPost, repostedByUser: false, repostsCount: currentPost.repostsCount - 1}
      } else {
        hasRepostedPost = true;
        return {...currentPost, repostedByUser: true, repostsCount: currentPost.repostsCount + 1}
      }
    })

    setFormattedPosts(newPosts)
    
    if (repostChanges.current.hasOwnProperty(postId)) {
      if (repostChanges.current[postId].initialValue === hasRepostedPost) {
        delete repostChanges.current[postId];
      } else {
        repostChanges.current[postId].newValue = hasRepostedPost;
      }

    } else {
      repostChanges.current[postId] = {initialValue: !hasRepostedPost, newValue: hasRepostedPost}
    }
    
    handleRepostRequest();
  }

  const handleClick = (post_id) => {
    navigate("/comments", { state: { post_id: post_id, posts: formattedPosts } });
  };


  return (
    <div className="Feed Post-Container">
      {formattedPosts.map((post) => (
        <div key={post.isRepost ? `repost_${post.repost_id}` : `post_${post.post_id}`}>
          <div className="Single-Post-Container">
            <div>
              <h2 className={"post-username"}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link
                    className={"clickable-username"}
                    to={`/user/${post.isRepost ? post.reposted_username : post.username}`}
                    state={{ user_id: post.isRepost ? post.reposted_user_id : post.user_id }}
                  >
                    {post.isRepost ? post.reposted_username : post.username}
                  </Link>
                  {post.user_id === userContext.state?.user_id && (
                    <MoreButtonWithDialog>
                      <DeleteButton label="Delete post" resourceType={"post"} resourceId={post.post_id} />
                    </MoreButtonWithDialog>
                  )}
                </div>
              </h2>
              <p style={{ fontSize: '16px', fontStyle: 'italic' }}>
                {post.isRepost && (
                  <span>
                    <Link
                      className={"clickable-username"}
                      to={`/user/${post.original_username}`}
                      state={{ user_id: post.original_user_id }}
                    >
                      {post.original_username}
                    </Link>
                    {" "}said:
                  </span>
                )}
                {!post.isRepost && <span>Said:</span>}
              </p>
              <p>{post.content}</p>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{formatCreatedAt(post.created_at)}</span>
              {post.isRepost && <p style={{ fontSize: '16px', fontStyle: 'italic' }}>#Repost</p>}
              {!post.isRepost && (
                <div className={"Horizontal-Flex-Container"}>
                  <button
                    className={`
                Horizontal-Flex-Container
                Basic-Button
                Heart-Button
                ${post?.likes && post.likes.map(like => like.username).includes(userContext.state?.username) ? "post-action-completed" : ""}`
                    }
                    onClick={() => handlePostLike(post.post_id)}
                  >
                    {!post?.likes && <><FaRegHeart /> <span className={"Align-Text-Center"}>0</span></>}
                    {post?.likes && (
                      <>
                        {post.likes.map(like => like.username).includes(userContext.state?.username) ? <FaHeart /> : <FaRegHeart />}
                        <span className={"Align-Text-Center"}>{formatNumber(post.likes.length)}</span>
                      </>
                    )}
                  </button>
                  <button
                    className={`
                Horizontal-Flex-Container
                Basic-Button
                ${!post.isRepost && post.repostedByUser ? "post-action-completed" : ""}`
                    }
                    onClick={() => handlePostRepost(post.post_id)}
                  >
                    <FaRetweet />
                    <span className={"Align-Text-Center"}>{post.repostsCount ? formatNumber(post.repostsCount) : 0}</span>
                  </button>
                  <button className="Horizontal-Flex-Container Basic-Button" onClick={() => handleClick(post.post_id)}>
                    {post.replies && post.replies.length > 0 ? <FaComment style={{ color: 'var(--accent-color)' }} /> : <FaRegComment />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
