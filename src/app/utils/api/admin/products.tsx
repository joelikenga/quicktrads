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





