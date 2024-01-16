import React, {createContext, useReducer} from 'react';

// This is where the user global value (context) is held
export const UserContext = createContext({});

// This is what we call to change the value of user
export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem("user", JSON.stringify(action.payload))
            return action.payload;
        case 'REMOVE_USER':
            localStorage.removeItem("user")
            return {};
        default:
            return state;
    }
}

// All the children of UserContextProvider have access to the user context
const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {})

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;