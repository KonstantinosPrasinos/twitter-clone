import React, { useCallback,useContext,useState } from 'react';
import { FaEdit, FaRegEdit  } from "react-icons/fa";
import {AlertContext} from "../context/AlertContext.jsx";
import useLogout from "../hooks/useLogout.jsx";

const EditButton = ({ label, onUpdate }) => {
    const alertContext = useContext(AlertContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const {logout} = useLogout();
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleInputChange = (event) => {
        setEditedContent(event.target.value);
    };
    const handleUpdateClick = () => {
        onUpdate(editedContent);
        setIsEditing(false);
        setEditedContent(''); 
    };
    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={editedContent} 
                        onChange={handleInputChange} 
                    />
                    <button onClick={handleUpdateClick}>Save</button>
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
                    {isClicked ? <FaEdit /> : isHovered ? <FaEdit/> : <FaRegEdit />}
                    <span style={{ fontSize: '17px' }}>{label || 'Edit'}</span>
                </button>
            )}
        </div>
    );
};
export default EditButton;