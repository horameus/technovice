import type { AxiosInstance } from 'axios';
import axios from 'axios';

// Create an axios instance so we can use it in our components with base URL already defined
const api: AxiosInstance = axios.create({
    // baseURL: 'https://technovice-app-196e28ed15ce.herokuapp.com',
    baseURL: 'http://localhost:3000',
});

// Add an interceptor to add the token (received after a login action) to the request headers.
// So we don't need to take care of it in every request.
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
