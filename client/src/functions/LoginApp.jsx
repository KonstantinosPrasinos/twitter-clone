

export const LoginApp = () => {

    const login = async (username, password) => {
        let message = true;

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if (!response.ok) {
            message = await response.text();
        }

        return message;
    }

    return  login;
}
