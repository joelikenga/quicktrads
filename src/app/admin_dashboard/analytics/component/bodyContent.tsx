/* eslint-disable @typescript-eslint/no-explicit-any */

import { dates, arrowDown, cashIcon } from "@/app/global/svg";
import { useState, useEffect } from "react";
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
import { getSalesAnalytics } from "@/utils/api/admin/products";

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
      spanGaps: true // Enable gaps for missing data
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
          const value = tooltipItem.raw || 0;
          return `$${formatNum(value, 2)}  |  ${tooltipItem.label}`;
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

const generateDateLabels = (duration: number) => {
  const labels = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  
  if (duration === 365) {
    // For yearly view, get months from start of year
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i, 1);
      labels.push(date.toLocaleString('default', { month: 'short' }));
    }
  } else {
    // For other durations, get exact number of past days
    for (let i = duration - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      labels.push(`${month} ${day}`);
    }
  }
  return labels;
};

const aggregateDataByPeriod = (data: any[], duration: number) => {
  if (!data || !Array.isArray(data)) {
    return new Array(duration === 365 ? 12 : duration).fill(0);
  }

  const today = new Date();
  const result = new Array(duration === 365 ? 12 : duration).fill(0);
  
  if (duration === 365) {
    // Yearly view - aggregate by months
    data.forEach((item) => {
      const monthIndex = item.month - 1; // Convert 1-based month to 0-based index
      result[monthIndex] = (result[monthIndex] || 0) + item.amount;
    });
  } else {
    // Daily view - exact number of past days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (duration - 1));
    startDate.setHours(0, 0, 0, 0);

    data.forEach((item) => {
      const itemDate = new Date(item.year, item.month - 1, item.day);
      if (itemDate >= startDate && itemDate <= today) {
        const dayIndex = Math.floor(
          (itemDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (dayIndex >= 0 && dayIndex < duration) {
          result[dayIndex] = (result[dayIndex] || 0) + item.amount;
        }
      }
    });
  }
  
  return result;
};

export const BodyContent = () => {
  const [days, setDays] = useState(false);
  const [duration, setDuration] = useState(365); // Changed default to 365
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const modDays = (selectedDuration: number) => {
    setDuration(selectedDuration);
    setDays(false); // Close dropdown after selection
  };

  const analytics = async () => {
    try {
      const res = (await getSalesAnalytics(duration)) as any;
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
        data: aggregateDataByPeriod(analyticsData?.pendingOrderGraph || [], duration),
        borderColor: "#E8A72D",
        backgroundColor: "rgba(232, 167, 45, 0.2)",
      },
      {
        label: "Processing",
        data: aggregateDataByPeriod(analyticsData?.processingOrderGraph || [], duration),
        borderColor: "#1F0EC9",
        backgroundColor: "rgba(31, 14, 201, 0.2)",
      },
      {
        label: "Delivered",
        data: aggregateDataByPeriod(analyticsData?.deliveredOrderGraph || [], duration),
        borderColor: "#22C26E",
        backgroundColor: "rgba(34, 194, 110, 0.2)",
      },
      {
        label: "Cancelled",
        data: aggregateDataByPeriod(analyticsData?.cancelledOrderGraph || [], duration),
        borderColor: "#CC2125",
        backgroundColor: "rgba(204, 33, 37, 0.2)",
      },
      {
        label: "Refunded",
        data: aggregateDataByPeriod(analyticsData?.refundedOrderGraph || [], duration),
        borderColor: "#727D79",
        backgroundColor: "rgba(114, 125, 121, 0.2)",
      },
    ],
  };

  const getDurationDisplay = (days: number) => {
    return days === 365 ? "1 year" : `${days} days`;
  };

  return (
    <div className="mt-[120px] ml-[240px] h-full max-w-[1080px] w-full pr-10">
      <div className="">
        <div className="flex justify-between items-cener pb-[24px]">
          <p>Sales</p>

          <p
            onClick={() => setDays((prev) => !prev)}
            className="flex relative gap-2 cursor-pointer selection:no-underline items-center"
          >
            <span>{dates()}</span>
            <p>{getDurationDisplay(duration)}</p>
            <span>{arrowDown()}</span>

            {/* days option board */}
            <div
              className={`w-[179px] absolute top-10 right-4 h-[176px] border-lg ${
                days ? "block" : "hidden"
              } bg-white rounded-[12px] shadow-md`}
            >
              <p
                onClick={() => modDays(7)}
                className={`py-[10px] px-[24px] text-text_weak cursor-pointer hover:bg-fill ${
                  duration === 7 ? "bg-fill" : ""
                }`}
              >
                7 days
              </p>
              <p
                onClick={() => modDays(14)}
                className={`py-[10px] px-[24px] text-text_weak cursor-pointer hover:bg-fill ${
                  duration === 14 ? "bg-fill" : ""
                }`}
              >
                14 days
              </p>
              <p
                onClick={() => modDays(30)}
                className={`py-[10px] px-[24px] text-text_weak cursor-pointer hover:bg-fill ${
                  duration === 30 ? "bg-fill" : ""
                }`}
              >
                30 days
              </p>
              <p
                onClick={() => modDays(365)}
                className={`py-[10px] px-[24px] text-text_weak cursor-pointer hover:bg-fill ${
                  duration === 365 ? "bg-fill" : ""
                }`}
              >
                1 year
              </p>
            </div>
          </p>
        </div>

        {/* amounts */}
        <div className="flex border border-stroke_weak py-[16px] px-[48px] w-fit rounded-lg  gap-4">
          <div className="pt-2">{cashIcon()}</div>

          <section className="flex items-center gap-4">
            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Total sales
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                ${formatNum(analyticsData?.totalSales?.total_order_amount)}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalSales?.percentage_change}%
              </p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Total order
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                ${formatNum(analyticsData?.totalOrders?.total_order_amount)}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalOrders?.percentage_change}%
              </p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Cancelled
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                ${formatNum(analyticsData?.totalCalcelled?.total_order_amount)}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalCalcelled?.percentage_change}%
              </p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Refunded
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                ${formatNum(analyticsData?.totalRefunded?.total_order_amount)}
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">
                {analyticsData?.totalRefunded?.percentage_change}%
              </p>
            </div>
          </section>
        </div>

        {/* sales pannel */}
        {!analyticsData || (
          !analyticsData.pendingOrderGraph && 
          !analyticsData.processingOrderGraph && 
          !analyticsData.deliveredOrderGraph && 
          !analyticsData.cancelledOrderGraph &&
          !analyticsData.refundedOrderGraph
        ) ? (
          <div className="flex justify-center h-[455px] items-center">
            <div className=" flex flex-col w-[400px] h-[80px]">
              <span className="w-[40px] mx-auto">{cashIcon()}</span>
              <h3 className="pb-4 py-[16px] text-[18px] leading-[28px] text-center font-[500]">
                There are currently no sales!
              </h3>
              <p className="text-[14px] leading-[22px] text-text_weak w-[266px] mx-auto text-center">
                It looks like there are currently no sales available at the
                moment
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className={`w-full h-[800px]mt-6`}>
              <Line options={options} data={chartData} height={400} />
            </div>
            {/* indicators */}
            <div className="w-full my-2 h-9 flex justify-center items-end gap-3">
              {/* ---Bridgecard--- */}
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E8A72D]"></span>
                <p className="text-text_gray text-sm font-medium">
                  Pending
                </p>
              </div>

              {/* ---Bitpowr--- */}
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1F0EC9]"></span>
                <p className="text-text_gray text-sm font-medium">
                  Processing
                </p>
              </div>

              {/* ---Yellowcard--- */}
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#22C26E]"></span>
                <p className="text-text_gray text-sm font-medium">
                  Delivered
                </p>
              </div>

              {/* ---Link--- */}
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#CC2125]"></span>
                <p className="text-text_gray text-sm font-medium">Cancelled</p>
              </div>

              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#727D79]"></span>
                <p className="text-text_gray text-sm font-medium">Refunded</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
