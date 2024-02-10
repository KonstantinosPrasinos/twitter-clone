import React, { useCallback } from 'react';
import useDeleteResource from './hooks/useDeleteResource';
import { FaTrashAlt } from "react-icons/fa";
import {AlertContext} from "../context/AlertContext.jsx";
const DeleteButton = ({ label, resourceType, resourceId }) => {
    const alertContext = useContext(AlertContext);
    const deleteResource = useDeleteResource();
    const handleDelete = useCallback(async () => {
        try {
            const response = await deleteResource(resourceType, resourceId);
            if (!response.ok) {
                const errorMessage = await response.json();
                alertContext.addAlert(errorMessage);
            } else {
                // Handle successful deletion
            }
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    }, [deleteFunction, resourceType, resourceId]);

    return (
        <button className="Horizontal-Flex-Container Basic-Button" onClick={handleDelete}>
            <FaTrashAlt />
            {label || 'Delete'}
        </button>
    );
};

export default DeleteButton;
