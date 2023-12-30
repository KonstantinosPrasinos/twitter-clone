import React from 'react'
import useLogout from '../hooks/useLogout';
const LogoutButton = () => {
    const { logout } = useLogout();
  
    return (
      <button onClick={logout}>
        Logout
      </button>
    );
  };
export default LogoutButton;  