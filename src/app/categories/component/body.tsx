"use client";
import { useEffect, useState } from "react";
import Products from "@/app/products/page";

export const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const savedItem = localStorage.getItem("category");
    if (savedItem) {
      setSelectedCategory(savedItem);
      console.warn(selectedCategory)
    }
  }, []);

  return (
    <div className="md:px-10 lg:px-10 overflow-y-auto mt-[70px] md:mt-[110px] h-full relative">
      <div className="bg-background w-full max-w-7xl mx-auto flex justify-between sticky top-0">
        <div className="w-full">
          <Products />
        </div>
      </div>
    </div>
  );
};
