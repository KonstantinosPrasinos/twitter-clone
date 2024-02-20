import React from 'react';

const LoadingIndicator = ({size = "fullscreen"}) => {
    return (
        <div className={`loading-container ${size === "fullscreen" ? "fullscreen" : ""}`}>
            <div className={'loading-indicator'} />
        </div>
    );
};

export default LoadingIndicator;