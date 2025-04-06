"use client";
import { getAllProducts } from "@/utils/api/user/product";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface TransformedProduct {
  id: string;
  images: string;
  name: string;
  price: number;
  discountPrice?: number;
  priceDiscount?: number;
  category: string;
  priceDiscountConvert?: number;
  priceConverted: number;
}

export const TwoPiece = () => {
    const { currency } = useCurrency();
  
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<TransformedProduct[]>([]);

  const fetchAllproducts = async () => {
    try {
      setIsLoading(true);
      const response = (await getAllProducts()) as any;
      // console.log("response", response);

      if (response?.data) {
        // Filter all products where subCategory === "tops"
        const topsProducts = response.data.filter(
          (product: any) => product?.subCategory === "two-piece"
        );

        // Map the filtered products
        const transformedProducts = topsProducts.map((product: any) => ({
          id: product.id,
          images: product.images[0],
          price: product.price,
          name: product.name,
          discountPrice: product.priceDiscount || null,
          category: product.category,
          priceDiscountConvert: product.priceDiscountConvert || 0,
          priceConverted: product.priceConvert || 0,
        }));

        setAllProducts(transformedProducts);
        // console.log("response", transformedProducts);
      }
    } catch (error) {
      console.log(error);
      setAllProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllproducts();
  }, []);

  const handleRowClick = (index: string) => {
    // Navigate to the dynamic route because table does not accept <LINK>
    Router.push(`products/${index}`);
  };

  return (
    <div className="w-full px-6 md:px-10  lg:px-10 flex flex-col gap-4 h-fit">
      <div className="w-full max-w-7xl mx-auto">
        {/* ----- title and view all ----- */}
        <div className="flex justify-between items-center font-normal text-text_strong">
          <p className={`${lora.className} text-[22px]`}>TwoPiece</p>
          <Link
            href={`/products`}
            onClick={() => localStorage.setItem("category", "trending")}
            className={`text-[22px] underline text-base`}
          >
            View all
          </Link>
        </div>

        {/* ----- item grids ----- */}
        {isLoading ? (
          <div className="flex flex-row gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4  w-full max-w-[410px] min-w-[302px] max-h-[487px] h-fit pb-[22px] animate-pulse"
              >
                <div className="w-full h-[400px] bg-gray-300"></div>
                <div className="flex flex-col text-start w-full items-start gap-2">
                  <div className="h-4 w-3/4 bg-gray-300"></div>
                  <div className="h-4 w-1/2 bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-y-hidde overflow-x-scroll hidden_scroll gap-6  h-fit">
            {/*----- mapped items ----- */}
            {allProducts.slice(0, 3).map((item) => {
              return (
                <div
                  onClick={() => handleRowClick(item.id)}
                  key={item.id}
                  className="flex flex-col items-center gap-4 h-full w-full max-w-[410px] min-w-[302px] max-h-[487px  h-fit pb-[22px]"
                >
                  <div className="w-full h-[400px] border flex items-center">
                    <Image
                      className="h-[400px] w-full object-cover bg-center"
                      src={item?.images ||"/heroFallback.jpg"}
                      priority
                      width={302}
                      height={400}
                      alt={item?.name}
                    />
                  </div>
                  <div className="flex flex-col text-start w-full items-start gap-2 text-text_strong text-base">
                    <p className="text-text_strong text-base font-medium">
                      {item?.name}
                    </p>
                    <div className="flex items-center gap-1 font-semibold">
                        <p className="text-base">
                        {currency === "NGN"
                          ? `₦ ${item?.price}`
                          : `$ ${item?.priceConverted}`}
                        </p>
                        {item?.priceDiscount && item?.priceDiscountConvert ? (
                        <del className="text-base text-text_weak">
                        {currency === "NGN"
                          ? `₦ ${item?.discountPrice}`
                          : `$ ${item?.priceDiscountConvert}`}
                      </del>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
