"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNav = () => {
  const pathname = usePathname();

  return (
    <>
    <div className="max-w-[160px] w-full  h-[calc(100vh-5rem)] fixed top-[118px]  text-base font-medium hidden md:flex flex-col gap-2 justify-start">
      <Link
        href={`/admin_dashboard/analytics`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname === ("/admin_dashboard/analytics")
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
        Sales
      </Link>
      <Link
        href={`/admin_dashboard/analytics/orders`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname === "/admin_dashboard/analytics/orders"
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
      Orders
      </Link>
      <Link
        href={`/admin_dashboard/analytics/products`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname === "/admin_dashboard/analytics/products"
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
       Products
      </Link>

      {/* <Link
        href={`/admin_dashboard/analytics/customers`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname === "/admin_dashboard/analytics/customers"
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
       Customers
      </Link> */}
    </div>
    <div className="overflow-y-scroll bg-white z-10 w-full md:hidden left-0 fixed top-[80px] h-[45px]  border-b border-b-stroke_weak text-base font-medium flex gap-2 ">
      <Link
        href={`/admin_dashboard/analytics`}
        className={`w-full h-[37px] items-center flex justify-center ${
          pathname === ("/admin_dashboard/analytics")
            ? "relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-6px]"
            : "text-text_weak"
        }`}
      >
        Sales
      </Link>
      <Link
        href={`/admin_dashboard/analytics/orders`}
        className={`w-full h-[37px] items-center flex justify-center ${
          pathname === "/admin_dashboard/analytics/orders"
            ? "relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-6px]"
            : "text-text_weak"
        }`}
      >
        Orders
      </Link>
      <Link
        href={`/admin_dashboard/analytics/products`}
        className={`w-full h-[37px] items-center flex justify-center ${
          pathname === "/admin_dashboard/analytics/products"
            ? "relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-6px]"
            : "text-text_weak"
        }`}
      >
        Products
      </Link>
    </div>
    </>
  );
};
