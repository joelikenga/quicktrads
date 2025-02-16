"use client";
import { filterIcon } from "@/app/global/svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const content = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737096927/quicktrads/ekrwmdm8wrkmhrfxo2nh.png",
    name: "Royal blue and dark adire",
    price: 62.9,
    discount: 69.9,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097018/quicktrads/w1ewbwlqq7rj7dvdahlv.png",
    name: "Stylist man wear",
    price: 62.9,
    discount: 69.9,
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097197/quicktrads/gbl3mxotomalqufh4nke.png",
    name: "High fashion couture wear for quicktradser women ",
    price: 62.9,
    discount: 69.9,
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097317/quicktrads/betdxneu2kvtldtydaj7.png",
    name: "Quicktrads high fashion jiggy beach wear for men ",
    price: 62.9,
    discount: 69.9,
  },
];

// interface ItemsProps {
//   showFilter: boolean;
// }
// { showFilter }: ItemsProps

export const Items = () => {
  const Router = useRouter();

  const handleRowClick = (index: string) => {
    // Navigate to the dynamic route because table does not accept <LINK>
    Router.push(`products/${index}`);
  };
  return (
    <div className="flex  flex-col justify-center mt-2">
      <div className="px-6 lg:px-2 py-8 bg-background relative">
        <div
          // onClick={() => setShowFilter(!showFilter)}
          className="flex gap-2 font-medium text-base items-center cursor-pointer justify-end "
        >
          <i>{filterIcon()}</i>
          {/* <p>{showFilter ? "Hide filter" : "Show filter"}</p> */}
          <>Filter</>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 ${
          false ? "md:grid-cols-3" : "md:grid-cols-4"
        } flex-row flex-wrap gap-6 w-full justify-between overflow-y-auto px-6 lg:px-2`}
      >
        {content.map((item) => {
          return (
            <div
              onClick={() => handleRowClick(item.id.toString())}
              key={item.id}
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
    </div>
  );
};
