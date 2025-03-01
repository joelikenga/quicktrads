import { axios$ } from "../../../src/app";


interface Address {
  address: string,
country: string,
email: string,
fullName: string,
phoneNumber: string,
state: string
}

export const getAllProducts = async () => {
  try {
    const response = await axios$.get(`/product`);
    // console.log("Raw API response:", response);

    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getProduct = async (productId: string) => {
  try {
    // console.log("Fetching product with ID:", productId);
    const response = await axios$.get(`/product/${productId}`);
    // console.log("Raw API response:", response);

    // Add validation for response structure
    if (!response?.data) {
      throw new Error("Invalid response structure");
    }

    return response;
  } catch (error: unknown) {
    console.error("API error:", error);
    throw error;
  }
};

export const getTrendingProducts = async () => {
  try {
    const response = await axios$.get(`/product/trending`);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getLatestProducts = async () => {
  try {
    const response = await axios$.get(`/product/latest`);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};


export const shippingAddress = async (data:Address) => {
  try {
    const response = await axios$.patch(`/auth/user/shipping-details`, data);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};


