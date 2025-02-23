"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  eyeClose,
  eyeOpen,
  logo,
  spinner,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/validationSchemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosResponse } from "axios";
import nookies from "nookies";
// import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/utils/api/admin/auth";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

type FormValues = {
  email: string;
  password: string;
};

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  user: {
    id: string;
    fullName: string;
    role: string;
  };
}

const Body = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(login),
  });

  useEffect(() => {
    const cookies = nookies.get(null);
    if (cookies.accessToken) {
      router.push("/admin_dashboard");
    }
  }, [router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const res: AxiosResponse<LoginResponse> = (await adminLogin(
        data
      )) as AxiosResponse<LoginResponse>;
      const loginData = res.data;
      const { accessToken, refreshToken, user } = loginData;

      // Check if user is admin
      if (user.role !== 'super_admin') {
        throw new Error('Unauthorized: Access restricted to admin users only');
      }

      // Set cookies using nookies
      nookies.set(null, "accessToken", accessToken, {
        maxAge: 1 * 24 * 60 * 60,
        path: "/admin_dashboard",
      });

      nookies.set(null, "refreshToken", refreshToken, {
        maxAge: 3 * 24 * 60 * 60,
        path: "/admin_dashboard",
      });

      if (!accessToken) {
        throw new Error("Access token not found in the login response");
      }

      setLoading(false);
      router.push("/admin_dashboard");
      router.refresh();
    } catch (error: unknown) {
      console.error("Login error:", error);
      setLoading(false);
      // Add error message to UI
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        // Handle unauthorized access attempt
        // alert('Access denied: Admin privileges required');
        // Optionally redirect to a different page
        router.push('/admin_dashboard/login');
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-[483px] flex flex-col justify-between items-center relative h-[100svh] mx-auto  pt-20 px-4">
        <div className="w-full flex items-center flex-col">
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
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 max-w-[323px] w-full flex flex-col gap-4 "
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

          </form>
        </div>
        <div>
          <p className=" text-text_weak text-[12px] mx-auto w-max pt-[22px] pb-5 text-center">
            ©2025 Quicktrads All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
export default Body;
