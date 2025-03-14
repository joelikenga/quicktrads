"use client";
import Link from "next/link";
import {
  arrowDown,
  cart,
  cartActiveIcon,
  category,
  checked,
  closeBtn,
  humbuger,
  instagram,
  logo,
  map,
  nigeriaIcon,
  redCategoryicon,
  redInfo,
  search,
  unChecked,
  USAIcon,
  whatsapp,
} from "./svg";
import { Lora } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLogin } from "../../utils/hooks/useLogin";
import { ProfileAvatar } from "./profileGenerator";
import { useLogout } from "./logout";
import { useRouter } from "next/navigation";
// import { useCart } from "../../../utils/hooks/useCart";
import { useCart } from "@/context/CartContext";
import { loggedInUser } from "../../utils/api/user/auth";
import { errorToast } from "../../utils/toast/toast";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface UserResponse {
  data: {
    avatar: string;
    country: string;
    createdAt: string; // ISO Date string
    dob: string; // ISO Date string
    email: string;
    emailVerified: boolean;
    fullName: string;
    gender: string;
    id: string; // UUID
    lastLoggedInAt: string; // ISO Date string
    lastOrderedAt: string | null; // ISO Date string or null
    password: string;
    phoneNumber: string;
    role: string; // Add other roles if needed
    shippingDetails: string | null;
    state: string;
    status: string; // Add other statuses if needed
    totalOrders: number | null;
    updatedAt: string; // ISO Date string
  };
}

export const Navbar = () => {
  const [searchOptions, setSearchOptions] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currencyOptions, setCurrencyOptions] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<boolean>(false);
  const [mobileDropdown, setMobileDropdown] = useState<boolean>(false);
  const [profileOption, setProfileOption] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserResponse | null>(null);

  // ----- for mobile -----
  const [collectionDropdown, setCollectionDropdown] = useState<boolean>(false);
  const [menDropdown, setMenDropdown] = useState<boolean>(false);
  const [womenDropdown, setWomenDropdown] = useState<boolean>(false);

  const logout = useLogout();

  const router = useRouter();
  const handleNavigation = (item: string, event: React.MouseEvent) => {
    event.stopPropagation();

    localStorage.setItem("category", item); // Save item to localStorage

    if (window.location.pathname === "/categories") {
      // If already on the /categories page, just set the localStorage
      window.location.reload();
    } else {
      // Navigate to the /categories page
      router.push("/categories");
    }
  };

  const fetchUserData = async () => {
    try {
      const res = (await loggedInUser()) as any;
      setUserDetails(res);
    } catch (error) {
      errorToast(error);
      setUserDetails(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const { isLoggedIn,  hasAvatar, } = useLogin("user");

  // console.log("isLogged", isLoggedIn);
  // console.log("hasAvatar", hasAvatar);
  const { getCartCount } = useCart();

  return (
    <div className="w-full left-0 top-0 fixed z-50  ">
      {/* ----- logout modal ----- */}
      {logoutModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[60] flex justify-start flex-col pt-[120px] md:pt-0 md:justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                // onClick={() => setDeleteItem(false)}
              >
                {redInfo()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Are you sure you want to logout your account?`}
              </p>

              <p className="text-text_strong text-sm md:text-base font-normal">
                {`This action will logout your account. If you're not to logout, you can cancel to continue shopping`}
              </p>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={logout}
              >
                <p>Logout</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setLogoutModal(false)}
              >
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----- Quick contact ----- */}
      <div className="hidden lg:flex w-full px-10  items-center bg-fill h-12">
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
      <nav className="hidden lg:flex w-full px-10 bg-background h-[72px]   items-center border-b border">
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
                  // onMouseLeave={handleCurrencyOptions}
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
          <Link href={`/`}>{logo()}</Link>

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

              {/* ----- category drop down ----- */}
              {categoryOptions && (
                <div
                  // onMouseLeave={handleMouseLeaveCategory}
                  className="bg-text_strong bg-opacity-80 h-full w-full fixed left-0 top-[120px]  hidden lg:flex z-50"
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
                      {/* ----- Featured ----- */}
                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Featured
                        </p>
                        <div
                          onClick={(event) =>
                            handleNavigation("trending", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trending
                        </div>
                        <div
                          onClick={(event) =>
                            handleNavigation("latestWear", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Latest wear
                        </div>
                      </div>

                      {/* ----- Unisex ----- */}
                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Unisex
                        </p>
                        <div
                          onClick={(event) => handleNavigation("u-Tops", event)}
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Tops
                        </div>
                        <div
                          onClick={(event) =>
                            handleNavigation("u-Trousers", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trousers
                        </div>
                        <div
                          onClick={(event) =>
                            handleNavigation("u-TwoPiece", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Two-piece
                        </div>
                      </div>

                      {/* ----- men ----- */}
                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Men
                        </p>
                        <div
                          onClick={(event) => handleNavigation("m-Tops", event)}
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Tops
                        </div>
                        <div
                          onClick={(event) =>
                            handleNavigation("m-Trousers", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trousers
                        </div>
                        <div
                          onClick={(event) =>
                            handleNavigation("m-TwoPiece", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Two-piece
                        </div>
                      </div>

                      {/* ----- Women ----- */}
                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Women
                        </p>
                        <div
                          onClick={(event) => handleNavigation("w-Bubu", event)}
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Bubu
                        </div>
                        <div
                          onClick={(event) => handleNavigation("w-Tops", event)}
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Tops
                        </div>
                        <div
                          onClick={(event) =>
                            handleNavigation("w-Trouser", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trousers
                        </div>
                        <div
                          onClick={(event) =>
                            handleNavigation("w-TwoPiece", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Two-piece
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ----- cart ----- */}
            <Link
              href={`/cart`}
              className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b- border-text_strong py-1 relative"
            >
              {getCartCount() > 0 ? cartActiveIcon() : cart()}
              <p className="">Cart</p>
              {getCartCount() > 0 && (
                <span className="absolute -top-3 right-6 bg-error_1 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* ----- profile----- */}
            {isLoggedIn ? (
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
                  {hasAvatar === true ? (
                    <ProfileAvatar
                      name={userDetails?.data?.fullName || "User"}
                      size="small"
                    />
                  ) : (
                    <Image
                      className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]  rounded-full"
                      src={userDetails?.data?.avatar || ""}
                      priority
                      width={25}
                      height={25}
                      alt=""
                    />
                  )}
                  <p className="capitalize">{userDetails?.data?.fullName}</p>
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
                      href={`/profile`}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Profile
                    </Link>
                    <Link
                      href={`/orders`}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Orders
                    </Link>
                    <Link
                      href={`/address`}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Address
                    </Link>
                    <Link
                      href={`/password`}
                      className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                    >
                      Password
                    </Link>
                    <div
                      onClick={() => setLogoutModal(true)}
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
      <nav className="flex justify-between items-center lg:hidden w-full px-10 py-4  bg-background h-[72px] relative">
        <Link href={`/cart`}>
          {cart()}
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getCartCount()}
            </span>
          )}
        </Link>
        <Link href={`/`}>{logo()}</Link>
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
                      <p className="selection:bg-none">NGN ₦</p>
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
                          <p className="selection:bg-none">NGN ₦</p>
                        </div>
                        {checked()}
                      </div>
                      <div className="rounded-lg h-10 w-full px-4 items-center flex justify-between cursor-pointer border border-stroke_weak">
                        <div className="gap-2 flex">
                          {USAIcon()}
                          <p className="selection:bg-none">USA $</p>
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
                      <p className="selection:bg-none">Category</p>
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
                              <p className="selection:bg-none">Collections</p>
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
                              <Link href={``} className="selection:bg-none">
                                Features
                              </Link>
                              <Link href={``} className="selection:bg-none">
                                Trending
                              </Link>
                              <Link href={``} className="selection:bg-none">
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
                              <p className="selection:bg-none">Men</p>
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
                              <Link href={``} className="selection:bg-none">
                                Features
                              </Link>
                              <Link href={``} className="selection:bg-none">
                                Trending
                              </Link>
                              <Link href={``} className="selection:bg-none">
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
                              <Link href={``} className="selection:bg-none">
                                Features
                              </Link>
                              <Link href={``} className="selection:bg-none">
                                Trending
                              </Link>
                              <Link href={``} className="selection:bg-none">
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
                {isLoggedIn ? (
                  <div
                    ref={profileWrapperRef}
                    className="border-l pl-6 relative flex justify-center py-1"
                  >
                    <div
                      onClick={handleProfileOption}
                      className={`flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b-2 py-1 text-nowrap ${
                        profileOption
                          ? "border-text_strong"
                          : "border-transparent"
                      }`}
                    >
                      {hasAvatar  ? (
                        <Image
                          className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] rounded-full"
                          src={userDetails?.data?.avatar || ""}
                          priority
                          width={25}
                          height={25}
                          alt=""
                        />
                      ) : (
                        <ProfileAvatar
                          name={userDetails?.data?.fullName || ""}
                          size="small"
                        />
                      )}
                      <p className="">{userDetails?.data?.fullName}</p>
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
                      <div className="min-w-[180px] flex flex-col gap-1 py-2 absolute top-14 right-0 bg-background h-fit z-10 rounded-lg overflow-hidden shadow-[0px_8px_24px_0px_#14141414] text-text_weak font-medium text-sm">
                        <Link
                          href={`/profile`}
                          className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                        >
                          Profile
                        </Link>
                        <Link
                          href={`/orders`}
                          className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                        >
                          Orders
                        </Link>
                        <Link
                          href={`/address`}
                          className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                        >
                          Address
                        </Link>
                        <Link
                          href={`/password`}
                          className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                        >
                          Password
                        </Link>
                        <div
                          onClick={() => setLogoutModal(true)}
                          className="h-10 w-full px-6 hover:text-text_strong hover:bg-[#f5f5f5] items-center flex justify-start cursor-pointer"
                        >
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // login and signup
                  <div className="border-l pl-6 flex gap-6 items-center">
                    {/* ----- Login ----- */}
                    <Link
                      href={`/login`}
                      className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b border-text_strong py-1"
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

              {/* ----- quick contact ----- */}
            </div>

            {/*------------ socials ----------*/}
            <div className="w-full bg-[red] selection:bg-none flex justify-center lg:justify-start flex-wrap lg:text-nowrap  items-center gap-2 md:gap-6">
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
                <p className="text-sm selection:bg-none text-text_strong">
                  +234 704 451 4049
                </p>
              </div>

              {/* ----- instagram ----- */}
              <div className="flex justify-center items-center gap-1 font-medium">
                <i>{instagram()}</i>
                <p className="text-sm selection:bg-none text-text_strong">
                  Quicktrads
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
