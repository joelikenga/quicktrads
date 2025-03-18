/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  add,
  arrowleft,
  filterIcon,
  maiIcon,
  numberIcon,
  ordersIcon,
  orderSmallIcon,
  searchIcon,
  updateArrowIcon,
  xIcon,
} from "@/app/global/svg";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getOrder } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";

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

// interface OrderItem {
//   product: Product;
//   quantity: number;
//   currency: string;
//   amount: number;
// }

// interface OrderResponse {
//   order: OrderItem[];
// }

export const Body = () => {
  const [orderData, setOrderData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const order = async (id: string) => {
    try {
      const response = (await getOrder(id)) as any;
      setOrderData(response?.data?.order);
      setLoading(false);
      setLoading(false);
      // console.log(orderData)
    } catch (err: unknown) {
      throw err;
    }
  };

  useEffect(() => {
    order("b50c62a8-3ba0-4376-9139-1b6fe09dcc22");
  });

  const OrderSkeleton = () => (
    <tr>
      <td className="p-4">
        <div className="flex gap-6 items-start w-[304px]">
          <div className="flex">
            <div className="w-[68.57px] h-[80px] bg-text_weaker animate-pulse rounded-lg" />
          </div>
          <div className="h-4 w-32 bg-text_weaker animate-pulse rounded-full" />
        </div>
      </td>
      <td className="p-4">
        <div className="h-4 w-24 bg-text_weaker animate-pulse rounded-full" />
      </td>
      <td className="p-4">
        <div className="h-4 w-16 bg-text_weaker animate-pulse rounded-full" />
      </td>
      <td className="p-4">
        <div className="h-4 w-28 bg-text_weaker animate-pulse rounded-full" />
      </td>
      <td className="p-4">
        <div className="h-6 w-24 bg-text_weaker animate-pulse rounded-full" />
      </td>
      <td className="p-4">
        <div className="h-4 w-8 bg-text_weaker animate-pulse rounded-full" />
      </td>
    </tr>
  );

    const renderProductImages = (images: string[]) => {
      const maxDisplay = 3;
      const remaining = images.length - maxDisplay;
  
      return (
        <div className="relative flex">
          {images.slice(0, maxDisplay).map((image, index) => (
            <div
              key={index}
              className="w-[68.57px] h-[80px] relative"
              style={{
                marginLeft: index > 0 ? "-20px" : "0",
                zIndex: maxDisplay - index,
              }}
            >
              <Image
                src={image}
                className="w-full h-full object-cover"
                width={68.57}
                height={80}
                alt=""
              />
            </div>
          ))}
          {remaining > 0 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 px-2 py-1 rounded-full text-sm">
              +{remaining}
            </div>
          )}
        </div>
      );
    };

  return (
    <div className="ml-[280px] mt-[120px]">
      <div className="flex justify-start gap-2 items-center font-normal text-nowrap w-full">
        <div onClick={()=> history.back()} className="text-text_strong text-[22px] flex items-center gap-2">
          {arrowleft()}
          <>Customer details</>
        </div>
      </div>

      {/* content section */}

      <div className="w-full flex justify-start items-center mt-8">
        {/* image contents */}
        <div className="flex gap-4 items-center">
          <div className="">
            <Image
              className="w-[80px] h-[80px] rounded-full border outline-none"
              src={orderData?.image || ""}
              width={80}
              height={80}
              alt={orderData?.name || ""}
            />
          </div>
          {/* details */}
          <div className="flex flex-col gap-1">
            {/* name */}
            <div className="flex items-center gap-6">
              <p
                className={` ${lora.className} text-text_strong text-[22px] font-normal`}
              >
                Emeka Frank
              </p>
              {/* status */}
              <div className="flex justify-center items-center w-[100px] h-[24px] bg-[#F5FFFC] rounded-full px-2 gap-4">
                <div className="w-[8px] h-[8px] rounded-full bg-green-500"></div>
                <p className="text-text_weak text-sm font-normal">Active</p>
              </div>
            </div>
            {/* contact */}

            <div className="flex text-start items-center justify-start gap-6">
              <div className="flex items-center  gap-2 text-text_weak font-normal ">
                <i>{maiIcon()}</i>
                <p> emekasample@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 text-text_weak font-normal ">
                <i>{numberIcon()}</i>
                <p> +2348154012354</p>
              </div>
            </div>

            {/* address */}
            <div className=" items-center gap-2 text-text_weak font-normal ">
              <i>{}</i>
              <p> 117-195 Iroquois Ave London, ON N6C 2K9, Ikeja Lagos</p>
            </div>
          </div>
        </div>


      </div>

      <div className="px-7 flex flex-col justitemsify-start gap-12">
        <div className="grid grid-cols-5 p-6 w-[940px] border rounded-lg mt-8 text-center">
          <div className="flex gap-8 justify-center items-center col-span-1">
            <i>{orderSmallIcon()}</i>
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Completed</p>
              <p className="text-text_strong">3</p>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center col-span-1 border-l-2 px-6">
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Pending</p>
              <p className="text-text_strong">3</p>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center col-span-1 border-l-2 px-6">
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Cancelled</p>
              <p className="text-text_strong">3</p>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center col-span-1 border-x-2 px-6">
            <div className="flex-col items-end justify-center flex-end ">
              <p className="text-text_weak">Last purchase</p>

              <p className="text-text_strong underline">fdf</p>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center col-span-1  px-6">
            <div className="flex-col items-center justify-center ">
              <p className="text-text_weak">Last login</p>
              <p className="text-text_strong">3</p>
            </div>
          </div>
        </div>

{/* table */}

      {(Array.isArray(filteredOrders) && filteredOrders.length > 0) &&
        <div className="mt-12 w-full">
          {/* search and filter */}
          <div className="flex w-full justify-start items-center gap-4">
            <div className="flex gap-2 h-8 w-[220px] border bg-fill items-center rounded-full px-4">
              {searchIcon()}
              <input
                className="h-full w-full bg-transparent text-text_strong placeholder:text-text_strong outline-none"
                placeholder="Search by name"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="h-8 text-text_strong border border-stroke_weak flex rounded-full items-center px-4 gap-2"
              >
                {filterIcon()}
                <span>
                  {selectedFilter === "all" ? "Filter" : selectedFilter}
                </span>
              </button>

              {showFilter && (
                <div className="absolute top-10 right-0 bg-background border border-stroke_weak rounded-lg shadow-lg w-[150px] z-10">
                  <div className="p-2 flex flex-col gap-1">
                    {[
                      "all",
                      "pending",
                      "processing",
                      "shipped",
                      "delivered",
                      "cancelled",
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedFilter(status);
                          setShowFilter(false);
                        }}
                        className={`text-left px-3 py-2 rounded-md hover:bg-fill ${
                          selectedFilter === status ? "bg-fill" : ""
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* table */}
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-stroke_weak mt-12 overflow-x-auto">
                <thead className="text-start bg-background border-y">
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
                      Quantity
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    >
                      Subtotal
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                    >
                      Review
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stroke_weak">
                  {loading ? (
                    <>
                      {[...Array(5)].map((_, index) => (
                        <OrderSkeleton key={index} />
                      ))}
                    </>
                  ) : (
                    filteredOrders?.map((item) => (
                      <tr
                        // onClick={() => handleRowClick(item?.order.id)}
                        key={item.order.id}
                        className=""
                      >
                        <td className="p-4">
                          <div className="flex gap-6 items-start w-[304px]">
                            {renderProductImages(
                              item.order.order[0].product.images
                            )}
                            <div className="text-text_strong text-sm font-normal text-wrap">
                              {item.order.order[0].product.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap">
                            ${item.order.order[0].amount} x{" "}
                            {item.order.order[0].quantity} item
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap">
                            ${item.order.totalAmount}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap">
                            {new Date(item.order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-text_strong text-sm font-normal text-wrap">
                            <div className="h-6 flex px-2 items-center justify-center rounded-full bg-[#F0F0FF] text-[#1F0EC9] text-sm font-medium gap-1">
                              <span className="rounded-full w-2 h-2 bg-[#1F0EC9]"></span>
                              <p>{item.order.status}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap">
                            NA
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* pagination */}
            {!loading && (
              <div className="flex justify-between p-4 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (orderData?.page.hasPreviousPage) {
                        // Handle previous page
                      }
                    }}
                    disabled={!orderData?.page.hasPreviousPage}
                    className={`text-sm ${
                      orderData?.page.hasPreviousPage
                        ? "text-text_strong cursor-pointer"
                        : "text-text_weak cursor-not-allowed"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from(
                      {
                        length: Math.ceil(
                          (orderData?.page.totalCount || 0) /
                            (orderData?.page.size || 1)
                        ),
                      },
                      (_, i) => i + 1
                    ).map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          // Handle page change
                        }}
                        className={`h-10 w-10 flex items-center rounded-full justify-center ${
                          orderData?.page.page === num
                            ? "bg-text_strong text-background"
                            : "border text-text_strong hover:bg-fill"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (orderData?.page.has_next_page) {
                        // Handle next page
                      }
                    }}
                    disabled={!orderData?.page.has_next_page}
                    className={`text-sm ${
                      orderData?.page.has_next_page
                        ? "text-text_strong cursor-pointer"
                        : "text-text_weak cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <p className="font-medium text-base">
                  Page {orderData?.page.page || 1} of{" "}
                  {Math.ceil(
                    (orderData?.page.totalCount || 0) /
                      (orderData?.page.size || 1)
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      }
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
