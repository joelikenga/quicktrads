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
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737097911/quicktrads/wzrtdhey3djfhopwuciq.png",
    name: "Tops",
    price: 62.9,
    discount: 69.9,
    link: "",
  },
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737098056/quicktrads/nkejpkehave5elvjq6ty.png",
    name: "Trousers",
    price: 62.9,
    discount: 69.9,
    link: "",
  },
  {
    image:
      "https://res.cloudinary.com/dtjf6sic8/image/upload/v1737098303/quicktrads/hsebtpkiqjw4meu2ga5m.png",
    name: "Two pieces",
    price: 62.9,
    discount: 69.9,
    link: "",
  },
];

export const ExploreMore = () => {
  return (
    <div className="w-full px-6 md:px-10  lg:px-20 flex flex-col gap-4 mt-12 z-0">
      <div className="w-full max-w-7xl mx-auto">
        {/* ----- title and view all ----- */}
        <div className="flex justify-start items-center font-normal text-text_strong">
          <p className={`${lora.className} text-[22px]`}>Explore More</p>
        </div>

        {/* ----- item grids ----- */}
        <div className="flex overflow-x-scroll hidden_scroll gap-6">
          {/*----- mapped items ----- */}
          {content.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="flex flex-col items-center gap-4 h-full w-full min-w-[302px] md:min-w-[410.67px] max-h-[462px h-fit overflow-hidden  
                "
              >
                <div
                 className="w-full h-[400px] border relative flex items-center "
                 >
                  <Image
                    className="h-[400px] w-full object-cover bg-center"
                    src={item.image}
                    priority
                    width={302}
                    height={400}
                    alt={item.name}
                  />
                  <div
                    style={{
                      background:
                        "linear-gradient(0deg, #141414 0%, rgba(20, 20, 20, 0) 100%), linear-gradient(0deg, #141414 0%, rgba(20, 20, 20, 0) 100%)",
                    }}
                    className="flex flex-col justify-end text-start w-full items-start text-text_strong text-[22px]  font-normal absolute bottom-0 left-0  h-[176px] p-4"
                  >
                    <p className={`text-background ${lora.className}`}>
                      {item.name}
                    </p>
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
