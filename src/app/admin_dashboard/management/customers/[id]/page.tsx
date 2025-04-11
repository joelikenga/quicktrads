"use client";

import { Body } from "./component/body";
import { Navbar } from "@/app/admin_dashboard/component/navbar";
import { SideNav } from "../../component/sideNav";

const CustomerDetail = () => {
  return (
    <div>
      <Navbar />

      <div className="px-4 w-full">
        <div className="mx-auto w-full max-w-7xl">
          <SideNav />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
