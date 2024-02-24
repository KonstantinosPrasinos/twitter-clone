import { useCallback,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import {AlertContext} from '../context/AlertContext';
const useLogout = () => {
  const alertContext = useContext(AlertContext);
  const navigate  = useNavigate();
  const userContext = useContext(UserContext);
  const logout = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      if (response.ok || response.status===401) {
        userContext.dispatch({type: 'REMOVE_USER'});
        navigate('/Login');
      } else {
        const errorData = await response.json();
        alertContext.addAlert(errorData.error);
      }
    } catch (error) {
      alertContext.addAlert('Error during logout', error);
    }
  }, []);
  return { logout };
};
export default useLogout;
