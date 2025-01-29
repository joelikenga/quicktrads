"use client";
import { useEffect, useState } from "react";
import { loggedInUser } from "../api/user/auth";

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
    role: string; // Add other roles if needed
    shippingDetails: string | null;
    state: string;
    status: string; // Add other statuses if needed
    totalOrders: number | null;
    updatedAt: string; // ISO Date string
  }
}

export const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserResponse | null>(null);

  const fetchUserData = async () => {
    try {
      const res = (await loggedInUser()) as UserResponse;
      setUserDetails(res);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserData();
    setIsLoggedIn(true);

    if (userDetails !== null) {
      setIsLoggedIn(true);
    }
  }, [userDetails]);

  return { isLoggedIn, userDetails };
};
