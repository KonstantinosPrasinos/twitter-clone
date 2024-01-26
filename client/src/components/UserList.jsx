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
                <p>Email: {user.email}</p>
                <div className="profile-date">Joined on: {formatCreatedAt(user.created_at)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default UserList;