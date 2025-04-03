/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  arrowleft,
  ordersIcon,
  orderSmallIcon,
  successInfoIcon,
  unsuccessfulIcon,
  vanIcon,
  xIcon,
} from "@/app/global/svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOrder, killOrder } from "../../../../utils/api/user/product";
import { useParams } from "next/navigation";
import { successToast } from "@/utils/toast/toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceConvert: number;
  priceDiscount: number | null;
  priceDiscountConvert: number | null;
  images: string[];
  currency: string;
  currencyConvert: string;
  size: string;
  category: string;
  subCategory: string;
  addToInventory: boolean;
  isFeatured: boolean;
  isPaid: boolean;
  isReviewed: boolean;
  paidAt: string;
  status: string;
  stars: number;
  ordersCount: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  currency: string;
  amount: number;
}

interface ShippingDetails {
  address: string;
  country: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  state: string;
}

interface OrderResponse {
  id: string;
  createdAt: string;
  currency: string;
  dhlStatus: string | null;
  dhlStatusCode: string | null;
  order: OrderItem[];
  paymentMethod: string;
  reason: string | null;
  shippingDetails: ShippingDetails;
  shippingFee: number;
  status: string;
  subTotal: number;
  tax: number;
  totalAmount: number;
  trackingID: string | null;
  updatedAt: string;
  usdAmount: number;
  userId: string;
}

// Helper function for status colors
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return {
        bg: "bg-warning_1 bg-opacity-10",
        text: "text-warning_1",
        dot: "bg-warning_1",
      };
    case "processing":
      return {
        bg: "bg-[#1F0EC9] bg-opacity-10",
        text: "text-[#1F0EC9]",
        dot: "bg-[#1F0EC9]",
      };
    case "delivered":
      return {
        bg: "bg-success_1 bg-opacity-10",
        text: "text-success_1",
        dot: "bg-success_1",
      };
    case "refunded":
      return {
        bg: "bg-black bg-opacity-10",
        text: "text-black",
        dot: "bg-black",
      };
    case "cancelled":
      return {
        bg: "bg-error_1 bg-opacity-10",
        text: "text-error_1",
        dot: "bg-error_1",
      };
    case "shipped":
      return {
        bg: "bg-[#1F0EC9] bg-opacity-10",
        text: "text-[#1F0EC9]",
        dot: "bg-[#1F0EC9]",
      };
    default:
      return {
        bg: "bg-[#1F0EC9] bg-opacity-10",
        text: "text-[#1F0EC9]",
        dot: "bg-[#1F0EC9]",
      };
  }
};

const getStatusIcon = (
  currentStep: string,
  orderStatus: string | undefined
) => {
  if (!orderStatus) return unsuccessfulIcon();

  switch (currentStep) {
    case "pending":
      return orderStatus !== "cancelled"
        ? successInfoIcon()
        : unsuccessfulIcon();
    case "processing":
      return ["processing", "shipped", "delivered"].includes(orderStatus)
        ? successInfoIcon()
        : unsuccessfulIcon();
    case "delivered":
      return orderStatus === "delivered"
        ? successInfoIcon()
        : unsuccessfulIcon();
    default:
      return unsuccessfulIcon();
  }
};

// Skeleton Loading Components
const OrderInfoSkeleton = () => (
  <div className="grid grid-cols-5 p-6 w-[940px] border rounded-lg mt-8 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex gap-8 items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const OrderItemsSkeleton = () => (
  <table className="w-full divide-y divide-stroke_weak overflow-x-auto max-w-[651px]">
    <thead className="text-start bg-background border-y">
      <tr>
        {["Product details", "Size", "Quantity", "Price"].map((header) => (
          <th
            key={header}
            className="px-4 py-3 text-start font-normal text-sm h-10"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[...Array(3)].map((_, i) => (
        <tr key={i} className="border-b">
          <td className="pl-4 py-4">
            <div className="flex gap-6 items-start w-[360px]">
              <div className="w-[70px] h-[85px] bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const TrackOrdersSkeleton = () => (
  <div className="w-full max-w-[829px] flex flex-col gap-12 py-6 border-t animate-pulse">
    <div className="w-full grid grid-cols-5 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          {i === 1 && <div className="h-4 w-40 bg-gray-200 rounded"></div>}
        </div>
      ))}
    </div>
    <div className="w-full flex justify-start items-center">
      <div className="flex gap-16">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Body = () => {
  const { id } = useParams();
  const [tab, setTab] = useState<string>("order items");
  const [cancelOrder, setCancelOrder] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reason, setReason] = useState<string>("");

  const order = async (id: string) => {
    try {
      setLoading(true);
      const response = (await getOrder(id)) as any;
      if (response.code === 200) {
        setOrderData(response.data);
      }
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (typeof id === "string") {
        await killOrder(id, reason);
      }
      successToast("Order cancelled")
      setCancelOrder(false)
      
    } catch (err: any) {
      throw err;
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      order(id);
    }
  }, [id]);

  // Apply status color to order status
  const statusColor = orderData?.status
    ? getStatusColor(orderData.status)
    : null;

  return (
    <div className="md:ml-[280px] mt-[150px]">
      {cancelOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg">
            <div className="w-full flex flex-col items-center gap-4">
              {ordersIcon()}
              <p className="max-w-[240px] w-full text-center">
                Are you sure you want to cancel order?
              </p>
              <p className="w-full text-center">
                {`This action will cancel order. If you're not sure to make cancel order, you can go back`}
              </p>

              {/* reason */}
                <div className="w-full flex flex-col items-start gap-2">
                <p>
                  Reason <span>{`(optional)`}</span>
                </p>
                <textarea
                  className="border outline-none rounded-lg w-full resize-none h-[88px] px-4 py-2"
                  placeholder="Enter reason for cancellation"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
                  value={reason}
                />
                </div>
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-4">
              <button onClick={handleCancelOrder}  className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border">
                <p>Yes, cancel order</p>
              </button>
              <button
                onClick={() => setCancelOrder(false)}
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
              >
                <p>Go back</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-2 items-center font-normal text-nowrap w-full">
        <div
          onClick={() => history.back()}
          className="text-text_strong text-[22px] flex items-center gap-2 cursor-pointer"
        >
          {arrowleft()}
          <>Order details</>
        </div>
        {orderData?.status !== "canceled" &&
          !orderData?.trackingID &&
          (loading ? (
            <div className="h-8 rounded-lg w-24 bg-gray-200" />
          ) : (
            <div
              onClick={() => setCancelOrder(true)}
              className="flex gap-2 items-center cursor-pointer"
            >
              <i>{xIcon()}</i>
              <p className="text-text_weak text-base underline">{`Cancel order`}</p>
            </div>
          ))}
      </div>

      {/* content section */}
      <div className="px-0 md:px-7 flex flex-col gap-12">
        {loading ? (
          <OrderInfoSkeleton />
        ) : (
          <div className="grid grid-cols-5 p-6 w-[940px] border rounded-lg mt-8">
            <div className="flex gap-8 items-center col-span-1">
              <i>{orderSmallIcon()}</i>
              <div className="flex-col items-center justify-center">
                <p className="text-text_weak">Items</p>
                <p className="text-text_strong">
                  {orderData?.order.length || 0}
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center col-span-1 border-x-2 px-6">
              <div className="flex-col items-center justify-center">
                <p className="text-text_weak">Order status</p>
                {statusColor && (
                  <div className={`${statusColor.text} capitalize`}>
                    {orderData?.status || "N/A"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-8 items-center col-span-1 px-6">
              <div className="flex-col items-center justify-center">
                <p className="text-text_weak">Payment method</p>
                <p className="text-text_strong">
                  {orderData?.paymentMethod || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center col-span-1 border-x-2 px-6">
              <div className="flex-col items-end justify-center">
                <p className="text-text_weak">Tracking ID</p>
                <p className="text-text_strong">
                  {orderData?.trackingID || "No tracking ID"}
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center col-span-1 px-6">
              <div className="flex-col items-center justify-center">
                <p className="text-text_weak">Date</p>
                <p className="text-text_strong">
                  {orderData?.createdAt
                    ? new Date(orderData.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="w-full">
          {/* tab */}
          <div className="w-full flex justify-start gap-[20px] font-medium text-base">
            <button
              onClick={() => setTab("order items")}
              className={`${
                tab === "order items" ? "border-black" : "border-transparent"
              } border-b-2 pb-6 cursor-pointer`}
            >
              Order items
            </button>
            <button
              onClick={() => setTab("track orders")}
              className={`${
                tab === "track orders" ? "border-black" : "border-transparent"
              } border-b-2 pb-6 cursor-pointer`}
            >
              Track orders
            </button>
          </div>

          {/* content */}
          {loading ? (
            tab === "order items" ? (
              <OrderItemsSkeleton />
            ) : (
              <TrackOrdersSkeleton />
            )
          ) : (
            <>
              {tab === "order items" ? (
                <table className="w-full divide-y divide-stroke_weak overflow-x-auto max-w-[651px]">
                  <thead className="text-start bg-background border-y">
                    <tr>
                      <th className="px-4 py-3 text-start font-normal text-sm h-10">
                        Product details
                      </th>
                      <th className="px-4 py-3 text-start font-normal text-sm h-10">
                        Size
                      </th>
                      <th className="px-4 py-3 text-start font-normal text-sm h-10">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-start font-normal text-sm h-10">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-stroke_weak">
                    {orderData?.order.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="pl-4 py-4">
                          <div className="flex gap-6 items-start w-[360px]">
                            <Image
                              className="w-[70px] h-[85px] object-cover"
                              src={
                                item.product.images[0] || "/heroFallback.jpg"
                              }
                              priority
                              width={69}
                              height={80}
                              alt={item.product.name}
                            />
                            <div className="text-text_strong text-sm font-normal text-wrap">
                              {item.product.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap w-[120px] capitalize">
                            {item.product.size}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap">
                            {item.currency} {item.amount} x {item.quantity} item
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                            {item.currency} {item.amount * item.quantity}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* Order summary */}
                    <tr>
                      <td className="pl-4 py-4"></td>
                      <td className="px-4 py-4"></td>
                      <td className="px-4 py-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap">
                          Delivery fee
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                          {orderData?.currency} {orderData?.shippingFee || 0}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="pl-4 py-4"></td>
                      <td className="px-4 py-4"></td>
                      <td className="px-4 py-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap">
                          Subtotal
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                          {orderData?.currency} {orderData?.subTotal || 0}
                        </div>
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="pl-4 py-4"></td>
                      <td className="px-4 py-4"></td>
                      <td className="px-4 py-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap">
                          Total
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                          {orderData?.currency} {orderData?.subTotal || 0}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="w-full max-w-[829px] flex flex-col gap-12 py-6 border-t">
                  <div className="w-full grid grid-cols-5">
                    <div className="col-span-1 flex justify-between gap-2 pr-6 items-start w-fit">
                      <i>{vanIcon()}</i>
                      <div className="flex flex-col items-center">
                        <p className="text-text_weak text-sm font-normal">
                          Order type
                        </p>
                        <p className="text-text_strong text-base font-normal">
                          Home delivery
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center gap-2 px-6 items-center border-x-2 w-fit">
                      <div className="flex flex-col items-center">
                        <p className="text-text_weak text-sm font-normal">
                          contact information
                        </p>
                        <p className="text-text_strong text-base font-normal">
                          {orderData?.shippingDetails.fullName}
                        </p>
                        <div className="text-text_weak text-base font-normal flex gap-1 items-center">
                          <p>{orderData?.shippingDetails.phoneNumber}</p>
                          <>|</>
                          <p>{orderData?.shippingDetails.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center text-center gap-2 pl- items-center w-full max-w-258px">
                      <div className="flex flex-col justify-center">
                        <p className="text-text_weak text-sm font-normal text-center">
                          Shipping address
                        </p>
                        <p className="text-text_strong text-base font-normal">
                          {`${orderData?.shippingDetails.address}, ${orderData?.shippingDetails.state}, ${orderData?.shippingDetails?.country}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* tracking view */}
                  <div className="w-full flex justify-start items-center">
                    <div className="w-fit flex justify-center items-center">
                      {/* order confirmed */}
                      <div>
                        <div className="flex-flex-col items-center">
                          <div className="w-fit flex justify-end">
                            <div className="flex items-center justify-end pl-[100px] w-fit">
                              <i>
                                {getStatusIcon("pending", orderData?.status)}
                              </i>
                              <span className="w-[100px] border h-0.5 bg-stroke_weak"></span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center mt-4">
                            <p className="text-text_weak text-sm font-normal">
                              Order confirmed
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Product shipped */}
                      <div>
                        <div className="flex-flex-col items-center">
                          <div className="w-fit flex justify-end">
                            <div className="flex items-center justify-end w-fit">
                              <span className="w-[86px] border h-0.5 bg-stroke_weak"></span>
                              <i>
                                {orderData?.dhlStatus
                                  ? successInfoIcon()
                                  : unsuccessfulIcon()}
                              </i>
                              <span className="w-[100px] border h-0.5 bg-stroke_weak"></span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center mt-4">
                            <p className="text-text_weak text-sm font-normal">
                              Product shipped
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Product Delivered */}
                      <div>
                        <div className="flex-flex-col items-center">
                          <div className="w-fit flex justify-end">
                            <div className="flex items-center justify-end w-fit pr-[100px]">
                              <span className="w-[100px] border h-0.5 bg-stroke_weak"></span>
                              <i>
                                {getStatusIcon("delivered", orderData?.status)}
                              </i>
                            </div>
                          </div>
                          <div className="flex flex-col items-center mt-4">
                            <p className="text-text_weak text-sm font-normal">
                              Product Delivered
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
