const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // Adjust the formatting as needed
};

const PostList = ({ posts }) => {
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
