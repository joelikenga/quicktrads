"use client";

import { arrowDown, check, filterIcon } from "@/app/global/svg";
import { Lora } from "next/font/google";
import { useEffect, useState } from "react";
import { Items } from "../../products/component/items";
import Products from "@/app/products/page";
import { SideCategory } from "./sideCategory";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
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
    <div className=" md:px-10  lg:px-10  overflow-y-auto mt-[70px] md:mt-[110px] h-full relative">
      <div className="bg-background w-full max-w-7xl mx-auto flex justify-between sticky top-0 ">
        {/* ------- content ------- */}
        <div className="w-full">
          <SideCategory showFilter={showFilter} />

          <Products />
        </div>
      </div>
    </div>
  );
};
