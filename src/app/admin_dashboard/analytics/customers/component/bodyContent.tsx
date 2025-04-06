 "use client";
import React, { useState, useEffect } from "react";
import { dates, arrowDown, usersIcon } from "@/app/global/svg";
import { Line } from "react-chartjs-2";
// import { Lora } from "next/font/google";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js/auto";
import { getUserAnalytics } from "@/utils/api/admin/products";

// const lora = Lora({
//   variable: "--font-lora",
//   subsets: ["latin"],
// });

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0.5,
      spanGaps: true
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#ffffff",
      titleColor: "#333",
      bodyColor: "#333",
      titleFont: {
        size: 14,
        family: "Poppins",
        weight: "bold" as const,
      },
      bodyFont: {
        size: 12,
        family: "Poppins",
      },
      padding: 8,
      caretPadding: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        title: () => "",
        label: function (tooltipItem: any) {
          return `${tooltipItem.raw} users  |  ${tooltipItem.label}`;
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

interface UserData {
  day: number;
  month: number;
  year: number;
  total_count: number;
}

interface AnalyticsData {
  activeUserGraph: UserData[] | null;
  blockedUserGraph: UserData[] | null;
  inactiveUserGraph: UserData[] | null;
  totalActiveUsers: {
    percentage_change: number;
    total_users: number;
  };
  totalBlockedUsers: {
    percentage_change: number;
    total_users: number;
  };
  totalInactiveUsers: {
    percentage_change: number;
    total_users: number;
  };
}

const aggregateUserData = (data: UserData[] | null, duration: number) => {
  console.log("Raw data:", data); // Debug log

  if (!data || !Array.isArray(data)) {
    return new Array(duration).fill(0);
  }

  const result = new Array(duration).fill(0);
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (duration - 1));
  startDate.setHours(0, 0, 0, 0);

  console.log("Start date:", startDate); // Debug log

  data.forEach((item) => {
    const itemDate = new Date(item.year, item.month - 1, item.day);
    console.log("Processing item date:", itemDate); // Debug log

    if (itemDate >= startDate && itemDate <= today) {
      const dayIndex = Math.floor(
        (itemDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (dayIndex >= 0 && dayIndex < duration) {
        result[dayIndex] = item.total_count;
      }
    }
  });

  console.log("Processed result:", result); // Debug log
  return result;
};

const formatDurationText = (days: number) => {
  if (days === 365) return '1 year';
  if (days === 30) return '1 month';
  if (days === 14) return '2 weeks';
  return `${days} days`;
};

export const BodyContent = () => {
  const [days, setDays] = useState(false);
  const [duration, setDuration] = useState(365);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const modDays = (selectedDuration: number) => {
    setDuration(selectedDuration);
    setDays(false);
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const res = await getUserAnalytics(duration);
        console.log("API Response:", res); // Debug log
        if (res.status === 200) {
          setAnalyticsData(res.data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, [duration]);

  const chartData = {
    labels: generateDateLabels(duration),
    datasets: [
      {
        label: "Active Users",
        data: aggregateUserData(analyticsData?.activeUserGraph || null, duration),
        borderColor: "#22C26E",
        backgroundColor: "rgba(34, 194, 110, 0.2)",
      }
    ],
  };

  return (
    <div className="mt-[120px] ml-[240px] h-full max-w-[1080px] pr-10 w-full">
      <div className="">
        <div className="flex justify-between items-cener pb-[24px]">
          <p>Customers</p>
          

          <p
            onClick={() => setDays(!days)}
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
              <p className="py-[10px] px-[24px] text-text_weak" onClick={() => modDays(7)}>7 days</p>
              <p className="py-[10px] px-[24px] text-text_weak" onClick={() => modDays(14)}>14 days</p>
              <p className="py-[10px] px-[24px] text-text_weak" onClick={() => modDays(30)}>30 days</p>
              <p className="py-[10px] px-[24px] text-text_weak bg-fill" onClick={() => modDays(365)}>1 year</p>
            </div>
          </p>
        </div>

        {/* amounts */}
        <div className="flex border border-stroke_weak py-[12px] px-[48px] w-fit rounded-lg  gap-4">
          <div className="pt-2">{usersIcon()}</div>

          <section className="flex items-center gap-4 py-[16px] px-[48px]">
            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Active
              </p>
              <p className="text-[22px] leading-[28px] font-[400] py-2">{analyticsData?.totalActiveUsers?.total_users || 0}</p>
              <p className="text-[14px] leading-[22px] text-text_weak">{analyticsData?.totalActiveUsers?.percentage_change || 0}%</p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Inactive
              </p>
              <p className="text-[22px] leading-[28px] font-[400] py-2">{analyticsData?.totalInactiveUsers?.total_users || 0}</p>
              <p className="text-[14px] leading-[22px] text-text_weak">{analyticsData?.totalInactiveUsers?.percentage_change || 0}%</p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Blocked
              </p>
              <p className="text-[22px] leading-[28px] font-[400] py-2">{analyticsData?.totalBlockedUsers?.total_users || 0}</p>
              <p className="text-[14px] leading-[22px] text-text_weak">{analyticsData?.totalBlockedUsers?.percentage_change || 0}%</p>
            </div>
          </section>
        </div>

        {/* user analytics chart */}
        <div className="flex justify-center h-[455px] items-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : analyticsData?.activeUserGraph && analyticsData.activeUserGraph.length > 0 ? (
            <div className="w-full h-full">
              <Line data={chartData} options={options} />
            </div>
          ) : (
            <div className="flex flex-col w-[400px] h-[80px] items-center">
              <span className="w-[40px]">{usersIcon()}</span>
              <h3 className="pb-4 py-[16px] text-[18px] leading-[28px] text-center font-[500]">
                No user data available!
              </h3>
              <p className="text-[14px] leading-[22px] text-text_weak text-center">
                There are currently no user statistics to display
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 