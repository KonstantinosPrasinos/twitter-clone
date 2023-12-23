import React, {createContext, useCallback, useReducer} from 'react';
import Alert from "../components/Alert.jsx";

export const AlertContext = createContext([]);

// The alerts are stored in a queue
// Use ADD_ALERT to add an alert, but don't use REMOVE_ALERT to remove them
export const alertReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ALERT':
            return [...state, action.payload];
        case 'REMOVE_ALERT':
            return state.length === 0 ? state : state.slice(1);
        default:
            return state;
    }
}

const AlertContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(alertReducer, [])

    const addAlert = useCallback((message) => {
        dispatch({type: "ADD_ALERT", payload: {message: message}});
    }, [])

    return (
        <AlertContext.Provider value={{state, dispatch, addAlert}}>
            {state.length > 0 && <Alert message={state[0].message} />}
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContextProvider;