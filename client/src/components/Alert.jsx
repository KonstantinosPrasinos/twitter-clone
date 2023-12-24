import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from "../context/AlertContext.jsx";

const Alert = ({message = "vitae turpis massa sed elementum tempus egestas sed sed risus"}) => {
    const alertContext = useContext(AlertContext);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (!isHidden) {
            setTimeout(() => {
                setIsHidden(true);
            }, 2000)
        }
    }, [isHidden]);

    const handleTransitionEnd = () => {
        if (isHidden) {
            setIsHidden(false)
            alertContext.dispatch({type: "REMOVE_ALERT"});
        }
    }

    return (
        <div className={"alert-container"}>
            <div className={isHidden ? "alert-hidden" : ""} onTransitionEnd={handleTransitionEnd}>
                {message}
            </div>
        </div>
    );
};

export default Alert;