import {Link} from "react-router-dom";
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
                <h3 className={"post-username"}>
                  <Link
                      className={"clickable-username"}
                      to={`/user/${user.username}`}
                      state={{user_id: user.user_id}}
                  >
                    {user.username}
                  </Link>
                </h3>
                <p>Email: {user.email}</p>
                <div className="profile-date">Joined on: {formatCreatedAt(user.created_at)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default UserList;