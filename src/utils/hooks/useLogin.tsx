"use client";
import { useEffect, useState } from "react";
import { loggedInUser } from "../api/user/auth";
import { errorToast } from "../toast/toast";

interface UserResponse {
  data: {
    avatar: string;
    country: string;
    createdAt: string; // ISO Date string
    dob: string; // ISO Date string
    email: string;
    emailVerified: boolean;
    fullName: string;
    gender: string;
    id: string; // UUID
    lastLoggedInAt: string; // ISO Date string
    lastOrderedAt: string | null; // ISO Date string or null
    password: string;
    phoneNumber: string;
    role: "super_admin" | "user"; // Explicitly define possible roles
    shippingDetails: string | null;
    state: string;
    status: string; // Add other statuses if needed
    totalOrders: number | null;
    updatedAt: string; // ISO Date string
  };
}

export const useLogin = (requiredRole: "user" | "super_admin") => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserResponse | null>(null);

  // Compute hasAvatar based on userDetails.data.avatar
  const hasAvatar = userDetails?.data?.avatar === "";

  const fetchUserData = async () => {
    try {
      const res = (await loggedInUser()) as UserResponse;
      setUserDetails(res);
      setIsLoggedIn(true);

      // Check if the user has the required role
      if (res.data.role !== requiredRole) {
        setIsLoggedIn(false);
        setUserDetails(null);
        // Optionally, you can show an error toast or redirect the user
        // errorToast("You do not have permission to access this page.");
      }
    } catch (error:any) {
      setIsLoggedIn(false);
      setUserDetails(null);
      // Optionally, show an error toast
      // if(error.res.code === 401)
      // errorToast("not logged in");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isLoggedIn, hasAvatar, requiredRole]); // Add requiredRole to dependencies

  // Function to check if the user has the required role
  const hasRole = (role: "user" | "super_admin") => {
    return userDetails?.data?.role === role;
  };

  // Extract the user's role
  const role = userDetails?.data?.role;

  return { isLoggedIn, hasAvatar, hasRole, userDetails, role };
};

export const useLogin_2 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserResponse | null>(null);

  // Compute hasAvatar based on userDetails.data.avatar
  const hasAvatar = userDetails?.data?.avatar === "";

  const fetchUserData = async () => {
    try {
      const res = (await loggedInUser()) as UserResponse;
      setUserDetails(res);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      setUserDetails(null);
      // Optionally, show an error toast
      errorToast("Failed to fetch user data. Please log in again.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isLoggedIn, hasAvatar]); // No role dependency

  // Function to check if the user has a specific role
  const hasRole = (role: "user" | "super_admin") => {
    return userDetails?.data?.role === role;
  };

  // Extract the user's role
  const role = userDetails?.data?.role;

  return { isLoggedIn, hasAvatar, hasRole, userDetails, role };
};