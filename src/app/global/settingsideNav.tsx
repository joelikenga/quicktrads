"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

// import { ReactNode } from "react";

// interface SidenavProps {
//   content: ReactNode;
// }

export const SettingsideNav = () => {
  const pathname = usePathname();

  return (
   <>
     <div className="h-[calc(100vh-8rem)] ml-[60px] hidden md:block w-full max-w-[160px] fixed top-[120px] transform scale-100 ">
      <div className=" h-full w-full flex flex-col justify-between text-start gap-[200px fixed h-full top-2 ">
        {/* navs */}
        <div className="flex flex-col w-full gap-2 flex-grow">
          <Link
            href={`/admin_dashboard/settings/profile`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/profile"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Profile
          </Link>

          <Link
            href={`/admin_dashboard/settings/password`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/password"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Password
          </Link>

          <Link
            href={`/admin_dashboard/settings/notification`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/notification"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Notification
          </Link>

          <Link
            href={`/admin_dashboard/settings/content`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/content"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Content
          </Link>
        </div>
        {/* logout */}
        <div className="h-[38px] text-start px-6 flex items-center text-base font-medium mb-4">
          Logout
        </div>
      </div>
     </div>


     <div className="h-full w-full flex justify-between text-start gap-[200px] fixed top-2 ">
        {/* navs */}
        <div className="flex w-full gap-2 flex-grow">
          <Link
            href={`/admin_dashboard/settings/profile`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/profile"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Profile
          </Link>

          <Link
            href={`/admin_dashboard/settings/password`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/password"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Password
          </Link>

          <Link
            href={`/admin_dashboard/settings/notification`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/notification"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Notification
          </Link>

          <Link
            href={`/admin_dashboard/settings/content`}
            className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
              pathname === "/admin_dashboard/settings/content"
                ? "bg-stroke_weak"
                : ""
            } w-full`}
          >
            Content
          </Link>
        </div>
        {/* logout */}
        <div className="h-[38px] text-start px-6 flex items-center text-base font-medium mb-4">
          Logout
        </div>
     </div>
   </>
  );
};
