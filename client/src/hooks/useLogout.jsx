import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  const navigate  = useNavigate();
  const logout = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      if (response.ok) {
        navigate('/Login');
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);
  return { logout };
};
export default useLogout;
