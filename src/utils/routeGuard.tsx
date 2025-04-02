"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
// import nookies from "nookies";
import { useLogin_2 } from "../utils/hooks/useLogin";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Extract role from useLogin_2
  const { isLoggedIn, role } = useLogin_2();

  useEffect(() => {
    if (!isLoggedIn) return; // Wait for authentication state

    //  Admin-only route protection
    // if (adminRoutes.includes(pathname) && role !== "super_admin") {
    //   router.push("/admin_dashboard/login");
    //   return;
    // }

    // 🚀 Checkout page protection (users can only proceed if cart > 0)
    // if (pathname === "/checkout") {
    //   const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    //   if (cartItems.length === 0) {
    //     router.push("/categories"); // Redirect if cart is empty
    //   }
    // }
  }, [pathname, isLoggedIn, role, router]);

  return <>{children}</>;
};

export default RouteGuard;
