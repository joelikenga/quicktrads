/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { filterIcon, ordersIcon, searchIcon } from "@/app/global/svg";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getOrders } from "../../../utils/api/user/product";
import { useRouter } from "next/navigation";

interface Product {
  product: any;
  amount: number;
  quantity: number;
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  priceDiscount: number;
  priceConvert: number;
  priceDiscountConvert: number;
  currency: string;
  currencyConvert: string;
  size: string;
  images: string[];
  status: "active" | "inactive";
  isFeatured: boolean;
  isPaid: boolean;
  isReviewed: boolean;
  addToInventory: boolean;
  ordersCount: number;
  stars: number;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
}
// interface Product {
//   product: Record<string, any>; // Adjust this based on actual product structure
//   quantity: number;
//   currency: string;
//   amount: number;
// }

interface ShippingDetails {
  address: string;
  country: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  state: string;
}

interface Order {
  createdAt: string;
  currency: string;
  dhlStatus: string | null;
  dhlStatusCode: string | null;
  id: string;
  order: Product[];
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

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  gender: string;
  [key: string]: any; // Allow additional properties if needed
}

interface DataItem {
  order: Order;
  user: User;
}

type DataArray = DataItem[];

interface APIResponse {
  code: number;
  data: DataArray;
  error: null | string;
  message: string;
  page: {
    hasPreviousPage: boolean;
    has_next_page: boolean;
    page: number;
    size: number;
    totalCount: number;
  };
}

export const Body = () => {
  const router = useRouter(); // Add this at the top with other imports

  const [orderData, setOrderData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const filterRef = useRef<HTMLDivElement>(null);

  const orders = async () => {
    try {
      setLoading(true);
      const response = (await getOrders()) as any;
      setOrderData(response);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    orders();
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOrders = orderData?.data?.filter((item) => {
    const matchesSearch = item.order.order[0].product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      item.order.status.toLowerCase() === selectedFilter;

    return matchesSearch && matchesFilter;
  });

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

  const handleRowClick = (id: string) => {
    router.push(`/orders/${id}`);
  };


  return (
    <div className=" flex flex-col gap-8 h-[82px] border-b ml-[280px] mt-[150px]">
      <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
        <p className="text-text_strong text-[22px]">Orders</p>
        <p className="text-text_weak text-base ">{`Add, update and select your address information`}</p>
      </div>

      {(filteredOrders === null || filteredOrders === undefined) && (
        <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">
          {/* no order */}
          <div className=" w-full flex justify-center items-center mt-12">
            <div className="w-full max-w-[400px] flex flex-col gap-8 items-center">
              {ordersIcon()}

              <div className="flex flex-col gap-4 font-normal text-center">
                <p className="text-text_strong text-[22px] ">{`There are currently no order`}</p>
                <p className="text-text_weak text-base ">{`Discover the latest trends and start building your dream wardrobe today!`}</p>
              </div>
              <button className="bg-text_strong text-background font-medium text-base h-12 w-full px-6 flex rounded-full items-center justify-center">
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------ content ------- */}

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
                        onClick={() => handleRowClick(item?.order.id)}
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
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
