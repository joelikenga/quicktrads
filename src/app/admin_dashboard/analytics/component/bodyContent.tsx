import { dates, arrowDown, cashIcon } from "@/app/global/svg";
import { useState } from "react";
import { Lora } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const BodyContent = () => {
  const [days, setDays] = useState(false);

  const modDays = () => {
    setDays((prev) => !prev);
  };

  return (
    <div className="mt-[120px] ml-[240px] h-full max-w-[1080px] w-full">
      <div className="">
        <div className="flex justify-between items-cener pb-[24px]">
          <p>Sales</p>

          <p
            onClick={modDays}
            className="flex relative gap-2 cursor-pointer selection:no-underline items-center"
          >
            <span>{dates()}</span>
            <p>90 days</p>
            <span>{arrowDown()}</span>

            {/* days option board */}
            <div
              className={`w-[179px] absolute top-10 right-4 h-[176px] border-lg ${
                days ? "block" : "hidden"
              } bg-white rounded-[12px] shadow-md`}
            >
              <p className="py-[10px] px-[24px] text-text_weak">7 days</p>
              <p className="py-[10px] px-[24px] text-text_weak">14 days</p>
              <p className="py-[10px] px-[24px] text-text_weak">30 days</p>
              <p className="py-[10px] px-[24px] text-text_weak bg-fill">
                90 days
              </p>
            </div>
          </p>
        </div>

        {/* amounts */}
        <div className="flex border border-stroke_weak py-[16px] px-[48px] w-[937px] rounded-lg  gap-4">
          <div className="pt-2">{cashIcon()}</div>

          <section className="flex items-center gap-4">
            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Total sales
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $0.0
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">0.0</p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Total order
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $0.0
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">0.0</p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Average order
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $0.0
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">0.0</p>
            </div>

            <div className="w-[.5px] h-[58px] bg-stroke_weak" />

            <div className="w-[134px] h-[85px] text-center">
              <p className="text-[14px] leading-[22px] text-text_weak">
                Refunded
              </p>
              <p
                className={`${lora.className} text-[22px] leading-[28px] font-[400] py-2`}
              >
                $0.0
              </p>
              <p className="text-[14px] leading-[22px] text-text_weak">0.0</p>
            </div>
          </section>
        </div>

        {/* sales pannel */}
        <div className="flex justify-center h-[455px] items-center">
          <div className=" flex flex-col w-[400px] h-[80px]">
            <span className="w-[40px] mx-auto">{cashIcon()}</span>
            <h3 className="pb-4 py-[16px] text-[18px] leading-[28px] text-center font-[500]">
              There are currently no sales!
            </h3>
            <p className="text-[14px] leading-[22px] text-text_weak w-[266px] mx-auto text-center">
              It looks like there are currently no sales available at the moment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
