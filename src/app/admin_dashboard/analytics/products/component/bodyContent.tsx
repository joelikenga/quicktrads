"use client";

import { dates, arrowDown, add, invoiceIcn } from "@/app/global/svg";
import { getProductAnalytics } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js/auto";

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

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const generateDateLabels = (duration: number) => {
  if (duration === 365) {
    return [
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
  }

  const labels = [];
  // const today = new Date();

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
    return duration === 365
      ? new Array(12).fill(0)
      : new Array(duration).fill(0);
  }

  if (duration === 365) {
    // For yearly view, aggregate by month
    const monthlyData = new Array(12).fill(0);
    data.forEach((item) => {
      const monthIndex = item.month - 1; // Convert 1-based month to 0-based index
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyData[monthIndex] =
          (monthlyData[monthIndex] || 0) + item.total_count;
      }
    });
    return monthlyData;
  }

  // For other durations, keep daily data
  const result = new Array(duration).fill(0);
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (duration - 1));
  startDate.setHours(0, 0, 0, 0);

  data.forEach((item) => {
    const date = new Date(item.year, item.month - 1, item.day);
    if (date >= startDate && date <= today) {
      const dayIndex = Math.floor(
        (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (dayIndex >= 0 && dayIndex < duration) {
        result[dayIndex] = item.total_count;
      }
    }
  });

  return result;
};

export const BodyContent = () => {
  const [days, setDays] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [duration, setDuration] = useState(365);

  // Helper function to format duration display
  const formatDurationText = (days: number) => {
    if (days === 365) return "1 year";
    if (days === 30) return "1 month";
    if (days === 14) return "2 weeks";
    return `${days} days`;
  };

  const modDays = () => {
    setDays((prev) => !prev);
  };

  const handleDurationSelect = (selectedDuration: number) => {
    setDuration(selectedDuration);
    setDays(false);
  };

  const analytics = async () => {
    try {
      const res = (await getProductAnalytics(duration.toString())) as any;
      if (res.code === 200) {
        setAnalyticsData(res.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    analytics();
  }, [duration]);

  // Format data for the chart
  const chartData = {
    labels: generateDateLabels(duration),
    datasets: [
      {
        label: "Active",
        data: aggregateDataByPeriod(
          analyticsData?.activeProductGraph || [],
          duration
        ),
        borderColor: "#22C26E",
        backgroundColor: "rgba(34, 194, 110, 0.2)",
      },
      {
        label: "Draft",
        data: aggregateDataByPeriod(
          analyticsData?.draftProductGraph || [],
          duration
        ),
        borderColor: "#E8A72D",
        backgroundColor: "rgba(232, 167, 45, 0.2)",
      },
      {
        label: "Inactive",
        data: aggregateDataByPeriod(
          analyticsData?.inactiveProductGraph || [],
          duration
        ),
        borderColor: "#CC2125",
        backgroundColor: "rgba(204, 33, 37, 0.2)",
      },
    ],
  };

  return (
    <div className="mt-[150px] md:mt-[120px] md:ml-[240px] h-full max-w-[1080px] w-full px-4 md:pr-10">
      {/* Header */}
      <div className="flex justify-between items-center pb-[24px]">
        <p>Products</p>
        <div
          onClick={modDays}
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
        <div className="flex border border-stroke_weak py-[16px] px-[48px] w-fit rounded-lg gap-4">
          <div className="pt-2">{invoiceIcn()}</div>

          <section className="flex items-center gap-4">
            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Active
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                {formatNum(analyticsData?.totalActiveProducts?.total_products)}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalActiveProducts?.percentage_change}%
              </p>
            </div>

            <div className="w-[134px] h-[85px] text-center border-x">
              <p className="text-[14px] leading-[22px] text-text_weak">Draft</p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                {formatNum(analyticsData?.totalDraftProducts?.total_products)}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalDraftProducts?.percentage_change}%
              </p>
            </div>

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Inactive
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                {formatNum(
                  analyticsData?.totalInactiveProducts?.total_products
                )}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalInactiveProducts?.percentage_change}%
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Chart or No Data Message */}
      {!analyticsData ||
      (!analyticsData.activeProductGraph &&
        !analyticsData.draftProductGraph &&
        !analyticsData.inactiveProductGraph) ? (
        <div className="flex justify-center h-[455px] items-center">
          <div className="flex flex-col w-full md:w-[400px] md:h-[80px]">
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
        <div className={`w-full  mt-6`}>
          <Line options={options} data={chartData} height={400} />
        </div>
      )}

      {/* indicators */}
      <div className="w-full my-2 h-9 flex justify-center flex-wrap items-end gap-3">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success_1"></span>
          <p className="text-text_gray text-sm font-medium">Active</p>
        </div>

        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-warning_1"></span>
          <p className="text-text_gray text-sm font-medium">Draft</p>
        </div>

        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-error_1"></span>
          <p className="text-text_gray text-sm font-medium">Inactive</p>
        </div>
      </div>
    </div>
  );
};
