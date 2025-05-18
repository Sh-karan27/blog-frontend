import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-api-nxgh.onrender.com/api/v1',

  withCredentials: true, // Send cookies with requests
});

// Set default headers for all requests
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

// Optional: Add a request interceptor to include tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve your token from storage
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
