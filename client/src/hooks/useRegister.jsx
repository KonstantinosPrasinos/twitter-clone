import {useState} from "react";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Returns true if request was made correctly and the error message otherwise
    const register = async (username, email, password, repeatPassword) => {
        setIsLoading(true);
        let responseMessage = true;

        const response = await fetch({});

        if (!response.ok) {
            responseMessage = await response.text();
        }

        setIsLoading(false);
        return responseMessage;
    }

    return {isLoading, register};
}