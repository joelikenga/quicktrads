// app/client-layout.tsx
"use client";
import { useEffect } from "react";
import nookies from "nookies";
import { usePathname, useRouter } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import InternetConnection from "@/components/InternetConnection";
import { Toaster } from "react-hot-toast";

// List of protected routes that require authentication
const PROTECTED_ROUTES = ["/checkout", "/password", "/profile"];

// const clearAllStorage = () => {
//   // Clear all localStorage items
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');
//   localStorage.removeItem('user');
//   localStorage.removeItem('e_x_TK');
  
//   // Clear all sessionStorage items if you use them
//   sessionStorage.clear();
  
//   // Clear indexedDB if used (optional)
//   if (window.indexedDB) {
//     window.indexedDB.databases().then(dbs => {
//       dbs.forEach(db => {
//         if (db.name) {
//           window.indexedDB.deleteDatabase(db.name);
//         }
//       });
//     });
//   }
// };

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      // Don't check auth for admin routes (handled by admin layout)
      if (pathname?.includes("/admin_dashboard")) return;

      const cookies = nookies.get(null);
      const adminCookies = nookies.get(null, { path: "/admin_dashboard" });

      // Check if current route is protected and user is not authenticated
      const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname?.startsWith(route)
      );
      const isAuthRoute = ["/login", "/signup"].some((route) =>
        pathname?.startsWith(route)
      );

      if (isProtectedRoute && !cookies.accessToken) {
        // Clear any potential admin tokens
        nookies.destroy(null, "accessToken", { path: "/admin_dashboard" });
        nookies.destroy(null, "refreshToken", { path: "/admin_dashboard" });
        nookies.destroy(null, "role", { path: "/admin_dashboard" });

        // Clear user tokens
        nookies.destroy(null, "accessToken", { path: "/" });
        nookies.destroy(null, "refreshToken", { path: "/" });
        nookies.destroy(null, "role", { path: "/" });

        // clearAllStorage();

        router.replace("/login");
      }

      // If user has admin tokens but is on user route
      if (
        adminCookies.accessToken &&
        !pathname?.startsWith("/admin_dashboard")
      ) {
        // Clear admin tokens
        nookies.destroy(null, "accessToken", { path: "/admin_dashboard" });
        nookies.destroy(null, "refreshToken", { path: "/admin_dashboard" });
        nookies.destroy(null, "role", { path: "/admin_dashboard" });
        // clearAllStorage();

      }

      // If authenticated user tries to access auth routes (login/signup)
      if (isAuthRoute && cookies.accessToken) {
        router.replace("/");
      }
    };

    checkAuth();
  }, [pathname, router]);

  return (
    <CurrencyProvider>
      <CartProvider>
        <InternetConnection />
        {children}
        <Toaster position="bottom-center" />
      </CartProvider>
    </CurrencyProvider>
  );
}
