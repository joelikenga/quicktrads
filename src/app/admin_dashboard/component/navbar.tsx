"use client";

import { useLogoutAdmin } from "@/app/global/logout";
import { ProfileAvatar } from "@/app/global/profileGenerator";
import {
  analysis,
  arrowDown,
  dashborad,
  logo,
  management,
  notification,
  // notification,
} from "@/app/global/svg";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = useLogoutAdmin(); // Store the logout function
  const [profileOption, setProfileOption] = useState<boolean>(false);

  return (
    <nav className="w-full px-4 fixed top-0 z-50 bg-white border-b border-b-stroke_weak">
      <div className="mx-auto w-full max-w-7xl h-20 flex justify-between items-center">
        <i>{logo()}</i>

        {/* navs */}
        <div className="h-full w-fit flex gap-6">
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
            } flex gap-2 items-center h-full cursor-pointer`}
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
            // onClick={() => router.push("/admin_dashboard/settings/notification")}
            className={` ${
              pathname.includes("admin_dashboard/settings/notification")
                ? " border-b-2  border-text_strong text-text_weak"
                : "text-text_strong"
            } flex gap-2 items-center h-full cursor-pointer`}
          >
            <i>{notification()}</i>
            <p className={`text-text_strong font-medium`}>Notification</p>
          </div>

          <div className="flex items-center relative">
            <div
              className="flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setProfileOption(!profileOption)}
            >
              <ProfileAvatar size="small" name={`Frank Emeka`} />
              <p className="text-text_strong font-medium">Frank Emeka</p>
              <i>{arrowDown()}</i>
            </div>
            {profileOption && (
              <div className="min-w-[180px] flex flex-col gap-1 py-2 absolute top-16 right-0 bg-background  h-fit z-10 rounded-lg overflow-hidden shadow-[0px_8px_24px_0px_#14141414] text-text_weak font-medium text-sm">
                {/* <Link
                  href={`/admin_dashboard/settings/profile`}
                  className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                >
                  Profile
                </Link> */}
                <Link
                  href={`/admin_dashboard/settings/password`}
                  className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                >
                  Password
                </Link>
                <Link
                  href={`/admin_dashboard/settings/notification`}
                  className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                >
                  Notification
                </Link>
                <Link
                  href={`/admin_dashboard/settings/content`}
                  className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                >
                  Content
                </Link>
                <div
                  onClick={handleLogout} // Use the stored function
                  className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                >
                  Logout
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
