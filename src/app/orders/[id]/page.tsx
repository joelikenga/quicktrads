import { Navbar } from "@/app/global/navbar";
import { Body } from "./component/body";
import { Sidenav } from "@/app/global/sidenav";

const Page = () => {
  return (
    <div className="">
      <Navbar />
      <div className="px-10 w-full">
        <div className="mx-auto w-full max-w-7xl">
          <Sidenav />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Page;
