import axios from 'axios';

// Base configuration
const API_BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

// Create axios instance
const api = axios.create({

  baseURL: API_BASE_URL,
  //هنا ممكن نحط ال token عشان ابعتو مع كلو 
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tkn');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 