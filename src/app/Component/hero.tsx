"use client";
import { getContent } from "@/utils/api/admin/products";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Hero = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(false);

      try {
        setLoading(true);
        const response = await getContent();
        if (response?.data) {
          const mainContent = response.data.find(
            (page: any) => page.heroPageName === "heroPageMain"
          );
          // console.log(mainContent);
          setData(mainContent);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="w-full lg:px-10 mt-20 md:mt-[152px] my-8">
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between md:h-[440px] px-6 md:px-10 lg:px-20 mx-auto w-full max-w-7xl"
        style={{ backgroundColor: loading ? "#e9c46a" : data?.backgroundColor }}
      >
        {/*----- text and button container -----*/}
        <div className=" w-full mt-12 lg:mt-0 md:w-1/2 flex items-center ">
          <div className="w-[485px] flex flex-col items-start mt-12 md:mt-0 gap-8">
            {/* ----- text ----- */}
            <div className="flex flex-col font-normal gap-4 items-start">
              <p
                style={{
                  color: loading ? "#000" : data?.heroBtnCTA,
                }}
                className={`${lora.className}  text-[32px] md:text-[42px] lg:text-[60px] leading-[38px] md:leading-[50px] lg:leading-[66px] `}
              >{`Shine brighter with Africa wears`}</p>
              <p className="text-text_weak  text-base">{data?.heroSubTitle}</p>
            </div>
            <Link
              onClick={() => localStorage.setItem("category", "trending")}
              href={`/products`}
            >
              <button className=" bg-text_strong rounded-full h-10 px-6 text-background text-base font-medium">
                {data?.heroBtnText}
              </button>
            </Link>
          </div>
        </div>

        {/*----- image -----*/}
        <div className="w-full md:w-1/2 min-h-[440px]  mt-12 md:mt-0">
          {/* ----- desktop  ----- */}
          <Image
            className="h-[440px] w-full object-cover bg-center  "
            src={ data?.heroImage || `/heroFallback.jpg`}
            priority
            width={651}
            height={440}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
