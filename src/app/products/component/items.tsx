 
"use client";
import { filterIcon } from "@/app/global/svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
// Add your actual API import here
import {
  getAllProducts,
  getLatestProducts,
  getTrendingProducts,
} from "../../../utils/api/user/product";
import { ItemsSkeleton } from "./items-skeleton";
import { useCurrency } from "@/context/CurrencyContext";
// import { errorToast, successToast } from "../../../utils/toast/toast";

interface Product {
  id: string;
  name: string;
  price: number;
  priceDiscount?: number;
  category: string;
  subCategory: string;
  images: string[];
  priceConvert: number;
  priceDiscountConvert?: number;
}

interface TransformedProduct {
  id: string;
  images: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  subCategory: string;
  priceConvert: number;
  priceDiscountConvert?: number;
}

interface ItemsProps {
  onFilterChange: (show: boolean) => void;
  filters: {
    category: string;
    gender: string[];
    size: string[]; // change from subCategory to size
    priceRange: string;
  };
}

export const Items = ({ onFilterChange, filters }: ItemsProps) => {
  const { currency } = useCurrency();
  const Router = useRouter();
  const [allProducts, setAllProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(true);

  const fetchAllproducts = async () => {
    try {
      setIsLoading(true);
      let response;

      // Updated category checks to match SideCategory values
      if (filters.category.includes("trending")) {
        response = (await getTrendingProducts()) as any;
      } else if (filters.category === "latestWear") {
        response = (await getLatestProducts()) as any;
      } else {
        response = (await getAllProducts()) as any;
      }

      // console.log("response", response);

      const transformedProducts =
        response?.data?.map(
          (product: Product): TransformedProduct => ({
            id: product.id,
            images: product.images[0],
            name: product.name,
            price: product.price,
            discountPrice: product.priceDiscount,
            category: product.category,
            subCategory: product.subCategory,
            priceConvert: product.priceConvert,
            priceDiscountConvert: product.priceDiscountConvert,
          })
        ) || [];

      setAllProducts(transformedProducts);
    } catch (error) {
      console.log(error);
      // //errorToat(error);
      setAllProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllproducts();
  }, [filters.category]);

  const handleRowClick = (index: string) => {
    // Navigate to the dynamic route because table does not accept <LINK>
    Router.push(`products/${index}`);
  };

  const filterProducts = (products: TransformedProduct[]) => {
    return products.filter((product) => {
      // Special handling for trending and latest products
      if (
        filters.category === "trending" ||
        filters.category === "latestWear"
      ) {
        // Only apply gender, size, and price filters for special categories
        const matchesGender =
          filters.gender.length === 0 ||
          filters.gender.some(
            (gender) => product.category.toLowerCase() === gender.toLowerCase()
          );

        const matchesSize =
          filters.size.length === 0 ||
          filters.size.some((size) => {
            const normalizedSize = size.toLowerCase();
            const normalizedSubCategory = product.subCategory.toLowerCase();
            return (
              normalizedSubCategory.includes(normalizedSize) ||
              normalizedSubCategory === normalizedSize ||
              (normalizedSize === "two-piece" &&
                normalizedSubCategory.includes("twopiece"))
            );
          });

        const matchesPrice =
          !filters.priceRange ||
          (() => {
            const price = product.price;
            switch (filters.priceRange) {
              case "$1 - $20":
                return price >= 1 && price <= 20;
              case "$21 - $50":
                return price >= 21 && price <= 50;
              case "$51 - $100+":
                return price >= 51;
              default:
                return true;
            }
          })();

        return matchesGender && matchesSize && matchesPrice;
      }

      // Regular category filtering for other cases
      const matchesCategory =
        !filters.category ||
        (filters.category.startsWith("u-") &&
          product.category.toLowerCase() === "unisex") ||
        (filters.category.startsWith("m-") &&
          product.category.toLowerCase() === "men") ||
        (filters.category.startsWith("w-") &&
          product.category.toLowerCase() === "women");

      // Gender filter
      const matchesGender =
        filters.gender.length === 0 ||
        filters.gender.some(
          (gender) => product.category.toLowerCase() === gender.toLowerCase()
        );

      // Updated Size/SubCategory filter
      const matchesSize =
        filters.size.length === 0 ||
        filters.size.some((size) => {
          const normalizedSize = size.toLowerCase();
          const normalizedSubCategory = product.subCategory.toLowerCase();
          return (
            normalizedSubCategory.includes(normalizedSize) ||
            normalizedSubCategory === normalizedSize ||
            (normalizedSize === "two-piece" &&
              normalizedSubCategory.includes("twopiece"))
          );
        });

      // Price filter
      const matchesPrice =
        !filters.priceRange ||
        (() => {
          const price = product.price;
          switch (filters.priceRange) {
            case "$1 - $20":
              return price >= 1 && price <= 20;
            case "$21 - $50":
              return price >= 21 && price <= 50;
            case "$51 - $100+":
              return price >= 51;
            default:
              return true;
          }
        })();

      return matchesCategory && matchesGender && matchesSize && matchesPrice;
    });
  };

  const filteredProducts = filterProducts(allProducts);
  // console.log("filteredProducts", filteredProducts);
  // //successToat("hello")

  if (isLoading) {
    return <ItemsSkeleton />;
  }

  return (
    <div className="flex flex-col justify-center  w-full">
      <div className="px-6 lg:px-2 py-8 bg-background relative hidden lg:block">
        <div
          onClick={() => {
            setShowFilter(!showFilter);
            onFilterChange(!showFilter);
          }}
          className="flex gap-2 font-medium text-base items-center cursor-pointer justify-end"
        >
          <i>{filterIcon()}</i>
          <p>{showFilter ? "Hide filter" : "Show filter"}</p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center w-full min-h-[400px] text-text_weak text-lg">
          No matching items found
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 ${
            showFilter ? "md:grid-cols-3  grid-col-3" : "md:grid-cols-4  grid-col-3"
          } flex-row flex-wrap gap-6 w-full justify-center justify-items-center  overflow-y-auto px-6 lg:px-2`}
        >
          {filteredProducts.map((item: TransformedProduct) => (
            <div
              onClick={() => handleRowClick(item.id)}
              key={item.id}
              className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center gap-4 w-full max-w-[390px] h-fit pb-[22px] cursor-pointer"
            >
              <div className="w-full h-[400px] border flex items-center">
          <Image
            className="h-[400px] w-full object-center bg-center"
            src={item.images ||"/heroFallback.jpg"}
            priority
            width={410}
            height={400}
            alt={item.name}
          />
              </div>
              <div className="flex flex-col text-start w-full items-start gap-2 text-text_strong text-base">
          <p className="text-text_strong text-base font-medium">
            {item.name}
          </p>
          <div className="flex items-center gap-1 font-semibold">
            <p className="text-base">
              {currency === "NGN"
                ? `₦ ${item?.price}`
                : `$ ${item?.priceConvert}`}
            </p>
            {currency === "NGN"
              ? item.discountPrice && (
            <del className="text-base text-text_weak">
              ₦{item?.discountPrice}
            </del>
                )
              : null}

            {currency === "USD"
              ? item.priceDiscountConvert && (
            <del className="text-base text-text_weak">
              ${item?.priceDiscountConvert || 0}
            </del>
                )
              : null}
          </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

 