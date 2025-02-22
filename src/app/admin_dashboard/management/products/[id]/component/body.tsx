"use client";
import {
  arrowDown,
  arrowleft,
  cart,
  deliveryIcon,
  editIcon,
  info,
  instagram,
  leftCarousel,
  linkIcon,
  msgIcon,
  returnIcon,
  review_0,
  rightCarousel,
  trash,
  whatsapp,
} from "@/app/global/svg";
import { fetchProduct } from "@/app/utils/api/admin/products";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const images = [
  "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097018/quicktrads/w1ewbwlqq7rj7dvdahlv.png",
  "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737096927/quicktrads/ekrwmdm8wrkmhrfxo2nh.png",
  "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097317/quicktrads/betdxneu2kvtldtydaj7.png",
];

interface BodyProps {
  productId: string;
}

interface ProductDetails {
  addToInventory: boolean;
  category: string;
  createdAt: string;
  currency: string;
  currencyConvert: string;
  description: string;
  id: string;
  images: string[];
  isFeatured: boolean;
  isPaid: boolean;
  isReviewed: boolean;
  name: string;
  ordersCount: number;
  paidAt: string;
  price: number;
  priceConvert: number;
  priceDiscount: number | null;
  priceDiscountConvert: number | null;
  size: string;
  stars: number;
  status: string;
  subCategory: string;
  updatedAt: string;
}

export const Body = ({ productId }: BodyProps) => {
  const [currentImage, setCurrentImage] = useState('');
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update carousel images when data changes
  useEffect(() => {
    if (data && data.images && data.images.length > 0) {
      setCurrentImage(data.images[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!isHovered && data && data.images && data.images.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, data]);

  useEffect(() => {
    if (data?.images && data.images.length > 0) {
      setCurrentImage(data.images[index]);
    }
  }, [index, data]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIndex(data?.images?.indexOf(image) ?? 0);
  };

  const handlePrevClick = () => {
    if (data?.images?.length) {
      setIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
    }
  };

  const handleNextClick = () => {
    if (data?.images?.length) {
      setIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }
  };

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetchProduct(productId);
      if (response?.data) {
        setData(response.data);
      }
      console.log("Product data:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="px-10 mt-[120px] ml-[240px]">
      <div className="mx-auto max-w-7xl w-full">
        {/* Header skeleton */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="h-[24px] w-[120px] bg-gray-200 animate-pulse rounded"></div>
          <div className="flex gap-4">
            <div className="h-[24px] w-[80px] bg-gray-200 animate-pulse rounded"></div>
            <div className="h-[24px] w-[80px] bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        <div className="w-full flex justify-start gap-8">
          {/* Image section skeleton */}
          <div className="w-fit h-full flex justify-between gap-6">
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-[100px] h-[120px] bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
            <div className="w-[420px] h-[520px] bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Details section skeleton */}
          <div className="w-[504px] h-fit flex flex-col gap-6">
            {/* Title and price skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-[28px] w-3/4 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex gap-4">
                <div className="h-[24px] w-[100px] bg-gray-200 animate-pulse rounded"></div>
                <div className="h-[24px] w-[100px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Size section skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-[20px] w-[60px] bg-gray-200 animate-pulse rounded"></div>
              <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-[88px] w-full bg-gray-200 animate-pulse rounded"></div>
                ))}
              </div>
            </div>

            {/* About section skeleton */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="h-[24px] w-[120px] bg-gray-200 animate-pulse rounded"></div>
                <div className="h-[24px] w-[24px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="h-[200px] w-full bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Reviews section skeleton */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="h-[24px] w-[80px] bg-gray-200 animate-pulse rounded"></div>
                <div className="h-[24px] w-[24px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="h-[100px] w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return <div>No product data found</div>;
  }

  return (
    <div className="px-10 mt-[120px] ml-[240px]">
      <div className="mx-auto max-w-7xl w-full">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div
            onClick={() => history.back()}
            className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2"
          >
            <i>{arrowleft()}</i>
            Products
          </div>
          <div className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2">
            <i>{trash()}</i>
            Deactivate
          </div>
        </div>
        <div className="w-full flex justify-start gap-8">
          {/* Image container */}
          <div className="w-fit h-full flex justify-between gap-6">
            <div className="flex flex-col gap-4">
              {data.images.map((item) => (
                <div
                  key={item}
                  className="w-fit h-fit cursor-pointer"
                  onClick={() => handleImageClick(item)}
                >
                  <Image
                    width={100}
                    height={120}
                    src={item}
                    alt={data.name}
                    className={`w-[100px] h-[120px] ${
                      currentImage === item ? "border-2 border-blue-500" : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Main image carousel */}
            <div
              className="h-fit relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {currentImage && (
                <Image
                  width={520}
                  height={620}
                  src={currentImage}
                  alt={data.name}
                  className="w-[420px] h-[520px] object-cover"
                />
              )}
              <div className="absolute top-1/2 w-full flex justify-between px-4">
                <button onClick={handlePrevClick} className="  rounded-full">
                  {leftCarousel()}
                </button>

                <button onClick={handleNextClick} className="rounded-full ">
                  {rightCarousel()}
                </button>
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="w-[504px] h-fit flex flex-col gap-6">
            {/* name and price */}

            <div className="flex flex-col gap-4 w-full">
              <p
                className={`${lora.className} text-[22px] font-normal text-text_strong`}
              >
                {data?.name}
              </p>

              <div className="flex justify-start items-center w-full font-medium text-lg gap-2">
                <p className="text-text_strong">₦{data?.price.toLocaleString()}</p>
                {data?.priceDiscount && (
                  <p className="text-text_weak line-through">
                    ₦{data?.priceDiscount.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* size */}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-normal text-sm">Select size</p>
                <div className="grid grid-cols-5 gap-4 font-medium">
                  {/* XS */}
                  <div className="col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2 ">
                    <p className="text-text_strong text-sm">XS</p>
                    <p className="text-text_weak text-xs text-nowrap">
                      Extra small
                    </p>
                  </div>

                  {/* S */}
                  <div className="col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2 ">
                    <p className="text-text_strong text-sm">S</p>
                    <p className="text-text_weak text-xs text-nowrap">Small</p>
                  </div>

                  {/* M */}
                  <div className="col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2 ">
                    <p className="text-text_strong text-sm">M</p>
                    <p className="text-text_weak text-xs text-nowrap">Medium</p>
                  </div>

                  {/* L */}
                  <div className="col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2 ">
                    <p className="text-text_strong text-sm">L</p>
                    <p className="text-text_weak text-xs text-nowrap">Large</p>
                  </div>

                  {/* XL */}
                  <div className="col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2 ">
                    <p className="text-text_strong text-sm">XL</p>
                    <p className="text-text_weak text-xs text-nowrap">
                      Extra Large
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-6">
              {/* About product */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between w-full cursor-pointer items-center">
                  <p className="text-text_strong text-base font-medium">
                    About product
                  </p>
                  <i className={`duration-300 ${true && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {
                  <div className=" w-full text-text_weak">
                    <div className="w-full font-normal text-base ">
                      {`Our best selling wide-leg culottes are the most comfortable and stylish piece to have in your wardrobe. The most fun detail on our culottes is its contrasting aso oke back pockets, with colors chosen at random, a delightful surprise for each customer. Pair with sandals, sneakers, or heels. Each Quicktrads piece is made from small batches of hand-dyed textiles using batik wax to achieve our own formulated colors and prints and produced in Nigeria working with local artisans.`
                        .split(". ")
                        .map((sentence, index) => (
                          <p key={index} className="pb-2 ">
                            {sentence}.
                          </p>
                        ))}
                    </div>
                    <Link href={``} className="font-medium underline pb-6">
                      Read more about product
                    </Link>
                  </div>
                }
              </div>

              {/*Reviews */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between w-full cursor-pointer items-center">
                  <p className="text-text_strong text-base font-medium">
                    Reviews
                  </p>
                  <i className={`duration-300 ${true && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>

                {/* no reviews */}
                {
                  <div className=" w-full text-text_weak">
                    <div className="w-full font-normal text-base flex flex-col gap-6">
                      <div className="flex justify-start items-center gap-2">
                        <p
                          className={`${lora.className} font-normal text-[32px] text-text_strong`}
                        >
                          0
                        </p>
                        <i>{review_0()}</i>
                      </div>

                      {false && (
                        <div className="flex-col flex items-center gap-4">
                          <i>{msgIcon()}</i>

                          <div className="max-w-[290px] ">
                            <p className="font-medium text-[18px] text-text_strong">
                              There are currently no review!
                            </p>
                            <p className="text-text_weak text-sm font-normal">
                              It looks like there are currently no reviews
                              available at the moment
                            </p>
                          </div>
                        </div>
                      )}

                      <Link href={``} className="font-medium underline pb-6">
                        Write a review
                      </Link>
                    </div>
                  </div>
                }
                {/* review given */}
                {
                  <div className="w-full font-normal text-base flex flex-col gap-2">
                    <p className="text-base font-medium">Emeka</p>
                    <div className="flex justify-start items-center gap-2">
                      <i>{review_0()}</i>
                      <p className={`font-normal text-[16px] text-text_weak`}>
                        12/1/2024
                      </p>
                    </div>
                    <p className="font-normal text-base text-text_weak">
                      {`10 days from the date of delivery. We ask you make sure
                      the items have not been worn, washed, or damaged, and that
                      you ship the item(s) back in their original packaging and
                      box`}
                    </p>

                    <Link
                      href={``}
                      className="font-medium underline py-6 text-text_weak"
                    >
                      Explore reviews
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
