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

  return (
    <div className="w-full px-6 md:px-10  lg:px-20 flex flex-col gap-4 z-0">
      <div className="bg-background w-full max-w-7xl mx-auto">
        <div
          className={`${lora.className} my-12 text-text_strong font-normal text-[22px] w-full flex justify-normal items-start`}
        >
          <p>Cart</p>
        </div>
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
          <div className="min-h-[500px] flex flex-row w-full">
            {/* ------- items ------ */}
            <div className="pt-6 w-1/2 overflow-y-auto hidden_scroll">
              {/* ----- items list ----- */}
              <div className="">
                <div className="max-w-[600px] w-full bg-white flex gap-6">
                  {/* image */}
                  <div className="h-full w-full">
                    <Image
                      className="w-[240px] h-[280px h-full"
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

                      <span className="border border-text_strong px-4 py-2 text-text_strong flex flex-col items-center text-center rounded-lg">
                        <p className="">M</p>
                        <p className="">Medium</p>
                      </span>
                    </div>

                    {/* items count */}
                    <div className="w-[113px] border h-10 px-4 flex items-center justify-between rounded-full">
                      <div className=" cursor-pointer" onClick={() => setItemsCount(itemsCount - 1)}>
                        {remove()}
                      </div>
                      <input 
                        type="number" 
                        className="outline-none w-[40px] text-center h-full" 
                        min={0} 
                        value={itemsCount} 
                        onChange={(e) => setItemsCount(Number(e.target.value))} 
                      />
                      <div className=" cursor-pointer" onClick={() => setItemsCount(itemsCount + 1)}>
                        {add()}
                      </div>
                    </div>
                    {/* delete item */}
                    <div className="flex items-center gap-1  cursor-pointer">
                        {trash()}
                        <p className="font-medium text-base">Remove from cart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
