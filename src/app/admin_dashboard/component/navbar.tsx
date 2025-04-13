"use client";

import { useLogoutAdmin } from "@/app/global/logout";
import { ProfileAvatar } from "@/app/global/profileGenerator";
import {
  analysis,
  arrowDown,
  dashborad,
  logo,
  management,
  NotificationUnread,
} from "@/app/global/svg";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = useLogoutAdmin();
  const [profileOption, setProfileOption] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("All");
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileWrapperRef = useRef<HTMLDivElement>(null);
  
  // User data state
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Check if we're on the client side before accessing localStorage
      const storedUser = localStorage.getItem("admin");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setOpenNotification(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        profileWrapperRef.current &&
        !profileWrapperRef.current.contains(event.target as Node)
      ) {
        setProfileOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationToggle = () => {
    setOpenNotification(prev => !prev);
    setIsMobileMenuOpen(false);
    setProfileOption(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev);
    setOpenNotification(false);
    setProfileOption(false);
  };

  const handleProfileToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setProfileOption(prev => !prev);
    setOpenNotification(false);
    setIsMobileMenuOpen(false);
  };

  const getDisplayName = (fullName: string): string => {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    return parts[0]; // Returns the first part before space
  };

  return (
    <nav className="w-full px-4 fixed top-0 z-50 bg-white border-b border-b-stroke_weak">
      <div className="mx-auto w-full max-w-7xl h-20 flex justify-between items-center relative">
        <i>{logo()}</i>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <div
            onClick={handleNotificationToggle}
            className="cursor-pointer relative"
          >
            <i>
              <NotificationUnread />
            </i>
          </div>
          <button
            onClick={handleMobileMenuToggle}
            className="text-text_strong"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop navs */}
        <div className="hidden md:flex h-full w-fit gap-6">
          <div
            onClick={() => router.push("/admin_dashboard/")}
            className={` ${
              pathname === "/admin_dashboard/" ||
              pathname === "/admin_dashboard"
                ? " border-b-2  border-text_strong text-text_weak"
                : "text-text_strong"
            } flex gap-2 items-center h-full cursor-pointer`}
          >
            <i>{dashborad()}</i>
            <p className={`text-text_strong font-medium`}>Dashboard</p>
          </div>

          <div
            onClick={() => router.push("/admin_dashboard/management/products")}
            className={` ${
              pathname.includes("admin_dashboard/management")
                ? " border-b-2  border-text_strong text-text_weak"
                : "text-text_strong"
            } flex gap-2 items-center h-full cursor-pointer `}
          >
            <i>{management()}</i>
            <p className={`text-text_strong font-medium`}>Management</p>
          </div>

          <div
            onClick={() => router.push("/admin_dashboard/analytics")}
            className={` ${
              pathname.includes("admin_dashboard/analytics")
                ? " border-b-2  border-text_strong text-text_weak"
                : "text-text_strong"
            } flex gap-2 items-center h-full cursor-pointer`}
          >
            <i>{analysis()}</i>
            <p className={`text-text_strong font-medium`}>Analytics</p>
          </div>

          <div
            onClick={handleNotificationToggle}
            className={` ${
              pathname.includes("admin_dashboard/settings/notification")
                ? " border-b-2  border-text_strong text-text_weak"
                : "text-text_strong"
            } flex gap-2 items-center h-full cursor-pointer relative`}
          >
            <i>
              <NotificationUnread />
            </i>
            <p className={`text-text_strong font-medium`}>Notification</p>
          </div>

          {/* Profile Section */}
          {userData && (
            <div ref={profileWrapperRef} className="flex items-center relative">
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleProfileToggle}
              >
                <ProfileAvatar size="small" name={getDisplayName(userData?.fullName)} />
                <p className="text-text_strong font-medium">{getDisplayName(userData?.fullName)}</p>
                <i className={`${profileOption ? "rotate-180" : ""} transition-transform`}>
                  {arrowDown()}
                </i>
              </div>
              {profileOption && (
                <div className="min-w-[180px] flex flex-col gap-1 py-2 absolute top-16 right-0 bg-background h-fit z-10 rounded-lg overflow-hidden shadow-[0px_8px_24px_0px_#14141414] text-text_weak font-medium text-sm">
                  {/* <Link
                    href={`/admin_dashboard/settings/password`}
                    className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    onClick={() => setProfileOption(false)}
                  >
                    Password
                  </Link>
                  <Link
                    href={`/admin_dashboard/settings/notification`}
                    className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    onClick={() => setProfileOption(false)}
                  >
                    Notification
                  </Link> */}
                  <Link
                    href={`/admin_dashboard/settings/content`}
                    className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    onClick={() => setProfileOption(false)}
                  >
                    Content
                  </Link>
                  <div
                    onClick={() => {
                      handleLogout();
                      setProfileOption(false);
                    }}
                    className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) }
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="absolute top-20 left-0 right-0 bg-white shadow-lg md:hidden rounded-lg overflow-hidden">
            <div className="flex flex-col py-2">
              <div
                onClick={() => {
                  router.push("/admin_dashboard/");
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 ${
                  pathname === "/admin_dashboard/" ||
                  pathname === "/admin_dashboard"
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <i>{dashborad()}</i>
                  <p className="text-text_strong font-medium">Dashboard</p>
                </div>
              </div>

              <div
                onClick={() => {
                  router.push("/admin_dashboard/management/products");
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 ${
                  pathname.includes("admin_dashboard/management")
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <i>{management()}</i>
                  <p className="text-text_strong font-medium">Management</p>
                </div>
              </div>

              <div
                onClick={() => {
                  router.push("/admin_dashboard/analytics");
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 ${
                  pathname.includes("admin_dashboard/analytics")
                    ? "bg-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <i>{analysis()}</i>
                  <p className="text-text_strong font-medium">Analytics</p>
                </div>
              </div>

              {/* Mobile Profile Section */}
              <div className="border-t mt-2 pt-2">
                {userData ? (
                  <>
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2 capitalize">
                        <ProfileAvatar size="small" name={JSON.parse(userData)?.fullName || "Admin"} />
                        <p className="text-text_strong font-medium">{JSON.parse(userData)?.fullName || "Admin"}</p>
                      </div>
                    </div>
                    <Link
                      href={`/admin_dashboard/settings/password`}
                      className="px-4 py-3 block hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Password
                    </Link>
                    <Link
                      href={`/admin_dashboard/settings/notification`}
                      className="px-4 py-3 block hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Notification
                    </Link>
                    <Link
                      href={`/admin_dashboard/settings/content`}
                      className="px-4 py-3 block hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Content
                    </Link>
                    <div
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col px-4 py-3 gap-2">
                    <Link
                      href="/login"
                      className="text-text_strong font-medium hover:text-primary py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-primary text-white px-4 py-2 rounded text-center hover:bg-primary-dark"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* notifications */}
        {openNotification && (
          <div
            ref={notificationRef}
            className="absolute top-[90px] w-full max-w-[480px] right-0 h-fit max-h-[481px] overflow-hidden shadow-[0px_8px_24px_0px_#14141414] bg-white z-10 rounded-lg"
          >
            {/* header */}
            <div className="w-full border-b flex justify-between items-center px-6">
              {/* tab */}
              <div className="flex gap-4 items-center justify-center">
                <div
                  onClick={() => setTab("All")}
                  className={`py-4 px-2 border-b-2 ${
                    tab === "All"
                      ? "border-black text-black"
                      : "text-text_weak border-transparent"
                  } `}
                >
                  All
                </div>
                <div
                  onClick={() => setTab("Unread")}
                  className={`py-4 px-2 border-b-2  ${
                    tab === "Unread"
                      ? "border-black text-black"
                      : "text-text_weak border-transparent"
                  } `}
                >
                  Unread {`(${1})`}
                </div>
              </div>

              <p className="underline cursor-pointer text-text_weak">
                Mark all as read
              </p>
            </div>

            {/* notification */}
            {
              <div className="p-6 w-full gap-6 flex flex-col">
                {/* daily notification */}
                <div className="w-full flex flex-col gap-4">
                  <p className="text-sm text-black font-normal">7 days ago</p>
                  <div className="flex gap-[12px] w-full">
                    <NotificationUnread />
                    <div className="flex flex-col w-full h-fit">
                      {/* head and time */}
                      <div className="flex w-full justify-between items-center text-sm">
                        <p className="text-black font-medium ">Sales update</p>
                        <p className="text-text_weak">Just now</p>
                      </div>
                      {/* message */}
                      <p className="">
                        {`You've made 120 sales today! Keep it up and check the dashboard for details`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </nav>
  );
};