import axios from 'axios';

// Ensure this URL is correct and matches your backend server
const API_URL = 'http://localhost:3001/api';

// Create an Axios instance for API calls
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch user profile
export const getUserProfile = async (token) => {
    try {
        const response = await api.get('/profile', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error.response?.data || error.message;
    }
};

// Update user profile
export const updateUserProfile = async (token, profile) => {
    try {
        const response = await api.put('/profile', profile, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error.response?.data || error.message;
    }
};
