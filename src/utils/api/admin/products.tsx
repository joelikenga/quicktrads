 import { axios$ } from "../../../app";

interface ProductData {
  addToInventory: boolean;
  category: "men" | "women" | "unisex"; // restricting to specific categories
  currency: "NGN"; // restricting to supported currencies
  description: string;
  images: string[];
  isFeatured: boolean;
  name: string;
  price: number;
  priceDiscount?: number; // optional since it's a discount
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
  heroPageName: string; // Enforce specific value
}

interface updateOrderStatus{
  status: 'canceled'| 'processing'| 'refunded'| 'delivered'| 'shipped' | 'completed';
  trackingNumber: string;
}

export const createProduct = async (data: ProductData) => {
  try {
    const response = await axios$.post("/product", data);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateProduct = async (id: string, data: ProductData) => {
  try {
    const response = await axios$.patch(`/product/${id}`, data);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateProductStatus = async (id: string, status: string) => {
  try {
    const response = await axios$.patch(`/product/status/${id}`, {status});
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
};

export const fetchAllProducts = async (page: number, size: number) => {
  try {
    const response = await axios$.get(
      `/product/admin?page=${page}&size=${size}`
    );
    // //console.log("Raw API response:", response);

    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const fetchProduct = async (productId: string) => {
  try {
    // //console.log("Fetching product with ID:", productId);
    const response = await axios$.get(`/product/${productId}`);
    // //console.log("Raw API response:", response);

    // Add validation for response structure
    if (!response?.data) {
      throw new Error("Invalid response structure");
    }

    return response;
  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios$.get(`/admin/order`);
    // //console.log("order response", response);

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

export const updateOrderStatus = async (id: any,data:updateOrderStatus) => {
  try {
    const response = await axios$.patch(`/admin/order/${id}`,data);
    // //console.log("response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const adminDashboard = async () => {
  try {
    const response = await axios$.get(`/auth/admin/dashboard`);
    // //console.log("order response", response);

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

export const updateSettings = async (data: Settings) => {
  try {
    const response = await axios$.patch(`/auth/admin/settings`, data);
    return response;
  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};

export const updateContent = async (id:string,data: HeroPage) => {
  try {
    const response = await axios$.patch(`/auth/admin/hero-section/${id}`, data);
    return response;
  } catch (error: unknown) {
    // console.error("API error:", error);
    throw error;
  }
};

export const createContent = async (data: HeroPage) => {
  try {
    const response = await axios$.post(`/auth/admin/hero-section`, data);
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

export const getCustomers = async (page: number, size: number) => {
  try {
    const response = await axios$.get(
      `/auth/admin/users?page=${page}&size=${size}`
    );
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateUserStatus = async (
  id: any,
  data: "active" | "inactive" | "blocked"
) => {
  try {
    const response = await axios$.patch(`/auth/admin/user-status/${id}`, data);
    return response;
    // console.error("API error:", response);
  } catch (error: unknown) {
    throw error;
  }
};

export const getCustomer = async (id: any) => {
  try {
    const response = await axios$.get(`/auth/admin/user/${id}`);
    // //console.log("response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};


export const getStatusCount = async (id: any) => {
  try {
    const response = await axios$.get(`/admin/orders/status-count?userID=${id}`);
    //console.log("response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};


export const getSalesAnalytics = async (duration: any) => {
  try {
    const response = await axios$.get(`/auth/admin/sales-analytics?duration=${duration}`);
    //console.log("response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getOrderAnalytics = async (duration: any) => {
  try {
    const response = await axios$.get(`/auth/admin/orders-analytics?duration=${duration}`);
    //console.log("response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getProductAnalytics = async (duration: any) => {
  try {
    const response = await axios$.get(`/auth/admin/product-analytics?duration=${duration}`);
    //console.log("response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getUserAnalytics = async (duration: any) => {
  try {
    const response = await axios$.get(`/auth/admin/product-analytics?duration=${duration}`);
    //console.log("response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
 };


export const getAdminNotifications = async () => {
  try {
    const response = await axios$.get(`/auth/admin/notification`);
    return response; 
  } catch (error: unknown) {
    throw error;
  }
}

export const markAsRead = async (id:any) => {
  try {
    const response = await axios$.get(`/auth/admin/notification/${id}`);
    return response; 
  } catch (error: unknown) {
    throw error;
  }
}