"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { instagram, logo, map, whatsapp } from "../global/svg";
import { Lora } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const pathname = usePathname();

  return (
    <div className="w-full mt-[102px] mb-12 pb-4 md:pb-0">
      {/* ----- instagram connect ----- */}
      {pathname !== "/" ? null : (
        <div className="w-full max-w-[725px] mx-auto text-center items-center flex flex-col gap-8 mb-[77px]">
          <div className="flex flex-col gap-4 mx-auto w-full items-center">
            <p
              className={`${lora.className} font-normal text-[22px] md:text-[35px] lg:text-[48px] text-text_strong max-w-[216px] md:max-w-[500px] lg:max-w-full text-center`}
            >
              Follow our journey on instagram
            </p>
            <p className="text-text_weak text-base font-normal max-w-[274px] md:max-w-[500px] lg:max-w-full">
              Be part of our journey as share trendy and latest African garment
            </p>
          </div>
          {/* ----- insta button ----- */}
          <Link href={``} className="h-fit w-fit">
            <button className="bg-background rounded-full flex gap-2 h-10 px-6 text-text_strong text-base font-medium border items-center border-stroke_weak">
              <i className="">{instagram()}</i>
              <p className="">Follow us</p>
            </button>
          </Link>
        </div>
      )}

      {/* ----- logo and link ----- */}
      <div className="w-full mt-12 px-6 md:px-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 ">
          <div className="flex flex-col gap-12 items-center justify-between">
            <i className="flex justify-center ">
              {/* ----- logo ----- */}
              {logo()}
            </i>
            <div className="flex flex-col sm:flex-row justify-center gap-6  font-medium">
              <div className="flex justify-between gap-4">
                <Link href={`/about`}>
                  <p className="text-text_strong text-base">About us</p>
                </Link>
                <Link href={`/contact`}>
                  <p className="text-text_strong text-base">Contact us</p>
                </Link>

                <Link href={`/sizing-guide`}>
                  <p className="text-text_strong text-base">Sizing guide</p>
                </Link>
              </div>

              <div className="flex justify-between gap-4">
                <Link href={`/shopping_&_delivery`}>
                  <p className="text-text_strong text-base">
                    Shipping & delivery
                  </p>
                </Link>

                <Link href={`/legals`}>
                  <p className="text-text_strong text-base">Legals</p>
                </Link>

                <Link href={`/faqs`}>
                  <p className="text-text_strong text-base">FAQs</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- socials and reserved rights ----- */}
      <div className="w-full mt-[88px] px-6 md:px-20 flex items-center  bg-background h-12 ">
        <div className="w-full max-w-7xl mx-auto justify-between flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center  gap-y-12 gap-6">
          {/* socials */}
          <div className="w-full flex justify-center lg:justify-start flex-wrap lg:text-nowrap  items-center gap-4 md:gap-6">
            {/* ----- map ----- */}
            <div className="flex justify-center items-center gap-1 font-medium">
              <i>{map()}</i>
              <p className="text-sm text-text_strong">
                27 fola osibo, Lagos, Nigeria
              </p>
            </div>

            {/* ----- whatsapp ----- */}
            <div className="flex justify-center items-center gap-1 font-medium">
              <i>{whatsapp()}</i>
              <p className="text-sm text-text_strong">+234 704 451 4049</p>
            </div>

            {/* ----- instagram ----- */}
            <div className="flex justify-center items-center gap-1 font-medium">
              <i>{instagram()}</i>
              <p className="text-sm text-text_strong">Quicktrads</p>
            </div>
          </div>

          {/* reserved rights */}
          <div className="text-nowrap">
            <p className="text-text_strong text-sm font-medium">
              {`© ${currentYear} Quicktrads. All rights reserved`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
