"use client";
import { arrowDown, closeIcon, mapIcon } from "@/app/global/svg";
import { Lora } from "next/font/google";
import { useState } from "react";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Body = () => {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [deleteAddress, setDeleteAddress] = useState<boolean>(false);

  return (
    <div className=" flex flex-col gap-8 h-[82px] border-b ml-[280px] mt-[150px]">
      {/* add address modal */}
      {addressModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-start backdrop-blur px-4 md:px-0 overflow-y-auto">
          <div className="bg-white max-w-[480px] w-full h-fit p-4 md:p-8 flex flex-col gap-8 rounded-lg  mt-20 mb-6">
            <div className="w-full flex justify-between items-center">
              <p className="text-text_strong  text-[18px] font-medium">
                Add address
              </p>
              <i
                onClick={() => setAddressModal(false)}
                className="cursor-pointer"
              >
                {closeIcon()}
              </i>
            </div>

            {/* inputs */}
            <div className="w-full flex flex-col gap-4">
              {/* fullname */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Full name</p>
                <div className=" w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4  w-full"
                    placeholder=""
                    type="text"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Email</p>
                <div className=" w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4  w-full"
                    placeholder=""
                    type="text"
                  />
                </div>
              </div>
              {/* phone */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Phone number</p>
                <div className=" w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4  w-full"
                    placeholder=""
                    type="text"
                  />
                </div>
              </div>
              {/* Address */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Address</p>
                <div className=" w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4  w-full"
                    placeholder=""
                    type="text"
                  />
                </div>
              </div>

              <div className="flex gap-8 justify-start items-center w-full">
                {/* State */}
                <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
                  <p className="">State</p>
                  <div className=" w-full">
                    <input
                      className="outline-none border rounded-lg h-10 px-4  w-full"
                      placeholder=""
                      type="text"
                      value={`male`}
                    />
                    <span className="  absolute top-[42px] right-4">
                      {arrowDown()}
                    </span>
                    {false && (
                      <div className=" py-4 border w-full rounded-xl gap-2 flex flex-col absolute z-20 mt-1 ">
                        <div className="h-9 p-4 bg-fill flex items-center">
                          Male
                        </div>
                        <div className="h-9 p-4 bg-fill flex items-center">
                          Male
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
                  <p className="">Country</p>
                  <div className=" w-full">
                    <input
                      className="outline-none border rounded-lg h-10 px-4  w-full"
                      placeholder=""
                      type="text"
                      value={`male`}
                    />
                    <span className="  absolute top-[42px] right-4">
                      {arrowDown()}
                    </span>
                    {false && (
                      <div className=" py-4 border w-full rounded-xl gap-2 flex flex-col absolute z-20 mt-1 ">
                        <div className="h-9 p-4 bg-fill flex items-center">
                          Male
                        </div>
                        <div className="h-9 p-4 bg-fill flex items-center">
                          Male
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className="flex gap-6 justify-between items-center w-full font-medium text-base mt-2">
              <button className=" w-full text-background bg-text_strong rounded-full px-6 h-12 flex justify-center items-center">
                Add address
              </button>
              <button
                onClick={() => setAddressModal(false)}
                className=" w-full text-text_strong border bg-background rounded-full px-6 h-12 flex justify-center items-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----- deleteItem modal ----- */}
      {deleteAddress && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {mapIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Are you sure you want to delete address?`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`This action will delete address. If you're not ready to make changes, you can save them for later instead`}
              </p>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteAddress(false)}
              >
                <p>Delete</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteAddress(false)}
              >
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
          <p className="text-text_strong text-[22px]">Address</p>
          <p className="text-text_weak text-base ">{`Add, update and select your address information`}</p>
        </div>
        <button
          onClick={() => setAddressModal(true)}
          className=" w-fit max-w-[323px] text-background bg-text_strong rounded-full px-6 h-10 flex justify-center items-center"
        >
          Add address
        </button>
      </div>

      <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">
        {/* no order */}
        {false && (
          <div className=" w-full flex justify-center items-center mt-12">
            <div className="w-full max-w-[400px] flex flex-col gap-8 items-center">
              {mapIcon()}

              <div className="flex flex-col gap-4 font-normal text-center">
                <p className="text-text_strong text-[22px] ">{`There are currently no address yet!`}</p>
                <p className="text-text_weak text-base ">{`Add shipping address to your account to enjoy seamless checkout and delivery`}</p>
              </div>
              <button
                onClick={() => setAddressModal(true)}
                className="bg-text_strong text-background font-medium text-base h-12 w-full px-6 flex rounded-full items-center justify-center"
              >
                Add address
              </button>
            </div>
          </div>
        )}

        {
          <div className="mt-8  w-full">
            {/* address */}

            <div className="max-w-[600px] rounded-2xl border border-text_strong p-6 flex flex-col justify-start gap-2">
              <div className="w-full flex justify-between ">
                <p className="text-text_strong font-medium text-base">
                  Emeka Frank
                </p>
                <div className="flex gap-4 font-medium text-sm">
                  <div className="">Edit</div>
                  <div onClick={() => setDeleteAddress(true)} className="">
                    Delete
                  </div>
                </div>
              </div>

              <div className="font-normal text-text_weak flex flex-col items-start gap-2 w-full">
                <div className="flex gap-4 font-medium text-sm">
                  <div className="">+234 812 637 9202</div>
                  <div className="">Emeka@gmail.com</div>
                </div>
                <p className=" font-medium text-sm">
                  27 fola osibo, Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        }

        {<div className="mt-12 w-full"></div>}
      </div>
    </div>
  );
};
