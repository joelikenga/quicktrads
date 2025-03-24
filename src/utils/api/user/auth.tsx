import { axios$ } from "../../../app";

interface UserRegistrationData {
  fullName: string;
  email: string;
  password: string;
  //   confirmPassword: string;
}

interface loginData {
  email: string;
  password: string;
}

// interface otpData {
//   email: string;
//   otp: string;
// }

export const userLogin = async (data: loginData) => {
  try {
    const response = await axios$.post("/auth/login", data);
    console.log('api-console', response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};
export const userSignup = async (data: UserRegistrationData) => {
  try {
    console.log("Sending signup data:", data);
    const response = await axios$.post("/auth/signup", data);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const resendOTP = async (email: string) => {
  try {
    console.log("Sending signup data:", { email });
    const response = await axios$.post("/auth/resend-otp", {
      email,
    });
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const validateOtp = async (email: string, otp: string) => {
  try {
    const response = await axios$.post("/auth/validate-otp", { email, otp });
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios$.post("/auth/verify-otp", { email, otp });
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const response = await axios$.post("/auth/forgot-password", { email });
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string
) => {
  try {
    const response = await axios$.post("/auth/reset-password", {
      email,
      otp,
      password,
    });
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const loggedInUser = async () => {    
  try {
    const response = await axios$.get("/auth/user");
    return response;
  } catch (error: unknown) {
    throw error;
  }
};


