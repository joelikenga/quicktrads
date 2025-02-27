"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="max-w-[160px] w-full  h-[calc(100vh-5rem)] fixed top-[118px]  text-base font-medium flex flex-col gap-2">
      <Link
        href={`/admin_dashboard/analytics`}
        className={`w-full h-[38px] rounded-full items-center flex ${
          pathname.includes("/admin_dashboard/management/products")
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
        Sales
      </Link>
      <Link
        href={`/admin_dashboard/analytics/orders`}
        className={`w-full h-[38px] rounded-full items-center flex ${
          pathname === "/admin_dashboard/management/orders"
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
      Orders
      </Link>
      <Link
        href={`/admin_dashboard/analytics/products`}
        className={`w-full h-[38px] rounded-full items-center flex ${
          pathname === "/admin_dashboard/management/customers"
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
       Products
      </Link>

      <Link
        href={`/admin_dashboard/analytics/customers`}
        className={`w-full h-[38px] rounded-full items-center flex ${
          pathname === "/admin_dashboard/management/customers"
            ? "bg-stroke_weak text-text_strong"
            : "text-text_weak"
        }`}
      >
       Customers
      </Link>
    </div>
  );
};
