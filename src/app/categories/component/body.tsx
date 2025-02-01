"use client";

import { arrowDown, check, filterIcon } from "@/app/global/svg";
import { Lora } from "next/font/google";
import { useState } from "react";
import { Items } from "./items";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Body = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("women");

  return (
    <div className="px-6 md:px-10  lg:px-20">
      <div className="bg-background w-full max-w-7xl mx-auto flex justify-between ">
        {/* ------- filter ------- */}
        <div className="w-full ">
          <div className="flex justify-between w-full text-text_strong items-center py-8">
            {selectedCategory.startsWith("collections") && (
              <p className="font-normal text-[22px]">{`Collections (${100})`}</p>
            )}
            {selectedCategory.includes("c-") && (
              <p className="font-normal text-[22px]">{`Collections (${100})`}</p>
            )}
            
            {selectedCategory.startsWith("men") && (
              <p className="font-normal text-[22px]">{`Men (${100})`}</p>
            )}
            {selectedCategory.includes("m-") && (
              <p className="font-normal text-[22px]">{`Men (${100})`}</p>
            )}
            
            {selectedCategory.startsWith("women") && (
              <p className="font-normal text-[22px]">{`Women (${100})`}</p>
            )}
            {selectedCategory.includes("w-") && (
              <p className="font-normal text-[22px]">{`Women (${100})`}</p>
            )}

            <div className="flex gap-2 font-medium text-base items-center">
              <i>{filterIcon()}</i>
              <p>Show filter</p>
            </div>
          </div>

          <div className="flex gap-8 justify-between">
            {/* filter section */}
            <div className="min-w-[240px] h-fit flex justify-start items-start flex-col gap-6">
              {selectedCategory === "collections" && (
                <div className="flex justify-start items-start flex-col gap-4 text-text_weak text-base font-normal">
                  <div
                    onClick={() => setSelectedCategory("c-Featured")}
                    className="cursor-pointer"
                  >
                    Features
                  </div>
                  <div
                    onClick={() => setSelectedCategory("c-Trending")}
                    className="cursor-pointer"
                  >
                    Trending
                  </div>
                  <div
                    onClick={() => setSelectedCategory("c-Latest")}
                    className="cursor-pointer"
                  >
                    Latest wear
                  </div>
                </div>
              )}
              {selectedCategory === "men" && (
                <div className="flex justify-start items-start flex-col gap-4 text-text_weak text-base font-normal">
                  <div
                    onClick={() => setSelectedCategory("m-Tops")}
                    className="cursor-pointer"
                  >
                    Tops
                  </div>
                  <div
                    onClick={() => setSelectedCategory("m-Trousers")}
                    className="cursor-pointer"
                  >
                    Trousers
                  </div>
                  <div
                    onClick={() => setSelectedCategory("m-TwoPiece")}
                    className="cursor-pointer"
                  >
                    Two-piece
                  </div>
                </div>
              )}

              {selectedCategory === "women" && (
                <div className="flex justify-start items-start flex-col gap-4 text-text_weak text-base font-normal">
                  <div
                    onClick={() => setSelectedCategory("w-Buba")}
                    className="cursor-pointer"
                  >
                    Buba
                  </div>
                  <div
                    onClick={() => setSelectedCategory("w-Tops")}
                    className="cursor-pointer"
                  >
                    Tops
                  </div>
                  <div
                    onClick={() => setSelectedCategory("w-Trousers")}
                    className="cursor-pointer"
                  >
                    Trousers
                  </div>
                  <div
                    onClick={() => setSelectedCategory("w-TwoPiece")}
                    className="cursor-pointer"
                  >
                    Two-piece
                  </div>
                </div>
              )}

              {/* ----------------- for collections------------------ */}

              {selectedCategory === "c-Featured" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("collections")}
                      className="text-text_weak"
                    >
                      Collctions
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Featured</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Featured</p>
                </div>
              )}

              {selectedCategory === "c-Trending" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("collections")}
                      className="text-text_weak"
                    >
                      Collctions
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Trending</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Trending</p>
                </div>
              )}

              {selectedCategory === "c-Latest" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("collections")}
                      className="text-text_weak"
                    >
                      Collctions
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer text-nowrap`}>Latest wear</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Latest wear</p>
                </div>
              )}

              {/* ---------------for men --------------------- */}

              {selectedCategory === "m-Tops" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("men")}
                      className="text-text_weak"
                    >
                      Men
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Tops</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Tops</p>
                </div>
              )}

              {selectedCategory === "m-Trousers" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("men")}
                      className="text-text_weak"
                    >
                      Men
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Trousers</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Trousers</p>
                </div>
              )}

              {selectedCategory === "m-TwoPiece" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("men")}
                      className="text-text_weak"
                    >
                      Men
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Two-piece</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Two-piece</p>
                </div>
              )}

              {/* ---------------for women --------------------- */}

              {selectedCategory === "w-Buba" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("women")}
                      className="text-text_weak"
                    >
                      Women
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Buba</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Buba</p>
                </div>
              )}

              {selectedCategory === "w-Tops" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("women")}
                      className="text-text_weak"
                    >
                      Women
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Tops</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Tops</p>
                </div>
              )}

              {selectedCategory === "w-Trousers" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("women")}
                      className="text-text_weak"
                    >
                      Women
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Trousers</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Trousers</p>
                </div>
              )}

              {selectedCategory === "w-TwoPiece" && (
                <div className="flex flex-col w-fit gap-1 text-text_strong">
                  <div className="flex  gap-8 text-base font-normal">
                    <p
                      onClick={() => setSelectedCategory("women")}
                      className="text-text_weak"
                    >
                      Collctions
                    </p>
                    <i className="-rotate-90">{arrowDown()}</i>
                    <p className={`cursor-pointer`}>Two-piece</p>
                  </div>
                  <p className={`text-[22px] ${lora.className}`}>Two-piece</p>
                </div>
              )}

              {/* ---------------------- gender ---------------------- */}

              {
                <div
                  className={`${
                    selectedCategory.startsWith("m-") ||
                    selectedCategory.startsWith("w-")
                      ? "hidden"
                      : ""
                  } flex  w-full border-b min-h-[46px] flex-col justify-start gap-4 pb-4 `}
                >
                  <div className="flex justify-between w-full cursor-pointer">
                    <p className="text-text_strong text-base font-normal">
                      Gender
                    </p>
                    <i>{arrowDown()}</i>
                  </div>
                  {
                    <div className="flex justify-items-start items-start flex-col gap-4 text-text_weak text-base font-normal mb-4 cursor-pointer">
                      {/* ----- men ----- */}
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4  border border-text_wea rounded flex items-center ">
                          {check()}
                        </span>
                        <p className="">Men</p>
                      </div>

                      {/* ----- women ----- */}
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4  border border-text_wea rounded flex items-center ">
                          {check()}
                        </span>
                        <p className="">Women</p>
                      </div>
                    </div>
                  }
                </div>
              }

              {/* ---------------------- Size ---------------------- */}

              <div className="flex  w-full border-b min-h-[46px] flex-col justify-start gap-4 pb-4">
                <div className="flex justify-between w-full cursor-pointer">
                  <p className="text-text_strong text-base font-normal">Size</p>
                  <i>{arrowDown()}</i>
                </div>
                {
                  <div className="w-full grid grid-cols-2 gap-4 text-xs">
                    <span className="col-span-1 border  px-3 h-[57px] justify-center cursor-pointer text-text_strong flex flex-col items-center text-center rounded-lg ">
                      <p className="text-sm">XS</p>
                      <p className="">Extra small</p>
                    </span>

                    <span className="col-span-1 border  px-3 h-[57px] justify-center cursor-pointer text-text_strong flex flex-col items-center text-center rounded-lg ">
                      <p className="text-sm">S</p>
                      <p className="">Small</p>
                    </span>

                    <span className="col-span-1 border  px-3 h-[57px] justify-center cursor-pointer text-text_strong flex flex-col items-center text-center rounded-lg ">
                      <p className="text-sm">M</p>
                      <p className="">Medium</p>
                    </span>

                    <span className="col-span-1 border  px-3 h-[57px] justify-center cursor-pointer text-text_strong flex flex-col items-center text-center rounded-lg ">
                      <p className="text-sm">L</p>
                      <p className="">Large</p>
                    </span>

                    <span className="col-span-1 border  px-3 h-[57px] justify-center cursor-pointer text-text_strong flex flex-col items-center text-center rounded-lg ">
                      <p className="text-sm">XL</p>
                      <p className="">Extra large</p>
                    </span>
                  </div>
                }
              </div>

              {/* ---------------------- price ---------------------- */}

              <div className="flex  w-full border-b min-h-[46px] flex-col justify-start gap-4 pb-4">
                <div className="flex justify-between w-full cursor-pointer">
                  <p className="text-text_strong text-base font-normal">
                    Price
                  </p>
                  <i>{arrowDown()}</i>
                </div>
                {
                  <div className="flex justify-items-start items-start flex-col gap-4 text-text_weak text-base font-normal cursor-pointer">
                    {/* -----  ----- */}
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4  border border-text_wea rounded flex items-center ">
                        {check()}
                      </span>
                      <p className="">{`$1 - $20`}</p>
                    </div>

                    {/* ----- women ----- */}
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4  border border-text_wea rounded flex items-center ">
                        {check()}
                      </span>
                      <p className="">{`$21 - $50`}</p>
                    </div>

                    {/* ----- women ----- */}
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4  border border-text_wea rounded flex items-center ">
                        {check()}
                      </span>
                      <p className="">{`$51 - $100+`}</p>
                    </div>
                  </div>
                }
              </div>
            </div>

        {/* ----- item display ----- */}
        <Items />

          </div>
        </div>


      </div>
    </div>
  );
};
