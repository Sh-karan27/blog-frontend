// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Define this in your .env file
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;
