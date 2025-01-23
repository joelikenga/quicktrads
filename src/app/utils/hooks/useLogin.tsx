// import { useState, useEffect } from "react";
// import nookies from "nookies";
// import { userLogin } from "../api/user/auth"; // Adjust the import path as needed
// import { AxiosResponse } from "axios";

// interface User {
//   name: string;
//   profilePic: string;
// }

// interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
//   user: User;
// }

// export const useLogin = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const cookies = nookies.get(null);
//     const token = cookies.accessToken;

//     if (token) {
//       // Fetch user data using the token
//       fetchUserData(token).then((userData) => {
//         setUser(userData);
//         setIsLoggedIn(true);
//       });
//     }
//   }, []);

//   return { user, isLoggedIn };
// };

// const fetchUserData = async (token: string): Promise<User> => {
//   try {
//     const res: AxiosResponse<LoginResponse> = (await userLogin({ token })) as any;
//     const loginData = res.data;
//     return loginData.user;
//   } catch (error) {
//     console.error("Failed to fetch user data:", error);
//     throw error;
//   }
// };