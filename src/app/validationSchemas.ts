import { z } from "zod";

export const login = z.object({
  email: z.string().min(3, "Invalid Email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    // .refine((value) => /[A-Z]/.test(value), {
    //   message: "Password must include at least one uppercase letter",
    // })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must include at least one lowercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must include at least one number",
    }),
  // .refine((value) => /[!@#$%^&*()]/.test(value), {
  //   message: "Password must include at least one special character",
  // }),
});
export const forgotPassword_Step_1 = z.object({
  step1: z.object({
    email: z.string().email("Invalid email format"),
  }),
});

export const forgotPassword_Step_2 = z.object({
  step2: z.object({
    OTP: z
      .string()
      .length(5, "OTP must be exactly 5 digits")
      .regex(/^\d{5}$/, "OTP must be a number"),
  }),
});

export const forgotPassword_Step_3 = z.object({
  step3: z
    .object({
      Password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .refine((value) => /[A-Z]/.test(value), {
          message: "Password must include at least one uppercase letter",
        })
        .refine((value) => /[a-z]/.test(value), {
          message: "Password must include at least one lowercase letter",
        })
        .refine((value) => /\d/.test(value), {
          message: "Password must include at least one number",
        })
        .refine((value) => /[!@#$%^&*()]/.test(value), {
          message: "Password must include at least one special character",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.Password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});


export const signup_Step_1 = z.object({
  step1: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email format"),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must include at least one uppercase letter",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must include at least one lowercase letter",
      })
      .refine((value) => /\d/.test(value), {
        message: "Password must include at least one number",
      })
      .refine((value) => /[!@#$%^&*()]/.test(value), {
        message: "Password must include at least one special character",
      }),
    confirmPassword: z.string(),
  }).refine((data) => data.Password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
});
export const signup_Step_2 = z.object({
  step2: z.object({
    OTP: z
      .string()
      .length(5, "OTP must be exactly 5 digits")
      .regex(/^\d{5}$/, "OTP must be a number"),
  }),
});

