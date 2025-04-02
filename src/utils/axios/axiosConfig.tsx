import axios from "axios";
import nookies from "nookies";
// import { errorToast } from "../toast/toast";

const cookies = nookies.get(null);
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
    const accessToken = nookies.get(null)["accessToken"];
    // console.log("Access Token:", accessToken); // Debugging

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
      if (error.code === "ECONNABORTED") {
        // //errorToat("Network timeout. Please check your internet connection.");
      }
    }

    // Check for 401 Unauthorized
    if (error.response.status === 401) {
      if (cookies?.role?.replaceAll("%22", "") === "super_admin") {
        window.location.href = "/admin_dashboard/login";
      } else {
        window.location.href = "/";
      }
      // errorToast("Invalid login details");
    }

    if (error.response.status === 413) {
      // toast.error(
      //   "Payload too large."
      // );
    }

    // Server down or 5xx errors
    if (error.response.status >= 500) {
      // //errorToat("Server down. Please try again later.");
    }

    // Other error cases (e.g., 4xx errors)
    // //errorToat(error.response.data.message || "An error occurred.");
  }
);

export default axiosInstance;
