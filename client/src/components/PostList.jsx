import {Link} from "react-router-dom";

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
              <h2 className={"post-username"}>
                <Link
                    className={"clickable-username"}
                    to={`/user/${post.isRepost ? post.reposted_username : post.username}`}
                    state={{user_id: post.isRepost ? post.reposted_user_id : post.user_id}}
                >
                  {post.isRepost ? post.reposted_username : post.username}
                </Link>
              </h2>
              <p style={{ fontSize: '16px', fontStyle: 'italic' }}>
                {post.isRepost ? `${post.original_username} 'Said:'` : 'Said:'}
                <span style={{ fontSize: '12px',float: 'right' }}>{formatCreatedAt(post.created_at)}</span>
              </p>
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
