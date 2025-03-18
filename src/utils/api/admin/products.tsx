import { axios$ } from "../../../app";

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

interface Settings {
  customer: {
    orderUpdates: boolean;
    customerMessages: boolean;
    reviewAlerts: boolean;
    customerActivity: boolean;
  };
  admin: {
    SuspeciousActivity: boolean;
    passwordChange: boolean;
  };
}

interface HeroPage {
  id: string;
  userId: string;
  backgroundColor: string;
  heroTitle: string;
  heroSubTitle: string;
  heroImage: string;
  heroBtnText: string;
  heroBtnTextColor: string;
  heroBtnBgColor: string;
  heroBtnCTA: string;
  heroPageName: "heroPageMain"; // Enforce specific value
}

export const createProduct = async (data: ProductData) => {
  try {
    const response = await axios$.post("/product", data);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};



export const updateProduct = async (id:string,data:ProductData) => {
  try {
    const response = await axios$.patch(`/product/${id}`,data);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateProductStatus = async (id:string,status:string) => {
  try {
    const response = await axios$.patch(`/product/status/${id}`,status);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios$.delete(`/product/${id}`);
    return response;
  } catch (error: unknown) {
    throw error;
  }
}

export const fetchAllProducts = async (page:number,size:number) => {
  try {
    const response = await axios$.get(`/product/admin?page=${page}&size=${size}`);
    // console.log("Raw API response:", response);

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


export const getOrders = async () => {
  try {
    const response = await axios$.get(`/admin/order`);
    // console.log("order response", response);

    return response;
  } catch (error: unknown) {
    throw error;
  }
};
export const getOrder = async (orderId: any) => {
  try {
    const response = await axios$.get(`/order/${orderId}`);
    return response;

  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};

export const adminDashboard = async () => {
  try {
    const response = await axios$.get(`/auth/admin/dashboard`);
    // console.log("order response", response);

    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getSettings = async () => {
  try {
    const response = await axios$.get(`/auth/admin/settings`);
    return response;

  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};

export const updateSettings = async (data:Settings) => {
  try {
    const response = await axios$.patch(`/auth/admin/settings`,data);
    return response;

  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};

export const updateContent = async (data:HeroPage) => {
  try {
    const response = await axios$.patch(`/auth/admin/hero-section`,data);
    return response;

  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};

export const getContent = async () => {
  try {
    const response = await axios$.get(`/auth/hero-section`);
    return response;

  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};