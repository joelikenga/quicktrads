"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../global/navbar";
import { Sidenav } from "../global/sidenav";
import { Body } from "./component/body";

const Profile = () => {

    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
  
  
      useEffect(() => {
        const data = localStorage.getItem("user");
        if (!data) {
          router.push("/"); // Redirect if no user data
        } else {
          setUserData(JSON.parse(data));
        }
      }, [router]);
    
      // If no userData, show nothing while waiting for redirect
      if (!userData) return null;
  
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
