import React, { useState, useRef } from 'react';
import { SlOptions } from "react-icons/sl";
import Dialog from '../components/Dialog.jsx'; 

const MoreButtonWithDialog = ({ children, dialogContent }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const buttonRef = useRef();

    const handleMoreButtonClick = () => {
        setIsDialogOpen(!isDialogOpen);
        console.log(isDialogOpen);
        console.log(buttonRef.current)
    };

    const collapseDialogFunction = () => {
        setIsDialogOpen(true);
    };

    return (
        <div>
            <button className="Horizontal-Flex-Container Basic-Button" onClick={handleMoreButtonClick} ref={buttonRef}>
                <SlOptions /> 
                {children}
            </button>
            {isDialogOpen && (
                <Dialog
                    attachedElementRef={buttonRef}
                    collapseDialogFunction={collapseDialogFunction}
                >
                    {dialogContent}
                </Dialog>
            )}
        </div>
    );
};

export default MoreButtonWithDialog;
