"use client";
import {
  arrowDown,
  // arrowleft,
  cart,
  deliveryIcon,
  info,
  instagram,
  leftCarousel,
  linkIcon,
  msgIcon,
  returnIcon,
  review_0,
  rightCarousel,
  whatsapp,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
// import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getProduct } from "../../../../../utils/api/user/product";
import { ProductSkeleton } from "./skeleton";
// import { useCart } from "../../../../../utils/hooks/useCart";
import { useCart } from "@/context/CartContext";


const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface ProductDetails {
  data: {
    id: string;
    name: string;
    description: string;
    category: "men" | "women" | "unisex";
    subCategory: string;
    price: number;
    priceDiscount: number | null;
    priceConvert: number;
    priceDiscountConvert: number | null;
    currency: string;
    currencyConvert: string;
    size: string;
    images: string[];
    status: "active" | "inactive";
    isFeatured: boolean;
    isPaid: boolean;
    isReviewed: boolean;
    addToInventory: boolean;
    ordersCount: number;
    stars: number;
    paidAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const Body = () => {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string | null>('about');
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');

  const getProducts = async (id: string) => {
    try {
      const response = await getProduct(id);
      const transformedData: ProductDetails = {
        data: {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          category: response.data.category as "men" | "women" | "unisex",
          subCategory: response.data.subCategory,
          price: Number(response.data.price),
          priceDiscount: response.data.priceDiscount
            ? Number(response.data.priceDiscount)
            : null,
          priceConvert: Number(response.data.priceConvert),
          priceDiscountConvert: response.data.priceDiscountConvert,
          currency: response.data.currency,
          currencyConvert: response.data.currencyConvert,
          size: response.data.size,
          images: response.data.images,
          status: response.data.status as "active" | "inactive",
          isFeatured: Boolean(response.data.isFeatured),
          isPaid: Boolean(response.data.isPaid),
          isReviewed: Boolean(response.data.isReviewed),
          addToInventory: Boolean(response.data.addToInventory),
          ordersCount: Number(response.data.ordersCount),
          stars: Number(response.data.stars),
          paidAt: response.data.paidAt,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        },
      };

      setProduct(transformedData);
      console.log("Product details:", transformedData);
    } catch (error: unknown) {
      throw error;
    }
  };

  useEffect(() => {
    getProducts(id);
  }, [id]);

  useEffect(() => {
    if (product?.data.images.length) {
      setCurrentImage(product.data.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (!isHovered && product?.data.images.length) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % product.data.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, product]);

  useEffect(() => {
    if (product?.data.images) {
      setCurrentImage(product.data.images[index]);
    }
  }, [index, product]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    if (product?.data.images) {
      setIndex(product.data.images.indexOf(image));
    }
  };

  const handlePrevClick = () => {
    if (product?.data.images) {
      setIndex((prevIndex) => 
        (prevIndex - 1 + product.data.images.length) % product.data.images.length
      );
    }
  };

  const handleNextClick = () => {
    if (product?.data.images) {
      setIndex((prevIndex) => (prevIndex + 1) % product.data.images.length);
    }
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      id: product?.data.id || '',
      name: product?.data.name || '',
      price: product?.data.price || 0,
      currency: product?.data.currency || '',
      image: product?.data.images[0] || '',
      size: selectedSize,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  if (!product) {
    return <ProductSkeleton />; // Replace the loading text with skeleton
  }

  return (
    <div className="px-10 mt-[150px]">
      <div className="mx-auto max-w-7xl w-full">

        {/* <div className="w-full flex justify-start items-center ">
          <div className="w-fit h-full items-center flex justify-between gap-1 py-4">
            <i>{arrowleft()}</i>
            <p className="text-base ">Products</p>
          </div>
        </div> */}

        <div className="w-full flex justify-start gap-8">
          {/* image container */}
          <div className="w-fit h-full flex justify-between gap-6">
            {/* 3 images */}
            <div className="flex flex-col gap-4">
              {product.data.images.map((item) => (
                <div
                  key={item}
                  className="w-fit h-fit cursor-pointer"
                  onClick={() => handleImageClick(item)}
                >
                  <div className="w-fit h-fit">
                    <Image
                      width={100}
                      height={120}
                      src={item}
                      priority
                      alt=""
                      className={`w-[100px] h-[120px] ${
                        currentImage === item ? "border-2 border-black" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* image carousel */}
            <div
              className="h-fit relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                width={520}
                height={620}
                src={currentImage}
                priority
                alt=""
                className="w-[420px] h-[620px]"
              />

              <div className="absolute top-1/2 w-full flex justify-between px-4">
                <button onClick={handlePrevClick} className="  rounded-full">
                  {leftCarousel()}
                </button>

                <button onClick={handleNextClick} className="rounded-full ">
                  {rightCarousel()}
                </button>
              </div>
            </div>
          </div>

          {/* details container*/}

          <div className="w-[504px] h-fit flex flex-col gap-6">
            {/* name and price */}
            <div className="flex flex-col gap-4 w-full">
              <p
                className={`${lora.className} text-[22px] font-normal text-text_strong`}
              >
                {product.data.name}
              </p>

              <div className="flex justify-start items-center w-full font-medium text-lg gap-2">
                <p className=" text-text_strong">
                  {product.data.currency}{product.data.price}
                </p>
                {product.data.priceDiscount && (
                  <p className=" text-text_weak line-through">
                    {product.data.currency}{product.data.priceDiscount}
                  </p>
                )}
              </div>
            </div>

            {/* size */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-normal text-sm">Select size</p>
                <div className="grid grid-cols-5 gap-4 font-medium">
                  {product.data.size.split(',').map((size) => (
                    <div 
                      key={size} 
                      className={`col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2 cursor-pointer ${
                        selectedSize === size ? 'border-black' : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <p className="text-text_strong text-sm uppercase">{size}</p>
                      <p className="text-text_weak text-xs text-nowrap">
                        {size === 'xs' ? 'Extra small' : 
                         size === 's' ? 'Small' :
                         size === 'm' ? 'Medium' :
                         size === 'l' ? 'Large' :
                         size === 'xl' ? 'Extra Large' : size}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* info */}
              <div className="flex gap-2 items-center">
                <i>{info()}</i>
                <Link href={``} className="underline text-base text-text_weak">
                  Sizing guide
                </Link>
              </div>
            </div>

            {/* buttons */}

            <div className="flex flex-col gap-6 font-medium text-base">
                <button 
                onClick={() => {
                  if (selectedSize) {
                  handleAddToCart();
                  window.location.href = '/checkout';
                  } else {
                  alert('Please select a size');
                  }
                }}
                className=" w-full text-background bg-text_strong rounded-full px-6 h-12 flex justify-center items-center"
                >
                Checkout now
                </button>
              <button 
                onClick={handleAddToCart}
                className="w-full text-text_strong border bg-background rounded-full px-6 h-12 flex justify-center items-center gap-2"
              >
                <i>{cart()}</i>
                Add to cart
              </button>
            </div>

            <div className="w-full flex flex-col gap-6">
              {/* About product */}
              <div className="flex flex-col gap-4">
                <div 
                  className="flex justify-between w-full cursor-pointer items-center"
                  onClick={() => toggleSection('about')}
                >
                  <p className="text-text_strong text-base font-medium">
                    About product
                  </p>
                  <i className={`duration-300 ${activeSection === 'about' && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {activeSection === 'about' && (
                  <div className=" w-full text-text_weak">
                    <div className="w-full font-normal text-base ">
                      {product.data.description.split(". ").map((sentence, index) => (
                        <p key={index} className="pb-2 ">
                          {sentence}.
                        </p>
                      ))}
                    </div>
                    <Link href={``} className="font-medium underline pb-6">
                      Read more about product
                    </Link>
                  </div>
                )}
              </div>

              {/* Delivery & return */}
              <div className="flex flex-col gap-4">
                <div 
                  className="flex justify-between w-full cursor-pointer items-center"
                  onClick={() => toggleSection('delivery')}
                >
                  <p className="text-text_strong text-base font-medium">
                    Delivery & return
                  </p>
                  <i className={`duration-300 ${activeSection === 'delivery' && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {activeSection === 'delivery' && (
                  <div className=" w-full text-text_weak">
                    <div className="w-full font-normal text-base flex flex-col gap-6">
                      <div className="flex justify-start gap-2">
                        <i>{deliveryIcon()}</i>

                        <div className="flex flex-col">
                          <p className="font-medium text-base text-text_strong">
                            Delivery
                          </p>
                          <p className="py-2">We ship world wide via DHL</p>
                          <p className="">
                            Delivery within the next 3-4 days within Lagos,
                            based on your address for delivery outside Lagos
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-start gap-2">
                        <i>{returnIcon()}</i>

                        <div className="flex flex-col">
                          <p className="font-medium text-base text-text_strong">
                            Return policy
                          </p>
                          <p className="">
                            {`10 days from the date of delivery. We ask you make sure the items have not been worn, washed, or damaged, and that you ship the item(s) back in their original packaging and box`}
                          </p>
                        </div>
                      </div>

                      <Link href={``} className="font-medium underline pb-6">
                        Explore delivery & return policy
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/*Reviews */}
              <div className="flex flex-col gap-4">
                <div 
                  className="flex justify-between w-full cursor-pointer items-center"
                  onClick={() => toggleSection('reviews')}
                >
                  <p className="text-text_strong text-base font-medium">
                    Reviews(1)
                  </p>
                  <i className={`duration-300 ${activeSection === 'reviews' && "rotate-180"}`}>
                    {arrowDown()}
                  </i>
                </div>
                {activeSection === 'reviews' && (
                  <>
                    <div className=" w-full text-text_weak">
                      <div className="w-full font-normal text-base flex flex-col gap-6">
                        <div className="flex justify-start items-center gap-2">
                          <p
                            className={`${lora.className} font-normal text-[32px] text-text_strong`}
                          >
                            0
                          </p>
                          <i>{review_0()}</i>
                        </div>

                        {false && (
                          <div className="flex-col flex items-center gap-4">
                            <i>{msgIcon()}</i>

                            <div className="max-w-[290px] ">
                              <p className="font-medium text-[18px] text-text_strong">
                                There are currently no review!
                              </p>
                              <p className="text-text_weak text-sm font-normal">
                                It looks like there are currently no reviews
                                available at the moment
                              </p>
                            </div>
                          </div>
                        )}

                        <Link href={``} className="font-medium underline pb-6">
                          Write a review
                        </Link>
                      </div>
                    </div>
                    <div className="w-full font-normal text-base flex flex-col gap-2">
                      <p className="text-base font-medium">Emeka</p>
                      <div className="flex justify-start items-center gap-2">
                        <i>{review_0()}</i>
                        <p className={`font-normal text-[16px] text-text_weak`}>
                          12/1/2024
                        </p>
                      </div>
                      <p className="font-normal text-base text-text_weak">
                        {`10 days from the date of delivery. We ask you make sure
                        the items have not been worn, washed, or damaged, and that
                        you ship the item(s) back in their original packaging and
                        box`}
                      </p>

                      <Link
                        href={``}
                        className="font-medium underline py-6 text-text_weak"
                      >
                        Explore reviews
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* share product */}
              <div className="flex flex-col gap-4">
                <p className="text-text_strong text-base font-medium">
                  Share product
                </p>
                <div className="flex gap-12 justify-start items-center">
                  <div className="flex gap-2 items-center text-text_strong font-medium text-sm">
                    <i>{linkIcon()}</i>
                    <p>Copy link</p>
                  </div>

                  <div className="flex gap-2 items-center text-text_strong font-medium text-sm">
                    <i>{whatsapp()}</i>
                    <p>Whatsapp</p>
                  </div>

                  <div className="flex gap-2 items-center text-text_strong font-medium text-sm">
                    <i>{instagram()}</i>
                    <p>Instagram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};