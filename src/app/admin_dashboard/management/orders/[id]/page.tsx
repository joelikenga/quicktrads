import { Body } from "./component/body";
import { SideNav } from "../../component/sideNav";
import { Navbar } from "@/app/admin_dashboard/component/navbar";

const Page = () => {
  return (
    <div className="">
      <Navbar />
      <div className="px-10 w-full">
        <div className="mx-auto w-full max-w-7xl">
          <SideNav />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Page;
