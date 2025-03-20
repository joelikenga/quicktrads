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
import { getCustomer, getOrders, getStatusCount } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import { ProfileAvatar } from "@/app/global/profileGenerator";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const ProfileSkeleton = () => (
  <div className="flex gap-4 items-center">
    <div className="w-[80px] h-[80px] rounded-full bg-text_weaker animate-pulse" />
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-6">
        <div className="h-7 w-40 bg-text_weaker animate-pulse rounded-full" />
        <div className="w-[100px] h-[24px] bg-text_weaker animate-pulse rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-6">
          <div className="h-4 w-36 bg-text_weaker animate-pulse rounded-full" />
          <div className="h-4 w-32 bg-text_weaker animate-pulse rounded-full" />
        </div>
        <div className="h-4 w-48 bg-text_weaker animate-pulse rounded-full" />
      </div>
    </div>
  </div>
);

const StatsSkeleton = () => (
  <div className="grid grid-cols-5 p-6 w-[940px] border rounded-lg mt-8 text-center">
    {[...Array(5)].map((_, i) => (
      <div key={i} className={`flex gap-8 justify-center items-center col-span-1 ${i > 0 ? 'border-l-2' : ''} px-6`}>
        <div className="flex-col items-center justify-center">
          <div className="h-4 w-24 bg-text_weaker animate-pulse rounded-full mb-2" />
          <div className="h-6 w-16 bg-text_weaker animate-pulse rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

export const Body = () => {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [page, setPage] = useState<any>(null);
  const [count, setCount] = useState<any>(null);

  const user = async (id: string) => {
    try {
      const response = (await getCustomer(id)) as any;     
      const customerData = response.data || response;      
      const counts = await getStatusCount(id) as any;
      setCount(counts.data);
      const orderData = (await getOrders()) as any;
      setCustomer(customerData);
      setOrders(orderData.data || []);
      setPage(orderData.page);
      setLoading(false);
    } catch (err: unknown) {
      console.error("Error fetching customer:", err);
      setLoading(false);
      setOrders([]);
    }
  };

  useEffect(() => {
    user(id);
  }, [id]);

  useEffect(() => {
    if (!orders || !Array.isArray(orders)) {
      setFilteredOrders([]);
      return;
    }

    const filtered = orders.filter((item) => {
      if (!item?.order?.order?.[0]?.product?.name) return false;
      
      const matchesSearch = item.order.order[0].product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        selectedFilter === "all" || item.order.status === selectedFilter;
      const matchesUserId = item.order.userId === id;
      return matchesSearch && matchesStatus && matchesUserId;
    });
    setFilteredOrders(filtered);
  }, [orders, search, selectedFilter, id]);

  // Add this effect to monitor customer state changes
  useEffect(() => {
    console.log("Customer state updated:", customer);
  }, [customer]);

  const handleRowClick = (orderId: string) => {
    router.push(`/admin_dashboard/management/orders/${orderId}`);
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
        <div
          onClick={() => history.back()}
          className="text-text_strong text-[22px] flex items-center gap-2"
        >
          {arrowleft()}
          <>Customer details</>
        </div>
      </div>

      {/* content section */}

      <div className="w-full flex justify-start items-center mt-8">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <div className="flex gap-4 items-center">
            <div className="">
              {!customer?.avatar ? (
                <ProfileAvatar name={customer?.fullName || "N"} size={'large'}  />
              ) : (
                <Image
                  className="w-[80px] h-[80px] rounded-full border outline-none"
                  src={customer?.avatar}
                  width={80}
                  height={80}
                  alt={customer?.fullName || ""}
                />
              )}
            </div>
            {/* details */}
            <div className="flex flex-col gap-3">
              {/* name and status */}
              <div className="flex items-center gap-6">
                <p className={`${lora.className} text-text_strong text-[22px] font-normal capitalize`}>
                  {customer?.fullName || 'No Name'}
                </p>
                <div className={`flex justify-center items-center w-[100px] h-[24px] rounded-full px-2 gap-2 
                  ${customer?.status === 'active' ? 'bg-[#F5FFFC]' : 'bg-gray-100'}`}>
                  <div className={`w-[8px] h-[8px] rounded-full 
                    ${customer?.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <p className="text-text_weak text-sm font-normal capitalize">
                    {customer?.status || 'Unknown'}
                  </p>
                </div>
              </div>
              {/* contact info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-text_weak">
                    <i>{maiIcon()}</i>
                    <p>{customer?.email || 'No email'}</p>
                  </div>
                  <div className="flex items-center gap-2 text-text_weak">
                    <i>{numberIcon()}</i>
                    <p>{customer?.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
                {/* location info */}
                <div className="flex items-center gap-2 text-text_weak">
                  <p>
                    {[customer?.country, customer?.state]
                      .filter(Boolean)
                      .join(', ') || 'No location provided'}
                  </p>
                </div>
                {/* address */}
                {customer?.address && (
                  <div className="flex items-center gap-2 text-text_weak">
                    <p>{customer.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-7 flex flex-col justitemsify-start gap-12">
        {loading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-5 p-6 w-[940px] border rounded-lg mt-8 text-center">
            <div className="flex gap-8 justify-center items-center col-span-1">
              <i>{orderSmallIcon()}</i>
              <div className="flex-col items-center justify-center ">
                <p className="text-text_weak">Total Orders</p>
                <p className="text-text_strong">{customer?.totalOrders || 0}</p>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center col-span-1 border-l-2 px-6">
              <div className="flex-col items-center justify-center ">
                <p className="text-text_weak">Pending</p>
                <p className="text-text_strong">{count?.pending || 0}</p>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center col-span-1 border-l-2 px-6">
              <div className="flex-col items-center justify-center ">
                <p className="text-text_weak">Cancelled</p>
                <p className="text-text_strong">{count?.cancelled || 0}</p>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center col-span-1 border-x-2 px-6">
              <div className="flex-col items-end justify-center flex-end ">
                <p className="text-text_weak">Last purchase</p>
                <p className="text-text_strong underline">
                  {customer?.lastOrderedAt
                    ? new Date(customer.lastOrderedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Never'}
                </p>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center col-span-1 px-6">
              <div className="flex-col items-center justify-center ">
                <p className="text-text_weak">Last login</p>
                <p className="text-text_strong">
                  {new Date(customer?.lastLoggedInAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* table */}

        {Array.isArray(filteredOrders) && (
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
                    ) : filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((item) => (
                        <tr
                          onClick={() => handleRowClick(item.order.id)}
                          key={item.order.id}
                          className="cursor-pointer hover:bg-fill"
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
                              {new Date(
                                item.order.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
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
              {!loading && page && (
                <div className="flex justify-between p-4 border-t">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        if (page.hasPreviousPage) {
                          // Implement previous page logic here
                        }
                      }}
                      disabled={!page.hasPreviousPage}
                      className={`text-sm ${
                        page.hasPreviousPage
                          ? "text-text_strong cursor-pointer"
                          : "text-text_weak cursor-not-allowed"
                      }`}
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from(
                        { length: Math.ceil(page.totalCount / page.size) },
                        (_, i) => i + 1
                      ).map((num) => (
                        <button
                          key={num}
                          onClick={() => {
                            // Implement page change logic here
                          }}
                          className={`h-10 w-10 flex items-center rounded-full justify-center ${
                            page.page === num
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
                        if (page.has_next_page) {
                          // Implement next page logic here
                        }
                      }}
                      disabled={!page.has_next_page}
                      className={`text-sm ${
                        page.has_next_page
                          ? "text-text_strong cursor-pointer"
                          : "text-text_weak cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </div>

                  <p className="font-medium text-base">
                    Page {page.page} of {Math.ceil(page.totalCount / page.size)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
