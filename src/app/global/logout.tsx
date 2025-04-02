"use client";

import { useRouter } from "next/navigation";
import nookies from "nookies";


export const useLogout = () => {
  const router = useRouter();
  // const { isLoggedIn, hasRole } = useLogin("user");


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
  // const { isLoggedIn, hasRole } = useLogin("super_admin");

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
