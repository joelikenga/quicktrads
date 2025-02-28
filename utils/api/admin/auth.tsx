import { axios$ } from "../../../src/app";

interface loginData {
    email: string;
    password: string;
  }

export const adminLogin = async (data: loginData) => {
    try {
      const response = await axios$.post("/auth/admin/login", data);
      return response;
    } catch (error: unknown) {
      throw error;
    }
  };