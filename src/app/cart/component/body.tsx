"use client";

import { add, redCart, remove, trash } from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Body = () => {
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const [mobileCheckout, setMobileCheckout] = useState<boolean>(false);

  return (
    <div className="w-full px-6 md:px-10  lg:px-20 flex flex-col gap-4 z-0">
      {/* ----- deleteItem modal ----- */}
      {deleteItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteItem(false)}
              >
                {redCart()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Are you sure you want to remove this item from your cart?`}
              </p>

              <p className="text-text_strong text-sm md:text-base font-normal">
                {`This action will remove wears from your cart. If you're not
                ready to make changes, you can save them for later instead`}
              </p>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteItem(false)}
              >
                <p>Remove wears</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteItem(false)}
              >
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----- mobile checkout ----- */}
      {mobileCheckout && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0 md:hidden">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-4 rounded-lg ">
            <div
              className={`${lora.className}  text-text_strong font-normal text-[22px] w-full flex justify-normal items-start`}
            >
              <p>Summary</p>
            </div>
            {/*----- content -----*/}
            <div className="flex flex-col gap-8 p-">
              {/*----- total -----*/}
              <div className="flex flex-col gap-6">
                <div className="w-full flex justify-between items-center gap-4 font-medium text-nowrap">
                  <p className="text-text_weak  text-base">
                    Delivery & handing
                  </p>
                  <p className="text-text_strong  text-base">
                    Calculated at checkout
                  </p>
                </div>
                {/* ------subtotal------ */}
                <div className="w-full flex justify-between items-start gap-4 font-medium">
                  <div className="flex flex-col gap-2 w-full max-w-[343px] items-start">
                    <p className="text-text_weak  text-base">Subtotal</p>
                    <p className="text-text_weak  text-sm">
                      The subtotal reflects the total price of your order,
                      including taxes, before any applicable discounts. It does
                      not include shipping costs.
                    </p>
                  </div>
                  <p className="text-text_strong  text-base">{`$ ${12.3}`}</p>
                </div>

                {/* -----total----- */}
                <div className="w-full flex justify-between items-center gap-4 font-medium">
                  <p className="text-text_weak  text-base">Total</p>
                  <p className="text-text_strong  text-base">{`$ ${12.3}`}</p>
                </div>
              </div>
              {/*----- checkout button -----*/}

              <div className="flex flex-col gap-6">
                <Link className="w-full rounded-full" href={``}>
                  <button
                    type="submit"
                    className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full"
                  >
                    <p>Checkout now</p>
                  </button>
                </Link>
                <Link className="w-full rounded-full" href={``}>
                  <button
                    type="submit"
                    className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full border"
                  >
                    <p>Continue shopping</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-background w-full max-w-7xl mx-auto pt-6 ">
        {/* ----- no item in cart ----- */}
        {false && (
          <div className="bg-background h-[360px] w-full flex justify-center items-center">
            {/* ----- content ---- */}
            <div className="max-w-[406px] w-full h-fit flex flex-col gap-8 items-center text-center ">
              {redCart()}
              <div className="flex flex-col gap-4 text-text_strong">
                <p
                  className={`${lora.className} font-medium text-[22px] text-nowrap`}
                >
                  There are currently no items in the cart
                </p>
                <p className="font-medium text-base">
                  Discover the latest trends and start building your dream
                  wardrobe today!
                </p>
              </div>
              {/* ----- shopping button ----- */}
              <Link className="w-full rounded-full" href={``}>
                <button
                  type="submit"
                  className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full"
                >
                  <p>Continue shopping</p>
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* ----- items added ----- */}
        {
          <div className="min-h-[500px] flex flex-col md:flex-row w-full gap-[108px]">
            {/* ------- items ------ */}
            <div className="pt- w-full md:w-1/2 overflow-y-auto hidden_scroll">
              <div
                className={`${lora.className} pb-2 text-text_strong font-normal text-[22px] w-full flex md:justify-normal justify-between items-start md:items-center`}
              >
                <p>Cart</p>
                {/* ----- checkout ----- */}
                <button
                  onClick={() => setMobileCheckout(true)}
                  className="md:hidden outline-none border-none rounded-lg px-4 h-8 text-background bg-text_strong font-medium"
                >
                  <p className=" text-base">Checkout</p>
                </button>
              </div>
              {/* ----- items list ----- */}
              <div className="">
                <div className="max-w-[600px] w-full bg-white flex flex-col md:flex-row  gap-6">
                  {/* image */}
                  <div className="h-full w-full">
                    <Image
                      className="w-full md:w-[240px] h-[380px] md:h-full"
                      width={240}
                      height={280}
                      src={`https://res.cloudinary.com/dtjf6sic8/image/upload/v1737561590/quicktrads/txd4yx8rsskhaf7dqooj.png`}
                      alt=""
                    />
                  </div>
                  {/* details */}
                  <div className="flex flex-col items-start w-full truncate gap-6">
                    <div className="w-full text-text_strong text-ellipsis gap-2 ">
                      <p className="text-lg font- truncate font-medium">
                        Quicktrads yellow couture wear
                      </p>
                      <div className="text-lg font- truncate flex gap-2 font-medium">
                        <p>{`$ ${12.3}`}</p>
                        <del className="text-text_weak">{`$ ${12.3}`}</del>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">
                      <div className="w-full flex justify-between text-text_strong font-medium text-base">
                        <p>Size</p>
                        <p>Change</p>
                      </div>

                      <span className="border border-text_strong px-3 py-1 text-text_strong flex flex-col items-center text-center rounded-lg ">
                        <p className="">M</p>
                        <p className="">Medium</p>
                      </span>
                    </div>

                    {/* items count */}
                    <div className="w-[113px] border h-10 px-4 flex items-center justify-between rounded-full">
                      <div
                        className=" cursor-pointer"
                        onClick={() => setItemsCount(itemsCount - 1)}
                      >
                        {remove()}
                      </div>
                      <input
                        type="number"
                        className="outline-none w-[40px] text-center h-full"
                        min={0}
                        value={itemsCount}
                        onChange={(e) => setItemsCount(Number(e.target.value))}
                      />
                      <div
                        className=" cursor-pointer"
                        onClick={() => setItemsCount(itemsCount + 1)}
                      >
                        {add()}
                      </div>
                    </div>
                    {/* delete item */}
                    <div
                      onClick={() => setDeleteItem(true)}
                      className="flex items-center gap-1  cursor-pointer"
                    >
                      {trash()}
                      <p className="font-medium text-base">Remove from cart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*----- checkout -----*/}
            <div className="w-full md:w-1/2 hidden md:block">
              <div
                className={`${lora.className} pb-2 text-text_strong font-normal text-[22px] w-full flex justify-normal items-start`}
              >
                <p>Summary</p>
              </div>
              {/*----- content -----*/}
              <div className="flex flex-col gap-8 p-">
                {/*----- total -----*/}
                <div className="flex flex-col gap-6">
                  <div className="w-full flex justify-between items-center gap-4 font-medium">
                    <p className="text-text_weak  text-base">
                      Estimated delivery & handing
                    </p>
                    <p className="text-text_strong  text-base">
                      Calculated at checkout
                    </p>
                  </div>
                  {/* ------subtotal------ */}
                  <div className="w-full flex justify-between items-start gap-4 font-medium">
                    <div className="flex flex-col gap-2 w-full max-w-[343px] items-start">
                      <p className="text-text_weak  text-base">Subtotal</p>
                      <p className="text-text_weak  text-sm">
                        The subtotal reflects the total price of your order,
                        including taxes, before any applicable discounts. It
                        does not include shipping costs.
                      </p>
                    </div>
                    <p className="text-text_strong  text-base">{`$ ${12.3}`}</p>
                  </div>

                  {/* -----total----- */}
                  <div className="w-full flex justify-between items-center gap-4 font-medium">
                    <p className="text-text_weak  text-base">Total</p>
                    <p className="text-text_strong  text-base">{`$ ${12.3}`}</p>
                  </div>
                </div>
                {/*----- checkout button -----*/}

                <div className="flex flex-col gap-6">
                  <Link className="w-full rounded-full" href={``}>
                    <button
                      type="submit"
                      className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full"
                    >
                      <p>Checkout now</p>
                    </button>
                  </Link>
                  <Link className="w-full rounded-full" href={``}>
                    <button
                      type="submit"
                      className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full border"
                    >
                      <p>Continue shopping</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
