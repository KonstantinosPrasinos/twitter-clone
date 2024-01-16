import { useCallback,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
const useLogout = () => {
  const navigate  = useNavigate();
  const userContext = useContext(UserContext);
  const logout = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      if (response.ok) {
        userContext.dispatch({type: 'REMOVE_USER'});
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
