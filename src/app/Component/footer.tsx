"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logo, } from "../global/svg";
import { Lora } from "next/font/google";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const pathname = usePathname();

  return (
    <div className="w-full sm:mt-[102px] mb-12 pb-4 md:pb-0">
      {/* ----- instagram connect ----- */}
      {pathname !== "/" ? null : (
        <div className="w-full max-w-[725px] mx-auto text-center items-center flex flex-col gap-8 mb-[77px]">
          <div className="flex flex-col gap-4 mx-auto w-full items-center">
            <p
              className={`${lora.className} font-normal text-[22px] md:text-[35px] lg:text-[48px] text-text_strong max-w-[216px ] md: max-w-[500px] lg:max-w-full text-center`}
            >
              Follow our journey on instagram
            </p>
            <p className="text-text_weak text-base font-normal max-w-[274px] md:max-w-[500px] w-full">
              Be part of our journey as share trendy and latest African garment
            </p>
          </div>
          {/* ----- insta button ----- */}
          <Link href={``} className="h-fit w-fit">
            <button className="bg-background rounded-full flex gap-2 h-10 px-6 text-text_strong text-base font-medium border items-center border-stroke_weak">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="6"
                    fill="url(#paint0_radial_87_7153)"
                  ></rect>{" "}
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="6"
                    fill="url(#paint1_radial_87_7153)"
                  ></rect>{" "}
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="6"
                    fill="url(#paint2_radial_87_7153)"
                  ></rect>{" "}
                  <path
                    d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                    fill="white"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                    fill="white"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                    fill="white"
                  ></path>{" "}
                  <defs>
                    {" "}
                    <radialGradient
                      id="paint0_radial_87_7153"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
                    >
                      {" "}
                      <stop stopColor="#B13589"></stop>{" "}
                      <stop offset="0.79309" stopColor="#C62F94"></stop>{" "}
                      <stop offset="1" stopColor="#8A3AC8"></stop>{" "}
                    </radialGradient>{" "}
                    <radialGradient
                      id="paint1_radial_87_7153"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
                    >
                      {" "}
                      <stop stopColor="#E0E8B7"></stop>{" "}
                      <stop offset="0.444662" stopColor="#FB8A2E"></stop>{" "}
                      <stop offset="0.71474" stopColor="#E2425C"></stop>{" "}
                      <stop
                        offset="1"
                        stopColor="#E2425C"
                        stopOpacity="0"
                      ></stop>{" "}
                    </radialGradient>{" "}
                    <radialGradient
                      id="paint2_radial_87_7153"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
                    >
                      {" "}
                      <stop offset="0.156701" stopColor="#406ADC"></stop>{" "}
                      <stop offset="0.467799" stopColor="#6A45BE"></stop>{" "}
                      <stop
                        offset="1"
                        stopColor="#6A45BE"
                        stopOpacity="0"
                      ></stop>{" "}
                    </radialGradient>{" "}
                  </defs>{" "}
                </g>
              </svg>
              <p className="">Follow us</p>
            </button>
          </Link>
        </div>
      )}

      {/* ----- logo and link ----- */}
      <div className="w-full mt-12 px-6 md:px-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 ">
          <div className="flex flex-col gap-12 items-center justify-between">
            <i className="flex justify-center ">
              {/* ----- logo ----- */}
              {logo()}
            </i>
            <div className="flex flex-col sm:flex-row justify-center gap-6  font-medium">
              <div className="flex justify-between gap-4">
                <Link href={`/about`}>
                  <p className="text-text_strong text-base">About us</p>
                </Link>
                <Link href={`/contact`}>
                  <p className="text-text_strong text-base">Contact us</p>
                </Link>

                <Link href={`/sizing-guide`}>
                  <p className="text-text_strong text-base">Sizing guide</p>
                </Link>
              </div>

              <div className="flex justify-between gap-4">
                <Link href={`/shopping_&_delivery`}>
                  <p className="text-text_strong text-base">
                    Shipping & delivery
                  </p>
                </Link>

                <Link href={`/legals`}>
                  <p className="text-text_strong text-base">Legals</p>
                </Link>

                <Link href={`/faqs`}>
                  <p className="text-text_strong text-base">FAQs</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- socials and reserved rights ----- */}
      <div className="w-full mt-[88px] px-6 md:px-20 flex items-center bg-background min-h-[48px] py-4 md:py-0">
        <div className="w-full max-w-7xl mx-auto justify-between flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center gap-y-12 gap-6">
          {/* socials */}
          <div className="w-full flex justify-center lg:justify-start flex-wrap lg:text-nowrap items-center gap-4 md:gap-6">
            {/* ----- map ----- */}
            <div className="flex justify-center items-center gap-1 font-medium">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z"
                    fill="white"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 12.8116L23.9999 12.8541C23.9998 12.872 23.9996 12.8899 23.9994 12.9078C23.9998 12.9287 24 12.9498 24 12.971C24 16.3073 21.4007 19.2604 19.6614 21.2367C19.1567 21.8101 18.7244 22.3013 18.449 22.6957C17.4694 24.0986 16.9524 25.6184 16.8163 26.2029C16.8163 26.6431 16.4509 27 16 27C15.5491 27 15.1837 26.6431 15.1837 26.2029C15.0476 25.6184 14.5306 24.0986 13.551 22.6957C13.2756 22.3013 12.8433 21.8101 12.3386 21.2367C10.5993 19.2604 8 16.3073 8 12.971C8 12.9498 8.0002 12.9287 8.0006 12.9078C8.0002 12.8758 8 12.8437 8 12.8116C8 8.49736 11.5817 5 16 5C20.4183 5 24 8.49736 24 12.8116ZM16 15.6812C17.7132 15.6812 19.102 14.325 19.102 12.6522C19.102 10.9793 17.7132 9.62319 16 9.62319C14.2868 9.62319 12.898 10.9793 12.898 12.6522C12.898 14.325 14.2868 15.6812 16 15.6812Z"
                    fill="#34A851"
                  ></path>{" "}
                  <path
                    d="M23.1054 9.21856C22.1258 7.37546 20.4161 5.96177 18.3504 5.34277L13.7559 10.5615C14.3208 9.98352 15.1174 9.62346 16.0002 9.62346C17.7134 9.62346 19.1022 10.9796 19.1022 12.6524C19.1022 13.3349 18.8711 13.9646 18.4811 14.4711L23.1054 9.21856Z"
                    fill="#4285F5"
                  ></path>{" "}
                  <path
                    d="M12.4311 21.3425C12.4004 21.3076 12.3695 21.2725 12.3383 21.2371C11.1918 19.9344 9.67162 18.2073 8.76855 16.2257L13.5439 10.8018C13.1387 11.3136 12.8976 11.9556 12.8976 12.6526C12.8976 14.3254 14.2865 15.6816 15.9997 15.6816C16.8675 15.6816 17.6521 15.3336 18.2151 14.7727L12.4311 21.3425Z"
                    fill="#F9BB0E"
                  ></path>{" "}
                  <path
                    d="M9.89288 7.76562C8.71207 9.12685 8 10.8881 8 12.8117C8 12.8438 8.0002 12.8759 8.0006 12.9079C8.0002 12.9288 8 12.9499 8 12.9711C8 14.1082 8.30196 15.2009 8.76889 16.2254L13.5362 10.8106L9.89288 7.76562Z"
                    fill="#E74335"
                  ></path>{" "}
                  <path
                    d="M18.3499 5.34254C17.6068 5.11988 16.8176 5 15.9997 5C13.5514 5 11.36 6.07387 9.89258 7.76553L13.5359 10.8105L13.5438 10.8015C13.6101 10.7178 13.6807 10.6375 13.7554 10.5611L18.3499 5.34254Z"
                    fill="#1A73E6"
                  ></path>{" "}
                </g>
              </svg>
              <p className="text-sm text-text_strong">
                27 fola osibo, Lagos, Nigeria
              </p>
            </div>

            {/* ----- whatsapp ----- */}
            <div className="flex justify-center items-center gap-1 font-medium">
              <svg
                width="24px"
                height="24px"
                viewBox="-2.73 0 1225.016 1225.016"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#E0E0E0"
                    d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z"
                  ></path>
                  <linearGradient
                    id="a"
                    gradientUnits="userSpaceOnUse"
                    x1="609.77"
                    y1="1190.114"
                    x2="609.77"
                    y2="21.084"
                  >
                    <stop offset="0" stopColor="#20b038"></stop>
                    <stop offset="1" stopColor="#60d66a"></stop>
                  </linearGradient>
                  <path
                    fill="url(#a)"
                    d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z"
                  ></path>
                  <image
                    overflow="visible"
                    opacity=".08"
                    width="682"
                    height="639"
                    xlinkHref="FCC0802E2AF8A915.png"
                    transform="translate(270.984 291.372)"
                  ></image>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="#FFF"
                    d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z"
                  ></path>
                </g>
              </svg>
              <p className="text-sm text-text_strong">+234 704 451 4049</p>
            </div>

            {/* ----- instagram ----- */}
            <div className="flex justify-center items-center gap-1 font-medium">
              {/* <i className="inline-block w-5 h-5">{instagram()}</i> */}
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="6"
                    fill="url(#paint0_radial_87_7153)"
                  ></rect>{" "}
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="6"
                    fill="url(#paint1_radial_87_7153)"
                  ></rect>{" "}
                  <rect
                    x="2"
                    y="2"
                    width="28"
                    height="28"
                    rx="6"
                    fill="url(#paint2_radial_87_7153)"
                  ></rect>{" "}
                  <path
                    d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                    fill="white"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                    fill="white"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                    fill="white"
                  ></path>{" "}
                  <defs>
                    {" "}
                    <radialGradient
                      id="paint0_radial_87_7153"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
                    >
                      {" "}
                      <stop stopColor="#B13589"></stop>{" "}
                      <stop offset="0.79309" stopColor="#C62F94"></stop>{" "}
                      <stop offset="1" stopColor="#8A3AC8"></stop>{" "}
                    </radialGradient>{" "}
                    <radialGradient
                      id="paint1_radial_87_7153"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
                    >
                      {" "}
                      <stop stopColor="#E0E8B7"></stop>{" "}
                      <stop offset="0.444662" stopColor="#FB8A2E"></stop>{" "}
                      <stop offset="0.71474" stopColor="#E2425C"></stop>{" "}
                      <stop
                        offset="1"
                        stopColor="#E2425C"
                        stopOpacity="0"
                      ></stop>{" "}
                    </radialGradient>{" "}
                    <radialGradient
                      id="paint2_radial_87_7153"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
                    >
                      {" "}
                      <stop offset="0.156701" stopColor="#406ADC"></stop>{" "}
                      <stop offset="0.467799" stopColor="#6A45BE"></stop>{" "}
                      <stop
                        offset="1"
                        stopColor="#6A45BE"
                        stopOpacity="0"
                      ></stop>{" "}
                    </radialGradient>{" "}
                  </defs>{" "}
                </g>
              </svg>
              <p className="text-sm text-text_strong">Quicktrads</p>
            </div>
          </div>

          {/* reserved rights */}
          <div className="text-nowrap">
            <p className="text-text_strong text-sm font-medium">
              {`© ${currentYear} Quicktrads. All rights reserved`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
