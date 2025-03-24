"use client";
import React, { useState } from "react";
import { Footer } from "@/app/Component/footer";
import { Navbar } from "@/app/global/navbar";
import { Lora } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export default function body() {
  const [change, setChange] = useState<boolean>(false);

  const Categories = ["XS(Extra small)", "S(Small)", "M(Medium)", "L(Large)", "XL(Extra large)"];
  // const femaleCategories = ["Bubu", "Tops", "Trousers", "Two Piece"];

  const sizes = ["Chest", "Waist", "Hip", "Height"];

  const updateCategories = () => (change ? Categories : Categories);

  const activeCategory = (isFemale: boolean) => setChange(isFemale);

  const toggle = change ? "translate-x-40" : "translate-x-0";
  return (
    <>
      <Navbar />

      <div className="mt-[108px] w-full max-w-7xl px-4 lg:px-0 mx-auto sm:mt-[152px]">
        <section className="w-full md:w-[599px] mx-auto">
          <p className=" text-[14px] sm:text-[18px] leading-[28px] text-text_weak font-[400] text-center">
            Sizing guide
          </p>
          <h1
            className={`${lora.className} text-[28px] sm:text-[32px] leading-[38px] text-text_strong py-2 text-center`}
          >
            Find your perfect fit
          </h1>

          <p className="text-[14px] sm:text-base w-full md:w-[599px] leading-[22px] font-[400] text-center">
            The measurements on the size chart are body measurements. Find your
            correct size in the chart below. Scroll horizontally to see more
            sizes.
          </p>
        </section>

        {/* tabs  */}
        <div className="max-w-3xl mx-auto mt-10 p-4">
          {/* Toggle Buttons */}
          <div className="relative flex items-center justify-between w-full sm:w-[344px] mx-auto bg-[#fafafa] p-1 rounded-full">
            <div
              className={`absolute left-1 top-1 w-1/2 h-[30px] bg-white rounded-full transition-transform duration-300 ease-in-out ${toggle}`}
            />
            <button
              className="w-1/2 z-10 text-center py-1"
              onClick={() => activeCategory(false)}
            >
              Men
            </button>
            <button
              className="w-1/2 z-10 text-center py-1"
              onClick={() => activeCategory(true)}
            >
              Women
            </button>
          </div>

          {/* Table Display */}
          <div className="mt-6 overflow-x-auto border rounded-lg">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border">Size</th>
                  {updateCategories().map((category, index) => (
                    <th key={index} className="p-3 border">
                      {category}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {sizes.map((size, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 border">{size}</td>
                    {updateCategories().map((_, catIndex) => (
                      <td key={catIndex} className="p-3 border">
                        <ul>
                          {attributes.map((attr, attrIndex) => (
                            <li key={attrIndex}>{`${attr}: --`}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>

        {/* fit tips */}
        <section className="pt-[24px] sm:pt-[32px] w-full md:w-[422px] lg:w-[852px] pb-[48px] mx-auto">
          <div>
            <h3 className="text-text_strong text-[14px] sm:text-[16px] leading-[22px] pb-2">
              Fit tips
            </h3>

            <p className="text-text_weak text-[14px] sm:text-[16px] leading-[22px] pb-3">
              Tall Tops Sizes (6`&lsquo;65/183&lsquo;196cm approx.):
              1.75`&apos;`4.5cm approx. longer in length than regular tops.
              Sleeve length is adjusted proportionately depending on silhouette.
              Tall sizes are only available for select styles.
            </p>

            <p className="text-text_weak  text-[14px] sm:text-[16px] leading-[22px]">
              If youre on the borderline between two sizes, order the smaller
              size for a tighter fit or the larger size for a looser fit. If
              your measurements for chest and waist correspond to two different
              suggested sizes, order the size indicated by your chest
              measurement.
            </p>
          </div>

          {/* how to measure */}
          <div className="mt-6 sm:">
            <h3 className="text-text_strong text-[14px] sm:text-[16px] leading-[22px] pb-1 sm:pb-2">
              Fit tips
            </h3>

            <ul>
              <li className="list-outside text-[14px] sm:text-[16px] leading-[22px] pb-3 text-text_weak">
                CHEST: Measure around the fullest part of your chest, keeping
                the tape measure horizontal.
              </li>
              <li className="list-outside text-[14px] sm:text-[16px] leading-[22px] pb-3 text-text_weak">
                WAIST: Measure around the narrowest part (typically where your
                body bends side to side), keeping the tape measure horizontal
              </li>
              <li className="list-outside text-[14px] sm:text-[16px] leading-[22px] text-text_weak">
                HIPS: Measure around the fullest part of your hips, keeping the
                tape measure horizontal.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
