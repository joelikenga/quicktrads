"use client";
import {
  arrowDown,
  cart,
  deliveryIcon,
  info,
  leftCarousel,
  returnIcon,
  rightCarousel,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export const Body = () => {
  const { id } = useParams() as { id: string };

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  useEffect(() => {
    setCurrentImage(images[index]);
  }, [index, images]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIndex(images.indexOf(image));
  };

  const handlePrevClick = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="px-10 mt-[150px]">
      <div className="mx-auto max-w-7xl w-full">
        <div className="w-full flex justify-start gap-8">
          {/* image container */}
          <div className="w-fit h-full flex justify-between gap-6">
            {/* 3 images */}
            <div className="flex flex-col gap-4">
              {images.map((item, idx) => (
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
                src={currentImage}
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

          <div className="max-w-[504px] w-full flex-col flex gap-6">

          </div>

          <div className="w-[504px] h-fit flex flex-col gap-6">
            {/* name and price */}

            <div className="flex flex-col gap-4 w-full">
              <p
                className={`${lora.className} text-[22px] font-normal text-text_strong`}
              >
                Quicktrads yellow couture wear
              </p>

              <div className="flex justify-start items-center w-full font-medium text-lg gap-2">
                <p className=" text-text_strong">$120</p>
                <p className=" text-text_weak line-through">$150</p>
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
              {/* info */}
              <div className="flex gap-2 items-center">
                <i>{info()}</i>
                <Link href={``} className="underline text-base text-text_weak">
                  Sizing guide
                </Link>
              </div>
            </div>

            {/* buttons */}

            <div className="flex flex-col gap-6 font-medium text-base">
              <button className=" w-full text-background bg-text_strong rounded-full px-6 h-12 flex justify-center items-center">
                Checkout now
              </button>
              <button className=" w-full text-text_strong border bg-background rounded-full px-6 h-12 flex justify-center items-center gap-2">
                <i>{cart()}</i>
                Add to cart
              </button>
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

              {/* Delivery & return */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between w-full cursor-pointer items-center">
                  <p className="text-text_strong text-base font-medium">
                    Delivery & return
                  </p>
                  <i className={`duration-300 ${true && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {
                  <div className=" w-full text-text_weak">
                    <div className="w-full font-normal text-base flex flex-col gap-6">
                      <div className="flex justify-start gap-2">
                        <i>{deliveryIcon()}</i>

                        <div className="flex flex-col">
                          <p className="font-medium text-base text-text_strong">
                            Delivery
                          </p>
                          <p className="py-2">We ship world wide via DHL</p>
                          <p className="">
                            Delivery within the next 3-4 days within Lagos,
                            based on your address for delivery outside Lagos
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start gap-2">
                        <i>{returnIcon()}</i>

                        <div className="flex flex-col">
                          <p className="font-medium text-base text-text_strong">
                          Return policy
                          </p>
                          <p className="">
                            {`10 days from the date of delivery. We ask you make sure the items have not been worn, washed, or damaged, and that you ship the item(s) back in their original packaging and box`}
                          </p>
                        </div>
                      </div>

                      <Link href={``} className="font-medium underline pb-6">
                        Explore delivery & return policy
                      </Link>
                    </div>
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
