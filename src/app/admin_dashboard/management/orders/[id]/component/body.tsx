/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  add,
  arrowleft,
  maiIcon,
  numberIcon,
  ordersIcon,
  orderSmallIcon,
  updateArrowIcon,
  xIcon,
} from "@/app/global/svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOrder } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import { useParams } from "next/navigation";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

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
}

interface OrderItem {
  product: Product;
  quantity: number;
  currency: string;
  amount: number;
}

interface OrderData {
  id: string;
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

  const fetchOrder = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getOrder(id);
      setOrderData(response.data);
    } catch (err: unknown) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="ml-[280px] mt-[120px]">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          
          {/* Content section skeleton */}
          <div className="mt-8 flex gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-72 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-56 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Stats grid skeleton */}
          <div className="grid grid-cols-4 gap-4 mt-8 p-6 border rounded-lg">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Table skeleton */}
          <div className="mt-8">
            <div className="h-10 w-full bg-gray-200 rounded mb-4"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 mb-4">
                <div className="h-16 w-16 bg-gray-200 rounded"></div>
                <div className="flex-1 h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-[280px] mt-[120px]">
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
        <div onClick={() => history.back()} className="text-text_strong text-[22px] flex items-center gap-2">
          {arrowleft()}
          <>Order details</>
        </div>
      </div>

      {/* content section */}

      <div className="w-full flex justify-between items-center mt-8">
        {/* image contents */}
        <div className="flex gap-4 items-center">
          <div className="">
            <Image
              className="w-[80px] h-[80px] rounded-full border outline-none"
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
                className={` ${lora.className} text-text_strong text-[22px] font-normal`}
              >
                {orderData?.shippingDetails.fullName}
              </p>
              {/* status */}
              <div className="flex justify-center items-center w-[100px] h-[24px] bg-[#F5FFFC] rounded-full px-2 gap-4">
                <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
                <p className="text-text_weak text-sm font-normal">{orderData?.status}</p>
              </div>
            </div>
            {/* contact */}

            <div className="flex text-start items-center justify-start gap-6">
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
            <div className=" items-center gap-2 text-text_weak font-normal ">
              <i>{}</i>
              <p>{orderData?.shippingDetails.address}</p>
            </div>
          </div>
        </div>

        {/* update status */}
        <button className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-fit pl-4 pr-2 border gap-2">
          <p>Update status</p>
          <i>{updateArrowIcon()}</i>
        </button>
      </div>

      <div className="px-7 flex flex-col gap-12">
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
                <p className="text-text_strong underline">{orderData?.trackingID || "Add tracking ID"}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center col-span-1  px-6">
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Date</p>
              <p className="text-text_strong">{new Date(orderData?.createdAt || "").toLocaleDateString()}</p>
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
            <table className="w-ful divide-y divide-stroke_weak   overflow-x-auto w-[651px]">
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
                        {item.currency} {item.amount} x {item.quantity} item(s)
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
                  <td className="p-4">{orderData?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
