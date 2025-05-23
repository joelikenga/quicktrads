"use client";

import {
  add,
  arrowleft,
  maiIcon,
  numberIcon,
  ordersIcon,
  orderSmallIcon,
  // successIcon,
  successInfoIcon,
  unsuccessfulIcon,
  updateArrowIcon,
  vanIcon,
  // xIcon,
} from "@/app/global/svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOrder, updateOrderStatus } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import { useParams } from "next/navigation";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceConvert: number;
  priceDiscount: number;
  priceDiscountConvert: number;
  images: string[];
  currency: string;
  currencyConvert: string;
  size: string;
  category: string;
  subCategory: string;
  addToInventory: boolean;
  isFeatured: boolean;
  isPaid: boolean;
  paidAt: string;
  status: string;
  stars: number;
  ordersCount: number;
  isReviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  state: string;
  country: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  currency: string;
  amount: number;
}

interface OrderData {
  id: string;
  dhlStatus: any;
  order: OrderItem[];
  shippingDetails: ShippingDetails;
  shippingFee: number;
  status: string;
  subTotal: number;
  tax: number;
  totalAmount: number;
  trackingID: string | null;
  createdAt: string;
  updatedAt: string;
}

export const Body = () => {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<string>("order items");
  const [cancelOrder, setCancelOrder] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trackingId, setTrackingId] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrder = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getOrder(id);
      if (response?.data) {
        setOrderData(response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder(id);
    // Set up auto-refresh interval
    // const interval = setInterval(() => {
    //   fetchOrder(id);
    // }, 1000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async () => {
    try {
      setIsUpdating(true);
      const statusUpdate = await updateOrderStatus(id, {
        status: selectedStatus as
          | "canceled"
          | "processing"
          | "refunded"
          | "delivered"
          | "shipped"
          | "completed",
        trackingNumber: trackingId,
      });
      //console.log(statusUpdate);
      if (statusUpdate) {
        await fetchOrder(id);
        setTrackingId("");
        setSelectedStatus("");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setTrackingId("");
    setSelectedStatus("");
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
        return ["processing", "delivered"].includes(orderStatus)
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

  if (
    isLoading ||
    !orderData ||
    !orderData.order ||
    orderData.order.length === 0
  ) {
    return (
      <div className="md:ml-[280px] mt-[150px] md:mt-[120px]">
        <div className="animate-pulse px-4 md:px-0">
          {/* Header skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
            <div className="h-6 w-32 md:w-48 bg-gray-200 rounded"></div>
          </div>

          {/* Content section skeleton */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-4">
              <div className="min-w-[50px] h-[50px] md:w-[80px] md:h-[80px] bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-2">
                  <div className="h-6 w-32 md:w-48 bg-gray-200 rounded"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 mb-2">
                  <div className="h-4 w-36 bg-gray-200 rounded"></div>
                  <div className="h-4 w-36 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-48 md:w-56 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="hidden md:block h-12 w-32 bg-gray-200 rounded-full"></div>
          </div>

          {/* Stats grid skeleton */}
          <div className="overflow-x-auto w-full mt-8">
            <div className="grid grid-cols-4 p-6 w-[940px] border rounded-lg gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-8 justify-center items-center">
                  {i === 0 && <div className="h-6 w-6 bg-gray-200 rounded"></div>}
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table skeleton */}
          <div className="mt-8">
            <div className="flex gap-[20px] mb-6">
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-[651px]">
                <thead>
                  <tr className="border-y bg-gray-50">
                    {[...Array(5)].map((_, i) => (
                      <th key={i} className="p-4">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(3)].map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-4">
                        <div className="flex gap-6 items-start">
                          <div className="w-[69px] h-[68px] bg-gray-200 rounded"></div>
                          <div className="h-4 w-48 bg-gray-200 rounded"></div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-8 bg-gray-200 rounded"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-[280px] mt-[150px] md:mt-[120px]">
      {cancelOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col items-center gap-4">
              {ordersIcon()}
              <p className={`max-w-[240px] w-full text-center`}>
                Are you sure you want to cancel order?
              </p>
              <p
                className={` w-full text-center`}
              >{`This action will cancel order. If you're not sure to make cancel order, you can go back`}</p>

              {/* reason */}
              <div className="w-full flex flex-col items-start gap-2">
                <p className="">
                  Reason <span className="">{`(optional)`}</span>
                </p>

                <textarea className="border outline-none rounded-lg w-full resize-none h-[88px] px-4 py-2" />
              </div>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border">
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

      <div className="flex justify-start gap-2 items-center font-normal text-nowrap w-full">
        <div
          onClick={() => history.back()}
          className="text-text_strong text-sm md:text-[22px] flex items-center gap-2"
        >
          {arrowleft()}
          <>Order details</>
        </div>
      </div>

      {/* content section */}

      <div className="w-full flex justify-between items-center mt-8 overflow-x-auto">
        {/* image contents */}
        <div className="flex gap-4 items-center">
          <div className="">
            <Image
              className="min-w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full border outline-none"
              src={orderData?.order[0].product.images[0] || ""}
              width={80}
              height={80}
              alt={orderData?.order[0].product.name || ""}
            />
          </div>
          {/* details */}
          <div className="flex flex-col gap-1">
            {/* name */}
            <div className="flex items-center gap-6">
              <p
                className={` ${lora.className} text-text_strong text-base md:text-[22px] font-normal`}
              >
                {orderData?.shippingDetails.fullName}
              </p>
              {/* status */}
              <div className="flex justify-center items-center w-[100px] h-[24px] rounded-full px-2 gap-4">
                <div
                  className={`w-[8px] h-[8px] rounded-full ${
                    getStatusColor(orderData?.status).dot
                  }`}
                ></div>
                <p
                  className={`text-sm font-normal ${
                    getStatusColor(orderData?.status).text
                  }`}
                >
                  {orderData?.status}
                </p>
              </div>
            </div>
            {/* contact */}

            <div className="flex text-start items-center text-sm md:text-base flex-row justify-start gap-2 md:gap-6">
              <div className="flex items-center  gap-2 text-text_weak font-normal ">
                <i>{maiIcon()}</i>
                <p>{orderData?.shippingDetails.email}</p>
              </div>
              <div className="flex items-center gap-2 text-text_weak font-normal ">
                <i>{numberIcon()}</i>
                <p>{orderData?.shippingDetails.phoneNumber}</p>
              </div>
            </div>

            {/* address */}
            <div className=" items-center gap-2 text-sm md:text-base text-text_weak font-normal ">
              <i>{}</i>
              <p>{orderData?.shippingDetails.address}</p>
            </div>
          </div>
        </div>

        {/* update status */}
        {tab === "order items" ? (
          <button
            onClick={() => setTab("track orders")}
            className="hidden bg-background text-text_strong h-12 rounded-full md:flex justify-center items-center text-center text-base font-medium w-fit pl-4 pr-2 border gap-2"
          >
            <p>Update status</p>
            <i>{updateArrowIcon()}</i>
          </button>
        ) : null}
      </div>

      <div className="md:px-7 flex flex-col gap-12  w-full">
        <div className="overflow-x-auto w-full">
          <div className="grid grid-cols-4 p-6 w-[940px] border rounded-lg mt-8 text-center">
            <div className="flex gap-8 justify-center items-center col-span-1">
              <i>{orderSmallIcon()}</i>
              <div className="flex-col items-center justify-center ">
                <p className="text-text_weak">Items</p>
                <p className="text-text_strong">{orderData?.order.length}</p>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center col-span-1 border-l-2 px-6">
              <div className="flex-col items-center justify-center ">
                <p className="text-text_weak">Order status</p>
                <p className="text-text_strong">{orderData?.status}</p>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center col-span-1 border-x-2 px-6">
              <div className="flex-col items-end justify-center flex-end ">
                <p className="text-text_weak">Tracking ID</p>
                <div className="flex gap-2 items-center">
                  <i>{add()}</i>
                  {orderData?.trackingID ? (
                    <p className="text-text_strong underline">
                      {orderData?.trackingID || "Add tracking ID"}
                    </p>
                  ) : (
                    <p
                      onClick={() => setTab("track orders")}
                      className="text-text_strong underline"
                    >
                      {"Add tracking ID"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center col-span-1  px-6">
              <div className="flex-col items-center justify-center ">
                <p className="text-text_weak">Date</p>
                <p className="text-text_strong">
                  {new Date(orderData?.createdAt || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          {/* tab */}

          <div className=" w-full flex justify-start gap-[20px] font-medium text-base">
            <div
              onClick={() => setTab("order items")}
              className={`${
                tab === "order items" ? ` border-black` : `border-transparent  `
              } border-b-2 pb-6 cursor-pointer`}
            >
              Order items
            </div>
            <div
              onClick={() => setTab("track orders")}
              className={`${
                tab === "track orders" ? `border-black` : ` border-transparent `
              } border-b-2 pb-6 cursor-pointer`}
            >
              Track orders
            </div>
          </div>
          {/* table */}
          {tab === "order items" && (
            <div className=" overflow-x-auto">
              <table className="w-ful divide-y divide-stroke_weak   w-[651px]">
                <thead className="text-start bg-background border-y  ">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10 "
                    >
                      Product details
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    >
                      Size
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    >
                      Quantity
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    >
                      Price
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    ></th>
                  </tr>
                </thead>

                <tbody className=" divide-stroke_weak ">
                  {orderData?.order.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="pl-4">
                        <div className="flex gap-6 items-start w-[360px]">
                          <Image
                            className="w-[69px] h-[68px]"
                            src={item.product.images[0] || ""}
                            width={69}
                            height={80}
                            alt={item.product.name}
                          />
                          <div className="text-text_strong text-sm font-normal text-wrap">
                            {item.product.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap w-[120px] capitalize">
                          {item.product.size}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap">
                          {item.currency} {item.amount} x {item.quantity}{" "}
                          item(s)
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                          {item.currency} {item.amount * item.quantity}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="p-4">Delivery fee</td>
                    <td className="p-4">{orderData?.shippingFee}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="p-4">Subtotal</td>
                    <td className="p-4">{orderData?.subTotal}</td>
                  </tr>
                  <tr className="border-t">
                    <td></td>
                    <td></td>
                    <td className="p-4">Total</td>
                    <td className="p-4">{orderData?.subTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* track orders */}
          {tab === "track orders" && (
            <div className="w-full max-w-[829px flex flex-col  gap-12 mt-12">
              <div className="overflow-x-auto">
                <div className="w-full flex grid-cols-5">
                  <div className="col-span-1 flex justify-between gap-2 pr-6 items-start w-full">
                    <i>{vanIcon()}</i>
                    <div className="flex flex-col items-center text-nowrap">
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
                  <div className="col-span-2 flex justify-center text-center gap-2 pl-4 items-center w-full max-w-[258px]">
                    <div className="flex flex-col justify-center">
                      <p className="text-text_weak text-sm font-normal text-center">
                        Shipping address
                      </p>
                      <p className="text-text_strong text-base font-normal text-nowrap">
                        {`${orderData?.shippingDetails.address}, ${orderData?.shippingDetails.state}, ${orderData?.shippingDetails?.country}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* tracking view */}
              <div className="w-full flex justify-start items-center overflow-x-auto">
                <div className="w-fit flex justify-center items-center">
                  {/* order confirmed */}
                  <div className="">
                    <div className="flex-flex-col items-center">
                      <div className="w-fit flex justify-end">
                        <div className="flex items-center justify-end  pl-[50px] md:pl-[100px] w-fit">
                          <i>{getStatusIcon("pending", orderData?.status)}</i>
                          <span className=" w-[50px] md:w-[100px] border h-0.5 bg-stroke_weak"></span>
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
                          <span className=" w-[50px] md:w-[100px] border h-0.5 bg-stroke_weak"></span>
                          <i>
                            {orderData?.dhlStatus
                              ? successInfoIcon()
                              : unsuccessfulIcon()}
                          </i>
                          <span className=" w-[50px] md:w-[100px] border h-0.5 bg-stroke_weak"></span>
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
                        <div className="flex items-center justify-end w-fit  pr-[50px] md:pr-[100px]">
                          <span className=" w-[50px] md:w-[100px] border h-0.5 bg-stroke_weak"></span>
                          <i>{getStatusIcon("delivered", orderData?.status)}</i>
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

              <div className=" flex flex-col justify-center items-center gap-8 mt- 12 w-full max-w-[892px]  py-8 px6">
                <div className="flex flex-col justify-start items-start gap-2  w-full max-w-[392px]">
                  <p className="text-text_strong text-sm font-normal">
                    Tracking ID
                  </p>
                  <input
                    className="border outline-none rounded-lg  w-full h-10 px-4 py-2"
                    placeholder="Trk-12344556"
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>

                {/* status */}
                <div className="flex flex-col justify-start items-start gap-2 w-full max-w-[392px]">
                  <p className="text-text_strong text-sm font-normal">
                    Update status
                  </p>

                  {/* status select */}
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {/* pending */}
                    {/* <button
                      onClick={() => setSelectedStatus("pending")}
                      className={`rounded-full border h-10 flex justify-center items-center gap-2 px-4 text-sm font-medium ${
                        selectedStatus === "pending"
                          ? getStatusColor("pending").bg
                          : ""
                      } ${getStatusColor("pending").text}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          getStatusColor("pending").dot
                        }`}
                      ></span>
                      Pending
                    </button> */}

                    {/* Processing */}
                    <button
                      onClick={() => setSelectedStatus("processing")}
                      className={`rounded-full border h-10 flex justify-center items-center gap-2 px-4 text-sm font-medium ${
                        selectedStatus === "processing"
                          ? getStatusColor("processing").bg
                          : ""
                      } ${getStatusColor("processing").text}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          getStatusColor("processing").dot
                        }`}
                      ></span>
                      Processing
                    </button>

                    {/* Delivered */}
                    <button
                      onClick={() => setSelectedStatus("delivered")}
                      className={`rounded-full border h-10 flex justify-center items-center gap-2 px-4 text-sm font-medium ${
                        selectedStatus === "delivered"
                          ? getStatusColor("delivered").bg
                          : ""
                      } ${getStatusColor("delivered").text}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          getStatusColor("delivered").dot
                        }`}
                      ></span>
                      Delivered
                    </button>

                    {/* Refunded */}
                    <button
                      onClick={() => setSelectedStatus("refunded")}
                      className={`rounded-full border h-10 flex justify-center items-center gap-2 px-4 text-sm font-medium ${
                        selectedStatus === "refunded"
                          ? getStatusColor("refunded").bg
                          : ""
                      } ${getStatusColor("refunded").text}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          getStatusColor("refunded").dot
                        }`}
                      ></span>
                      Refunded
                    </button>

                    {/* Cancelled */}
                    <button
                      onClick={() => setSelectedStatus("cancelled")}
                      className={`rounded-full border h-10 flex justify-center items-center gap-2 px-4 text-sm font-medium ${
                        selectedStatus === "cancelled"
                          ? getStatusColor("cancelled").bg
                          : ""
                      } ${getStatusColor("cancelled").text}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          getStatusColor("cancelled").dot
                        }`}
                      ></span>
                      Cancelled
                    </button>
                  </div>

                  {/* update and cancel button */}
                  <div className="w-full flex gap-6 mt-6">
                    <button
                      onClick={handleStatusUpdate}
                      disabled={isUpdating}
                      className="bg-black text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border disabled:opacity-50"
                    >
                      {isUpdating ? "Updating..." : "Update"}
                    </button>

                    <button
                      onClick={handleCancel}
                      className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
