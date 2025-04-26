"use client";
import React, { useState } from "react";
import { Footer } from "@/app/Component/footer";
import { Navbar } from "@/app/global/navbar";
import Terms from "./terms";

import Modal from "./modal";
import { Privacy } from "./privacy";

export const Body = () => {
  const [newPage, setnewPage] = useState<string>("terms");

  const updateModal = () => {
    if (newPage === "terms") {
      return <Terms />;
    } else if (newPage === "privacy") {
      return <Privacy />;
    }
  };

  const activeModal = (type: string): void => {
    setnewPage(type);
  };

  const [change, setChange] = useState<boolean>(false);

  const changedBar = () => {
    setChange(!change);
  };

  // const toggle = change ? "translate-x-20" : "translate-x-[-90px]";

  return (
    <>
      <Navbar />

      <div className="mt-[108px] sm:mt-[152px] px-4  lg:px-10 md:mx-auto lg:max-w-full">
        <p className="text-[18px] sm:text-xl text-text_weak pb-2 w-max mx-auto">
          Legals
        </p>
        <h1 className="w-full sm:w-[550px] text-2xl sm:text-3xl text-text_strong text-center sm:mx-auto pb-6">
          Your rights and our responsibilities
        </h1>

        {/* button switchers */}
        <div className="flex justify-center items-center w-full">
          <div className="flex items-center relative justify-evenly h-11 px-1.5 py-[6px] rounded-full w-fit  sm:mx-auto bg-[#fafafa] gap-2">
            {/* indicator */}
           
            <button
              className={`w-fit  text-nowrap py-1 px-2 ${newPage === "terms" && "bg-white  rounded-full"}`}
              onClick={() => {
                activeModal("terms");
                changedBar();
              }}
            >
              Terms of service
            </button>
            <button
              className={`w-fit  text-nowrap py-1 px-2 ${newPage === "privacy" && "bg-white  rounded-full"}`}
              onClick={() => {
                activeModal("privacy");
                changedBar();
              }}
            >
              Privacy policy
            </button>
          </div>
        </div>

        {/* modal switching between both sections with reload */}
        <Modal
          content={updateModal()}
          isActive={newPage === "terms" || newPage === "privacy"}
        />

        {/* footer */}
        <Footer />
      </div>
    </>
  );
};
