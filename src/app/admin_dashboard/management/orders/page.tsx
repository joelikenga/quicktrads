import { Navbar } from "../../component/navbar";
import { SideNav } from "../component/sideNav";
import { Body } from "./component/body";

const Orders = () => {
  return (
    <div className="">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto">
      <SideNav />
      <Body />
      </div>
    </div>
  );
};

export default Orders;
