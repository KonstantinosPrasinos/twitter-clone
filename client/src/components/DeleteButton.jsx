import React, { useCallback,useContext,useState } from 'react';
import useDeleteResource from '../hooks/useDeleteResource';
import { FaRegTrashAlt,FaTrashAlt } from "react-icons/fa";
import {AlertContext} from "../context/AlertContext.jsx";
import useLogout from "../hooks/useLogout.jsx";
const DeleteButton = ({ label, resourceType, resourceId }) => {
    const alertContext = useContext(AlertContext);
    const deleteResource = useDeleteResource();
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const {logout} = useLogout();
    const handleDelete = useCallback(async () => {
        try {
            const response = await deleteResource(resourceType, resourceId);
            if (!response.ok) {
                const error = await response.json();
                alertContext.addAlert(error.message);
                if(response.status === 401) await logout(); //Session Expired
            } else {
                alertContext.addAlert(`${resourceType} has been successfully deleted`);
            }
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    }, [deleteResource, resourceType, resourceId]);

    return (
        <button 
            className="Horizontal-Flex-Container Delete-Button" 
            onClick={handleDelete}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
        >
            {isClicked ? <FaTrashAlt /> : isHovered ? <FaTrashAlt /> : <FaRegTrashAlt />}
            <span style={{ fontSize: '17px' }}>{label || 'Delete'}</span>
        </button>
    );
};

export default DeleteButton;
