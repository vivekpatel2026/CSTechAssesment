import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://cstechassesment.onrender.com/api', // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// IMPORTANT: Interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Add the token to the 'x-auth-token' header
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default api;