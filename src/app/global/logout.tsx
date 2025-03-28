"use client";

import { useRouter } from "next/navigation";
import nookies from "nookies";
import { useLogin } from "../../utils/hooks/useLogin";
import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();
  const { isLoggedIn, hasRole } = useLogin("user");

  useEffect(() => {
    if (isLoggedIn) return; // Wait until the user data is fully loaded

    if (isLoggedIn && hasRole && !hasRole("user")) {
     logout();
    }
  }, [isLoggedIn, hasRole, router]);

  const logout = () => {
    // Clear cookies
    nookies.destroy(null, "accessToken", { path: "/" });
    nookies.destroy(null, "refreshToken", { path: "/" });

    // Clear client-side state
    localStorage.clear();
    sessionStorage.clear();

    // Redirect
    router.push("/login");
  };

  return logout;
};

export const useLogoutAdmin = () => {
  const router = useRouter();
  const { isLoggedIn, hasRole } = useLogin("super_admin");

  useEffect(() => {
    // Ensure hook runs only when authentication is fully loaded
    if (isLoggedIn === false && hasRole && hasRole("super_admin")) {
      logoutAdmin();
    }
  }, [isLoggedIn, hasRole, router]);

  const logoutAdmin = () => {
    // Clear cookies
    nookies.destroy(null, "accessToken", { path: "/admin_dashboard" });
    nookies.destroy(null, "refreshToken", { path: "/admin_dashboard" });

    // Clear local storage & session storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to admin login
    router.push("/admin_dashboard/login");
  };

  return logoutAdmin;
};
