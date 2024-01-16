import React, { useContext,useState, useEffect } from 'react';
import {UserContext} from "../context/UserContext.jsx";


const ViewPostsForm = () => {

    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const userContext = useContext(UserContext);
    const [userID, setUserID] = useState('');

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feed`, {
   
                    method: 'POST',
                body: JSON.stringify({userId: userContext.state?.id, userID}),
                headers: {'Content-Type': 'application/json'}
                });

                if (response.data.success) {
                    setFeed(response.data.posts);
                } else {
                    console.error('Failed to fetch feed:', response.data.message);
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
        <div className={"Panel feed-container"}>
            <h1>Posts</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {feed.map((post) => (
                        <div key={post.isRepost ? post.repost_id : post.post_id}>
                            <h2>{post.username}</h2>
                            <p>{post.content}</p>
                            {/* Render likes, replies, etc.  */}
                            {post.isRepost && <p>Reposted by: {post.reposted_username}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewPostsForm;

