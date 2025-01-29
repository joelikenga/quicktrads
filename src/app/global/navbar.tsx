"use client";
import Link from "next/link";
import {
  arrowDown,
  cart,
  category,
  checked,
  closeBtn,
  humbuger,
  instagram,
  logo,
  map,
  nigeriaIcon,
  redCategoryicon,
  search,
  unChecked,
  USAIcon,
  whatsapp,
} from "./svg";
import { Lora } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLogin } from "../utils/hooks/useLogin";
import { ProfileAvatar } from "./profileGenerator";
import { useLogout } from "./logout";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Navbar = () => {
  const [searchOptions, setSearchOptions] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currencyOptions, setCurrencyOptions] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<boolean>(false);
  const [mobileDropdown, setMobileDropdown] = useState<boolean>(false);
  const [profileOption, setProfileOption] = useState<boolean>(false);

  // ----- for mobile -----
  const [collectionDropdown, setCollectionDropdown] = useState<boolean>(false);
  const [menDropdown, setMenDropdown] = useState<boolean>(false);
  const [womenDropdown, setWomenDropdown] = useState<boolean>(false);

  const logout = useLogout();

  const handleCollectionDropdown = () => {
    setCollectionDropdown(!collectionDropdown);
    setMenDropdown(false);
    setWomenDropdown(false);
  };

  const handleMenDropdown = () => {
    setCollectionDropdown(false);
    setMenDropdown(!menDropdown);
    setWomenDropdown(false);
  };

  const handleWomenDropdown = () => {
    setCollectionDropdown(false);
    setMenDropdown(false);
    setWomenDropdown(!womenDropdown);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      setSearchOptions(true);
      setCurrencyOptions(false);
    } else {
      setSearchOptions(false);
    }
  };

  const profileWrapperRef = useRef<HTMLDivElement>(null);
  const currencyWrapperRef = useRef<HTMLDivElement>(null);
  const categoryWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileWrapperRef.current &&
        !profileWrapperRef.current.contains(event.target as Node)
      ) {
        setProfileOption(false);
      }
      if (
        currencyWrapperRef.current &&
        !currencyWrapperRef.current.contains(event.target as Node)
      ) {
        setCurrencyOptions(false);
      }
      if (
        categoryWrapperRef.current &&
        !categoryWrapperRef.current.contains(event.target as Node)
      ) {
        setCategoryOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCurrencyOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrencyOptions(!currencyOptions);
  };

  const handleProfileOption = (event: React.MouseEvent) => {
    event.stopPropagation();
    setProfileOption(!profileOption);
  };

  const handleCategoryOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCategoryOptions(!categoryOptions);
  };

  const handleMobileCategoryOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCategoryOptions(!categoryOptions);
    if (currencyOptions) setCurrencyOptions(false);
    if (profileOption) setProfileOption(false);
  };

  const handleMobileCurrencyOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrencyOptions(!currencyOptions);
    if (categoryOptions) setCategoryOptions(false);
    if (profileOption) setProfileOption(false);
  };

  const handleMobileProfileOption = (event: React.MouseEvent) => {
    event.stopPropagation();
    setProfileOption(!profileOption);
    if (categoryOptions) setCategoryOptions(false);
    if (currencyOptions) setCurrencyOptions(false);
  };

  const handleMouseLeaveCategory = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCategoryOptions(false);
  };

  const { isLoggedIn, userDetails } = useLogin();

  return (
    <div className="w-full z-50 ">
      {/* ----- Quick contact ----- */}
      <div className="hidden lg:flex w-full px-20  items-center bg-fill h-12">
        <div className="w-full max-w-7xl mx-auto flex justify-start items-center gap-6">
          {/* ----- map ----- */}
          <div className="flex justify-center items-center gap-1 font-medium">
            {map()}
            <p className="text-sm text-text_strong">
              27 fola osibo, Lagos, Nigeria
            </p>
          </div>

          {/* ----- whatsapp ----- */}
          <div className="flex justify-center items-center gap-1 font-medium">
            {whatsapp()}
            <p className="text-sm text-text_strong">+234 704 451 4049</p>
          </div>

          {/* ----- instagram ----- */}
          <div className="flex justify-center items-center gap-1 font-medium">
            {instagram()}
            <p className="text-sm text-text_strong">Quicktrads</p>
          </div>
        </div>
      </div>
      {/* ----- Navbar Desktop----- */}
      <nav className="hidden lg:flex w-full px-20 bg-background h-[72px]   items-center border-b border">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          {/* ----- search and currency ----- */}
          <div className="flex gap-6 items-center">
            {/* ----- search ----- */}
            <div className="relative">
              <div className="flex items-center gap-2 font-medium text-sm border-stroke_strong px-4 rounded-full border max-w-[220px] w-full  text-text_strong">
                {search()}
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none h-8 w-full"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
              {/* ----- search dropdown ----- */}
              {searchOptions && (
                <div className="flex flex-col gap-1 py-2 absolute top-10 left-0 bg-background w-full h-fit z-10 rounded-lg overflow-hidden shadow-[0px_8px_24px_0px_#14141414] text-text_strong font-medium text-sm">
                  <p className="h-10 w-full px-6 hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer">
                    Adire royal
                  </p>
                  <p className="h-10 w-full px-6 hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer">
                    Adire royal golden
                  </p>
                  <p className="h-10 w-full px-6 hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer">
                    Adire royal purple
                  </p>
                </div>
              )}
            </div>

            {/* ----- currency ----- */}
            <div
              ref={currencyWrapperRef}
              className="relative flex justify-center"
            >
              <div
                onClick={handleCurrencyOptions}
                className={`flex items-center gap-2 font-medium text-sm w-full cursor-pointer ${
                  currencyOptions && "border-b-2"
                } border-text_strong py-1`}
              >
                {nigeriaIcon()}
                <p className="">NGN ₦</p>
                <i
                  className={`${currencyOptions && "rotate-180"} duration-300`}
                >
                  {arrowDown()}
                </i>
              </div>
              {/* ----- currency dropdown ----- */}
              {currencyOptions && (
                <div
                  onMouseLeave={handleCurrencyOptions}
                  className="flex flex-col gap-4 p-4 absolute top-10 left-0 bg-background w-[240px] h-fit z-10 rounded-lg overflow-hidden shadow-[0px_8px_24px_0px_#14141414] text-text_strong font-medium text-sm"
                >
                  <div className="rounded-lg h-10 w-full px-4 items-center flex justify-between cursor-pointer border border-stroke_strong">
                    <div className="gap-2 flex">
                      {nigeriaIcon()}
                      <p className="">NGN ₦</p>
                    </div>
                    {checked()}
                  </div>
                  <div className="rounded-lg h-10 w-full px-4 items-center flex justify-between cursor-pointer border border-stroke_weak">
                    <div className="gap-2 flex">
                      {USAIcon()}
                      <p className="">USA $</p>
                    </div>
                    {unChecked()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ----- logo ----- */}
          <Link href={``}>{logo()}</Link>

          {/*----- category cart login and signup ----- */}
          <div className="flex gap-6 items-center">
            {/* ----- category ----- */}
            <div ref={categoryWrapperRef}>
              <div
                onClick={handleCategoryOptions}
                className={`flex items-center gap-2 font-medium text-sm w-full cursor-pointer ${
                  categoryOptions && " border-b-2"
                } border-text_strong py-1`}
              >
                {category()}
                <p className="">Category</p>
              </div>
            </div>

            {/* ----- cart ----- */}
            <Link
              href={`/cart`}
              className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b- border-text_strong py-1"
            >
              {cart()}
              <p className="">Cart</p>
            </Link>

            {/* ----- profile----- */}
            {isLoggedIn && userDetails ? (
              <div
                ref={profileWrapperRef}
                className="border-l pl-6 relative flex justify-center  py-1"
              >
                <div
                  onClick={handleProfileOption}
                  className={`flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b-2 py-1 text-nowrap ${
                    profileOption ? "border-text_strong" : "border-transparent"
                  }`}
                >
                  {userDetails.data.avatar === "" ||
                  userDetails.data.avatar === null ? (
                    <ProfileAvatar
                      name={userDetails?.data?.fullName || "User"}
                      size="small"
                    />
                  ) : (
                    <Image
                      className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]  rounded-full"
                      src={userDetails.data.avatar}
                      priority
                      width={25}
                      height={25}
                      alt=""
                    />
                  )}
                  <p className="">{userDetails?.data?.fullName}</p>
                  <i
                    className={`${profileOption && "rotate-180"} duration-300`}
                  >
                    {arrowDown()}
                  </i>
                </div>
                {/* ----- profile dropdown ----- */}
                {profileOption && (
                  <div className="min-w-[180px] flex flex-col gap-1 py-2 absolute top-14 right-0 bg-background  h-fit z-10 rounded-lg overflow-hidden shadow-[0px_8px_24px_0px_#14141414] text-text_weak font-medium text-sm">
                    <Link
                      href={``}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Profile
                    </Link>{" "}
                    <Link
                      href={``}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Orders
                    </Link>{" "}
                    <Link
                      href={``}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Address
                    </Link>{" "}
                    <Link
                      href={``}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Password
                    </Link>{" "}
                    <div
                      onClick={logout}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Logout
                    </div>{" "}
                  </div>
                )}
              </div>
            ) : (
              // login and signup
              <div className="border-l pl-6 flex gap-6 items-center">
                {/* ----- Login ----- */}
                <Link
                  href={`/login`}
                  className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b- border-text_strong py-1"
                >
                  <p className="">Login</p>
                </Link>

                {/* ----- Signup ----- */}
                <Link
                  href={`/sign_up`}
                  className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border rounded-full h-8 px-4 border-stroke_weak py-1"
                >
                  <p className="">Signup</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ----- Navbar Mobile----- */}
      <nav className="flex justify-between items-center lg:hidden w-full px-8 py-4  bg-background h-[72px] relative">
        <Link href={`/cart`}>{cart()}</Link>
        <Link href={``}>{logo()}</Link>
        <div onClick={() => setMobileDropdown(!mobileDropdown)} className="">
          {humbuger()}
        </div>

        {/* ----- mobile dropdown ----- */}
        {mobileDropdown && (
          <div className="flex flex-col justify-between items-start z-50">
            <div className="bg-background w-full h-full fixed top-0 left-0 px-6 pt-4 overflow-y-auto">
              {/* ----- search and close btn ----- */}
              <div className="flex justify-between items-center mb-12 ">
                {/* ----- search ----- */}
                <div className="flex items-center gap-2 font-medium text-sm  bg-fill border-stroke_strong px-4 rounded-full border w-[260px w-full   text-text_strong">
                  {search()}
                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none h-8 w-full bg-inherit"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </div>
                {/* ----- colse btn -----  */}
                <i
                  className="p-3"
                  onClick={() => setMobileDropdown(!mobileDropdown)}
                >
                  {closeBtn()}
                </i>
              </div>

              {/* ----- currency znd category ------ */}
              <div ref={currencyWrapperRef} className="gap-6 flex flex-col ">
                {/* ----- currency ----- */}
                <div className="w-full gap-6 flex flex-col  border-b pb-6">
                  <div className=" h-[46px flex justify-between items-start  ">
                    <div
                      onClick={handleMobileCurrencyOptions}
                      className={`flex items-center gap-2 font-medium text-sm w-full cursor-pointer  border-text_strong py-1`}
                    >
                      {nigeriaIcon()}
                      <p className="">NGN ₦</p>
                    </div>
                    {/*  */}
                    <i
                      className={`${
                        currencyOptions && "rotate-180"
                      } duration-300`}
                    >
                      {arrowDown()}
                    </i>
                  </div>
                  {/* ----- currency dropdown ----- */}

                  {currencyOptions && (
                    <div className="flex flex-row gap-4 ">
                      <div className="rounded-lg h-10 w-full px-4 items-center flex justify-between cursor-pointer border border-stroke_strong">
                        <div className="gap-2 flex">
                          {nigeriaIcon()}
                          <p className="">NGN ₦</p>
                        </div>
                        {checked()}
                      </div>
                      <div className="rounded-lg h-10 w-full px-4 items-center flex justify-between cursor-pointer border border-stroke_weak">
                        <div className="gap-2 flex">
                          {USAIcon()}
                          <p className="">USA $</p>
                        </div>
                        {unChecked()}
                      </div>
                    </div>
                  )}
                </div>
                {/* ------------- category -------- */}
                <div
                  ref={categoryWrapperRef}
                  className="w-full gap-6 flex flex-col  border-b pb-6"
                >
                  <div className=" h-[46px flex justify-between items-start  ">
                    <div
                      onClick={handleMobileCategoryOptions}
                      className={`flex items-center gap-2 font-medium text-base w-full cursor-pointer  border-text_strong py-1`}
                    >
                      {category()}
                      <p className="">Category</p>
                    </div>
                    {/*  */}
                    <i
                      className={`${
                        categoryOptions && "rotate-180"
                      } duration-300`}
                    >
                      {arrowDown()}
                    </i>
                  </div>

                  {/* ----- dropdown  ----- */}

                  {categoryOptions && (
                    <>
                      {
                        // collections dropdown
                        <div className="">
                          {/* ----- Collections ----- */}
                          <div
                            onClick={handleCollectionDropdown}
                            className=" h-[46px flex justify-between items-start  "
                          >
                            <div
                              className={`flex items-center gap-2 font-medium text-base w-full cursor-pointer  border-text_strong py-1`}
                            >
                              <p className="">Collections</p>
                            </div>
                            {/*  */}
                            <i
                              className={`${
                                collectionDropdown && "rotate-180"
                              } duration-300`}
                            >
                              {arrowDown()}
                            </i>
                          </div>
                          {/* ----- collections dropdown ----- */}
                          {collectionDropdown && (
                            <div className="mt-6 flex flex-col gap-6 font-normal text-base text-text_weak pl-2">
                              <Link href={``} className="">
                                Features
                              </Link>
                              <Link href={``} className="">
                                Trending
                              </Link>
                              <Link href={``} className="">
                                Latest wear
                              </Link>
                            </div>
                          )}
                        </div>
                      }

                      {
                        // Men dropdown
                        <div className="">
                          {/* ----- Men ----- */}
                          <div
                            onClick={handleMenDropdown}
                            className=" h-[46px flex justify-between items-start  "
                          >
                            <div
                              className={`flex items-center gap-2 font-medium text-base w-full cursor-pointer  border-text_strong py-1`}
                            >
                              <p className="">Men</p>
                            </div>
                            {/*  */}
                            <i
                              className={`${
                                menDropdown && "rotate-180"
                              } duration-300`}
                            >
                              {arrowDown()}
                            </i>
                          </div>
                          {/* ----- Men dropdown ----- */}
                          {menDropdown && (
                            <div className="mt-6 flex flex-col gap-6 font-normal text-base text-text_weak pl-2">
                              <Link href={``} className="">
                                Features
                              </Link>
                              <Link href={``} className="">
                                Trending
                              </Link>
                              <Link href={``} className="">
                                Latest wear
                              </Link>
                            </div>
                          )}
                        </div>
                      }

                      {
                        // Women dropdown
                        <div className="">
                          {/* ----- Women ----- */}
                          <div
                            onClick={handleWomenDropdown}
                            className=" h-[46px flex justify-between items-start  "
                          >
                            <div
                              className={`flex items-center gap-2 font-medium text-base w-full cursor-pointer  border-text_strong py-1`}
                            >
                              <p className="">Women</p>
                            </div>
                            {/*  */}
                            <i
                              className={`${
                                womenDropdown && "rotate-180"
                              } duration-300`}
                            >
                              {arrowDown()}
                            </i>
                          </div>
                          {/* ----- Women dropdown ----- */}
                          {womenDropdown && (
                            <div className="mt-6 flex flex-col gap-6 font-normal text-base text-text_weak pl-2">
                              <Link href={``} className="">
                                Features
                              </Link>
                              <Link href={``} className="">
                                Trending
                              </Link>
                              <Link href={``} className="">
                                Latest wear
                              </Link>
                            </div>
                          )}
                        </div>
                      }
                    </>
                  )}
                </div>
                {/* -----profile----- */}
                <div
                  ref={profileWrapperRef}
                  className="w-full gap-6 flex flex-col  border-b pb-6"
                >
                  <div className=" h-[46px flex justify-between items-start  ">
                    <div
                      onClick={handleMobileProfileOption}
                      className={`flex items-center gap-2 font-medium text-sm w-full cursor-pointer  border-text_strong py-1 text-nowrap`}
                    >
                      <ProfileAvatar
                        name={userDetails?.data?.fullName || "User"}
                        size="large"
                      />
                      <p className="">{userDetails?.data.fullName}</p>
                    </div>
                    {/*  */}
                    <i
                      className={`${
                        profileOption && "rotate-180"
                      } duration-300`}
                    >
                      {arrowDown()}
                    </i>
                  </div>
                  {/* ----- profile dropdown ----- */}

                  {profileOption && (
                    <div className="flex flex-col gap-4 ">
                      <Link
                        href={``}
                        className="h-10 w-full px-6 text-text_strong items-center flex justify-start cursor-pointer"
                      >
                        Profile
                      </Link>{" "}
                      <Link
                        href={``}
                        className="h-10 w-full px-6 text-text_strong items-center flex justify-start cursor-pointer"
                      >
                        Orders
                      </Link>{" "}
                      <Link
                        href={``}
                        className="h-10 w-full px-6 text-text_strong items-center flex justify-start cursor-pointer"
                      >
                        Address
                      </Link>{" "}
                      <Link
                        href={``}
                        className="h-10 w-full px-6 text-text_strong items-center flex justify-start cursor-pointer"
                      >
                        Password
                      </Link>{" "}
                      <div
                        onClick={logout}
                        className="h-10 w-full px-6 text-text_strong items-center flex justify-start cursor-pointer"
                      >
                        Logout
                      </div>{" "}
                    </div>
                  )}
                </div>
              </div>

              {/* ----- quick contact ----- */}
            </div>

            {/*------------ socials ----------*/}
            <div className="w-full bg-[red] flex justify-center lg:justify-start flex-wrap lg:text-nowrap  items-center gap-2 md:gap-6">
              {/* ----- map ----- */}
              <div className="flex justify-center items-center gap-1 font-medium">
                <i>{map()}</i>
                <p className="text-sm text-text_strong">
                  27 fola osibo, Lagos, Nigeria
                </p>
              </div>

              {/* ----- whatsapp ----- */}
              <div className="flex justify-center items-center gap-1 font-medium">
                <i>{whatsapp()}</i>
                <p className="text-sm text-text_strong">+234 704 451 4049</p>
              </div>

              {/* ----- instagram ----- */}
              <div className="flex justify-center items-center gap-1 font-medium">
                <i>{instagram()}</i>
                <p className="text-sm text-text_strong">Quicktrads</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ----- category drop down ----- */}
      {categoryOptions && (
        <div
          onMouseLeave={handleMouseLeaveCategory}
          className="bg-text_strong bg-opacity-80 h-full w-full fixed  hidden lg:flex"
        >
          {/* ----- category content ----- */}
          <div className="bg-background  w-full max-h-[294px] h-full flex items-start justify-between py-8 px-[120px]">
            {/* ----- card section ----- */}

            <div className="w-1/2 flex items-center">
              {/* ----- card ----- */}
              <div className="flex flex-col gap-4 items-start bg-fill rounded-lg text-text_strong max-h-[204px] h-full max-w-[416px] w-full p-6">
                {redCategoryicon()}
                <div className="gap-2 flex flex-col items-start">
                  <p
                    className={`${lora.variable} font-medium text-[22px]`}
                  >{`Shop quick with quicktads category`}</p>
                  <p
                    className={`font-normal text-base`}
                  >{`Discover the latest trends and start building your dream wardrobe today!`}</p>
                </div>
              </div>
            </div>

            {/* ----- category lists ----- */}

            <div className="w-1/2 items-start flex justify-between gap-8">
              {/* ----- collection ----- */}
              <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                <p className="text-base font-medium">Collections</p>
                <Link href={``} className="text-lg font-normal">
                  Features
                </Link>
                <Link href={``} className="text-lg font-normal">
                  Trending
                </Link>
                <Link href={``} className="text-lg font-normal">
                  Latest wear
                </Link>
              </div>

              {/* ----- men ----- */}
              <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                <p className="text-base font-medium">Men</p>
                <Link href={``} className="text-lg font-normal">
                  Tops
                </Link>
                <Link href={``} className="text-lg font-normal">
                  Trousers
                </Link>
                <Link href={``} className="text-lg font-normal">
                  Two-piece
                </Link>
              </div>

              {/* ----- Women ----- */}
              <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                <p className="text-base font-medium">Women</p>
                <Link href={``} className="text-lg font-normal">
                  Buba
                </Link>
                <Link href={``} className="text-lg font-normal">
                  Tops
                </Link>
                <Link href={``} className="text-lg font-normal">
                  Trousers
                </Link>
                <Link href={``} className="text-lg font-normal">
                  Two-piece
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
