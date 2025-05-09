 "use client";

import { eyeClose, eyeOpen, logo, spinner } from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/validationSchemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosResponse } from "axios";
import { userLogin } from "../../../utils/api/user/auth";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { errorToast, successToast } from "@/utils/toast/toast";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address: string;
  avatar: string;
  dob: string;
  gender: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoggedInAt: string;
  lastOrderedAt: string | null;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  user: User;
}

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const currentYear = new Date().getFullYear();

export const Body = () => {
  const router = useRouter();
  const [from, setFrom] = useState('/');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setFrom(searchParams.get('from') || '/');
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(login),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [userDetails, setUserDetails] = useState<any | null>(null);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const cookies = nookies.get(null);
      if (cookies.accessToken) {
        successToast("You are still logged in");
        await router.replace(from); // Redirect to homepage if logged in
      }
    };

    checkAuth();
  }, [router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const res: AxiosResponse<LoginResponse> = (await userLogin(
        data
      )) as AxiosResponse<LoginResponse>;

      // const userD = (await loggedInUser()) as any;
      // setUserDetails(res);
      const loginData = res?.data;
      const { accessToken, refreshToken, user } = loginData;

      // Check if user is admin
      if (user.role !== "user") {
        errorToast("Incorrect details");
        return;
      }

      // Save tokens to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      // Set expiry time for localStorage and cookies
      const accessTokenExpiry = 1 * 24 * 60 * 60; // 1 day in seconds
      const refreshTokenExpiry = 3 * 24 * 60 * 60; // 3 days in seconds

      // Save tokens in cookies
      nookies.set(null, "accessToken", accessToken, {
        maxAge: accessTokenExpiry,
        path: "/",
      });

      nookies.set(null, "refreshToken", refreshToken, {
        maxAge: refreshTokenExpiry,
        path: "/",
      });

      nookies.set(null, "role", JSON.stringify(user?.role.trim()), {
        maxAge: refreshTokenExpiry,
        path: "/",
      });
      // Set localStorage expiry timestamps
      const accessTokenExpiryTime =
        new Date().getTime() + 1 * 24 * 60 * 60 * 1000; // 1 day in milliseconds

      localStorage.setItem("e_x_TK", accessTokenExpiryTime.toString());

      localStorage.setItem("e_x_TK", accessTokenExpiryTime.toString());
      successToast("Login successful");
      setLoading(false);
      router.replace(from);

      // Set up expiry check
      const checkExpiry = () => {
        const currentTime = new Date().getTime();
        if (currentTime > parseInt(localStorage.getItem("e_x_TK") || "0")) {
          localStorage.clear();
          // router.replace("/login");
        }
      };

      // Check expiry every minute
      const expiryInterval = setInterval(checkExpiry, 60000);
      // Clear interval when component unmounts
      return () => clearInterval(expiryInterval);
    } catch (error: any) {
      setLoading(false);
      errorToast("Incorrect details");
      throw error;
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* ------- container ---------- */}
      <div className=" h-full max-h-[680px  w-full flex justify-between">
        {/* "----- input section -----" */}
        <div className="flex justify-center items-center h-full w-full max-w-[483px]  overflow-y-auto hidden_scroll  pt-20 px-4 sm:px-0">
          <div className=" w-full   max-h-[680px] h-full bg-background flex flex-col items-center justify-between   gap-[87px]">
            {/* ---- */}
            <div className="flex flex-col items-center w-full">
              {/* ----- logo and text ----- */}
              <div className="flex flex-col gap-6 items-center ">
                {/* logo */}
                <i>{logo()}</i>
                <div className="flex flex-col gap-2 items-center text-center">
                  <p
                    className={` ${lora.className} text-[22px] font-normal text-text_strong`}
                  >
                    Login
                  </p>
                  <p className={` text-sm font-normal text-text_weak`}>
                    {"Enter your login details below"}
                  </p>
                </div>
              </div>

              {/* ----- Input ----- */}
              <form
                method="post"
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 max-w-[323px] w-full flex flex-col gap-4"
              >
                {/* ----- Email ----- */}
                <div className="flex flex-col w-full text-text_strong text-sm font-normal gap-2">
                  <p className="">Email</p>

                  <input
                    className={`${
                      errors.email
                        ? "border-error_1 shake bg-error_2"
                        : "focus:border-stroke_strong"
                    } w-full border  outline-none rounded-lg h-10 px-4 `}
                    placeholder="Sample@gmail.com"
                    type="text"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="text-xs text-error_1">
                      {errors?.email.message}
                    </div>
                  )}
                </div>

                {/* ----- password ----- */}
                <div className="flex flex-col w-full text-text_strong text-sm font-normal gap-2">
                  <p className="">Password</p>

                  <div className="relative">
                    <input
                      className={`${
                        errors.password
                          ? "border-error_1 shake bg-error_2"
                          : "focus:border-stroke_strong"
                      } w-full border  outline-none rounded-lg h-10 px-4 `}
                      placeholder="••••••••••"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <span
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className="absolute right-4 top-3 bg-background cursor-pointer  flex items-center "
                    >
                      <i>{showPassword ? eyeClose() : eyeOpen()}</i>
                    </span>
                  </div>
                  {errors.password && (
                    <div className="text-xs text-error_1">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* ----- forgot password ----- */}
                <div className="w-full flex justify-start text-sm">
                  <Link href={`/forget_password`} className="underline">
                    Forget password?
                  </Link>
                </div>

                {/* ----- login button ----- */}
                <button
                  type="submit"
                  className="bg-text_strong text-background h-10 rounded-full flex justify-center items-center text-center text-base font-medium mt-8"
                >
                  {loading ? (
                    <i className="animate-spin ">{spinner()} </i>
                  ) : (
                    <p>Login</p>
                  )}
                </button>

                <div className="w-full flex justify-center text-sm mt-8">
                  <div className="">
                    {"Don’t have an account?"}{" "}
                    <Link className="underline" href={`/sign_up`}>
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            <div className="text-text_weak text-xs font-normal pb-4">{`© ${currentYear} Quicktrads. All rights reserved`}</div>
          </div>
        </div>

        <div className="hidden md:block w-full h-full  max-h-[680px">
          <Image
            className="h-full  w-full object-cover bg-center"
            src={
              "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737113102/quicktrads/ut7c9pth2an4auwmqpq9.png"
            }
            priority
            width={1000}
            height={680}
            alt={""}
          />
        </div>
      </div>
    </div>
  );
};
 