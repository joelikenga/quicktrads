/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  arrowleft,
  // ordersIcon,
  totalCustomersIcon,
  totalOrdersIcon,
  totalProductsIcon,
  totalSalesIcon,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  // defaults,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js/auto";
// import StackedCircles from "./stackedCircles";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { adminDashboard, getOrders } from "@/utils/api/admin/products";
import Link from "next/link";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const formatNum = (
  amount: number | undefined,
  decimalPlaces: number = 0
): string => {
  if (amount === undefined) {
    return "0";
  }
  return amount.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
  // Tooltip,
  // Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0.5, // Adjust the curve tension of the line
    },
  },
  plugins: {
    legend: {
      display: false, // Disable the legend
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#ffffff", // White tooltip background
      titleColor: "#333", // Dark text color
      bodyColor: "#333", // Dark text color
      titleFont: {
        size: 14,
        family: "Poppins",
        weight: "bold" as const,
      },
      bodyFont: {
        size: 12,
        family: "Poppins",
      },
      padding: 8, // paddingTop, paddingBottom
      caretPadding: 8,
      borderWidth: 1, // Add a border
      borderColor: "#ddd", // Light gray border
      cornerRadius: 8, // Rounded corners
      displayColors: false, // Hide the color box
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 6,
      shadowColor: "rgba(0, 0, 0, 0.1)", // Light shadow
      callbacks: {
        title: () => "", // Remove the top title completely
        label: function (tooltipItem: any) {
          const month = tooltipItem.label; // Get the month
          const sales = tooltipItem.raw; // Get the sales amount
          return `${sales}  |  ${month}`; // Format: "Sales Amount | Month"
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "#F2F4F7",
      },
    },
  },
};



// const circleData = [
//   {
//     name: "Sales",
//     figure: 14, // Use numbers for calculations
//     color: "#3f51b5",
//   },
//   {
//     name: "Revenue",
//     figure: 58,
//     color: "#4caf50",
//   },
//   {
//     name: "Profit",
//     figure: 76,
//     color: "#ff9800",
//   },
//   {
//     name: "Growth",
//     figure: 12,
//     color: "#f44336",
//   },
// ];

const EmptyGraph = ({ type }: { type: string }) => (
  <div className="w-full h-[306px] flex justify-center items-center mt-12">
    <div className="w-full max-w-[400px] flex flex-col gap-6 items-center">
      {totalSalesIcon()}
      <div className="flex flex-col gap-2 font-normal text-center">
        <p className="text-text_strong text-[22px]">{`No ${type} Data Available`}</p>
        <p className="text-text_weak text-base">{`There is currently no ${type.toLowerCase()} data to display`}</p>
      </div>
    </div>
  </div>
);

const getGraphData = (data: any[] | null, type: string) => {
  const monthlyData = Array(12).fill(0);
  
  if (data && data.length > 0) {
    data.forEach((item) => {
      monthlyData[item.month - 1] = item.total_count;
    });
  }

  return {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: type,
      data: monthlyData,
      borderColor: "#22C26E",
      backgroundColor: "rgba(34, 194, 110, 0.2)",
    }]
  };
};

export const BodyContent = () => {
  const router = useRouter();

  const [tab, setTab] = useState("sales");
  const [orderData, setOrderData] = useState<any | null>(null);
  const [adminData, setAdminData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getAdminDashboard = async () => {
    try {
      setLoading(true);
      const response = (await getOrders()) as any;
      const admin = await adminDashboard();
      setAdminData(admin?.data);
      setOrderData(response?.data);
      console.log("order response", response.data);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminDashboard();
  }, []);

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

  const handleRowClick = (id: string) => {
    router.push(`/admin_dashboard/management/orders/${id}`);
  };

  return (
    <div className="mt-[120px] mx-auto max-w-7xl">
      <div className="">
        {/* total displays */}
        <div className="grid grid-cols-4 gap-6 w-full">
          {/* total sale */}
          <div className="border w-full max-w-[302px] h-fit rounded-2xl flex flex-col py-6 px-8 gap-4">
            <i>{totalSalesIcon()}</i>
            <div className="flex-col flex gap-2">
              <p className="text-text_weak text-base font-normal">
                Total sales
              </p>
              <p
                className={`${lora.className} text-text_weak text-[22px] font-normal`}
              >{` ${formatNum(adminData?.totalSales)}`}</p>
            </div>
          </div>

          {/* total orders */}
          <div className="border w-full max-w-[302px] h-fit rounded-2xl flex flex-col py-6 px-8 gap-4">
            <i>{totalOrdersIcon()}</i>
            <div className="flex-col flex gap-2">
              <p className="text-text_weak text-base font-normal">
                Total orders
              </p>
              <p
                className={`${lora.className} text-text_weak text-[22px] font-normal`}
              >{`${formatNum(adminData?.totalOrders)}`}</p>
            </div>
          </div>

          {/* total products */}
          <div className="border w-full max-w-[302px] h-fit rounded-2xl flex flex-col py-6 px-8 gap-4">
            <i>{totalProductsIcon()}</i>
            <div className="flex-col flex gap-2">
              <p className="text-text_weak text-base font-normal">
                Total products
              </p>
              <p
                className={`${lora.className} text-text_weak text-[22px] font-normal`}
              >{`${formatNum(adminData?.totalProducts)}`}</p>
            </div>
          </div>

          {/* total customers */}
          <div className="border w-full max-w-[302px] h-fit rounded-2xl flex flex-col py-6 px-8 gap-4">
            <i>{totalCustomersIcon()}</i>
            <div className="flex-col flex gap-2">
              <p className="text-text_weak text-base font-normal">
                Total customers
              </p>
              <p
                className={`${lora.className} text-text_weak text-[22px] font-normal`}
              >{`${formatNum(adminData?.totalCustomers)}`}</p>
            </div>
          </div>
        </div>

        {/* charts */}

        <div className="w-full h-fit mt-8 pb-12 flex max-w-[1280px] px-4">
          {/* graph */}
          {!loading && (
            <div className="w-2/3 h-[306px]">
              {/* tabs */}
              <div className="border-b flex gap-4 font-medium text-base">
                <div
                  onClick={() => setTab("sales")}
                  className={` cursor-pointer pb-4 border-b-2 ${
                    tab === "sales"
                      ? "border-text_strong text-text_strong"
                      : "border-transparent text-text_weak"
                  }`}
                >
                  Sales
                </div>
                <div
                  onClick={() => setTab("orders")}
                  className={` cursor-pointer pb-4 border-b-2 ${
                    tab === "orders"
                      ? "border-text_strong text-text_strong"
                      : "border-transparent text-text_weak"
                  }`}
                >
                  Orders
                </div>
                <div
                  onClick={() => setTab("products")}
                  className={` cursor-pointer pb-4 border-b-2 ${
                    tab === "products"
                      ? "border-text_strong text-text_strong"
                      : "border-transparent text-text_weak"
                  }`}
                >
                  Products
                </div>
                <div
                  onClick={() => setTab("customers")}
                  className={` cursor-pointer pb-4 border-b-2 ${
                    tab === "customers"
                      ? "border-text_strong text-text_strong"
                      : "border-transparent text-text_weak"
                  }`}
                >
                  Customers
                </div>
              </div>
              {tab === "sales" && (
                adminData?.salesGraph ? 
                  <Line options={options} data={getGraphData(adminData.salesGraph, "Sales")} /> :
                  <EmptyGraph type="Sales" />
              )}
              {tab === "orders" && (
                adminData?.orderGraph ? 
                  <Line options={options} data={getGraphData(adminData.orderGraph, "Orders")} /> :
                  <EmptyGraph type="Orders" />
              )}
              {tab === "products" && (
                adminData?.productGraph ? 
                  <Line options={options} data={getGraphData(adminData.productGraph, "Products")} /> :
                  <EmptyGraph type="Products" />
              )}
              {tab === "customers" && (
                adminData?.userGraph ? 
                  <Line options={options} data={getGraphData(adminData.userGraph, "Customers")} /> :
                  <EmptyGraph type="Customers" />
              )}
            </div>
          )}

          {loading && (
            <div className=" w-2/3 h-[306px] flex justify-center items-center mt-12">
              <div className="w-full max-w-[400px] flex flex-col gap-6 items-center">
                {totalSalesIcon()}

                <div className="flex flex-col gap-2 font-normal text-center">
                  <p className="text-text_strong text-[22px] ">{`There are currently no Sales !`}</p>
                  <p className="text-text_weak text-base ">{`It looks like there are currently no sales available at the moment`}</p>
                </div>
                <button className="text-text_strong text-backgroun font-medium text-base  w-fit px-6 flex rounded-full items-center justify-center underline">
                  Add products
                </button>
              </div>
            </div>
          )}

          {/* packed circle */}
          {/* <div className="w-1/3 h-[306px] relative">
            <StackedCircles circleData={circleData} maxSize={200} />
          </div> */}
        </div>

        {/* table */}

        <div className="w-full pt-6">
          <div className="overflow-x-auto">
            <div className="flex w-full justify-between mb-4 font-medium">
              <div className="">Recent orders</div>
              <Link href={`/admin_dashboard/management/orders`} className="flex gap-2 items-center cursor-pointer">
                <>Go to orders</>
                <i className="rotate-180">{arrowleft()}</i>
              </Link>
            </div>
            <table className="w-full divide-y divide-stroke_weak  overflow-x-auto">
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
                  ></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stroke_weak">
                {loading ? (
                  <>
                    {[...Array(4)].map(
                      (_, index) => loading && <OrderSkeleton key={index} />
                    )}
                  </>
                ) : orderData === null || orderData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-text_weak">
                      {/* no order */}
                      <div className=" w-full flex justify-center items-center mt-12">
                        <div className="w-full max-w-[400px] flex flex-col gap-6 items-center">
                          {totalOrdersIcon()}

                          <div className="flex flex-col gap-2 font-normal text-center">
                            <p className="text-text_strong text-[22px] ">{`There are currently no Products !`}</p>
                            <p className="text-text_weak text-base ">{`It looks like there are currently no orders available at the moment`}</p>
                          </div>
                          <button className="text-text_strong text-backgroun font-medium text-base  w-fit px-6 flex rounded-full items-center justify-center underline">
                            Add products
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orderData?.slice(0, 4).map((item: any) => (
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
                        <div className="text-text_strong text-sm font-normal text-nowrap underline">
                          Update status
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
