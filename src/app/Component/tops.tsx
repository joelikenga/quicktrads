import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const content = [
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737096927/quicktrads/ekrwmdm8wrkmhrfxo2nh.png",
    name: "Royal blue and dark adire",
    price: 62.9,
    discount: 69.9,
  },
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097018/quicktrads/w1ewbwlqq7rj7dvdahlv.png",
    name: "Stylist man wear",
    price: 62.9,
    discount: 69.9,
  },
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097197/quicktrads/gbl3mxotomalqufh4nke.png",
    name: "High fashion couture wear for quicktradser women ",
    price: 62.9,
    discount: 69.9,
  },
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097317/quicktrads/betdxneu2kvtldtydaj7.png",
    name: "Quicktrads high fashion jiggy beach wear for men ",
    price: 62.9,
    discount: 69.9,
  },
];

export const Tops = () => {
  return (
    <div className="w-full px-6 md:px-10  lg:px-10 flex flex-col gap-4 h-fit">
      <div className="w-full max-w-7xl mx-auto">
        {/* ----- title and view all ----- */}
        <div className="flex justify-between items-center font-normal text-text_strong">
          <p className={`${lora.className} text-[22px]`}>Tops</p>
          <Link href={``} className={`text-[22px] underline text-base`}>
            View all
          </Link>
        </div>

        {/* ----- item grids ----- */}
        <div className="flex overflow-y-hidden overflow-x-scroll hidden_scroll gap-6  h-fit">
          {/*----- mapped items ----- */}
          {content.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-4 h-full w-full min-w-[302px] max-h-[487px  h-fit pb-[22px]"
              >
                <div className="w-full h-[400px] border flex items-center">
                  <Image
                    className="h-[400px] w-full object-cover bg-center"
                    src={item.image}
                    priority
                    width={302}
                    height={400}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col text-start w-full items-start gap-2 text-text_strong text-base">
                  <p className="text-text_strong text-base font-medium">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1 font-semibold">
                    <p className="text-base">{`$ ${item.price}`}</p>
                    <del className="text-base text-text_weak">{`$ ${item.discount}`}</del>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
