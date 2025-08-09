import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust if your backend runs elsewhere
});

// Request interceptor to add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Remove invalid token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('cardiaVueAuth');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;