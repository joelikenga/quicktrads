/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useCallback, useState } from "react";
import { Items } from "./component/items";
import { SideCategory } from "./component/sideCategory";
import { Navbar } from "../global/navbar";
import { filterIcon } from "../global/svg";

const Products = () => {
  const [showFilter, setShowFilter] = useState(typeof window !== 'undefined' && window.innerWidth > 768);
  const [filters, setFilters] = useState({
    category: "",
    gender: [],
    size: [],
    priceRange: "",
  });

  const handleFilterChange = useCallback((filterType: string, value: any) => {
    setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-auto  w-full max-w-7xl ">
        <SideCategory
          visible={showFilter}
          onFilterChange={handleFilterChange}
          setShowFilter={setShowFilter}
        />
        <div
          className={`${
            showFilter ? "ml-0 sm:ml-[240px]" : "ml-0"
          } transition-all duration-300`}
        >
          <div className="mt-[120px]">
            <Items
              onFilterChange={setShowFilter}
              filters={filters}
              // setShowFilter={setShowFilter}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowFilter(true)}
        className="bg-white rounded-full py-2 z-40 px-4 shadow-md text-base font-medium text-text_strong hover:bg-gray-100 transition duration-300 fixed bottom-4 right-4 lg:hidden"
      >
        <i className="">{filterIcon()}</i>
      </button>
    </>
  );
};

export default Products;

/* eslint-disable @typescript-eslint/no-explicit-any */
