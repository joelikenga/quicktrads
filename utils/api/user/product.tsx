import { axios$ } from "../../../src/app";


export const getAllProducts = async () => {
    try {
      const response = await axios$.get(`/product`);
      console.log("Raw API response:", response);
  
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }
  
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