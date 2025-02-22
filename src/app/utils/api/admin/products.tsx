import { axios$ } from "../../..";

interface ProductData {
  addToInventory: boolean;
  category: 'men' | 'women' | 'unisex';  // restricting to specific categories
  currency: 'USD' | 'NGN';  // restricting to supported currencies
  description: string;
  images: string[];
  isFeatured: boolean;
  name: string;
  price: number;
  priceDiscount?: number;  // optional since it's a discount
  size: string;
  subCategory: string;
}

export const createProduct = async (data: ProductData) => {
  try {
    const response = await axios$.post("/product", data);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};



// export const updateProduct = async (data: ProductData) => {
//   try {
//     const response = await axios$.put("/product", data);
//     return response;
//   } catch (error: unknown) {
//     throw error;
//   }
// };

// export const deleteProduct = async (productId: string) => {
//   try {
//     const response = await axios$.delete(`/product/${productId}`);
//     return response;
//   } catch (error: unknown) {
//     throw error;
//   }
// }

export const fetchAllProducts = async (page:number,size:number) => {
  try {
    const response = await axios$.get(`/product/admin?page=${page}&size=${size}`);
    return response;
  } catch (error: unknown) {
    throw error;
  }
}

export const fetchProduct = async (productId: string) => {
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