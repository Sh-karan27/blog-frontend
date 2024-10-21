// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-api-ten-rust.vercel.app/api/v1', // Define this in your .env file
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;
