"use client";
import { useState } from "react";
import { Items } from "./component/items";
import { SideCategory } from "../categories/component/sideCategory";

const Products = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    gender: [],
    subCategory: [],
    priceRange: ''
  });

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <>
      <SideCategory 
        visible={showFilter} 
        onFilterChange={handleFilterChange}
      />
      <div className={`${showFilter ? "ml-[240px]" : "ml-0"} transition-all duration-300`}>
        <Items 
          onFilterChange={setShowFilter} 
          filters={filters}
        />
      </div>
    </>
  );
};

export default Products;
