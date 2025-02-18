import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidebar() {
  const pathname = usePathname(); //using the usepathname to check the current pathname and storing in this variable
  return (
    <>
      <aside className="flex flex-col fixed left-0 top-[16vh] w-[340px] gap-4 pl-[70px] h-[calc(100vh-3rem)]">
        <Link
          href={`./management`}
          className={`py-2 pl-6 pr-12 ease-in-out transition-all rounded-full text-center hover:bg-stroke_weak  w-max text-black" ${
            pathname === "./managemnt" ? "bg-stroke_weak" : ""
          }`}
        >
          Products
        </Link>
        <Link
          href={`./orders`}
          className={`py-2 pl-6 pr-12 ease-in-out transition-all rounded-full text-center  hover:bg-stroke_weak w-max text-black" ${
            pathname === "/orders" ? "bg-stroke_weak" : ""
          }`}
        >
          Orders
        </Link>
        <Link
          href={`./customers`}
          className={`py-2 pl-6 pr-12 ease-in-out transition-all rounded-full text-center w-max  hover:bg-stroke_weak text-black" ${
            pathname === "/customers" ? "bg-stroke_weak" : ""
          }`}
        >
          Customers
        </Link>
      </aside>
    </>
  );
}

export default Sidebar;
