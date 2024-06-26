import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {AlertContext} from "../context/AlertContext.jsx";
import {  useNavigate } from 'react-router-dom';

const maxPostLength = 280;

const saveSelection = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    return range.startOffset;
}

const restoreSelection = (node, offset) => {
    const selection = window.getSelection();
    selection.removeAllRanges();

    const localOffset = offset > 280 ? 280 : offset;

    const range = document.createRange();
    range.setStart(node.childNodes[0], localOffset);
    range.setEnd(node.childNodes[0], localOffset);

    selection.addRange(range);
}
const CreateCommentForm = ({post_id,initialInput = ""}) => {
    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);
    const [content, setContext] = useState(initialInput);
    const navigate = useNavigate();

    const textAreaRef = useRef();
    const dummyTextAreaRef = useRef();
    const contentContainerRef = useRef();

    const handleInput = (event) => {
        let text = event.target.innerText;

        if (text.length <= maxPostLength) {
            setContext(text);

            // Set height of containers for when lines are more than one
            event.target.style.height = "0px";
            const scrollHeight = event.target.scrollHeight;

            event.target.style.height = `${scrollHeight}px`;
            dummyTextAreaRef.current.style.height = `${scrollHeight}px`;
            contentContainerRef.current.style.height = `${scrollHeight}px`;
        } else {
            // Get caret position
            const offset = saveSelection();

            // Change the text
            event.target.innerText = text = event.target.innerText.substring(0, maxPostLength);

            // Restore the caret to end of text
            restoreSelection(textAreaRef.current, offset);
        }

        if (text.length === 0) {
            dummyTextAreaRef.current.innerHTML = '<span class="dummy-placeholder">Write a Comment</span>';
        } else {
            dummyTextAreaRef.current.innerHTML = text.replaceAll(/@[a-zA-Z_0-9]+|#\w+/gi, (value) => {
                return `<span class="dummy-highlighted">${value}</span>`;
            });
        }
    }

    const remainingCharacters = useMemo(() => {
        if (!textAreaRef.current?.innerText) return "";
        if (maxPostLength - textAreaRef.current.innerText.length < 0.1 * maxPostLength)
            return maxPostLength - textAreaRef.current.innerText.length;
        return "";
    }, [content])

    const handlePost = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/reply`, {
                method: 'POST',
                body: JSON.stringify({ user_id: userContext.state?.user_id, post_id, content }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                alertContext.addAlert("Comment created successfully");
                setContext("");
                textAreaRef.current.innerHTML = '';
                dummyTextAreaRef.current.innerHTML = '<span class="dummy-placeholder">Write a Comment</span>';
                navigate("/");
            } else {
                const errorMessage = await response.text();
                alertContext.addAlert(`Failed to create comment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            alertContext.addAlert('Failed to create comment. Please try again.');
        }
    }

    useEffect(() => {
        // Initialize input if needed
        if (initialInput && initialInput.length > 0) {
            textAreaRef.current.innerText = initialInput + ' ';
            handleInput({target: textAreaRef.current})
        }

        // The input div height is based on the user input. So initialize it as the base height.
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;

            textAreaRef.current.style.height = `${scrollHeight}px`;
            dummyTextAreaRef.current.style.height = `${scrollHeight}px`;
            contentContainerRef.current.style.height = `${scrollHeight}px`;
        }
    }, []);

    return (
        <div className={"create-post-container"}>
            <div className={"create-post-username"}>{userContext.state?.username ?? "JohnCena"}</div>
            <div className={"create-post-content-container"} ref={contentContainerRef}>
                <div contentEditable={true} ref={textAreaRef} className={"textarea"} onInput={handleInput}></div>
                <div
                    className={"dummy-text-area"}
                    ref={dummyTextAreaRef}
                >
                    <span className={"dummy-placeholder"}>
                        Write a comment
                    </span>
                </div>
            </div>
            <div className={`create-post-remaining-characters ${remainingCharacters === 0 ? "create-post-remaining-characters-zero" : ""}`}>{remainingCharacters}</div>
            <div className={"create-post-button-container"}>
                <button disabled={content.length === 0 || content.length > maxPostLength} onClick={handlePost}>Submit</button>
            </div>
        </div>
    );
};

export default CreateCommentForm;