"use client";
import React, { useState } from "react";
import { Footer } from "@/app/Component/footer";
import { Navbar } from "@/app/global/navbar";
import { Lora } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Body = () => {
  const [tab, setTab] = useState<string>("Male"); // Track selected gender
  const [selectedCategory, setSelectedCategory] = useState<string>("Tops"); // Track selected clothing type

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

        {/* Gender Tabs */}
        <div className="max-w-3xl mx-auto mt-10 p-4">
          <div className="relative flex items-center justify-between w-full sm:w-[344px] mx-auto bg-[#fafafa] p-1 rounded-full">
            <div
              className={`absolute left-1 top-1 w-1/2 h-[30px] bg-white rounded-full transition-transform duration-300 ease-in-out ${
                tab === "Female" ? "translate-x-40" : "translate-x-0"
              }`}
            />
            <button
              className="w-1/2 z-10 text-center py-1"
              onClick={() => setTab("Male")}
            >
              Men
            </button>
            <button
              className="w-1/2 z-10 text-center py-1"
              onClick={() => setTab("Female")}
            >
              Women
            </button>
          </div>

          {/* Clothing Type Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            {["Tops", "Trousers", "Two-piece"].map((category) => (
              <button
                key={category}
                className={`w-[85px] ${
                  selectedCategory === category
                    ? "relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-black before:-bottom-6 before:left-0"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Size Chart */}
          <div className="mt-6 overflow-x-auto border rounded-lg">
            <div className="w-full border-collapse min-w-[600px]">
              {tab === "Male" && selectedCategory === "Tops" && (
                <div className="min-w-[600px] grid grid-cols-5 border border-stroke_weak">
                  {/* Column 1 - Labels */}
                  <div className="border-r border-stroke_weak">
                    <h3 className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Size
                    </h3>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Bust
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Waist
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Hip
                    </p>
                    <p className="pt-3 pl-5 text-text_weak text-sm">Height</p>
                  </div>

                  {/* XS */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      XS (Extra Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      24-26
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base">{`< 160`}</p>
                  </div>

                  {/* S */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      S (Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      26-28
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      36-38
                    </p>
                    <p className="py-3 text-base">160 - 170</p>
                  </div>

                  {/* M */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      M (Medium)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      37-39
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      29-31
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      39-41
                    </p>
                    <p className="py-3 text-base">170 - 183</p>
                  </div>

                  {/* L */}
                  <div className="text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      L (Large)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      40-42
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      42-44
                    </p>
                    <p className="py-3 text-base">180 - 190</p>
                  </div>
                </div>
              )}

              {tab === "Female" && selectedCategory === "Tops" && (
                <div className="min-w-[600px] grid grid-cols-5 border border-stroke_weak">
                  {/* Column 1 - Labels */}
                  <div className="border-r border-stroke_weak">
                    <h3 className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Size
                    </h3>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Bust
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Waist
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Hip
                    </p>
                    <p className="pt-3 pl-5 text-text_weak text-sm">Height</p>
                  </div>

                  {/* XS */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      XS (Extra Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      24-26
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base">{`< 160`}</p>
                  </div>

                  {/* S */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      S (Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      26-28
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      36-38
                    </p>
                    <p className="py-3 text-base">160 - 170</p>
                  </div>

                  {/* M */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      M (Medium)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      37-39
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      29-31
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      39-41
                    </p>
                    <p className="py-3 text-base">170 - 183</p>
                  </div>

                  {/* L */}
                  <div className="text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      L (Large)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      40-42
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      42-44
                    </p>
                    <p className="py-3 text-base">180 - 190</p>
                  </div>
                </div>
              )}

              {/* trousers */}
              {tab === "Male" && selectedCategory === "Trousers" && (
                <div className="min-w-[600px] grid grid-cols-5 border border-stroke_weak">
                  {/* Column 1 - Labels */}
                  <div className="border-r border-stroke_weak">
                    <h3 className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Size
                    </h3>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Bust
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Waist
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Hip
                    </p>
                    <p className="pt-3 pl-5 text-text_weak text-sm">Height</p>
                  </div>

                  {/* XS */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      XS (Extra Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      24-26
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base">{`< 160`}</p>
                  </div>

                  {/* S */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      S (Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      26-28
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      36-38
                    </p>
                    <p className="py-3 text-base">160 - 170</p>
                  </div>

                  {/* M */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      M (Medium)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      37-39
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      29-31
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      39-41
                    </p>
                    <p className="py-3 text-base">170 - 183</p>
                  </div>

                  {/* L */}
                  <div className="text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      L (Large)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      40-42
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      42-44
                    </p>
                    <p className="py-3 text-base">180 - 190</p>
                  </div>
                </div>
              )}

              {tab === "Female" && selectedCategory === "Trousers" && (
                <div className="min-w-[600px] grid grid-cols-5 border border-stroke_weak">
                  {/* Column 1 - Labels */}
                  <div className="border-r border-stroke_weak">
                    <h3 className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Size
                    </h3>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Bust
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Waist
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Hip
                    </p>
                    <p className="pt-3 pl-5 text-text_weak text-sm">Height</p>
                  </div>

                  {/* XS */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      XS (Extra Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      24-26
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base">{`< 160`}</p>
                  </div>

                  {/* S */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      S (Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      26-28
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      36-38
                    </p>
                    <p className="py-3 text-base">160 - 170</p>
                  </div>

                  {/* M */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      M (Medium)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      37-39
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      29-31
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      39-41
                    </p>
                    <p className="py-3 text-base">170 - 183</p>
                  </div>

                  {/* L */}
                  <div className="text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      L (Large)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      40-42
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      42-44
                    </p>
                    <p className="py-3 text-base">180 - 190</p>
                  </div>
                </div>
              )}

              {/* two-piece */}
              {tab === "Male" && selectedCategory === "Two-piece" && (
                <div className="min-w-[600px] grid grid-cols-5 border border-stroke_weak">
                  {/* Column 1 - Labels */}
                  <div className="border-r border-stroke_weak">
                    <h3 className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Size
                    </h3>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Bust
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Waist
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Hip
                    </p>
                    <p className="pt-3 pl-5 text-text_weak text-sm">Height</p>
                  </div>

                  {/* XS */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      XS (Extra Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      24-26
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base">{`< 160`}</p>
                  </div>

                  {/* S */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      S (Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      26-28
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      36-38
                    </p>
                    <p className="py-3 text-base">160 - 170</p>
                  </div>

                  {/* M */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      M (Medium)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      37-39
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      29-31
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      39-41
                    </p>
                    <p className="py-3 text-base">170 - 183</p>
                  </div>

                  {/* L */}
                  <div className="text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      L (Large)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      40-42
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      42-44
                    </p>
                    <p className="py-3 text-base">180 - 190</p>
                  </div>
                </div>
              )}

              {tab === "Female" && selectedCategory === "Two-piece" && (
                <div className="min-w-[600px] grid grid-cols-5 border border-stroke_weak">
                  {/* Column 1 - Labels */}
                  <div className="border-r border-stroke_weak">
                    <h3 className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Size
                    </h3>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Bust
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Waist
                    </p>
                    <p className="py-3 pl-5 text-text_weak text-sm border-b border-stroke_weak">
                      Hip
                    </p>
                    <p className="pt-3 pl-5 text-text_weak text-sm">Height</p>
                  </div>

                  {/* XS */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      XS (Extra Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      24-26
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base">{`< 160`}</p>
                  </div>

                  {/* S */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      S (Small)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      34-36
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      26-28
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      36-38
                    </p>
                    <p className="py-3 text-base">160 - 170</p>
                  </div>

                  {/* M */}
                  <div className="border-r border-stroke_weak text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      M (Medium)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      37-39
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      29-31
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      39-41
                    </p>
                    <p className="py-3 text-base">170 - 183</p>
                  </div>

                  {/* L */}
                  <div className="text-center">
                    <h3 className="py-3 text-text_weak text-sm border-b border-stroke_weak">
                      L (Large)
                    </h3>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      40-42
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      32-34
                    </p>
                    <p className="py-3 text-base border-b border-stroke_weak">
                      42-44
                    </p>
                    <p className="py-3 text-base">180 - 190</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* fit tips */}
      <section className="pt-[24px] px-4 md:px-0 sm:pt-[32px] w-full md:w-[422px] lg:w-[852px] pb-[48px] mx-auto">
        <div>
          <h3 className="text-text_strong text-[14px] sm:text-[16px] leading-[22px] pb-2">
            Fit tips
          </h3>

          <p className="text-text_weak text-[14px] sm:text-[16px] leading-[22px] pb-3">
            Tall Tops Sizes (6`&lsquo;65/183&lsquo;196cm approx.):
            1.75`&apos;`4.5cm approx. longer in length than regular tops. Sleeve
            length is adjusted proportionately depending on silhouette. Tall
            sizes are only available for select styles.
          </p>

          <p className="text-text_weak  text-[14px] sm:text-[16px] leading-[22px]">
            If youre on the borderline between two sizes, order the smaller size
            for a tighter fit or the larger size for a looser fit. If your
            measurements for chest and waist correspond to two different
            suggested sizes, order the size indicated by your chest measurement.
          </p>
        </div>

        {/* how to measure */}
        <div className="mt-6 sm:">
          <h3 className="text-text_strong text-[14px] sm:text-[16px] leading-[22px] pb-1 sm:pb-2">
            Fit tips
          </h3>

          <ul>
            <li className="list-outside text-[14px] sm:text-[16px] leading-[22px] pb-3 text-text_weak">
              CHEST: Measure around the fullest part of your chest, keeping the
              tape measure horizontal.
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

      <Footer />
    </>
  );
};
