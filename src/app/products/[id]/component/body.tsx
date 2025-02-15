"use client";
import { leftCarousel, rightCarousel } from "@/app/global/svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
        <div className="w-full flex justify-start">
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



        </div>
      </div>
    </div>
  );
};
