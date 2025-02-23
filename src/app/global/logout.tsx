"use client";

import { useRouter } from "next/navigation";
import nookies from "nookies";
import { useEffect } from "react";
// import { useEffect } from "react";

export const useLogout = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const cookies = nookies.get(null);
  //   if (!cookies.token) {
  //     router.push("/");
  //   }
  // }, []);

  const logout = () => {
    // Clear cookies
    nookies.destroy(null, "accessToken", { path: "/" });
    // nookies.destroy(null, "refreshToken", { path: "/" });
    nookies.destroy(null, "accessToken", { path: "/" });
    // nookies.destroy(null, "refreshToken", { path: "/" });

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

  useEffect(() => {
    const cookies = nookies.get(null);
    if (!cookies.token) {
      router.push("/admin_dashboard/login");
    }
  }, [router]);

  // Clear cookies
  nookies.destroy(null, "accessToken", { path: "/admin_dashboard" });
  nookies.destroy(null, "refreshToken", { path: "/admin_dashboard" });
  nookies.destroy(null, "accessToken", { path: "/admin_dashboard" });
  nookies.destroy(null, "refreshToken", { path: "/admin_dashboard" });

  // Clear client-side state
  localStorage.clear();
  sessionStorage.clear();

  // Redirect
  router.push("/admin_dashboard/login");
};

// export async function getServerSideProps(context:any) {
//   const cookies = nookies.get(context);

//   if (!cookies.token) {
//     return {
//       redirect: {
//         destination: "/en/admin-dashboard/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
