

export const LoginApp = () => {

    const login = async (username, password) => {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            return await response.text();
        }

        return await response.json();
    }

    return  login;
}
