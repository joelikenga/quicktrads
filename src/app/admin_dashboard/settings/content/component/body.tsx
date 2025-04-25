"use client";
import { editIcon, info } from "@/app/global/svg";
import { getContent } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HeroContent from './heroContent';
import PromoteContent from './promoteContent';

const Skeleton = () => (
  <div className="h-[280px] animate-pulse bg-gray-200 rounded-md"></div>
);

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

enum ContentView {
  MAIN = 'main',
  HERO = 'hero',
  PROMOTE = 'promote'
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

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Content: React.FC = () => {
  const [hero, setHero] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [currentView, setCurrentView] = useState<ContentView>(ContentView.MAIN);
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

  if (currentView === ContentView.HERO) {
    return <HeroContent onClick={() => setCurrentView(ContentView.MAIN)} />;
  }

  if (currentView === ContentView.PROMOTE) {
    return <PromoteContent onClick={() => setCurrentView(ContentView.MAIN)} />;
  }

  return (
    <div className="w-auto">
      <section className="mt-12">
        {/* hero section */}
        <div>
          {/* edit row */}
          <div className="flex justify-between pb-4 items-center">
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
                onClick={() => setCurrentView(ContentView.HERO)}
                className="px-6 py-3 bg-black text-white rounded-full"
              >
                Add Hero Banner
              </button>
            </div>
          ) : (
            <div className="h-[280px] border flex relative" style={{ backgroundColor: mainHero.backgroundColor }}>
              {
                <div
                  className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center ${
                    hero ? "block" : "hidden"
                  }`}
                >
                  <div>
                    <p
                      onClick={() => setCurrentView(ContentView.HERO)}
                      className="h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]"
                    >
                      {editIcon()}Edit content
                    </p>
                  </div>
                </div>
              }
            </div>
          )}
        </div>

        {/* promotion section */}
        <div className="mt-[48px] mb-[110px]">
          {/* edit row */}
          <div className="flex justify-between pb-4 items-center">
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
                onClick={() => setCurrentView(ContentView.PROMOTE)}
                className="px-6 py-3 bg-black text-white rounded-full"
              >
                Add Promotion Banner
              </button>
            </div>
          ) : (
            <div className="h-[280px] border flex relative justify-between" style={{ backgroundColor: promotionHero.backgroundColor }}>
              {
                <div
                  className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center ${
                    promotion ? "block" : "hidden"
                  }`}
                >
                  <div>
                    <p
                      onClick={() => setCurrentView(ContentView.PROMOTE)}
                      className="h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]"
                    >
                      {editIcon()}Edit content
                    </p>
                  </div>
                </div>
              }
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Content;
