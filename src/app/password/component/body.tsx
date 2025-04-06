"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/app/validationSchemas";
import { UpdateUserDetails } from "@/utils/api/user/auth";
import { errorToast, successToast } from "@/utils/toast/toast";
import { useEffect, useState } from "react";
import { eyeClose, eyeOpen } from "@/app/global/svg";
// import { useRouter } from "next/navigation";
// import nookies from "nookies";

export const Body = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUserData(JSON.parse(data));
  }, []);

  const formatDateForDisplay = (dob: string) => {
    if (!dob) return "";
    const date = new Date(dob);
    return date.toISOString().split("T")[0];
  };

  const onSubmit = async (formData: any) => {
    if (!userData) {
      errorToast("User data not loaded");
      return;
    }

    try {
      const updateData = {
        avatar: userData.avatar || "",
        fullName: userData.fullName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender || "",
        dob: formatDateForDisplay(userData.dob) || "",
        country: userData.country || "",
        state: userData.state || "",
        address: userData.address || "",
        password: formData.newPassword,
        previousPassword: formData.currentPassword,
      };

      const response = await UpdateUserDetails(updateData);

      if (response) {
        successToast("Password updated successfully");
        // nookies.destroy(null, "accessToken", { path: "/" });
        // nookies.destroy(null, "refreshToken", { path: "/" });

        // localStorage.clear();
        // sessionStorage.clear();
        // window.location.href = "/login";
        // window.location.reload();
      }
    } catch (err: any) {
      errorToast(err.message || "Password update failed");
      console.error(err);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="flex flex-col gap-8 h-[82px] md:border-b px-4 md:px-0 md:ml-[280px] mt-[150px]">
      <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
        <p className="text-text_strong text-[22px]">Profile</p>
        <p className="text-text_weak text-base hidden md:block">Update your password</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full"
      >
        <div className="flex flex-col items-center md:items-start gap-4 w-full">
          {/* Current Password */}
          <div className="flex flex-col gap-2 w-full max-w-[323px]">
            <p className="text-sm md:text-base">Current password</p>
            <div className="relative w-full">
              <input
                className={`outline-none border rounded-lg h-10 px-4 w-full ${
                  errors.currentPassword ? "border-error_1 bg-error_2" : ""
                }`}
                placeholder="••••••••••"
                type={showPasswords.current ? "text" : "password"}
                {...register("currentPassword")}
              />
              <span
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-4 top-3 cursor-pointer"
              >
                {showPasswords.current ? eyeClose() : eyeOpen()}
              </span>
            </div>
            {errors.currentPassword && (
              <p className="text-error_1 text-xs">
                {errors.currentPassword.message?.toString()}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2 w-full max-w-[323px]">
            <p className="text-sm md:text-base">New password</p>
            <div className="relative w-full">
              <input
                className={`outline-none border rounded-lg h-10 px-4 w-full ${
                  errors.newPassword ? "border-error_1 bg-error_2" : ""
                }`}
                placeholder="••••••••••"
                type={showPasswords.new ? "text" : "password"}
                {...register("newPassword")}
              />
              <span
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-4 top-3 cursor-pointer"
              >
                {showPasswords.new ? eyeClose() : eyeOpen()}
              </span>
            </div>
            {errors.newPassword && (
              <p className="text-error_1 text-xs">
                {errors.newPassword.message?.toString()}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 w-full max-w-[323px]">
            <p className="text-sm md:text-base">Confirm password</p>
            <div className="relative w-full">
              <input
                className={`outline-none border rounded-lg h-10 px-4 w-full ${
                  errors.confirmPassword ? "border-error_1 bg-error_2" : ""
                }`}
                placeholder="••••••••••"
                type={showPasswords.confirm ? "text" : "password"}
                {...register("confirmPassword")}
              />
              <span
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-4 top-3 cursor-pointer"
              >
                {showPasswords.confirm ? eyeClose() : eyeOpen()}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-error_1 text-xs">
                {errors.confirmPassword.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-8 justify-start items-center w-full text-base font-medium mt-2 mb-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="max-w-[153px] w-full text-background bg-text_strong rounded-full px-6 h-10 flex justify-center items-center disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="max-w-[153px] w-full text-text_strong border bg-background rounded-full px-6 h-10 flex justify-center items-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
