const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust the formatting as needed
  };
  
  const UserList = ({ users }) => {
    return (
      <div className="Feed Post-Container">
        {users.map((user) => (
          <div key={user.user_id}>
            <div className="Single-Post-Container">
              <div>
                <h2 className={"post-username"}>{user.username}</h2>
                {user.email}
                <p style={{ fontSize: '16px', fontStyle: 'italic' }}>
                  <span style={{ fontSize: '12px',float: 'right' }}>{formatCreatedAt(user.created_at)}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default UserList;