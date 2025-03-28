
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useCallback, useState } from "react";
import { Items } from "./component/items";
import { SideCategory } from "../categories/component/sideCategory";

const Products = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    gender: [],
    size: [],
    priceRange: ''
  });

  const handleFilterChange = useCallback((filterType: string, value: any) => {
    setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }, 0);
  }, []);

  return (
    <>
      <SideCategory 
        visible={showFilter} 
        onFilterChange={handleFilterChange}
      />
      <div className={`${showFilter ? "ml-0 sm:ml-[240px]" : "ml-0"} transition-all duration-300`}>
        <Items 
          onFilterChange={setShowFilter} 
          filters={filters}
        />
      </div>
    </>
  );
};

export default Products;

/* eslint-disable @typescript-eslint/no-explicit-any */
