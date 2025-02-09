"use client";

import {
  arrowDown,
  closeIcon,
  failedIcon,
  info,
  mapIcon,
  pendingIcon,
  successIcon,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Body = () => {
  const [addressEdit, setAddressEdit] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [deleteAddress, setDeleteAddress] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  return (
    <div className="w-full mt-8 px-20">
      {/* payment successful */}
      {success && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {successIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Thank you, for your purchase!`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`Your payment has been successfully processed. A confirmation email with your order details has been sent to you`}
              </p>
            </div>

            <div className="w-full bg-stroke_weak p-6 flex flex-col gap-4 text-text_strong rounded-lg">
              <p className="font-medium text-base text-center">
                Order confirmation details
              </p>
              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">
                  Tracking number
                </p>
                <p className="font-medium text-base">{`T9483Jk_e832`}</p>
              </div>

              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">
                  Payment amount
                </p>
                <p className="font-medium text-base">{`$2323`}</p>
              </div>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Track order</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Continue shopping</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* payment pending */}
      {pending && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {pendingIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Payment pending`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`Your payment is being processed. This may take a few minutes. You will receive a confirmation once the payment is successful`}
              </p>
            </div>

            <div className="w-full bg-stroke_weak p-6 flex flex-col gap-4 text-text_strong rounded-lg">
              <p className="font-medium text-base text-center">
                Order confirmation details
              </p>
              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">
                  Tracking number
                </p>
                <p className="font-medium text-base">{`T9483Jk_e832`}</p>
              </div>

              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">
                  Payment amount
                </p>
                <p className="font-medium text-base">{`$2323`}</p>
              </div>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Track order</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Continue shopping</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* payment failed */}
      {failed && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {failedIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Payment failed`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`Unfortunately, we couldn't process your payment. Please try again or contact support if the issue persists`}
              </p>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Retry payment</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Contact support</p>
              </button>
            </div>
          </div>
        </div>
      )}

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

      <div className="mx-auto w-full max-w-7xl">
        <div className=" flex justify-start gap-[108px]">
          {/* content-1 */}
          {false && (
            <div className="flex flex-col gap-6 text-text_strong w-1/2 font-normal text-sm">
              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Account</p>
                <p className="">
                  If you already have an account, click Login to access your
                  profile. If you’re a new user, click Sign up to create an
                  account.
                </p>
              </div>

              <div className="flex gap-4 justify-start items-center">
                <Link href={`/sign_up`}>
                  <button className="border rounded-full items-center flex h-8 px-6">
                    Sign up
                  </button>
                </Link>

                <Link href={`/login`}>
                  <button className="border rounded-full items-center flex h-8 px-6">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* ---------- review container---------- */}
          {review ? (
            <div className="flex flex-col gap-8 text-text_strong w-full max-w-[480px] font-normal text-sm mb-8">
              {/* contact info */}
              <div className="flex-col gap-4 flex w-full">
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[18px] text-text_strong">
                    Contact information
                  </p>
                  <p
                    onClick={() => setReview(!review)}
                    className="font-normal text-sm text-text_weak underline cursor-pointer "
                  >
                    {"Change"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-normal">
                  <p className="text-text_strong text-base ">Emeka Frank</p>
                  <div className="flex justify-start items-center text-text_weak text-base gap-4">
                    <p>+131332435242535</p>
                    <p>emeka@quicktrads.com</p>
                  </div>
                </div>
              </div>

              {/* shipping */}
              <div className="flex-col gap-4 flex w-full">
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[18px] text-text_strong">
                    Shipping
                  </p>
                  <p
                    onClick={() => setReview(!review)}
                    className="font-normal text-sm text-text_weak underline cursor-pointer "
                  >
                    {"Change"}
                  </p>
                </div>

                <div className="inline-flex gap-2 w-full">
                  <i>{info()}</i>
                  <p className="text-sm font-normal text-text_weak">
                    {`International shipping takes up to 20 working days. While 3-4
                  days within Lagos, based on your address for delivery outside
                  Lagos`}
                  </p>
                </div>
                <p className="text-text_strong text-base ">{`117-195 Iroquois Ave London, ON N6C 2K9, Ikeja Lagos`}</p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Order summary</p>
                <div className="flex flex-col gap-6">
                  {/* estimate */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Estimated delivery & handing
                    </p>
                    <p className="font-normal text-base text-text_strong  cursor-pointer ">
                      {`$${151.06}`}
                    </p>
                  </div>
                  {/* subtotal */}
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-full flex justify-between">
                      <p className="font-normal text-base text-text_weak">
                        Subtotal
                      </p>
                      <p className="font-normal text-base text-text_strong  cursor-pointer ">
                        {`$${151.06}`}
                      </p>
                    </div>

                    <div className="inline-flex gap-2 w-full">
                      <i>{info()}</i>
                      <p className="text-sm font-normal text-text_weak w-full max-w-[343px]">
                        {`The subtotal reflects the total price of your order, including taxes, before any applicable discounts. It does not include shipping costs.`}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Total
                    </p>
                    <p className="font-normal text-base text-text_strong  cursor-pointer ">
                      {`$${151.06}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* button */}
              <button className="h-10 rounded-full bg-text_strong text-background font-medium text-base flex justify-center items-center w-full px-6">
                Pay now
              </button>
            </div>
          ) : null}

          {/* container 1 */}

          {!review ? (
            <div className="flex flex-col gap-8 text-text_strong w-full max-w-[480px] font-normal text-sm mb-8">
              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Account</p>
                <div className="flex flex-col">
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
                </div>
              </div>

              {/* shipping */}
              <div className="flex-col gap-4 flex w-full">
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[18px] text-text_strong">
                    Shipping
                  </p>
                  <p
                    onClick={() => setAddressEdit(!addressEdit)}
                    className="font-normal text-sm text-text_weak underline cursor-pointer "
                  >
                    {addressEdit ? "Change" : "Close"}
                  </p>
                </div>

                <div className="inline-flex gap-2 w-full">
                  <i>{info()}</i>
                  <p className="text-sm font-normal text-text_weak">
                    {`International shipping takes up to 20 working days. While 3-4
                  days within Lagos, based on your address for delivery outside
                  Lagos`}
                  </p>
                </div>

                {
                  <div className="mt-8  w-full">
                    {/* address */}

                    <div className="max-w-[600px rounded-2xl border border-text_strong p-6 flex flex-col justify-start gap-2">
                      <div className="w-full flex justify-between ">
                        <p className="text-text_strong font-medium text-base">
                          Emeka Frank
                        </p>
                        <div className="flex gap-4 font-medium text-sm">
                          <div className="cursor-pointer">Edit</div>
                          <div
                            onClick={() => setDeleteAddress(true)}
                            className="cursor-pointer"
                          >
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
              </div>

              {addressEdit && (
                <div className="flex justify-between px-6 gap-6">
                  <button className="border rounded-full items-center flex h-10 w-full justify-center px-6">
                    Select address
                  </button>
                  <button
                    onClick={() => setAddressModal(true)}
                    className="border rounded-full items-center flex h-10 w-full justify-center px-6"
                  >
                    Add address
                  </button>
                </div>
              )}
              {/* Contact info */}

              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Contact information</p>
                <div className="flex flex-col">
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
                </div>

                <div className="flex flex-col">
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
                </div>
              </div>

              {/* button */}
              <button
                onClick={() => setReview(true)}
                className="h-10 rounded-full bg-text_strong text-background font-medium text-base flex justify-center items-center w-full px-6"
              >
                Review orders
              </button>
            </div>
          ) : null}

          {/* container 2 */}
          <div className="flex flex-col gap-20 text-text_strong w-full max-w-[480px] font-normal text-sm mb-8">
            {!review ? (
              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Order summary</p>
                <div className="flex flex-col gap-6">
                  {/* estimate */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Estimated delivery & handing
                    </p>
                    <p className="font-normal text-base text-text_strong  cursor-pointer ">
                      {`$${151.06}`}
                    </p>
                  </div>
                  {/* subtotal */}
                  <div className="flex flex-col items-start gap-2">
                    <div className="w-full flex justify-between">
                      <p className="font-normal text-base text-text_weak">
                        Subtotal
                      </p>
                      <p className="font-normal text-base text-text_strong  cursor-pointer ">
                        {`$${151.06}`}
                      </p>
                    </div>

                    <div className="inline-flex gap-2 w-full">
                      <i>{info()}</i>
                      <p className="text-sm font-normal text-text_weak w-full max-w-[343px]">
                        {`The subtotal reflects the total price of your order, including taxes, before any applicable discounts. It does not include shipping costs.`}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Total
                    </p>
                    <p className="font-normal text-base text-text_strong  cursor-pointer ">
                      {`$${151.06}`}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* items display */}

            <div className="w-full">
              <div className="flex justify-between gap-6 w-full">
                <Image
                  src={`https://res.cloudinary.com/dtjf6sic8/image/upload/v1737561590/quicktrads/txd4yx8rsskhaf7dqooj.png`}
                  width={154.29}
                  height={180}
                  priority
                  alt=""
                  className="w-[154.29px] h-[180px]"
                />

                <div className="flex flex-col gap-4">
                  {/*  */}
                  <div className="w-full text-text_strong text-ellipsis gap-2 ">
                    <p className="text-lg font- truncate font-medium">
                      Quicktrads yellow couture wear
                    </p>
                    <div className="text-lg font- truncate flex gap-2 font-medium">
                      <p>{`$ ${12.3}`}</p>
                      <del className="text-text_weak">{`$ ${12.3}`}</del>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex-col flex items-start gap-4">
                    {/* Qty */}
                    <div className="w-full text-text_strong text-ellipsis gap-2 ">
                      <p className="text-base font- truncate font-normal text-text_weak">
                        Quantity:
                      </p>
                      <p className="text-base font-normal">{2}</p>
                    </div>
                    {/*  */}
                    <div className="w-full text-text_strong text-ellipsis gap-2 ">
                      <p className="text-base font- truncate font-normal text-text_weak">
                        Size:
                      </p>
                      <p className="text-base font-normal">{`XS (extra small)`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
