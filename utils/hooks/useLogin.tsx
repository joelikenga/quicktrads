"use client";
import { useEffect, useState } from "react";
import { loggedInUser } from "../api/user/auth";
import { useRouter, usePathname } from 'next/navigation';

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

export const useLogin = (requiredRole?: 'super_admin' | 'user') => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserResponse | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUserData = async () => {
    try {
      const res = (await loggedInUser()) as UserResponse;
      setUserDetails(res);
      
      // Check if user has required role
      if (requiredRole) {
        const hasRequiredRole = res.data.role === requiredRole;
        setIsAuthorized(hasRequiredRole);
        
        // Redirect if unauthorized
        if (!hasRequiredRole) {
          if (requiredRole === 'super_admin') {
            router.push('/admin_dashboard/login');
          } else {
            router.push('/login');
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsLoggedIn(false);
      // Redirect based on path
      if (pathname.includes('admin_dashboard')) {
        router.push('/admin_dashboard/login');
      } else {
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await fetchUserData();
      if (userDetails) {
        setIsLoggedIn(true);
        
        // Auto-detect required role from pathname if not provided
        if (!requiredRole) {
          const isAdminRoute = pathname.includes('admin_dashboard');
          const requiredRole = isAdminRoute ? 'super_admin' : 'user';
          const hasRequiredRole = userDetails.data.role === requiredRole;
          setIsAuthorized(hasRequiredRole);
          
          if (!hasRequiredRole) {
            if (isAdminRoute) {
              router.push('/admin_dashboard/login');
            } else {
              router.push('/login');
            }
          }
        }
      }
    };

    checkAuth();
  }, [pathname, requiredRole]);

  return { isLoggedIn, isAuthorized, userDetails };
};
