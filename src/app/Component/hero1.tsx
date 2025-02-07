import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Hero1 = () => {
  return (
    <div className="w-full lg:px-10 my-8">
      <div className="flex md:flex-row flex-col items-center justify-between bg-[#dfdacf] h-[440px h-fit px-6 md:px-10  lg:px-20 mx-auto w-full max-w-7xl">
        {/*----- text and button container -----*/}
        <div className=" w-full md:w-1/2 flex items-center mt-12 md:mt-0">
          <div className="w-[542px] flex flex-col items-start  gap-8">
            {/* ----- text ----- */}
            <div className="flex flex-col font-normal gap-4 items-start">
              <p
                className={`${lora.className} text-text_strong text-[26px] md:text-[32px] lg:text-[48px] leading-[28px] md:leading-[32px] lg:leading-[53px] `}
              >{`Move around with your essentials needs`}</p>
              <p className="text-text_weak  text-base">{`Inspired by the African women’s tote bag for anyone ready to showcase black`}</p>
            </div>
            <Link href={``}>
              <button className=" bg-text_strong rounded-full h-10 px-6 text-background text-base font-medium">
                Shop
              </button>
            </Link>
          </div>
        </div>

        {/*----- image -----*/}
        <div className="w-full md:w-1/2 h-full mt-12 md:mt-0 ">
          <Image
            className="md:h-[440px] h-fit w-full object-contain bg-center"
            src={`https://res.cloudinary.com/dtjf6sic8/image/upload/v1737037294/quicktrads/kir9t265wciirmycejb8.png`}
            priority
            width={651}
            height={540}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
