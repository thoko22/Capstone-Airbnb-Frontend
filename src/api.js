import axios from 'axios';

// Set up the base URL for your backend
const api = axios.create({
  baseURL: 'http://localhost:5005/api',
});

// Intercept requests to include the token in the Authorization header
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default api;
