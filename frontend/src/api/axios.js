import axios from "axios";

// Detect if we're in Codespaces or local development
const getBaseURL = () => {
  const hostname = window.location.hostname;
  console.log('Frontend URL hostname:', hostname);
  
  // Check if we're in GitHub Codespaces
  if (hostname.includes('.app.github.dev')) {
    // Extract the base codespace name by removing the port part
    // Pattern: {codespace-name}-{port}.app.github.dev
    const lastDashIndex = hostname.lastIndexOf('-');
    if (lastDashIndex !== -1) {
      const baseCodespaceName = hostname.substring(0, lastDashIndex);
      const backendUrl = `https://${baseCodespaceName}-8000.app.github.dev/api`;
      console.log('Constructed backend URL for Codespaces:', backendUrl);
      return backendUrl;
    }
  }
  
  // Local development fallback
  console.log('Using localhost backend URL');
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
