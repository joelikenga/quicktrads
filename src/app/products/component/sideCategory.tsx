"use client";

import { arrowDown, check } from "@/app/global/svg";
import { Lora } from "next/font/google";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getLatestProducts,
  getTrendingProducts,
} from "../../../utils/api/user/product";

interface SideCategoryProps {
  visible?: boolean;
  onFilterChange: (filterType: string, value: any) => void;
  setShowFilter: (value: boolean) => void;
}

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const SideCategory = ({
  visible = true,
  setShowFilter,
  onFilterChange,
}: SideCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showGender, setShowGender] = useState<boolean>(false);
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]); // rename from selectedSubCategories
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  const [counts, setCounts] = useState({
    trending: 0,
    latest: 0,
    men: 0,
    women: 0,
    unisex: 0,
  });

  // Function to fetch  items count
  const fetchCounts = async () => {
    try {
      const trending = await getTrendingProducts();
      const latest = await getLatestProducts();
      const others = await getAllProducts();

      // Count items by gender prefix
      const menCount = others.data.filter(
        (item: { category: string }) =>
          item.category.startsWith("m-") || item.category === "men"
      ).length;

      const womenCount = others.data.filter(
        (item: { category: string }) =>
          item.category.startsWith("w-") || item.category === "women"
      ).length;

      const unisexCount = others.data.filter(
        (item: { category: string }) =>
          item.category.startsWith("u-") || item.category === "unisex"
      ).length;

      setCounts({
        trending: trending.data.length,
        latest: latest.data.length,
        men: menCount,
        women: womenCount,
        unisex: unisexCount,
      });
      // //console.log("Trending count:", response.data.length);
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  // Add helper function to get gender from category prefix
  const getGenderFromCategory = (category: string) => {
    if (category.startsWith("m-")) return "Men";
    if (category.startsWith("w-")) return "Women";
    if (category.startsWith("u-")) return "Unisex";
    return "";
  };

  // Add helper function to get subcategory from category
  const getSubCategoryFromSelection = (category: string) => {
    if (category.includes("-Tops")) return "Tops";
    if (category.includes("-Trousers")) return "Trousers";
    if (category.includes("-TwoPiece")) return "Two-piece";
    if (category.includes("-Bubu")) return "Bubu";
    return "";
  };

  // Initial setup only - no onFilterChange dependency
  useEffect(() => {
    const savedItem = localStorage.getItem("category");
    if (savedItem) {
      setSelectedCategory(savedItem);
      const genderFromCategory = getGenderFromCategory(savedItem);
      if (genderFromCategory) {
        setSelectedGenders([genderFromCategory]);
      }
    }
    //console.log(savedItem);
  }, []);

  // Handle filter updates - only when selectedCategory changes
  useEffect(() => {
    const genderFromCategory = getGenderFromCategory(selectedCategory);
    onFilterChange("category", selectedCategory);
    if (genderFromCategory) {
      onFilterChange("gender", [genderFromCategory]);
    }
  }, [selectedCategory]);

  const handleClick = (item: string) => {
    localStorage.setItem("category", item);
    setSelectedCategory(item);

    const genderFromCategory = getGenderFromCategory(item);
    if (genderFromCategory) {
      setSelectedGenders([genderFromCategory]);
    }

    // Set subcategory when a specific category is selected
    const subCategory = getSubCategoryFromSelection(item);
    if (subCategory) {
      setSelectedSizes([subCategory]);
      onFilterChange("size", [subCategory]);
    } else {
      setSelectedSizes([]); // Clear subcategory filter if parent category selected
      onFilterChange("size", []);
    }
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) => {
      const newGenders = prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender];
      onFilterChange("gender", newGenders);
      return newGenders;
    });
  };

  const handleSizeChange = (size: string) => {
    // rename from handleSubCategoryChange
    setSelectedSizes((prev) => {
      const newSizes = prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size];
      onFilterChange("size", newSizes); // change 'subCategory' to 'size'
      return newSizes;
    });
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range);
    onFilterChange("priceRange", range);
  };

  // Update isSelected to consider category prefix
  const isSelected = (type: "gender" | "size" | "price", value: string) => {
    // change 'subCategory' to 'size'
    switch (type) {
      case "gender":
        const categoryGender = getGenderFromCategory(selectedCategory);
        return selectedGenders.includes(value) || categoryGender === value;
      case "size": // change from 'subCategory'
        return selectedSizes.includes(value); // change from selectedSubCategories
      case "price":
        return selectedPriceRange === value;
      default:
        return false;
    }
  };

  // Update visibility logic for gender section
  const shouldShowGenderSection =
    !selectedCategory.startsWith("m-") &&
    !selectedCategory.startsWith("w-") &&
    !selectedCategory.startsWith("u-");

  return (
    <>
      <div>
        <div
          className={`
        
        max-w-[240px] w-full bg-white h-[calc(100vh-7.5rem)] z-20 fixed top-[110px] hidden lg:block
        transform transition-all duration-300 ease-in-out
        ${
          visible
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible "
        }
      `}
        >
          <div className="px-6 lg:px-2  w-full text-text_strong items-center py-8">
            {selectedCategory.startsWith("trending") && (
              <p className="font-normal text-[22px]">{`Trending (${counts.trending})`}</p>
            )}
            {selectedCategory.startsWith("latestWear") && (
              <p className="font-normal text-[22px]">{`Latest Wear (${counts.latest})`}</p>
            )}

            {selectedCategory.startsWith("unisex") && (
              <p className="font-normal text-[22px]">{`Unisex (${counts.unisex})`}</p>
            )}
            {selectedCategory.includes("u-") && (
              <p className="font-normal text-[22px]">{`Unisex (${counts.unisex})`}</p>
            )}

            {selectedCategory.startsWith("men") && (
              <p className="font-normal text-[22px]">{`Men (${counts.men})`}</p>
            )}
            {selectedCategory.includes("m-") && (
              <p className="font-normal text-[22px]">{`Men (${counts.men})`}</p>
            )}

            {selectedCategory.startsWith("women") && (
              <p className="font-normal text-[22px]">{`Women (${counts.women})`}</p>
            )}
            {selectedCategory.includes("w-") && (
              <p className="font-normal text-[22px]">{`Women (${counts.women})`}</p>
            )}
          </div>

          <div className="overflow-y-auto w-full flex justify-start items-start flex-col gap-6 h-[calc(100vh-15rem)] px-2 md:pr-6">
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
                  className="cursor-pointer text-nowrap"
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
                  className="cursor-pointer text-nowrap"
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
                  className="cursor-pointer text-nowrap"
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
                  <p
                    onClick={() => handleClick("men")}
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
                <div className="flex  gap-6 text-base font-normal">
                  <p
                    onClick={() => handleClick("men")}
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
                <div className="flex  gap-6 text-base font-normal">
                  <p
                    onClick={() => handleClick("men")}
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
                <div className="flex  gap-5 text-base font-normal">
                  <p
                    onClick={() => handleClick("women")}
                    className="text-text_weak"
                  >
                    Women
                  </p>
                  <i className="-rotate-90">{arrowDown()}</i>
                  <p className={`cursor-pointer text-nowrap`}>Two-piece</p>
                </div>
                <p className={`text-[22px] ${lora.className}`}>Two-piece</p>
              </div>
            )}

            {/* ---------------------- gender ---------------------- */}
            {shouldShowGenderSection && (
              <div className="flex w-full border-b  flex-col justify-start gap-4 py-2">
                <div
                  onClick={() => setShowGender(!showGender)}
                  className="flex justify-between w-full cursor-pointer"
                >
                  <p className="text-text_strong text-base font-normal">
                    Gender
                  </p>
                  <i className={`duration-300 ${showGender && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {showGender && (
                  <div className="flex justify-items-start items-start flex-col gap-4 text-text_weak text-base font-normal mb-4 cursor-pointer">
                    {["Men", "Women", "Unisex"].map((gender) => (
                      <div
                        key={gender}
                        className="flex items-center gap-2"
                        onClick={() => handleGenderChange(gender)}
                      >
                        <span
                          className={`w-4 h-4 border border-text_wea rounded flex items-center justify-center `}
                        >
                          {isSelected("gender", gender) && check()}
                        </span>
                        <p className="">{gender}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ---------------------- Size ---------------------- */}

            <div className="flex w-full border-b  flex-col justify-start gap-4 pb-4">
              <div
                onClick={() => setShowSubCategory(!showSubCategory)}
                className="flex justify-between w-full cursor-pointer"
              >
                <p className="text-text_strong text-base font-normal">Size</p>
                <i
                  className={`duration-300 ${showSubCategory && "rotate-180"}`}
                >
                  {arrowDown()}
                </i>
              </div>
              {showSubCategory && (
                <div className="w-full grid grid-cols-2 gap-4 text-xs">
                  {[
                    { value: "XS", label: "Extra Small" },
                    { value: "S", label: "Small" },
                    { value: "M", label: "Medium" },
                    { value: "L", label: "Large" },
                    { value: "XL", label: "Extra Large" },
                  ].map(({ value, label }) => (
                    <span
                      key={value}
                      onClick={() => handleSizeChange(value)}
                      className={`col-span-1 border px-3 h-[57px] justify-center cursor-pointer 
                    text-text_strong flex flex-col items-center text-center rounded-lg
                    ${isSelected("size", value) ? "border-black" : ""}`}
                    >
                      <p className="text-sm">{value}</p>
                      <p className="">{label}</p>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------------- price ---------------------- */}

            <div className="flex  w-full  flex-col justify-start gap-4 py-2">
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
                  {["$1 - $20", "$21 - $50", "$51 - $100+"].map((range) => (
                    <div
                      key={range}
                      className="flex items-center gap-2"
                      onClick={() => handlePriceRangeChange(range)}
                    >
                      <span
                        className={`w-4 h-4 border border-text_wea rounded flex items-center justify-center
                   `}
                      >
                        {isSelected("price", range) && check()}
                      </span>
                      <p className="">{range}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* //  )}  */}
        </div>

        {/* <div className="flex md:hidden justify-between py-3 px-4">
          <button>Gender</button>
          <button>size</button>
          <button onClick={() => setShowPrice(!showPrice)}>Price</button>
        </div> */}
      </div>

      {/* mobile categoties filter */}

      {visible && ( 
        <div className="h-screen w-screen backdrop-blur-sm fixed top-0 left-0 z-50 lg:hidden bg-[rgba(0,0,0,0.7)] flex flex-col justify-start items-center ">
          <div className="overflow-y-auto  w-[90vw]  flex justify-start items-start flex-col gap-6  border p-8  md:relative  h-fit max-h-[40rem] rounded-lg top-0 bg-background  mt-20">
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
                  className="cursor-pointer text-nowrap"
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
                  className="cursor-pointer text-nowrap"
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
                  className="cursor-pointer text-nowrap"
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
                  <p
                    onClick={() => handleClick("men")}
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
                <div className="flex  gap-6 text-base font-normal">
                  <p
                    onClick={() => handleClick("men")}
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
                <div className="flex  gap-6 text-base font-normal">
                  <p
                    onClick={() => handleClick("men")}
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
                <div className="flex  gap-5 text-base font-normal">
                  <p
                    onClick={() => handleClick("women")}
                    className="text-text_weak"
                  >
                    Women
                  </p>
                  <i className="-rotate-90">{arrowDown()}</i>
                  <p className={`cursor-pointer text-nowrap`}>Two-piece</p>
                </div>
                <p className={`text-[22px] ${lora.className}`}>Two-piece</p>
              </div>
            )}

            {/* ---------------------- gender ---------------------- */}
            {shouldShowGenderSection && (
              <div className="flex w-full border-b   h-fit flex-col justify-start gap-4 py-4">
                <div
                  onClick={() => setShowGender(!showGender)}
                  className="flex justify-between w-full cursor-pointer"
                >
                  <p className="text-text_strong text-base font-normal">
                    Gender
                  </p>
                  <i className={`duration-300 ${showGender && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {showGender && (
                  <div className="flex justify-items-start items-start flex-col gap-4 h-fit text-text_weak text-base font-normal mb-4 cursor-pointer">
                    {["Men", "Women", "Unisex"].map((gender) => (
                      <div
                        key={gender}
                        className="flex items-center gap-2"
                        onClick={() => handleGenderChange(gender)}
                      >
                        <span
                          className={`w-4 h-4 border border-text_wea rounded flex items-center justify-center `}
                        >
                          {isSelected("gender", gender) && check()}
                        </span>
                        <p className="">{gender}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ---------------------- Size ---------------------- */}

            <div className="flex w-full border-b h-fit flex-col justify-start gap-4 py-4">
              <div
                onClick={() => setShowSubCategory(!showSubCategory)}
                className="flex justify-between w-full cursor-pointer"
              >
                <p className="text-text_strong text-base font-normal">Size</p>
                <i
                  className={`duration-300 ${showSubCategory && "rotate-180"}`}
                >
                  {arrowDown()}
                </i>
              </div>
              {showSubCategory && (
                <div className="w-full grid grid-cols-2 gap-4 text-xs">
                  {[
                    { value: "XS", label: "Extra Small" },
                    { value: "S", label: "Small" },
                    { value: "M", label: "Medium" },
                    { value: "L", label: "Large" },
                    { value: "XL", label: "Extra Large" },
                  ].map(({ value, label }) => (
                    <span
                      key={value}
                      onClick={() => handleSizeChange(value)}
                      className={`col-span-1 border px-3 h-[57px] justify-center cursor-pointer 
                    text-text_strong flex flex-col items-center text-center rounded-lg
                    ${isSelected("size", value) ? "border-black" : ""}`}
                    >
                      <p className="text-sm">{value}</p>
                      <p className="">{label}</p>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------------- price ---------------------- */}

            <div className="flex  w-full h-fit flex-col justify-start gap-4 pt-4">
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
                  {["$1 - $20", "$21 - $50", "$51 - $100+"].map((range) => (
                    <div
                      key={range}
                      className="flex items-center gap-2"
                      onClick={() => handlePriceRangeChange(range)}
                    >
                      <span
                        className={`w-4 h-4 border border-text_wea rounded flex items-center justify-center
                   `}
                      >
                        {isSelected("price", range) && check()}
                      </span>
                      <p className="">{range}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* close button */}
          <div className="absolute bottom-8  w-full flex justify-center items-center">
            <button
              onClick={() => setShowFilter(false)}
              className="bg-white rounded-full py-2 px-4 shadow-md text-base font-medium text-text_strong hover:bg-gray-100 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

