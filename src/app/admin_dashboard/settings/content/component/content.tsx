"use client";
import { editIcon, info } from "@/app/global/svg";
import { getContent } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface ContentProps {
  onReturn: () => void; // Handler to return to original content
  onPromote: () => void; // Handler to go to PromoteContent
}

interface HeroPage {
  id: string;
  backgroundColor: string;
  heroTitle: string;
  heroSubTitle: string;
  heroImage: string;
  heroBtnText: string;
  heroBtnTextColor: string;
  heroBtnBgColor: string;
  heroBtnCTA: string;
  heroPageName: 'heroPageMain' | 'heroPagePromotion';
}

const FallbackImage = () => (
  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
    <p className="text-gray-500">Image not available</p>
  </div>
);

const SafeImage: React.FC<{
  src: string;
  width: number;
  height: number;
  alt: string;
}> = ({ src, width, height, alt }) => {
  const [error, setError] = useState(false);

  if (error || !src || !isValidUrl(src)) {
    return <FallbackImage />;
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      onError={() => setError(true)}
    />
  );
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Content: React.FC<ContentProps> = ({ onReturn, onPromote }) => {
  const [hero, setHero] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [heroPages, setHeroPages] = useState<HeroPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const response = await getContent();
      if (response.data) {
        setHeroPages(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const mainHero = heroPages.find(page => page.heroPageName === 'heroPageMain');
  const promotionHero = heroPages.find(page => page.heroPageName === 'heroPagePromotion');

  const Skeleton = () => (
    <div className="h-[280px] bg-gray-200 animate-pulse rounded-md"></div>
  );

  return (
    <div className="w-auto">
      <h3 className="text-[18px] leading-[28px] pb-1 text-text_black font-[500]">
        Content
      </h3>
      <p className="text-base text-text_weak font-[400]">Manage web banners</p>

      <section className="mt-12">
        {/* hero section */}
        <div>
          <p className="text-base leading-[22px] pb-1 text-text_black font-[500]">
            Hero section banner
          </p>

          {/* edit row */}
          <div className="flex justify-between pb-4 items-center">
            <p className="text-base text-text_weak font-[400] flex items-center gap-2">
              <span>{info()}</span>Keep your hero section fresh and aligned with
              your latest campaigns
            </p>

            <p
              onClick={() => setHero((prev) => !prev)}
              className="flex items-center selection:bg-none gap-[1px] cursor-pointer"
            >
              <span>{editIcon()}</span>Edit
            </p>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : !mainHero ? (
            <div className="h-[280px] flex items-center justify-center bg-gray-100">
              <button
                onClick={onReturn}
                className="px-6 py-3 bg-black text-white rounded-full"
              >
                Add Hero Banner
              </button>
            </div>
          ) : (
            <div className="h-[280px] border flex relative" style={{ backgroundColor: mainHero.backgroundColor }}>
              <div className="py-[64px] pl-[50.91px]">
                <h1 className={`${lora.className} text-[38.18px] font-[400] leading-[42px] w-[309px]`}>
                  {mainHero.heroTitle}
                </h1>
                <p className="text-[10px] text-text_weak leading-[14px]">
                  {mainHero.heroSubTitle}
                </p>
                <button
                  className="mt-[20.26px] py-[5.73px] px-[15.27px] rounded-full"
                  style={{
                    backgroundColor: mainHero.heroBtnBgColor,
                    color: mainHero.heroBtnTextColor
                  }}
                >
                  {mainHero.heroBtnText}
                </button>
                {
                  <div
                    className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center  ${
                      hero ? "block" : "hidden"
                    }`}
                  >
                    <div>
                      <p
                        onClick={onReturn}
                        className=" h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]"
                      >
                        {editIcon()}Edit content
                      </p>
                    </div>
                  </div>
                }
              </div>
              <div>
                <SafeImage
                  width={413}
                  height={620}
                  src={mainHero.heroImage}
                  alt="hero banner"
                />
              </div>
            </div>
          )}
        </div>

        {/* promotion section */}
        <div className="mt-[48px] mb-[110px]">
          <p className="text-base leading-[22px] pb-1 text-text_black font-[500]">
            Promotion section banner
          </p>

          {/* edit row */}
          <div className="flex justify-between pb-4 items-center">
            <p className="text-base text-text_weak font-[400] flex items-center gap-2">
              <span>{info()}</span>Keep your promotion section fresh and aligned
              with your promotions
            </p>

            <p
              onClick={() => setPromotion((prev) => !prev)}
              className="flex items-center selection:bg-none gap-[1px] cursor-pointer"
            >
              <span>{editIcon()}</span>Edit
            </p>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : !promotionHero ? (
            <div className="h-[280px] flex items-center justify-center bg-gray-100">
              <button
                onClick={onPromote}
                className="px-6 py-3 bg-black text-white rounded-full"
              >
                Add Promotion Banner
              </button>
            </div>
          ) : (
            <div className="h-[280px] border flex relative justify-between" style={{ backgroundColor: promotionHero.backgroundColor }}>
              <div className="py-[64px] pl-[50.91px]">
                <h1 className={`${lora.className} text-[32px] font-[400] leading-[42px] w-[361.33px]`}>
                  {promotionHero.heroTitle}
                </h1>
                <p className="text-[10px] text-text_weak leading-[14px]">
                  {promotionHero.heroSubTitle}
                </p>
                <button
                  className="mt-[20.26px] py-[5.73px] px-[15.27px] rounded-full"
                  style={{
                    backgroundColor: promotionHero.heroBtnBgColor,
                    color: promotionHero.heroBtnTextColor
                  }}
                >
                  {promotionHero.heroBtnText}
                </button>
                {
                  <div
                    className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center  ${
                      promotion ? "block" : "hidden"
                    }`}
                  >
                    <div>
                      <p
                        onClick={onPromote}
                        className=" h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]"
                      >
                        {editIcon()}Edit content
                      </p>
                    </div>
                  </div>
                }
              </div>
              <div>
                <SafeImage
                  width={239}
                  height={260}
                  src={promotionHero.heroImage}
                  alt="promotion banner"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Content;
