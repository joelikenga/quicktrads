/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { arrowleft, ordersIcon, orderSmallIcon, xIcon } from "@/app/global/svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOrder } from "../../../../utils/api/user/product";
import { useParams } from "next/navigation";

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

export const Body = () => {
  const { id } = useParams();
  const [tab, setTab] = useState<string>("order items");
  const [cancelOrder, setCancelOrder] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);

  const order = async (id: string) => {
    try {
      const response = await getOrder(id) as any;
      if (response.code === 200) {
        setOrderData(response.data);
      }
    } catch (err: unknown) {
      throw err;
    }
  };

  useEffect(() => {
    if (typeof id === 'string') {
      order(id);
    }
  }, [id]);

  return (
    <div className="md:ml-[280px] mt-[150px]">
      {cancelOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col items-center gap-4">
              {ordersIcon()}
              <p className={`max-w-[240px] w-full text-center`}>Are you sure you want to cancel order?</p>
              <p className={` w-full text-center`}>{`This action will cancel order. If you're not sure to make cancel order, you can go back`}</p>

              {/* reason */}
              <div className="w-full flex flex-col items-start gap-2">
                <p className="">Reason <span className="">{`(optional)`}</span></p>
                <textarea className="border outline-none rounded-lg w-full resize-none h-[88px] px-4 py-2"/>
              </div>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border">
                <p>Yes, cancel order</p>
              </button>
              <button onClick={() => setCancelOrder(false)} className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border">
                <p>Go back</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-2 items-center font-normal text-nowrap w-full">
        <div className="text-text_strong text-[22px] flex items-center gap-2">
          {arrowleft()}
          <>Order details</>
        </div>
        <div onClick={() => setCancelOrder(true)} className="flex gap-2 items-center cursor-pointer">
          <i>{xIcon()}</i>
          <p className="text-text_weak text-base underline">{`Cancel order`}</p>
        </div>
      </div>

      {/* content section */}

      <div className="px-7 flex flex-col gap-12">
        <div className="grid grid-cols-5 p-6 w-[940px] border rounded-lg mt-8">
          <div className="flex gap-8  items-center col-span-1">
            <i>{orderSmallIcon()}</i>
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Items</p>
              <p className="text-text_strong">{orderData?.order.length || 0}</p>
            </div>
          </div>

          <div className="flex gap-8  items-center col-span-1 border-x-2 px-6">
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Order status</p>
              <p className="text-text_strong capitalize">{orderData?.status || "N/A"}</p>
            </div>
          </div>

          <div className="flex gap-8  items-center col-span-1  px-6">
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Payment method</p>
              <p className="text-text_strong">{orderData?.paymentMethod || "N/A"}</p>
            </div>
          </div>

          <div className="flex gap-8  items-center col-span-1 border-x-2 px-6">
            <div className="flex-col items-end justify-center flex-end ">
              <p className="text-text_weak">Tracking ID</p>
              <p className="text-text_strong">{orderData?.trackingID || "N/A"}</p>
            </div>
          </div>

          <div className="flex gap-8  items-center col-span-1  px-6">
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Date</p>
              <p className="text-text_strong">
                {orderData?.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : "N/A"}
              </p>
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
                </tr>
              </thead>

              <tbody className=" divide-stroke_weak ">
                {orderData?.order.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="pl-4 ">
                      <div className="flex gap-6 items-start w-[360px]">
                        <Image
                          className="w-[70px] h-[85px]"
                          src={item.product.images[0] || "/heroFallback.jpg"}
                          width={69}
                          height={80}
                          alt={item.product.name}
                        />
                        <div className="text-text_strong text-sm font-normal text-wrap ">
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
                      <div className="text-text_strong text-sm font-normal text-nowrap y">
                        {item.currency} {item.amount} x {item.quantity} item
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                        {item.currency} {item.amount * item.quantity}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* total and subtotal delivery */}

                {/* delivery */}
                <tr>
                  <td className="pl-4 ">
                    <div className="flex gap-6 items-start w-[360px]"></div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]"></div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap y">
                      Delivery fee
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                      {orderData?.currency} {orderData?.shippingFee || 0}
                    </div>
                  </td>
                </tr>

                {/* Subtotal */}
                <tr>
                  <td className="pl-4 ">
                    <div className="flex gap-6 items-start w-[360px]"></div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]"></div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap y">
                      Subtotal
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                      {orderData?.currency} {orderData?.subTotal || 0}
                    </div>
                  </td>
                </tr>
                {/* Total */}
                <tr className="border-t">
                  <td className="pl-4 ">
                    <div className="flex gap-6 items-start w-[360px]"></div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]"></div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap y">
                      Total
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-text_strong text-sm font-normal text-nowrap w-[120px]">
                      {orderData?.currency} {orderData?.totalAmount || 0}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};