import type { AxiosInstance } from 'axios';
import axios from 'axios';

// Create an axios instance so we can use it in our components with base URL already defined
const api: AxiosInstance = axios.create({
    // baseURL: 'https://technovice-app-196e28ed15ce.herokuapp.com/api',
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to add the token (received after a login action) to the request headers.
// So we don't need to take care of it in every request.
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        console.log('error : ', error.response);
        if (
            error.response.status === 403 &&
            error.response.data.message === 'Invalid or expired access token'
        ) {
            try {
                const { data } = await axios.post(
                    'http://localhost:3000/refresh',
                    {},
                    { withCredentials: true },
                );

                // save the new accessToken
                localStorage.setItem('accessToken', data.newAccessToken);

                // Retry original request
                error.config.headers['Authorization'] = `Bearer ${data.newAccessToken}`;
                return api.request(error.config);
            } catch (refreshError) {
                console.error('Unable to refresh token:', refreshError);
                window.location.href = '/connexion';
            }
        }

        return Promise.reject(error);
    },
);

export default api;
