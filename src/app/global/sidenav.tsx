"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

// import { ReactNode } from "react";

// interface SidenavProps {
//   content: ReactNode;
// }

export const Sidenav = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="h-[calc(100vh-9.5rem)] ml-[60px] w-full max-w-[160px] hidden md:block md:fixed top-[150px] transform scale-100 ">
        <div className=" h-full w-full flex flex-col justify-between text-start gap-[200px fixed h-full top-2 ">
          {/* navs */}
          <div className="flex flex-col w-full gap-2 flex-grow">
            <Link
              href={`/profile`}
              className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
                pathname === "/profile" ? "bg-stroke_weak" : ""
              } w-full`}
            >
              Profile
            </Link>

            <Link
              href={`/orders`}
              className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
                pathname === "/orders" ? "bg-stroke_weak" : ""
              } w-full`}
            >
              Orders
            </Link>

            <Link
              href={`/address`}
              className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
                pathname === "/address" ? "bg-stroke_weak" : ""
              } w-full`}
            >
              Address
            </Link>

            <Link
              href={`/password`}
              className={`rounded-full h-[38px] text-start px-6 flex items-center text-base font-medium ${
                pathname === "/password" ? "bg-stroke_weak" : ""
              } w-full`}
            >
              Password
            </Link>
          </div>
          {/* logout */}
          <div className="h-[38px] text-start px-6 flex items-center text-base font-medium mb-4">
            Logout
          </div>
        </div>
      </div>

      <div>
        <div className="flex overflow-y-scroll fixed md:hidden top-[70px] py-2 px-4 z-10 border-b border-b-stroke_weak bg-white w-full gap-2 flex-grow">
          <Link
            href={`/profile`}
            className={`rounded-full h-[38px] text-start px-6 flex justify-center items-center text-base font-medium ${
              pathname === "/profile" ? " relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-8px]" : "text-stroke_strong"
            } w-full`}
          >
            Profile
          </Link>

          <Link
            href={`/orders`}
            className={`rounded-full h-[38px] text-start px-6 flex justify-center items-center text-base font-medium ${
              pathname === "/orders" ? " relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-8px]" : "text-stroke_strong"
            } w-full`}
          >
            Orders
          </Link>

          <Link
            href={`/address`}
            className={`rounded-full h-[38px] text-start px-6 flex justify-center items-center text-base font-medium ${
              pathname === "/address" ? " relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-8px]" : "text-stroke_strong"
            } w-full`}
          >
            Address
          </Link>

          <Link
            href={`/password`}
            className={`rounded-full h-[38px] text-start px-6 flex justify-center items-center text-base font-medium ${
              pathname === "/password" ? " relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-8px]" : "text-stroke_strong"
            } w-full`}
          >
            Password
          </Link>
        </div>
      </div>
    </>
  );
};
