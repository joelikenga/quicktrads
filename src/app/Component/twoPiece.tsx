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
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737112892/quicktrads/lzprxgbhput5dajahhgq.png",
    name: "Adire couture",
    price: 62.9,
    discount: 69.9,
    link: "",
  },
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737113020/quicktrads/h1mkvd7nmpiibmao6m4q.png",
    name: "Beach party wear for men ",
    price: 62.9,
    discount: 69.9,
    link: "",
  },
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737113102/quicktrads/ut7c9pth2an4auwmqpq9.png",
    name: "Quicktrads yellow couture wear",
    price: 62.9,
    discount: 69.9,
    link: "",
  },
];

export const TwoPiece = () => {
  return (
    <div className="w-full px-6 md:px-10  lg:px-20 flex flex-col gap-4 mt-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* ----- title and view all ----- */}
        <div className="flex justify-between items-center font-normal text-text_strong">
          <p className={`${lora.className} text-[22px]`}>Two piece</p>
          <Link href={``} className={`text-[22px] underline text-base`}>
            View all
          </Link>
        </div>

        {/* ----- item grids ----- */}
        <div className="flex gap-6  overflow-x-scroll hidden_scroll">
          {/*----- mapped items ----- */}
          {content.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="flex flex-col items-center gap-4 h-full w-full min-w-[302px] md:min-w-[410.67px] max-h-[462px pb-[22px]"
              >
                <div className="w-full h-[400px] border ">
                  <Image
                    className="h-[400px] w-full object-cover bg-center"
                    src={item.image}
                    priority
                    width={302}
                    height={400}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col text-start w-full items-start gap-2 text-text_strong text-base ">
                  <p className="text-text_strong font-medium">{item.name}</p>
                  <div className="flex items-center gap-1 font-semibold">
                    <p className="text-base">{`$ ${item.price}`}</p>
                    <del className="text-base text-text_weak">{`$ ${item.discount}`}</del>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
