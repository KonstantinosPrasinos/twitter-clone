import React from 'react';

const PostList = ({posts}) => {
    return (
        <div className="Feed Post-Container">
            {posts.map((post) => (
                <div key={post.isRepost ? `repost_${post.repost_id}` : `post_${post.post_id}`}>
                    <div className="Single-Post-Container">
                        <div>
                            <h2 className={"post-username"}>{post.isRepost ? post.reposted_username : post.username}</h2>
                            <p style={{ fontSize: '16px', fontStyle: 'italic' }}>Said:</p>
                            <p>{post.content}</p>
                            {post.isRepost && <p style={{ fontSize: '16px', fontStyle: 'italic' }}>Repost by: {post.original_username}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;