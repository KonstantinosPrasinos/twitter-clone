import React, { useCallback,useContext,useState } from 'react';
import { FaEdit, FaRegEdit, FaRegSave} from "react-icons/fa";
import {AlertContext} from "../context/AlertContext.jsx";
import useLogout from "../hooks/useLogout.jsx";

const EditButton = ({ label, initialContent, id,resource }) => {
    const alertContext = useContext(AlertContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(initialContent);
    const [isHovered, setIsHovered] = useState(false);
    const {logout} = useLogout();
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleInputChange = (event) => {
        setEditedContent(event.target.value);
    };
    const handleUpdateClick = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${resource}/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_content: editedContent }),
                credentials: 'include'
            });

            const responseData = await response.json();

            if (response.ok) {
                alertContext.addAlert(responseData.message);
            } else {
                alertContext.addAlert(responseData.message);
                if (response.status === 401) await logout();
            }
        } catch (error) {
            alertContext.addAlert('Error editing post. Please try again later.', 'error');
        } finally {
            setIsEditing(false);
            setEditedContent('');
        }
    }, [editedContent, resource,id, alertContext]);
    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        className="search-input"
                        value={editedContent} 
                        onChange={handleInputChange} 
                    />
                    <button
                        className="Save-Button"  
                        onClick={handleUpdateClick}>
                        <FaRegSave />
                        <span style={{ fontSize: '19px' }}> Save</span>
                    </button>
                </div>
            ) : (
                <button 
                    className="Horizontal-Flex-Container Edit-Button" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseDown={() => setIsClicked(true)}
                    onMouseUp={() => setIsClicked(false)}
                    onClick={handleEditClick}
                >
                    {isEditing ? <FaEdit /> : isHovered ? <FaEdit/> : <FaRegEdit />}
                    <span style={{ fontSize: '17px' }}>{label || 'Edit'}</span>
                </button>
            )}
        </div>
    );
};
export default EditButton;