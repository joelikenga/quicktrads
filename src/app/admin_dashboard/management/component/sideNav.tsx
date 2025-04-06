"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNav = () => {
  const pathname = usePathname();

  return (
    <>
    <div className="max-w-[160px] hidden bg-white  w-full  h-[calc(100vh-5rem)] fixed top-[118px]  text-base font-medium md:flex flex-col gap-2">
      <Link
        href={`/admin_dashboard/management/products`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname.includes("/admin_dashboard/management/products")
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
        Products
      </Link>
      <Link
        href={`/admin_dashboard/management/orders`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname.includes("/admin_dashboard/management/orders")
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
        Orders
      </Link>
      <Link
        href={`/admin_dashboard/management/customers`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname.includes(`/admin_dashboard/management/customers`) 
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
        Customers
      </Link>
    </div>

    <div className="overflow-y-scroll bg-white z-10 w-full md:hidden left-0 fixed top-[80px] h-[44px]  border-b border-b-stroke_weak text-base font-medium flex gap-2">
      <Link
        href={`/admin_dashboard/management/products`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname.includes("/admin_dashboard/management/products")
            ? "relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-6px]"
            : "text-text_weak"
        }`}
      >
        Products
      </Link>
      <Link
        href={`/admin_dashboard/management/orders`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname.includes("/admin_dashboard/management/orders")
            ? "relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-6px]"
            : "text-text_weak"
        }`}
      >
        Orders
      </Link>
      <Link
        href={`/admin_dashboard/management/customers`}
        className={`w-full h-[38px] rounded-full items-center flex justify-center ${
          pathname.includes(`/admin_dashboard/management/customers`) 
            ? "relative text-center before:absolute before:w-full before:h-[2px] before:bg-error_1 before:left-0 before:bottom-[-6px]"
            : "text-text_weak"
        }`}
      >
        Customers
      </Link>
    </div>
    </>
  );
};
 