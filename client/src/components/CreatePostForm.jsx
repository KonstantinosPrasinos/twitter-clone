import React, {useContext, useEffect, useRef, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";

const maxPostLength = 280;

const CreatePostForm = () => {
    const userContext = useContext(UserContext);
    const [postContent, setPostContent] = useState("");
    const textAreaRef = useRef();

    const handleChange = (event) => {
        if (event.target.value.length <= maxPostLength) {
            setPostContent(event.target.value);

            // Set height
            event.target.style.height = "0px";
            const scrollHeight = event.target.scrollHeight;
            event.target.style.height = `${scrollHeight}px`;
        }
    }

    const handlePost = () => {

    }

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = `${scrollHeight}px`;
        }
    }, []);

    return (
        <div>
            <div>{userContext.state?.username ?? "JohnCena"}</div>
            <textarea value={postContent} rows={1} onChange={handleChange} ref={textAreaRef} />
            <div>
                <button onClick={handlePost}>Post</button>
            </div>
        </div>
    );
};

export default CreatePostForm;