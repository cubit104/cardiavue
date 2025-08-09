import axios from "axios";

// Detect if we're in Codespaces or local development
const getBaseURL = () => {
  // Check if we're in GitHub Codespaces
  if (window.location.hostname.includes('.app.github.dev')) {
    // Extract the codespace name from the current URL
    const hostname = window.location.hostname;
    const codespaceUrl = hostname.replace('-3000', '-8000');
    return `https://${codespaceUrl}/api`;
  }
  
  // Local development
  return "http://localhost:8000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
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
