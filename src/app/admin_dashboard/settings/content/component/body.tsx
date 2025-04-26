import { editIcon, info } from "@/app/global/svg";
import { Lora } from "next/font/google";
import { useEffect, useState } from "react";
import { HeroContent } from "./heroContent";
import { getContent } from "@/utils/api/admin/products";
import Image from "next/image";
import { PromoteContent } from "./promoteContent";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface pageInterface {
  id: string;
  backgroundColor: string;
  heroTitle: string;
  heroSubTitle: string;
  heroImage: string;
  heroBtnText: string;
  heroBtnTextColor: string;
  heroBtnBgColor: string;
  heroBtnCTA: string;
  heroPageName: "heroPageMain" | "heroPagePromotion";
}

export const Body = () => {
  const [view, setView] = useState<"hero" | "promote" | null>(null);

  const [pageData, setPageData] = useState<pageInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const response = await getContent();
      if (response.data) {
        setPageData(response.data);
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

  const Hero = pageData.find((page) => page.heroPageName === "heroPageMain");
  const Promotion = pageData.find(
    (page) => page.heroPageName === "heroPagePromotion"
  );

  return (
    <div className="w-full flex justify-center mt-[120px]">
      {view === null && (
        <div className="w-full max-w-[868px]">
          <div className="flex flex-col justify-start items-start gap-2 ">
            <p className="text-[18px] leading-[28px] pb-1 text-text_black font-[500]">
              Content
            </p>
            <p className="text-base text-text_weak font-[400]">
              Manage web banners
            </p>
          </div>

          {/* ietms */}

          <div className=" flex flex-col gap-12 my-12">
            {/* hero section */}
            <div>
              <div className="text-base leading-[22px] pb-1 text-text_black font-[500]">
                Hero section banner
              </div>

              {/* edit row */}
              <div className="flex justify-between pb-4 items-center">
                <p className="text-base text-text_weak font-[400] flex items-center gap-2">
                  <span>{info()}</span>Keep your hero section fresh and aligned
                  with your latest campaigns
                </p>

                {Hero ? (
                  <p className="flex items-center selection:bg-none gap-[1px] cursor-pointer">
                    <span onClick={() => setView("hero")}>{editIcon()}</span>
                    Edit
                  </p>
                ) : null}
              </div>

              {isLoading ? (
                <div className="h-[280px] bg-gray-400 animate-pulse flex relative" />
              ) : Hero ? (
                <div
                  className={
                    "h-full border flex flex-col md:flex-row items-center justify-center relative  px-10 "
                  }
                  style={{ backgroundColor: Hero.backgroundColor }}
                >
                  <div className="py-[64px]">
                    <h1
                      className={`${lora.className} text-[38.18px] font-[400] leading-[42px] w-[309px]`}
                    >
                      {Hero.heroTitle}
                    </h1>
                    <p className="text-[10px] text-text_weak leading-[14px]">
                      {Hero.heroSubTitle}
                    </p>
                    <button
                      className="mt-[20.26px] py-[5.73px] px-[15.27px] rounded-full"
                      style={{
                        backgroundColor: Hero.heroBtnBgColor,
                        color: Hero.heroBtnTextColor,
                      }}
                    >
                      {Hero.heroBtnText}
                    </button>
                    {
                      <div
                        className={`absolute left-0 w-full h-full top-0 bg-black/40 flex items-center justify-center `}
                      >
                        <div>
                          <div
                            onClick={() => setView("hero")}
                            className="h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]"
                          >
                            {editIcon()}Edit content
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="border h-full w-full max-w-[413px]">
                    <Image
                      width={413}
                      height={340}
                      src={Hero.heroImage || ""}
                      className="w-full h-full object-cover"
                      alt="hero banner"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-[280px] border flex relative">
                  <div className="py-[64px] pl-[50.91px]">
                    <h1
                      className={`${lora.className} text-[38.18px] font-[400] leading-[42px] w-[309px]`}
                    ></h1>
                    <p className="text-[10px] text-text_weak leading-[14px]"></p>
                    <button className="mt-[20.26px] py-[5.73px] px-[15.27px] rounded-full"></button>
                    {
                      <div
                        className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center `}
                      >
                        <div>
                          <div
                            onClick={() => setView("hero")}
                            className="h-[40px] bg-black rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-white text-sm leading-[19.07px]"
                          >
                            Add content
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div>
                    {/* <SafeImage
                            width={413}
                            height={620}
                            src={mainHero.heroImage}
                            alt="hero banner"
                          /> */}
                  </div>
                </div>
              )}
            </div>

            {/* promotion section */}
            <div>
              <div className="text-base leading-[22px] pb-1 text-text_black font-[500]">
                Promotion section banner
              </div>

              {/* edit row */}
              <div className="flex justify-between pb-4 items-center">
                <p className="text-base text-text_weak font-[400] flex items-center gap-2">
                  <span>{info()}</span>Keep your promotion section fresh and
                  aligned with your latest campaigns
                </p>

                {Promotion ? (
                  <p className="flex items-center selection:bg-none gap-[1px] cursor-pointer">
                    <span onClick={() => setView("promote")}>{editIcon()}</span>
                    Edit
                  </p>
                ) : null}
              </div>

              {isLoading ? (
                <div className="h-[280px] bg-gray-400 animate-pulse flex relative" />
              ) : Promotion ? (
                <div
                  className={
                    "h-full border flex flex-col md:flex-row items-center justify-center relative  px-10 "
                  }
                  style={{ backgroundColor: Promotion.backgroundColor }}
                >
                  <div className="py-[64px]">
                    <h1
                      className={`${lora.className} text-[38.18px] font-[400] leading-[42px] w-[309px]`}
                    >
                      {Promotion.heroTitle}
                    </h1>
                    <p className="text-[10px] text-text_weak leading-[14px]">
                      {Promotion.heroSubTitle}
                    </p>
                    <button
                      className="mt-[20.26px] py-[5.73px] px-[15.27px] rounded-full"
                      style={{
                        backgroundColor: Promotion.heroBtnBgColor,
                        color: Promotion.heroBtnTextColor,
                      }}
                    >
                      {Promotion.heroBtnText}
                    </button>
                    {
                      <div
                        className={`absolute left-0 w-full h-full top-0 bg-black/40 flex items-center justify-center `}
                      >
                        <div>
                          <div
                            onClick={() => setView("promote")}
                            className="h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]"
                          >
                            {editIcon()}Edit content
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="border h-full w-full max-w-[413px]">
                    <Image
                      width={413}
                      height={340}
                      src={Promotion.heroImage || ""}
                      className="w-full h-full object-cover"
                      alt="promotion banner"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-[280px] border flex relative">
                  <div className="py-[64px] pl-[50.91px]">
                    <h1
                      className={`${lora.className} text-[38.18px] font-[400] leading-[42px] w-[309px]`}
                    ></h1>
                    <p className="text-[10px] text-text_weak leading-[14px]"></p>
                    <button className="mt-[20.26px] py-[5.73px] px-[15.27px] rounded-full"></button>
                    {
                      <div
                        className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center `}
                      >
                        <div>
                          <div
                            onClick={() => setView("promote")}
                            className="h-[40px] bg-black rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-white text-sm leading-[19.07px]"
                          >
                            Add content
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {view === "hero" && (
        <div className="w-full max-w-[868px]">
          <HeroContent setView={setView} />
        </div>
      )}

      {view === "promote" && (
        <div className="w-full max-w-[868px]">
          <PromoteContent setView={setView} />  
        </div>
      )}
    </div>
  );
};
