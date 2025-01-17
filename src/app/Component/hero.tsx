import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Hero = () => {
  return (
    <div className="w-full lg:px-20 mt-4 md:mt-8 my-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-brand_yellow   md:h-[440px] px-6 md:px-10  lg:px-20 mx-auto w-full max-w-7xl">
        {/*----- text and button container -----*/}
        <div className=" w-full md:w-1/2 flex items-center ">
          <div className="w-[485px] flex flex-col items-start mt-12 md:mt-0 gap-8">
            {/* ----- text ----- */}
            <div className="flex flex-col font-normal gap-4 items-start">
              <p
                className={`${lora.className} text-text_strong text-[32px] md:text-[42px] lg:text-[60px] leading-[38px] md:leading-[50px] lg:leading-[66px] `}
              >{`Shine brighter with Africa wears`}</p>
              <p className="text-text_weak  text-base">{`The light you need to showcase you are made of black`}</p>
            </div>
            <Link href={``}>
              <button className=" bg-text_strong rounded-full h-10 px-6 text-background text-base font-medium">
                Shop
              </button>
            </Link>
          </div>
        </div>

        {/*----- image -----*/}
        <div className="w-full md:w-1/2 min-h-[440px]  mt-12 md:mt-0">
          {/* ----- desktop  ----- */}
          <Image
            className="h-[440px] w-full object-cover bg-center  "
            src={`https://res.cloudinary.com/dtjf6sic8/image/upload/v1737031732/quicktrads/tigakuyqyyxmyc2vwmx6.png`}
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
