import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/users", // Replace with your API base URL
  timeout: 5000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (optional)
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken"); // Clear token on unauthorized
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
