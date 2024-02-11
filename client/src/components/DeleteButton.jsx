import React, { useCallback,useContext } from 'react';
import useDeleteResource from '../hooks/useDeleteResource';
import { FaRegTrashAlt } from "react-icons/fa";
import {AlertContext} from "../context/AlertContext.jsx";
const DeleteButton = ({ label, resourceType, resourceId }) => {
    const alertContext = useContext(AlertContext);
    const deleteResource = useDeleteResource();
    const handleDelete = useCallback(async () => {
        try {
            const response = await deleteResource(resourceType, resourceId);
            if (!response.ok) {
                const error = await response.json();
                alertContext.addAlert(error.message);
            } else {
                alertContext.addAlert("Post Successfuly deleted");
            }
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    }, [deleteResource, resourceType, resourceId]);

    return (
        <button className="Horizontal-Flex-Container Delete-Button" onClick={handleDelete}>
            <FaRegTrashAlt />
            {label || 'Delete'}
        </button>
    );
};

export default DeleteButton;
