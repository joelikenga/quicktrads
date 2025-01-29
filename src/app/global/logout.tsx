"use client";

import { useRouter } from "next/navigation";
import nookies from "nookies";
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
