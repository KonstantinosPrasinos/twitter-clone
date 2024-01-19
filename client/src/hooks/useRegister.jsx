import {useState} from "react";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Returns true if request was made correctly and the error message otherwise
    const register = async (username, email, password) => {
        setIsLoading(true);
        let responseMessage = true;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            responseMessage = await response.text();
        }

        setIsLoading(false);
        return responseMessage;
    }

    return {isLoading, register};
}