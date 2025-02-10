import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL
})

// Interceptor for send the token in all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('USER_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api