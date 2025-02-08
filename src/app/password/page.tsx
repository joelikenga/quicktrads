import { Navbar } from "../global/navbar";
import { Sidenav } from "../global/sidenav";
import { Body } from "./component/body";

const Profile = () => {
  return (
    <div className="">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto">
      <Sidenav />
      <Body />
      </div>
    </div>
  );
};

export default Profile;
