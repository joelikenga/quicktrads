import axios from "axios";
import nookies from "nookies";
import { errorToast } from "../toast/toast";

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
    // Check if the request is for admin routes
    const isAdminRoute = config.url?.includes('/admin/');
    
    // Get the appropriate token based on the route
    const accessToken = isAdminRoute 
      ? nookies.get(null)["admin_accessToken"]
      : nookies.get(null)["accessToken"];

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

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
    if (!error?.response) {
      // Network error (no response)
      if (error.code === "ECONNABORTED") {
        // //errorToat("Network timeout. Please check your internet connection.");
      }
    }

    // Check for 401 Unauthorized
    if (error?.response?.status === 401) {
      errorToast("Invalid login details")
      // Check user role and redirect accordingly
      const isAdmin = cookies?.admin_role?.replaceAll("%22", "") === "super_admin";
      if (isAdmin) {
        window.location.href = "/admin_dashboard/login";
      } else {
        window.location.href = "/login";
      }
    }

    if (error?.response?.status === 413) {
      // toast.error(
      //   "Payload too large."
      // );
    }

    // Server down or 5xx errors
    if (error?.response?.status >= 500) {
      // //errorToat("Server down. Please try again later.");
    }

    // Other error cases (e.g., 4xx errors)
    // //errorToat(error.response.data.message || "An error occurred.");
  }
);

export default axiosInstance;
