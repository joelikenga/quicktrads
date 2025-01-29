import axios from "axios";
import nookies from "nookies";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = nookies.get(null)['accessToken'];
    console.log("Access Token:", accessToken); // Debugging

    // const refreshToken = nookies.get(null)['refreshToken'];
    // Add access token to Authorization header if it exists
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Add refresh token to custom header (or wherever appropriate)
    // if (refreshToken) {
    //   config.headers["refresh-token"] = refreshToken;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      // Network error (no response)
      if (error.code === 'ECONNABORTED') {
        throw new Error("Network timeout. Please check your internet connection.");
      } else {
        throw new Error(error.code);
      }
    }

    // Check for 401 Unauthorized
    if (error.response.status === 401) {
      throw new Error("Unauthorized access. Please log in again.");
    }

    if (error.response.status === 413) {
      throw new Error(
        "Payload too large. Please reduce the size of your request."
      );
    }

    // Server down or 5xx errors
    if (error.response.status >= 500) {
      throw new Error("Server is currently down. Please try again later.");
    }

    // Other error cases (e.g., 4xx errors)
    throw new Error(error.response.data.message || "An error occurred.");
  }
);

export default axiosInstance;
