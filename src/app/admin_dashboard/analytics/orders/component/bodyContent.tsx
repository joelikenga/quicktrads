"use client";

import { dates, arrowDown, add, invoiceIcn } from "@/app/global/svg";
import { getOrderAnalytics } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import React, { useEffect, useState } from "react";
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
          const amount = tooltipItem.raw
            ? `$${formatNum(tooltipItem.raw, 2)}`
            : "$0";
          return `${amount}  |  ${tooltipItem.label}`;
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

const formatDurationText = (days: number) => {
  if (days === 365) return "1 year";
  if (days === 30) return "1 month";
  if (days === 14) return "2 weeks";
  return `${days} days`;
};

const generateDateLabels = (duration: number) => {
  const labels = [];
  // const today = new Date();

  if (duration === 365) {
    // For yearly view, show all months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months;
  }

  // For other durations, show daily labels
  for (let i = duration - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    labels.push(`${month} ${day}`);
  }
  return labels;
};

const aggregateDataByPeriod = (data: any[], duration: number) => {
  if (!data || !Array.isArray(data)) {
    return new Array(duration === 365 ? 12 : duration).fill(0);
  }

  if (duration === 365) {
    // For yearly view, aggregate by months
    const monthlyData = new Array(12).fill(0);
    data.forEach((item) => {
      const monthIndex = item.month - 1; // Convert 1-based month to 0-based index
      monthlyData[monthIndex] = (monthlyData[monthIndex] || 0) + item.amount;
    });
    return monthlyData;
  }

  // For other durations, keep existing daily aggregation
  const result = new Array(duration).fill(0);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (duration - 1));
  startDate.setHours(0, 0, 0, 0);

  const dateMap = new Map();
  data.forEach((item) => {
    const date = new Date(item.year, item.month - 1, item.day);
    dateMap.set(date.toISOString().split("T")[0], item.amount);
  });

  for (let i = 0; i < duration; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().split("T")[0];
    result[i] = dateMap.get(dateKey) || 0;
  }

  return result;
};

export const BodyContent = () => {
  const [days, setDays] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [duration, setDuration] = useState(30); // Changed default from 90 to 30

  // const modDays = (selectedDuration: number) => {
  //   setDuration(selectedDuration);
  //   setDays(false);
  // };

  const handleDurationSelect = (selectedDuration: number) => {
    setDuration(selectedDuration);
    setDays(false); // Close dropdown after selection
  };

  const analytics = async () => {
    try {
      const res = (await getOrderAnalytics(duration)) as any;
      if (res.code === 200) {
        setAnalyticsData(res.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    analytics();
  }, [duration]); // Re-fetch when duration changes

  // Format data for the chart
  const chartData = {
    labels: generateDateLabels(duration),
    datasets: [
      {
        label: "Pending",
        data: aggregateDataByPeriod(analyticsData?.pendingOrderGraph, duration),
        borderColor: "#E8A72D",
        backgroundColor: "rgba(232, 167, 45, 0.2)",
      },
      {
        label: "Processing",
        data: aggregateDataByPeriod(
          analyticsData?.processingOrderGraph,
          duration
        ),
        borderColor: "#1F0EC9",
        backgroundColor: "rgba(31, 14, 201, 0.2)",
      },
      {
        label: "Delivered",
        data: aggregateDataByPeriod(
          analyticsData?.deliveredOrderGraph,
          duration
        ),
        borderColor: "#22C26E",
        backgroundColor: "rgba(34, 194, 110, 0.2)",
      },
      {
        label: "Refunded",
        data: aggregateDataByPeriod(
          analyticsData?.refundedOrderGraph,
          duration
        ),
        borderColor: "#727D79",
        backgroundColor: "rgba(114, 125, 121, 0.2)",
      },
      {
        label: "Cancelled",
        data: aggregateDataByPeriod(
          analyticsData?.cancelledOrderGraph,
          duration
        ),
        borderColor: "#CC2125",
        backgroundColor: "rgba(204, 33, 37, 0.2)",
      },
    ],
  };

  return (
    <div className="mt-[150px] md:mt-[120px] md:ml-[240px] h-full max-w-[1080px] w-full px-4 md:pr-10">
      <div className="flex justify-between items-cener pb-[24px]">
        <p>Orders</p>

        <div
          onClick={() => setDays((prev) => !prev)}
          className="flex relative gap-2 cursor-pointer selection:no-underline items-center"
        >
          <span>{dates()}</span>
          <p>{formatDurationText(duration)}</p>
          <span>{arrowDown()}</span>

          {/* days option board */}
          <div
            className={`w-[179px] absolute top-10 right-4 h-[176px] border-lg ${
              days ? "block" : "hidden"
            } bg-white rounded-[12px] shadow-md`}
          >
            {[7, 14, 30, 365].map((d) => (
              <p
                key={d}
                onClick={() => handleDurationSelect(d)}
                className={`py-[10px] px-[24px] text-text_weak cursor-pointer hover:bg-fill ${
                  duration === d ? "bg-fill" : ""
                }`}
              >
                {formatDurationText(d)}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* amounts */}
      <div className="overflow-x-auto py-4">
        <div className="flex border border-stroke_weak py-[16px] px-[48px] w-fit rounded-lg  gap-4">
          <div className="pt-2">{invoiceIcn()}</div>

          <section className="flex items-center gap-4">
            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Delivered
              </p>
              <p
                className={`${lora.className}text-[22px] leading-[28px] font-[400] py-2`}
              >
                $
                {formatNum(
                  analyticsData?.totalDeliveredOrders?.total_order_amount
                )}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalDeliveredOrders?.percentage_change}%
              </p>
            </div>

            <div className="w-[134px] h-[85px] text-center border-x">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Pending
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $
                {formatNum(
                  analyticsData?.totalpendingOrders?.total_order_amount
                )}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalpendingOrders?.percentage_change}%
              </p>
            </div>

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Processing
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $
                {formatNum(
                  analyticsData?.totalProcessingOrders?.total_order_amount
                )}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalProcessingOrders?.percentage_change}%
              </p>
            </div>

            <div className="w-[134px] h-[85px] text-center border-x">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Refunded
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $
                {formatNum(
                  analyticsData?.totalRefundedOrders?.total_order_amount
                )}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalRefundedOrders?.percentage_change}%
              </p>
            </div>

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Cancelled
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $
                {formatNum(
                  analyticsData?.totalCalcelledOrders?.total_order_amount
                )}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalCalcelledOrders?.percentage_change}%
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* sales panel */}
      {!analyticsData ||
      (!analyticsData.pendingOrderGraph &&
        !analyticsData.processingOrderGraph &&
        !analyticsData.deliveredOrderGraph &&
        !analyticsData.refundedOrderGraph &&
        !analyticsData.cancelledOrderGraph) ? (
        <div className="flex justify-center h-[455px] items-center">
          <div className=" flex flex-col w-full md:w-[400px] md:h-[80px]">
            <span className="w-[40px] mx-auto">{invoiceIcn()}</span>
            <h3 className="pb-4 py-[16px] text-[18px] leading-[28px] text-center font-[500]">
              There are currently no products
            </h3>
            <p className="text-[14px] leading-[22px] text-text_weak w-[290px] mx-auto text-center">
              It looks like there are currently no products available at the
              moment
            </p>

            <div className="flex items-center gap-2 w-max mx-auto cursor-pointer selection:no-undeline mt-4">
              <span>{add()}</span>
              <p className="underline">Add products</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`w-full h-[800px mt-6`}>
          <Line options={options} data={chartData} height={400} />
        </div>
      )}

      {/* indicators */}
      <div className="w-full my-2 h-9 flex justify-center flex-wrap items-end gap-3">
        {/* ---Bridgecard--- */}
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-warning_1"></span>
          <p className="text-text_gray text-sm font-medium">Pending</p>
        </div>

        {/* ---Bitpowr--- */}
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#1F0EC9]"></span>
          <p className="text-text_gray text-sm font-medium">Processing</p>
        </div>

        {/* ---Yellowcard--- */}
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success_1"></span>
          <p className="text-text_gray text-sm font-medium">Delivered</p>
        </div>

        {/* ---Link--- */}
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black"></span>
          <p className="text-text_gray text-sm font-medium">Refunded</p>
        </div>

        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-error_1"></span>
          <p className="text-text_gray text-sm font-medium">Cancelled</p>
        </div>
      </div>
    </div>
  );
};
