"use client";

import { arrowDown, check, } from "@/app/global/svg";
import { Lora } from "next/font/google";
import { useEffect, useState } from "react";

// interface ItemsProps {
//   showFilter: boolean;
// }
// { showFilter }: ItemsProps

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const SideCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showGender, setShowGender] = useState<boolean>(false);
  const [showSize, setShowSize] = useState<boolean>(false);
  const [showPrice, setShowPrice] = useState<boolean>(false);

  useEffect(() => {
    const savedItem = localStorage.getItem("category"); // Get item from localStorage
    if (savedItem) {
      setSelectedCategory(savedItem);
    }
  }, []);

  const handleClick = (item: string) => {
    localStorage.setItem("category", item);
    setSelectedCategory(item);
  };

  return (
    <div className="  max-w-[240px] w-full   h-[calc(100vh-7.5rem)] fixed top-[120px]  overflow-hidden">
      <div className="px-6 lg:px-2  w-full text-text_strong items-center py-8">
        {selectedCategory.startsWith("trending") && (
          <p className="font-normal text-[22px]">{`Trending (${100})`}</p>
        )}
        {selectedCategory.startsWith("latestWear") && (
          <p className="font-normal text-[22px]">{`Latest Wear (${100})`}</p>
        )}

        {selectedCategory.startsWith("unisex") && (
          <p className="font-normal text-[22px]">{`Unisex (${100})`}</p>
        )}
        {selectedCategory.includes("u-") && (
          <p className="font-normal text-[22px]">{`Unisex (${100})`}</p>
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
      </div>

      {/* {showFilter && ( */}
      <div className="overflow-y-auto  w-full  flex justify-start items-start flex-col gap-6 fixed h-screen md:relative   top-0 bg-background md:h-full d:pt-12 md:pt-0 px-2 md:pr-6  md:block">
        {selectedCategory === "collections" && (
          <div className="flex justify-start items-start flex-col gap-4 text-text_weak text-base font-normal">
            <div
              onClick={() => handleClick("c-Featured")}
              className="cursor-pointer"
            >
              Features
            </div>
            <div
              onClick={() => handleClick("c-Trending")}
              className="cursor-pointer"
            >
              Trending
            </div>
            <div
              onClick={() => handleClick("c-Latest")}
              className="cursor-pointer"
            >
              Latest wear
            </div>
          </div>
        )}

        {selectedCategory === "unisex" && (
          <div className="flex justify-start items-start flex-col gap-4 text-text_weak text-base font-normal">
            <div
              onClick={() => handleClick("u-Tops")}
              className="cursor-pointer"
            >
              Tops
            </div>
            <div
              onClick={() => handleClick("u-Trousers")}
              className="cursor-pointer"
            >
              Trousers
            </div>
            <div
              onClick={() => handleClick("u-TwoPiece")}
              className="cursor-pointer"
            >
              Two-piece
            </div>
          </div>
        )}

        {selectedCategory === "men" && (
          <div className="flex justify-start items-start flex-col gap-4 text-text_weak text-base font-normal">
            <div
              onClick={() => handleClick("m-Tops")}
              className="cursor-pointer"
            >
              Tops
            </div>
            <div
              onClick={() => handleClick("m-Trousers")}
              className="cursor-pointer"
            >
              Trousers
            </div>
            <div
              onClick={() => handleClick("m-TwoPiece")}
              className="cursor-pointer"
            >
              Two-piece
            </div>
          </div>
        )}

        {selectedCategory === "women" && (
          <div className="flex justify-start items-start flex-col gap-4 text-text_weak text-base font-normal">
            <div
              onClick={() => handleClick("w-Bubu")}
              className="cursor-pointer"
            >
              Bubu
            </div>
            <div
              onClick={() => handleClick("w-Tops")}
              className="cursor-pointer"
            >
              Tops
            </div>
            <div
              onClick={() => handleClick("w-Trousers")}
              className="cursor-pointer"
            >
              Trousers
            </div>
            <div
              onClick={() => handleClick("w-TwoPiece")}
              className="cursor-pointer"
            >
              Two-piece
            </div>
          </div>
        )}

        {/* ---------------for unisex --------------------- */}

        {selectedCategory === "u-Tops" && (
          <div className="flex flex-col w-fit gap-1 text-text_strong">
            <div className="flex  gap-6 text-base font-normal">
              <p
                onClick={() => handleClick("unisex")}
                className="text-text_weak"
              >
                Unisex
              </p>
              <i className="-rotate-90">{arrowDown()}</i>
              <p className={`cursor-pointer`}>Tops</p>
            </div>
            <p className={`text-[22px] ${lora.className}`}>Tops</p>
          </div>
        )}

        {selectedCategory === "u-Trousers" && (
          <div className="flex flex-col w-fit gap-1 text-text_strong">
            <div className="flex  gap-6 text-base font-normal">
              <p
                onClick={() => handleClick("unisex")}
                className="text-text_weak"
              >
                Unisex
              </p>
              <i className="-rotate-90">{arrowDown()}</i>
              <p className={`cursor-pointer`}>Trousers</p>
            </div>
            <p className={`text-[22px] ${lora.className}`}>Trousers</p>
          </div>
        )}

        {selectedCategory === "u-TwoPiece" && (
          <div className="flex flex-col w-fit gap-1 text-text_strong">
            <div className="flex  gap-6 text-base font-normal">
              <p
                onClick={() => handleClick("unisex")}
                className="text-text_weak"
              >
                Unisex
              </p>
              <i className="-rotate-90">{arrowDown()}</i>
              <p className={`cursor-pointer`}>Two-piece</p>
            </div>
            <p className={`text-[22px] ${lora.className}`}>Two-piece</p>
          </div>
        )}

        {/* ---------------for men --------------------- */}

        {selectedCategory === "m-Tops" && (
          <div className="flex flex-col w-fit gap-1 text-text_strong">
            <div className="flex  gap-6 text-base font-normal">
              <p onClick={() => handleClick("men")} className="text-text_weak">
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
            <div className="flex  gap-6 text-base font-normal">
              <p onClick={() => handleClick("men")} className="text-text_weak">
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
            <div className="flex  gap-6 text-base font-normal">
              <p onClick={() => handleClick("men")} className="text-text_weak">
                Men
              </p>
              <i className="-rotate-90">{arrowDown()}</i>
              <p className={`cursor-pointer`}>Two-piece</p>
            </div>
            <p className={`text-[22px] ${lora.className}`}>Two-piece</p>
          </div>
        )}

        {/* ---------------for women --------------------- */}

        {selectedCategory === "w-Bubu" && (
          <div className="flex flex-col w-fit gap-1 text-text_strong">
            <div className="flex  gap-6 text-base font-normal">
              <p
                onClick={() => handleClick("women")}
                className="text-text_weak"
              >
                Women
              </p>
              <i className="-rotate-90">{arrowDown()}</i>
              <p className={`cursor-pointer`}>Bubu</p>
            </div>
            <p className={`text-[22px] ${lora.className}`}>Bubu</p>
          </div>
        )}

        {selectedCategory === "w-Tops" && (
          <div className="flex flex-col w-fit gap-1 text-text_strong">
            <div className="flex  gap-6 text-base font-normal">
              <p
                onClick={() => handleClick("women")}
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
            <div className="flex  gap-6 text-base font-normal">
              <p
                onClick={() => handleClick("women")}
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
            <div className="flex  gap-6 text-base font-normal">
              <p
                onClick={() => handleClick("women")}
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
            onClick={() => setShowGender(!showGender)}
            className={`${
              selectedCategory.startsWith("m-") ||
              selectedCategory.startsWith("w-") ||
              selectedCategory.startsWith("u-")
                ? "hidden"
                : ""
            } flex  w-full border-b min-h-[46px] flex-col justify-start gap-4 py-4 `}
          >
            <div className="flex justify-between w-full cursor-pointer">
              <p className="text-text_strong text-base font-normal">Gender</p>
              <i className={`duration-300 ${showGender && "rotate-180"}`}>
                {arrowDown()}
              </i>
            </div>
            {showGender && (
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
            )}
          </div>
        }

        {/* ---------------------- Size ---------------------- */}

        <div className="flex  w-full border-b min-h-[46px] flex-col justify-start gap-4 py-4">
          <div
            onClick={() => setShowSize(!showSize)}
            className="flex justify-between w-full cursor-pointer"
          >
            <p className="text-text_strong text-base font-normal">Size</p>
            <i className={`duration-300 ${showSize && "rotate-180"}`}>
              {arrowDown()}
            </i>
          </div>
          {showSize && (
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
          )}
        </div>

        {/* ---------------------- price ---------------------- */}

        <div className="flex  w-full border-b min-h-[46px] flex-col justify-start gap-4 py-4">
          <div
            onClick={() => setShowPrice(!showPrice)}
            className="flex justify-between w-full cursor-pointer"
          >
            <p className="text-text_strong text-base font-normal">Price</p>
            <i className={`duration-300 ${showPrice && "rotate-180"}`}>
              {arrowDown()}
            </i>
          </div>
          {showPrice && (
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
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
