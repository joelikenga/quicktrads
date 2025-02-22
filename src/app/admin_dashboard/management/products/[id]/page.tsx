"use client";

import { useParams } from "next/navigation";
import { Body } from "./component/body";
import { Navbar } from "@/app/admin_dashboard/component/navbar";
import { SideNav } from "../../component/sideNav";

const ProductDetail = () => {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  return (
    <div>
      <Navbar />

      <div className="px-10 w-full">
        <div className="mx-auto w-full max-w-7xl">
          <SideNav />
          <Body id={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
