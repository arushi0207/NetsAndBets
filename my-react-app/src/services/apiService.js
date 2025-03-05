import axios from 'axios';

const API_URL = 'http://localhost:8080';
const USERNAME = 'user';
const PASSWORD = 'password'; // Must match the password in Spring Security

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Required for cross-origin credentials
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
});


export const getMessages = async () => {
    try {
        const response = await axiosInstance.get('/hello');
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const saveMessage = async (content) => {
    try {
        const response = await axiosInstance.post('/hello', { content });
        return response.data;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};

/*
export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}/hello`, {
            auth: {
                username: USERNAME,
                password: PASSWORD,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const saveMessage = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/hello`, { content },
            {
                auth: {
                    username: USERNAME,
                    password: PASSWORD,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};
*/