// src/api/apiService.js

import axios from 'axios';

export const BASE_URL = '/api';
// Create an axios instance with default configurations
const apiClient = axios.create({
  baseURL: BASE_URL, // Set your base API URL
  headers: {
    'Content-Type': 'application/json', // Default content-type, can be overridden
  },
});

// Add a request interceptor to include tokens in headers (e.g., authorization)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default apiClient;


// Function to handle GET requests
export const get = async (url, params = {}) => {
    try {
      console.log(url, params);
      const response = await apiClient.get(url, { params });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Function to handle POST requests (supports JSON and FormData)
  export const post = async (url, data = {}, isMultipart = false) => {
    try {
      const config = isMultipart
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {
          headers: {
            'Content-Type': 'application/json',
          },

        };
        
    const formData = isMultipart ? convertToFormData(data) : data;
    
    const response = await apiClient.post(url, formData,config);
      return response.data;
    } catch (error) {
        console.log(error);
      throw error;
    }
  };
  
  // Function to handle PUT requests (supports JSON and FormData)
  export const put = async (url, data = {}, isMultipart = false) => {
    try {
      const config = isMultipart
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {};
        
      const formData = isMultipart ? convertToFormData(data) : data;
  
      const response = await apiClient.put(url, formData, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Function to handle DELETE requests
  export const del = async (url) => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const movieApi = async (url, params = {}) => {
    try {
      const response = await axios.get(url, {
        params: {
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  // Helper function to convert data to FormData
  const convertToFormData = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return formData;
  };
