const API_URL = import.meta.env.VITE_API_URL;

export const signupUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        return data;
    } catch (error) {
        console.error('Signup failed:', error);
        throw new Error(error.message || 'Signup failed.');
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error(error.message || 'Login failed.');
    }
};


export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('role');
    } catch (error) {
        console.error('Logout failed:', error);
        throw new Error(error.message || 'Logout failed.');
    }
};

