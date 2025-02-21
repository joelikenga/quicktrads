"use client";

import { ProfileAvatar } from "@/app/global/profileGenerator";
import {
  analysis,
  arrowDown,
  dashborad,
  logo,
  management,
  notification,
} from "@/app/global/svg";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="w-full px-10 fixed top-0 z-50 bg-white shadow-md">
      <div className="mx-auto w-full max-w-7xl h-20 flex justify-between items-center">
        <i>{logo()}</i>

        {/* navs */}
        <div className="h-full w-fit flex gap-6">
          <div
            onClick={() => router.push('/admin_dashboard/')}
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
            onClick={() => router.push('/admin_dashboard/management/products')}
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
            onClick={() => router.push('/admin_dashboard/analytics')}
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
            onClick={() => router.push('/admin_dashboard/notification')}
            className={` ${
              pathname.includes("admin_dashboard/notification")
                ? " border-b-2  border-text_strong text-text_weak"
                : "text-text_strong"
            } flex gap-2 items-center h-full cursor-pointer`}
          >
            <i>{notification()}</i>
            <p className={`text-text_strong font-medium`}>Notification</p>
          </div>

          <div className="flex items-center justify-center gap-2 cursor-pointer">
            <ProfileAvatar size="small" name={`Frank Emeka`} />
            <p className="text-text_strong font-medium">Frank Emeka</p>
            <i>{arrowDown()}</i>
          </div>
        </div>
      </div>
    </nav>
  );
};
