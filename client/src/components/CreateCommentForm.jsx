import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";

const CreateCommentForm = () => {
    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);
    const [commentContent, setCommentContent] = useState("");


    const handleInput = (event) => {
       
    }


    const handleComment = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
            method: 'POST',
            body: JSON.stringify({userId: userContext.state?.user_id, postContent}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if (!response.ok) {
            alertContext.addAlert("Failed to create comment");
        } else {
            alertContext.addAlert("Comment created successfully");
            setCommentContent("");

        }
    }


    return ( 
        <div className={"create-post-container"}>

        </div>
     );
}
 
export default CreateCommentForm;