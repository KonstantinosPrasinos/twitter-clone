import React from 'react'
import useLogout from '../hooks/useLogout';
import { FaRightFromBracket } from "react-icons/fa6";

const LogoutButton = () => {
    const {logout} = useLogout();

    return (
        <button className={"Horizontal-Flex-Container logout-button"} onClick={logout}>
            <FaRightFromBracket />
            Logout
        </button>
    );
};
export default LogoutButton;  