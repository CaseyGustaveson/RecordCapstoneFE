import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL+"/api/users", 
});


export const getUserProfile = async (token) => {
    try {
        const response = await api.get('/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


//Admin only)
export const getAllUsers = async (token) => {
    try {
        const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const removeUser = async (id, token) => {
    try {
        const response = await api.delete(`${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}



