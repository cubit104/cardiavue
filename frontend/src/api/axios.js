import axios from "axios";

// Detect if we're in Codespaces or local development
const getBaseURL = () => {
  const hostname = window.location.hostname;
  
  // Check if we're in GitHub Codespaces
  if (hostname.includes('.app.github.dev')) {
    // More robust parsing for Codespaces URL
    // Pattern: {codespace-name}-3000.app.github.dev -> {codespace-name}-8000.app.github.dev
    const match = hostname.match(/^(.+)-(\d+)\.app\.github\.dev$/);
    if (match) {
      const [, codespaceBase, currentPort] = match;
      const backendUrl = `https://${codespaceBase}-8000.app.github.dev/api`;
      console.log('Codespaces detected, using backend URL:', backendUrl);
      return backendUrl;
    } else {
      // Fallback: simple replacement
      const codespaceUrl = hostname.replace('-3000', '-8000');
      const backendUrl = `https://${codespaceUrl}/api`;
      console.log('Codespaces detected (fallback), using backend URL:', backendUrl);
      return backendUrl;
    }
  }
  
  // Local development
  const localUrl = "http://localhost:8000/api";
  console.log('Local development detected, using backend URL:', localUrl);
  return localUrl;
};

const baseURL = getBaseURL();
console.log('Final axios baseURL:', baseURL);

const api = axios.create({
  baseURL,
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
