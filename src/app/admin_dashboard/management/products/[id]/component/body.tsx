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
import { set } from "zod";

interface ProductDetails {
  data: {
    id: string;
    name: string;
    description: string;
    category: "men" | "women" | "unisex";
    subCategory: string;
    price: number;
    priceDiscount: number | null;
    priceConvert: number;
    priceDiscountConvert: number | null;
    currency: string;
    currencyConvert: string;
    size: string;
    images: string[];
    status: "active" | "inactive";
    isFeatured: boolean;
    isPaid: boolean;
    isReviewed: boolean;
    addToInventory: boolean;
    ordersCount: number;
    stars: number;
    paidAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface BodyProps {
  id: any;
}

export const Body = ({ id }: BodyProps) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [currentImage, setCurrentImage] = useState(product?.data?.images[0]);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showAbout, setShowAbout] = useState(true);
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIndex(
          (prevIndex) => (prevIndex + 1) % (product?.data?.images?.length || 1)
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product?.data?.images.length, isHovered]);

  useEffect(() => {
    setCurrentImage(product?.data?.images[index]);
  }, [index, product?.data?.images]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIndex(product?.data?.images.indexOf(image) ?? 0);
  };

  const handlePrevClick = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + (product?.data?.images?.length ?? 1)) %
        (product?.data?.images?.length ?? 1)
    );
  };

  const handleNextClick = () => {
    setIndex(
      (prevIndex) => (prevIndex + 1) % (product?.data?.images?.length ?? 1)
    );
  };

  const getProduct = async (id: string) => {
    try {
      const response = await fetchProduct(id);
      const transformedData: ProductDetails = {
        data: {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          category: response.data.category as "men" | "women" | "unisex",
          subCategory: response.data.subCategory,
          price: Number(response.data.price),
          priceDiscount: response.data.priceDiscount
            ? Number(response.data.priceDiscount)
            : null,
          priceConvert: Number(response.data.priceConvert),
          priceDiscountConvert: response.data.priceDiscountConvert,
          currency: response.data.currency,
          currencyConvert: response.data.currencyConvert,
          size: response.data.size,
          images: response.data.images,
          status: response.data.status as "active" | "inactive",
          isFeatured: Boolean(response.data.isFeatured),
          isPaid: Boolean(response.data.isPaid),
          isReviewed: Boolean(response.data.isReviewed),
          addToInventory: Boolean(response.data.addToInventory),
          ordersCount: Number(response.data.ordersCount),
          stars: Number(response.data.stars),
          paidAt: response.data.paidAt,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        },
      };

      setProduct(transformedData);
      console.log("Product details:", transformedData);
    } catch (error: unknown) {
      throw error;
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <div className="px-10 mt-[120px] ml-[240px]">
      <div className="mx-auto max-w-7xl w-full">
        {/* Header section */}
        <div className="w-full flex items-center justify-between">
          <div
            onClick={() => history.back()}
            className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2"
          >
            <i>{arrowleft()}</i>
            Products
          </div>

          <div className="flex gap-4 items-center">
            <div className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2">
              <i>{editIcon()}</i>
              Edit
            </div>

            <div className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2">
              <i>{trash()}</i>
              {product?.data.status === "active" ? "Deactivate" : "Activate"}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start gap-8">
          {/* image container */}
          <div className="w-fit h-full flex justify-between gap-6">
            {/* 3 images */}
            <div className="flex flex-col gap-4">
              {product?.data?.images.map((item) => (
                <div
                  key={item}
                  className="w-fit h-fit cursor-pointer"
                  onClick={() => handleImageClick(item)}
                >
                  <div className="w-fit h-fit">
                    <Image
                      width={100}
                      height={120}
                      src={item}
                      priority
                      alt=""
                      className={`w-[100px] h-[120px] ${
                        currentImage === item ? "border-2 border-blue-500" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* image carousel */}
            <div
              className="h-fit relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                width={520}
                height={620}
                src={currentImage || ""}
                priority
                alt=""
                className="w-[420px] h-[520px]"
              />

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

          {/* details container*/}

          <div className="w-[504px] h-fit flex flex-col gap-6">
            {/* name and price */}

            <div className="flex flex-col gap-4 w-full">
              <p
                className={`${lora.className} text-[22px] font-normal text-text_strong`}
              >
                {product?.data.name}
              </p>

              <div className="flex justify-start items-center w-full font-medium text-lg gap-2">
                <p className="text-text_strong">
                  {product?.data.currency}{" "}
                  {product?.data.price.toLocaleString()}
                </p>
                {product?.data.priceDiscount && (
                  <p className="text-text_weak line-through">
                    {product?.data.currency}{" "}
                    {product?.data.priceDiscount.toLocaleString()}
                  </p>
                )}
              </div>

              {/* <div className="text-sm text-text_weak">
                <p>Category: <span className="capitalize">{product?.data.category}</span></p>
                <p>Sub-category: <span className="capitalize">{product?.data.subCategory}</span></p>
                <p>Status: <span className={`capitalize ${
                  product?.data.status === 'active' ? 'text-[#109368]' : 'text-[#931010]'
                }`}>{product?.data.status}</span></p>
              </div> */}
            </div>

            {/* size */}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-base">Sizes</p>
                <div className="grid grid-cols-5 gap-4 font-medium">
                  {product?.data.size.split(",").map((size) => (
                    <div
                      key={size}
                      className="col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2"
                    >
                      <p className="text-text_strong text-sm uppercase">
                        {size}
                      </p>
                      <p className="text-text_weak text-xs text-nowrap capitalize">
                        {size === "xs"
                          ? "Extra Small"
                          : size === "s"
                          ? "Small"
                          : size === "m"
                          ? "Medium"
                          : size === "l"
                          ? "Large"
                          : size === "xl"
                          ? "Extra Large"
                          : size}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-6">
              {/* About product */}
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => setShowAbout(!showAbout)}
                  className="flex justify-between w-full cursor-pointer items-center"
                >
                  <p className="text-text_strong text-base font-medium">
                    About product
                  </p>
                  <i className={`duration-300  ${showAbout && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {showAbout && (
                  <div className="w-full text-text_weak">
                    <div className="w-full font-normal text-base ">
                      {product?.data.description
                        .split(". ")
                        .map((sentence, index) => (
                          <p key={index} className="pb-2">
                            {sentence}.
                          </p>
                        ))}
                    </div>
                    <Link href={``} className="font-medium underline pb-6">
                      Read more about product
                    </Link>
                  </div>
                )}
              </div>

              {/*Reviews */}
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => setShowReviews(!showReviews)}
                  className="flex justify-between w-full cursor-pointer items-center"
                >
                  <p className="text-text_strong text-base font-medium ">
                    <> Reviews</>
                    <span className="text-sm text-text_weak ml-2">
                      ({product?.data.stars || 0} stars,{" "}
                      {product?.data.ordersCount || 0} orders)
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <i
                      className={`duration-300 ${showReviews && "rotate-180"}`}
                    >
                      {arrowDown()}
                    </i>
                  </div>
                </div>

                {showReviews && (
                  <>
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

                          <Link
                            href={``}
                            className="font-medium underline pb-6"
                          >
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
                          <p
                            className={`font-normal text-[16px] text-text_weak`}
                          >
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
