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
import { ProfileAvatar } from "./profileGenerator";
import { useLogout } from "./logout";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getAllProducts } from "@/utils/api/user/product";
// import nookies from "nookies";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceConvert?: number;
}

export const Navbar = () => {
  const [searchOptions, setSearchOptions] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [categoryOptions, setCategoryOptions] = useState<boolean>(false);
  const [mobileDropdown, setMobileDropdown] = useState<boolean>(false);
  const [profileOption, setProfileOption] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mobile dropdown states
  const [mobileDropdownStates, setDropdownStates] = useState({
    category: true,
    collection: false,
    men: false,
    women: false,
    unisex: false,
  });
  // const cookies = nookies.get(null);
  // const cookies = nookies.get(null, { path: "/" });

  // alert(cookies?.accessToken)

  const logout = useLogout();
  const router = useRouter();
  const { getCartCount } = useCart();
  const { currency, toggleCurrency } = useCurrency();
  const [userData, setUserData] = useState<any | null>(null);
  const itemSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = (await getAllProducts()).data as Product[];

      if (searchValue.trim() === "") {
        setFilteredProducts([]);
        setSearchOptions(false);
        return;
      }

      const filtered = response.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      setFilteredProducts(filtered);
      setSearchOptions(true);
    } catch (err) {
      setError("Failed to fetch products");
      setFilteredProducts([]);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue) {
        itemSearch();
      } else {
        setFilteredProducts([]);
        setSearchOptions(false);
      }
    }, 300); // Debounce search for better performance

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setSearchOptions(false);
    setSearchValue("");
  };

  // Handle category navigation
  const handleCategoryNavigation = (item: string, event: React.MouseEvent) => {
    event.stopPropagation();
    localStorage.setItem("category", item);

    if (window.location.pathname === "/products") {
      window.location.reload();
    } else {
      router.replace("/products");
    }

    // Close mobile menu if open
    setMobileDropdown(false);
  };

  // Unified dropdown handler
  const handleDropdown = (
    mobileDropdownName: keyof typeof mobileDropdownStates,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setDropdownStates((prev) => ({
      ...prev,
      [mobileDropdownName]: !prev[mobileDropdownName],
    }));
  };

  // Search handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      setSearchOptions(true);
    } else {
      setSearchOptions(false);
    }
  };

  // Refs for click outside handling
  const profileWrapperRef = useRef<HTMLDivElement>(null);
  const categoryWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUserData(localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileWrapperRef.current &&
        !profileWrapperRef.current.contains(event.target as Node)
      ) {
        setProfileOption(false);
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

  // Desktop handlers
  const handleProfileOption = (event: React.MouseEvent) => {
    event.stopPropagation();
    setProfileOption(!profileOption);
  };

  const handleCategoryOptions = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCategoryOptions(!categoryOptions);
  };

  const getDisplayName = (fullName: string): string => {
    if (!fullName) return "";
    const parts = fullName.split(" ");
    return parts[0]; // Returns the first part before space
  };

  return (
    <div className="w-screen left-0 top-0 fixed z-50">
      {/* Logout Modal */}
      {logoutModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[60] flex justify-start flex-col pt-[120px] md:pt-0 md:justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg">
            <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
              <div className="cursor-pointer">{redInfo()}</div>
              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                Are you sure you want to logout your account?
              </p>
              <p className="text-text_strong text-sm md:text-base font-normal">
                {`This action will logout your account. If you're not to logout, you can cancel to continue shopping`}
              </p>
            </div>
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

      {/* Quick Contact - Desktop */}
      <div className="hidden lg:flex w-full px-10 items-center bg-fill h-12">
        <div className="w-full max-w-7xl mx-auto flex justify-start items-center gap-6">
          <div className="flex justify-center items-center gap-1 font-medium">
            {map()}
            <p className="text-sm text-text_strong">
              27 fola osibo, Lagos, Nigeria
            </p>
          </div>
          <div className="flex justify-center items-center gap-1 font-medium">
            {whatsapp()}
            <p className="text-sm text-text_strong">+234 704 451 4049</p>
          </div>
          <div className="flex justify-center items-center gap-1 font-medium">
            {instagram()}
            <p className="text-sm text-text_strong">Quicktrads</p>
          </div>
        </div>
      </div>

      {/* Navbar Desktop */}
      <nav className="hidden lg:flex w-full px-10 bg-background h-[72px] items-center border-b border">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          {/* Search and Currency */}
          <div className="flex gap-6 items-center">
            <div className="relative">
              <div className="flex items-center gap-2 font-medium text-sm border-stroke_strong px-4 rounded-full border w-[260px]  text-text_strong">
                {search()}
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none h-8 w-full"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
              {searchOptions && (
                <div className="flex flex-col gap-1 py-2 absolute top-10 left-0 bg-background w-full h-fit max-h-[300px] overflow-y-auto z-10 rounded-lg shadow-[0px_8px_24px_0px_#14141414] text-text_strong font-medium text-sm">
                  {isLoading ? (
                    <div className="flex flex-col gap-2 p-6">
                      <div className="flex justify-between items-center gap-4">
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>

                        <div className="h-4 w-6 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col gap-2 p-6">
                      <div className="flex justify-between items-center gap-4">
                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>

                        <div className="h-4 w-6 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <p className="h-10 w-full px-6 flex items-center justify-center">
                      No products found
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="h-10 w-full px-6 hover:bg-[#f5f5f5] items-center flex justify-between gap-4 cursor-pointer"
                      >
                        <span className="max-w-[80%] overflow-hidden text-nowrap capitalize">
                          {product.name}
                        </span>
                        <span className="text-text_weak max-w-fit overflow-hidden ">
                          {currency === "NGN"
                            ? `₦${product.price}`
                            : `$${product.priceConvert}`}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div
              className="flex items-center gap-2 font-medium text-sm w-20  cursor-pointer"
              onClick={toggleCurrency}
            >
              {currency === "NGN" ? nigeriaIcon() : USAIcon()}
              <p className="">{currency === "NGN" ? "NGN ₦" : "USD $"}</p>
            </div>
          </div>

          {/* Logo */}
          <Link href={`/`}>{logo()}</Link>

          {/* Category, Cart, Login/Signup */}
          <div className="flex gap-6 items-center">
            {/* Category */}
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

              {/* Category Dropdown */}
              {categoryOptions && (
                <div className="bg-text_strong bg-opacity-80 h-full w-full fixed left-0 top-[120px] hidden lg:flex z-50">
                  <div className="bg-background w-full max-h-[294px] h-full flex items-start justify-between py-8 px-[120px]">
                    <div className="w-1/2 flex items-center">
                      <div className="flex flex-col gap-4 items-start bg-fill rounded-lg text-text_strong max-h-[204px] h-full max-w-[416px] w-full p-6">
                        {redCategoryicon()}
                        <div className="gap-2 flex flex-col items-start">
                          <p
                            className={`${lora.variable} font-medium text-[22px]`}
                          >
                            Shop quick with quicktads category
                          </p>
                          <p className="font-normal text-base">
                            Discover the latest trends and start building your
                            dream wardrobe today!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2 items-start flex justify-between gap-8">
                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Featured
                        </p>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("trending", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trending
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("latestWear", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Latest wear
                        </div>
                      </div>

                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Unisex
                        </p>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("u-Tops", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Tops
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("u-Trousers", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trousers
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("u-TwoPiece", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Two-piece
                        </div>
                      </div>

                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Men
                        </p>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("m-Tops", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Tops
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("m-Trousers", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trousers
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("m-TwoPiece", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Two-piece
                        </div>
                      </div>

                      <div className="text-text_strong flex flex-col gap-6 max-w-[160px]">
                        <p className="text-base font-semibold cursor-pointer">
                          Women
                        </p>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("w-Bubu", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Bubu
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("w-Tops", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Tops
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("w-Trouser", event)
                          }
                          className="text-lg font-normal text-text_weak cursor-pointer"
                        >
                          Trousers
                        </div>
                        <div
                          onClick={(event) =>
                            handleCategoryNavigation("w-TwoPiece", event)
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

            {/* Cart */}
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

            {/* Profile */}
            {userData ? (
              <div
                ref={profileWrapperRef}
                className="border-l pl-6 relative flex justify-center py-1"
              >
                <div
                  onClick={handleProfileOption}
                  className={`flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b-2 py-1 text-nowrap ${
                    profileOption ? "border-text_strong" : "border-transparent"
                  }`}
                >
                  {!JSON.parse(userData)?.avatar ? (
                    <ProfileAvatar
                      name={
                        getDisplayName(JSON.parse(userData)?.fullName) || "User"
                      }
                      size="small"
                    />
                  ) : (
                    <Image
                      className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] rounded-full"
                      src={JSON.parse(userData)?.avatar || ""}
                      priority
                      width={25}
                      height={25}
                      alt=""
                    />
                  )}
                  <p className="capitalize">
                    {getDisplayName(JSON.parse(userData)?.fullName)}
                  </p>
                  <i
                    className={`${profileOption && "rotate-180"} duration-300`}
                  >
                    {arrowDown()}
                  </i>
                </div>
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
              <div className="border-l pl-6 flex gap-6 items-center">
                <Link
                  href={`/login`}
                  className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b- border-text_strong py-1"
                >
                  <p className="">Login</p>
                </Link>
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

      {/* Navbar Mobile */}
      <nav className="flex justify-between items-center lg:hidden w-full px-10 py-4 bg-background h-[72px] relative">
        <Link className="relative" href={`/cart`}>
          {cart()}
          {getCartCount() > 0 && (
            <span className="absolute -top-4 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getCartCount()}
            </span>
          )}
        </Link>
        <Link href={`/`}>{logo()}</Link>
        <div onClick={() => setMobileDropdown(!mobileDropdown)}>
          {humbuger()}
        </div>

        {/* Mobile Dropdown */}
        {mobileDropdown && (
          <div className="flex flex-col justify-between items-start z-50">
            <div className="bg-background w-full h-full fixed top-0 left-0 px-6 pt-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2 font-medium text-sm bg-fill border-stroke_strong px-4 rounded-full border w-[260px] text-text_strong relative">
                  {search()}
                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none h-8 w-full bg-inherit"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  {searchOptions && searchValue && (
                    <div className="flex flex-col gap-1 py-2 absolute top-10 left-0 bg-background w-full h-fit max-h-[300px] overflow-y-auto z-10 rounded-lg shadow-[0px_8px_24px_0px_#14141414] text-text_strong font-medium text-sm">
                      {isLoading ? (
                        <div className="flex flex-col gap-2 p-6">
                          <div className="flex justify-between items-center gap-4">
                            <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>

                            <div className="h-4 w-6 bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        </div>
                      ) : error ? (
                        <div className="flex flex-col gap-2 p-6">
                          <div className="flex justify-between items-center gap-4">
                            <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>

                            <div className="h-4 w-6 bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        </div>
                      ) : filteredProducts.length === 0 ? (
                        <p className="h-10 w-full px-6 flex items-center justify-center">
                          No item found
                        </p>
                      ) : (
                        filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleProductClick(product?.id)}
                            className="h-10 w-full px-6 hover:bg-[#f5f5f5] items-center flex justify-between cursor-pointer "
                          >
                            <span className="max-w-[80%] overflow-hidden text-nowrap capitalize">
                              {product.name}
                            </span>
                            <span className="text-text_weak">
                              {currency === "NGN"
                                ? `₦${product?.price}`
                                : `$${product?.priceConvert}`}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <i
                  className="p-3"
                  onClick={() => {
                    setMobileDropdown(!mobileDropdown);
                    setSearchValue("");
                  }}
                >
                  {closeBtn()}
                </i>
              </div>

              {/* Profile */}
              {userData ? (
                <div
                  ref={profileWrapperRef}
                  className="relative flex justify-center py-1 mb-2"
                >
                  <div
                    onClick={handleProfileOption}
                    className={`flex items-center gap-2 justify-between font-medium text-sm w-full cursor-pointer border-b-2 py-1 text-nowrap ${
                      profileOption
                        ? "border-transparent"
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {!JSON.parse(userData)?.avatar ? (
                        <ProfileAvatar
                          name={
                            getDisplayName(JSON.parse(userData)?.fullName) || ""
                          }
                          size="large"
                        />
                      ) : (
                        <Image
                          className="min-w-12 max-w-12 min-h-12 max-h-12 rounded-full"
                          src={JSON.parse(userData)?.avatar || ""}
                          priority
                          width={25}
                          height={25}
                          alt=""
                        />
                      )}
                      <p className="text-base capitalize ">
                        {getDisplayName(JSON.parse(userData)?.fullName)}
                      </p>
                    </div>
                    <i
                      className={`${
                        profileOption && "rotate-180"
                      } duration-300`}
                    >
                      {arrowDown()}
                    </i>
                  </div>
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
                <div className="flex gap-6 items-center">
                  <Link
                    href={`/login`}
                    className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border-b border-text_strong py-1"
                  >
                    <p className="">Login</p>
                  </Link>
                  <Link
                    href={`/sign_up`}
                    className="flex items-center gap-2 font-medium text-sm w-full cursor-pointer border rounded-full h-8 px-4 border-stroke_weak py-1"
                  >
                    <p className="">Signup</p>
                  </Link>
                </div>
              )}

              <div className="gap-6 flex flex-col">
                {/* Currency */}
                <div className="w-full gap-6 flex flex-col  pb-6">
                  <div className="flex flex-row gap-4">
                    <div
                      className={`rounded-lg h-10 w-full px-4 items-center flex justify-between cursor-pointer border ${
                        currency === "NGN"
                          ? "border-stroke_strong"
                          : "border-stroke_weak"
                      }`}
                      onClick={toggleCurrency}
                    >
                      <div className="gap-2 flex">
                        {nigeriaIcon()}
                        <p className="selection:bg-none">NGN ₦</p>
                      </div>
                      {currency === "NGN" ? checked() : unChecked()}
                    </div>
                    <div
                      className={`rounded-lg h-10 w-full px-4 items-center flex justify-between cursor-pointer border ${
                        currency === "USD"
                          ? "border-stroke_strong"
                          : "border-stroke_weak"
                      }`}
                      onClick={toggleCurrency}
                    >
                      <div className="gap-2 flex">
                        {USAIcon()}
                        <p className="selection:bg-none">USD $</p>
                      </div>
                      {currency === "USD" ? checked() : unChecked()}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="w-full gap-6 flex flex-col border-b pb-6">
                  <div className="h-[46px] flex justify-between items-start">
                    <div className="flex items-center gap-2 font-medium text-base w-full cursor-pointer py-1">
                      {category()}
                      <p className="selection:bg-none">Category</p>
                    </div>
                    {/* <i
                      className={`${
                        categoryOptions && "rotate-180"
                      } duration-300`}
                    >
                      {arrowDown()}
                    </i> */}
                  </div>

                  {
                    <>
                      {/* Collections */}
                      <div>
                        <div
                          onClick={(e) => handleDropdown("collection", e)}
                          className="h-[46px] flex justify-between items-start dropdown-header"
                        >
                          <div className="flex items-center gap-2 font-medium text-base w-full cursor-pointer py-1">
                            <p className="selection:bg-none">Collections</p>
                          </div>
                          <i
                            className={`${
                              mobileDropdownStates.collection && "rotate-180"
                            } duration-300`}
                          >
                            {arrowDown()}
                          </i>
                        </div>
                        {mobileDropdownStates.collection && (
                          <div className="mt-6 flex flex-col gap-6 font-normal text-base text-text_weak pl-2">
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("trending", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Trending
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("latestWear", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Latest wear
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Unisex */}
                      <div>
                        <div
                          onClick={(e) => handleDropdown("unisex", e)}
                          className="h-[46px] flex justify-between items-start dropdown-header"
                        >
                          <div className="flex items-center gap-2 font-medium text-base w-full cursor-pointer py-1">
                            <p className="">Unisex</p>
                          </div>
                          <i
                            className={`${
                              mobileDropdownStates.unisex && "rotate-180"
                            } duration-300`}
                          >
                            {arrowDown()}
                          </i>
                        </div>
                        {mobileDropdownStates.unisex && (
                          <div className="mt-6 flex flex-col gap-6 font-normal text-base text-text_weak pl-2">
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("u-Bubu", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Bubu
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("u-Tops", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Tops
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("u-Trouser", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Trousers
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("u-TwoPiece", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Two-piece
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Men */}
                      <div>
                        <div
                          onClick={(e) => handleDropdown("men", e)}
                          className="h-[46px] flex justify-between items-start dropdown-header"
                        >
                          <div className="flex items-center gap-2 font-medium text-base w-full cursor-pointer py-1">
                            <p className="selection:bg-none">Men</p>
                          </div>
                          <i
                            className={`${
                              mobileDropdownStates.men && "rotate-180"
                            } duration-300`}
                          >
                            {arrowDown()}
                          </i>
                        </div>
                        {mobileDropdownStates.men && (
                          <div className="mt-6 flex flex-col gap-6 font-normal text-base text-text_weak pl-2">
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("m-Tops", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Tops
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("m-Trousers", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Trousers
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("m-TwoPiece", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Two-piece
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Women */}
                      <div>
                        <div
                          onClick={(e) => handleDropdown("women", e)}
                          className="h-[46px] flex justify-between items-start dropdown-header"
                        >
                          <div className="flex items-center gap-2 font-medium text-base w-full cursor-pointer py-1">
                            <p className="">Women</p>
                          </div>
                          <i
                            className={`${
                              mobileDropdownStates.women && "rotate-180"
                            } duration-300`}
                          >
                            {arrowDown()}
                          </i>
                        </div>
                        {mobileDropdownStates.women && (
                          <div className="mt-6 flex flex-col gap-6 font-normal text-base text-text_weak pl-2">
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("w-Bubu", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Bubu
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("w-Tops", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Tops
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("w-Trouser", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Trousers
                            </div>
                            <div
                              onClick={(e) =>
                                handleCategoryNavigation("w-TwoPiece", e)
                              }
                              className="selection:bg-none cursor-pointer"
                            >
                              Two-piece
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="w-full flex justify-center lg:justify-start flex-wrap lg:text-nowrap items-center gap-2 md:gap-6">
              <div className="flex justify-center items-center gap-1 font-medium">
                <i>{map()}</i>
                <p className="text-sm text-text_strong">
                  27 fola osibo, Lagos, Nigeria
                </p>
              </div>
              <div className="flex justify-center items-center gap-1 font-medium">
                <i>{whatsapp()}</i>
                <p className="text-sm selection:bg-none text-text_strong">
                  +234 704 451 4049
                </p>
              </div>
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
