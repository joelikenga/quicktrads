import Image from "next/image";

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

interface ItemsProps {
  showFilter: boolean;
}

export const Items = ({ showFilter }: ItemsProps) => {
  return (
    <div
      className={`grid grid-cols-1 ${showFilter ? "md:grid-cols-3" : "md:grid-cols-4"} flex-row flex-wrap gap-6 w-full justify-between overflow-y-auto px-6 lg:px-2`}
    >
      {content.map((item, index) => {
        return (
          <div
            key={index}
            className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center gap-4 h-ful w-full  max-w-[390px]  h-fit pb-[22px]"
          >
            <div className="w-full h-[400px] border flex items-center">
              <Image
                className="h-[400px] w-full object-center bg-center"
                src={item.image}
                priority
                width={410}
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
  );
};
