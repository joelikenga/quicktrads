import { axios$ } from "../../../app";


interface OrderProduct {
  productId: string;
  quantity: number;
}

interface ShippingDetails {
  address: string;
  country: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  state: string;
}

 interface OrderRequest {
  currency: string;
  product: OrderProduct[];
  shippingDetails: ShippingDetails;
}

 interface OrderResponse {
  id: string;
  status: string;
  createdAt: string;
}

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
    // // console.log("Raw API response:", response);

    // // Add validation for response structure
    // if (!response?.data) {
    //   throw new Error("Invalid response structure");
    // }

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

export const deleteShippingAddress = async (index:number) => {
  try {
    const response = await axios$.delete(`/auth/user/shipping-details?index=${index}`);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};


export const createOrder = async (data: OrderRequest): Promise<OrderResponse> => {
  try {
    const response = await axios$.post(`/order`, data);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios$.get(`/order`);
    // console.log("order response", response);

    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const response = await axios$.get(`/order/${orderId}`);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

// for cancelling orders

export const killOrder = async (orderId: string, reason: string) => {
  try {
    const response = await axios$.patch(`/order/cancel/${orderId}`, { reason});
    console.log("order response", response);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

interface ReviewData {
  message: string;
  productId: string;
  stars: number;
  userId: string;
}


export const createReview = async (reviewData: ReviewData) => {
  try {
    const response = await axios$.post(`/product/review`,  reviewData );
    console.log("review response", response.data);
    return response.data;
  } catch (error: unknown) {
    // console.error("Error creating review:", error);
    throw error;
  }
};

export const getReview = async (productId: any) => {
  try {
    const response = await axios$.get (`/product/review/${ productId }`);
    console.log("review response", response.data);
    return response.data;
  } catch (error: unknown) {
    // console.error("Error creating review:", error);
    throw error;
  }
};
