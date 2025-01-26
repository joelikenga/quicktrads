"use client";

import {
  celebration,
  checked,
  eyeClose,
  eyeOpen,
  logo,
  spinner,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPassword_Step_1,
  forgotPassword_Step_2,
  forgotPassword_Step_3,
} from "@/app/validationSchemas";
import {
  forgetPassword,
  resetPassword,
  validateOtp,
} from "@/app/utils/api/user/auth";
import { set } from "zod";

type step_1 = {
  email: string;
};
type step_2 = {
  OTP: string;
};
type step_3 = {
  Password: string;
  confirmPassword: string;
};

interface steps {
  step1: step_1;
  step2: step_2;
  step3: step_3;
}

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const currentYear = new Date().getFullYear();

export const Body = () => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<steps>({
    step1: { email: "" },
    step2: { OTP: "" },
    step3: { Password: "", confirmPassword: "" },
  });

  const [otpArray, setOtpArray] = useState(["", "", "", "", ""]);
  // const [isBlinking, setIsBlinking] = useState<boolean>(false);
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // setHasStarted(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (timeLeft === 0) {
        setTimeLeft(1 * 60);
      }
      setIsRunning(true);
      // setHasStarted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<steps>({
    resolver: zodResolver(
      step === 1
        ? forgotPassword_Step_1
        : step === 2
        ? forgotPassword_Step_2
        : forgotPassword_Step_3
    ),
  });

  // const handleBack = () => {
  //   if (step > 1) {
  //     setStep((prev) => prev - 1);
  //     if (step === 2) {
  //       setValue("step1.email", data.step1.email);
  //     } else if (step === 3) {
  //       setValue("step2.OTP", data.step2.OTP);
  //     }
  //   }
  // };

  // const handleForward = (formData: steps) => {
  //   if (step === 1) {
  //     console.log(formData.step1); // Log Step 1 Data
  //     setData((prevData) => ({ ...prevData, step1: formData.step1 }));
  //   } else if (step === 2) {
  //     console.log(formData.step2); // Log Step 2 Data
  //     setData((prevData) => ({ ...prevData, step2: formData.step2 }));
  //   } else if (step === 3) {
  //     console.log(formData.step3); // Log Step 3 Data
  //     setData((prevData) => ({ ...prevData, step3: formData.step3 }));
  //   }
  //   setStep((prevStep) => prevStep + 1);
  // };

  const onSubmit: SubmitHandler<steps> = async (formData) => {
    if (step === 1) {
      setLoading(true);
      try {
        const res = await forgetPassword(formData.step1.email);
        setData((prevData) => ({
          ...prevData,
          step1: formData.step1,
        }));
        setStep(2);
      } catch (error: unknown) {
        console.error("User registration error:", error);
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      if (formData.step2.OTP.length === 5) {
        setLoading(true);
        try {
          const otpValidationResponse = await validateOtp(
            data.step1.email,
            formData.step2.OTP
          );
          if (otpValidationResponse) {
            setData((prevData) => ({
              ...prevData,
              step2: formData.step2,
            }));
            setStep(3);
          }
        } catch (error: unknown) {
          console.error("OTP validation error:", error);
        } finally {
          setLoading(false);
        }
      }
    } else if (step === 3) {
      setLoading(true);
      if (formData.step3.Password !== formData.step3.confirmPassword) {
        console.error("Passwords do not match");
        setLoading(false);
        return;
      }
      try {
        const reset = await resetPassword(
          data.step1.email,
          data.step2.OTP,
          formData.step3.Password
        );
        setData((prevData) => ({
          ...prevData,
          step3: formData.step3,
        }));
        setStep(4);
      } catch (error: unknown) {
        console.error("reset error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (value.length > 1) return;

    const updatedOtpArray = [...otpArray];
    updatedOtpArray[index] = value;
    setOtpArray(updatedOtpArray);

    if (value && index < 4) {
      const nextInput = document.querySelector(
        `input[name=otp${index + 1}]`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
    // Combine OTP digits into a single string
    const combinedOtp = updatedOtpArray.join("");

    // Update step2.OTP in form
    setValue("step2.OTP", combinedOtp, { shouldValidate: true });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* ------- container ---------- */}
      <div className=" h-full max-h-[680px  w-full flex justify-between">
        {/* "----- input section -----" */}
        <div className="flex justify-center items-center h-full w-full max-w-[483px]  overflow-y-auto hidden_scroll  pt-20  px-4 sm:px-0">
          <div className=" w-full   max-h-[680px] h-full bg-background flex flex-col items-center justify-between   gap-[87px]">
            {/* ---- */}
            <div className="flex flex-col items-center w-full">
              {/* ----- logo and text ----- */}
              <div className="flex flex-col gap-6 items-center ">
                {/* logo */}
                {step === 4 ? null : <i>{logo()}</i>}
                {step === 1 && (
                  <div className="flex flex-col gap-2 items-center text-center">
                    <p
                      className={` ${lora.className} text-[22px] font-normal text-text_strong`}
                    >
                      Forget password
                    </p>
                    <p className={` text-sm font-normal text-text_weak`}>
                      {"Please enter your account email address"}
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-2 items-center text-center">
                    <p
                      className={` ${lora.className} text-[22px] font-normal text-text_strong`}
                    >
                      Verify email
                    </p>
                    <p className={` text-sm font-normal text-text_weak`}>
                      {`Please enter the code sent to  `}
                    </p>
                    <p className={` text-sm font-normal text-text_weak`}>
                      {" "}
                      {`"${data.step1.email}"`}
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-2 items-center text-center">
                    <p
                      className={` ${lora.className} text-[22px] font-normal text-text_strong`}
                    >
                      Reset password
                    </p>
                    <p className={` text-sm font-normal text-text_weak`}>
                      {`Please reset password with details below`}
                    </p>
                  </div>
                )}
              </div>

              {/* ----- Input ----- */}
              <form
                method="post"
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 max-w-[323px] w-full flex flex-col gap-4"
              >
                {/* ----- step-1 ----- */}
                {step === 1 && (
                  <div className="flex flex-col w-full text-text_strong text-sm font-normal gap-2">
                    <p className="">Email</p>

                    <input
                      className={`${
                        errors.step1?.email
                          ? "border-error_1 shake bg-error_2"
                          : "focus:border-stroke_strong"
                      } w-full border  outline-none rounded-lg h-10 px-4 `}
                      placeholder="Sample@gmail.com"
                      type="email"
                      {...register("step1.email")}
                    />
                    {errors.step1?.email && (
                      <div className="text-xs text-error_1">
                        {errors.step1.email.message}
                      </div>
                    )}

                    {/* ----- proceed button ----- */}
                    <button
                      type="submit"
                      className="bg-text_strong text-background h-10 rounded-full flex justify-center items-center text-center text-base font-medium mt-8"
                    >
                      {loading ? (
                        <i className="animate-spin ">{spinner()} </i>
                      ) : (
                        <p>Proceed</p>
                      )}
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <>
                    {" "}
                    <div className="flex w-full justify-center gap-4 ">
                      {otpArray.map((otp, index) => (
                        <input
                          key={index}
                          name={`otp${index}`}
                          autoFocus={index === 0}
                          type="number"
                          maxLength={1}
                          value={otpArray[index]}
                          className={`border w-[44px] h-[44px] text-black py-5 font-semibold px-4 rounded-lg text-center outline-none ${
                            errors.step2?.OTP
                              ? "border-error_1 shake bg-error_2"
                              : "focus:border-stroke_strong"
                          }`}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Backspace" &&
                              otpArray[index] === "" &&
                              index > 0
                            ) {
                              const prevInput = document.querySelector(
                                `input[name=otp${index - 1}]`
                              ) as HTMLInputElement;
                              prevInput?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                    {/* ----- timer ----- */}
                    <div className="bg-background  w-full   flex justify-center items-center text-sm font-medium gap-2 ">
                      {isRunning ? (
                        checked()
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_4118_50769)">
                            <path
                              d="M0.9375 9C0.9375 4.5472 4.5472 0.9375 9 0.9375C13.4528 0.9375 17.0625 4.5472 17.0625 9C17.0625 13.4528 13.4528 17.0625 9 17.0625C4.5472 17.0625 0.9375 13.4528 0.9375 9Z"
                              fill="#CC2125"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.25 12C8.25 11.5858 8.58429 11.25 8.99665 11.25H9.00335C9.41571 11.25 9.75 11.5858 9.75 12C9.75 12.4142 9.41571 12.75 9.00335 12.75H8.99665C8.58429 12.75 8.25 12.4142 8.25 12Z"
                              fill="white"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 9.75C8.58579 9.75 8.25 9.41421 8.25 9L8.25 6C8.25 5.58579 8.58579 5.25 9 5.25C9.41421 5.25 9.75 5.58579 9.75 6L9.75 9C9.75 9.41421 9.41421 9.75 9 9.75Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4118_50769">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      <p className="text-text_strong">Didn’t get the code?</p>
                      {isRunning ? (
                        <p className="text-success_1">{formatTime(timeLeft)}</p>
                      ) : (
                        <p
                          onClick={() => toggleTimer()}
                          className="text-text_strong underline cursor-pointer"
                        >
                          Resend
                        </p>
                      )}
                    </div>
                    {/* ----- proceed button ----- */}
                    <button
                      type="submit"
                      className="bg-text_strong text-background h-10 rounded-full flex justify-center items-center text-center text-base font-medium mt-8"
                    >
                      {loading ? (
                        <i className="animate-spin ">{spinner()} </i>
                      ) : (
                        <p>Proceed</p>
                      )}
                    </button>
                  </>
                )}

                {step === 3 && (
                  <div className="w-full">
                    <div className="flex flex-col w-full text-text_strong text-sm font-normal gap-2">
                      <p className="">Password</p>

                      <div className="relative">
                        <input
                          className={`${
                            errors.step3?.Password
                              ? "border-error_1 shake bg-error_2"
                              : "focus:border-stroke_strong"
                          } w-full border  outline-none rounded-lg h-10 px-4 `}
                          placeholder="••••••••••"
                          type={showPassword ? "text" : "password"}
                          {...register("step3.Password")}
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
                      {errors.step3?.Password && (
                        <div className="text-xs text-error_1">
                          {errors.step3.Password.message}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full text-text_strong text-sm font-normal gap-2 mt-4">
                      <p className="">Confirm password</p>

                      <div className="relative">
                        <input
                          className={`${
                            errors.step3?.confirmPassword
                              ? "border-error_1 shake bg-error_2"
                              : "focus:border-stroke_strong"
                          } w-full border  outline-none rounded-lg h-10 px-4 `}
                          placeholder="••••••••••"
                          type={showPassword1 ? "text" : "password"}
                          {...register("step3.confirmPassword")}
                        />
                        <span
                          onClick={() => {
                            setShowPassword1(!showPassword1);
                          }}
                          className="absolute right-4 top-3 bg-background cursor-pointer  flex items-center "
                        >
                          <i>{showPassword1 ? eyeClose() : eyeOpen()}</i>
                        </span>
                      </div>

                      {errors.step3?.confirmPassword && (
                        <div className="text-xs text-error_1">
                          {errors.step3.confirmPassword.message}
                        </div>
                      )}
                    </div>

                    {/* ----- proceed button ----- */}
                    <button
                      type="submit"
                      className="w-full bg-text_strong text-background h-10 rounded-full flex justify-center items-center text-center text-base font-medium mt-8"
                    >
                      {loading ? (
                        <i className="animate-spin ">{spinner()} </i>
                      ) : (
                        <p>Proceed</p>
                      )}
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col  justify-center gap-6 items-center w-full">
                    {celebration()}
                    <div className="flex flex-col items-center text-center gap-4 justify-center w-full ">
                      <p
                        className={` ${lora.className} text-[22px] font-normal text-text_strong`}
                      >
                        Password reset
                      </p>
                      <p className="font-base text-text_weak text-sm max-w-[312px] w-full">
                        Your password has been successfully reset, login to
                        explore a world of trendy Africa garment styles with
                        exclusive deals
                      </p>
                    </div>
                    <Link className="w-full" href={`/login`}>
                      <button
                        type="submit"
                        className=" w-full bg-text_strong text-background h-10 rounded-full flex justify-center items-center text-center text-base font-medium mt-8"
                      >
                        <p>Shop now</p>
                      </button>
                    </Link>
                  </div>
                )}

                {step === 4 ? null : (
                  <div className="w-full flex justify-center text-sm mt-8">
                    <div className="">
                      {"Remember password?"}{" "}
                      <Link className="underline" href={`/login`}>
                        Login
                      </Link>
                    </div>
                  </div>
                )}
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
