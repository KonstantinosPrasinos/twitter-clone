import React, {useEffect, useRef} from 'react';

const Dialog = ({children, attachedElementRef, collapseDialogFunction}) => {
    const containerRef = useRef();

    useEffect(() => {
        const calculatePosition = () => {
            const attachedDimensions = attachedElementRef.current?.getBoundingClientRect();

            containerRef.current.style.top = `${attachedDimensions.bottom + 12}px`
            containerRef.current.style.left = `${attachedDimensions.left - 12}px`
        }

        const handleDocumentClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                collapseDialogFunction();
            }
        }

        if (attachedElementRef.current) {
            calculatePosition();
            window.addEventListener("resize", calculatePosition);
            document.addEventListener("click", handleDocumentClick)
        }

        return () => {
            window.removeEventListener("resize", calculatePosition);
            window.removeEventListener("click", handleDocumentClick)
        }
    }, []);

    return (
        <div className={"Dialog-Container Panel-Thin Vertical-Flex-Container"} ref={containerRef}>
            {children}
        </div>
    );
};

export default Dialog;