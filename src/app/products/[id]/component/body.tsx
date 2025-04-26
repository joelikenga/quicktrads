"use client";
import {
  arrowDown,
  arrowleft,
  // arrowleft,
  cart,
  CircularQuestionIcon,
  closeBtn,
  deliveryIcon,
  info,
  // instagram,
  leftCarousel,
  linkIcon,
  msgIcon,
  returnIcon,
  review_0,
  rightCarousel,
  // whatsapp,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
// import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  createReview,
  getProduct,
  getReview,
} from "../../../../utils/api/user/product";
import { ProductSkeleton } from "./skeleton";
import { useCart } from "@/context/CartContext";
import { errorToast, successToast } from "@/utils/toast/toast";
import { useCurrency } from "@/context/CurrencyContext";

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
    priceConvert: number | 0;
    priceDiscountConvert: number | 0;
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
// #FEEBC3
const Star = ({ color }: { color: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99778 1C10.8762 1 11.5681 1.66347 12.0098 2.55871L13.4849 5.53333C13.5297 5.62539 13.6357 5.75502 13.7951 5.87361C13.9543 5.99208 14.1103 6.05743 14.2129 6.07467L16.8831 6.52198C17.8476 6.68406 18.656 7.15685 18.9185 7.98011C19.1807 8.80269 18.7958 9.6582 18.1022 10.3531L16.0278 12.4446C15.9456 12.5275 15.8535 12.6837 15.7958 12.8871C15.7384 13.0892 15.7333 13.2733 15.7593 13.3922L15.7597 13.3938L16.3532 15.9812C16.5993 17.0581 16.5177 18.1259 15.7582 18.6842C14.9961 19.2444 13.9547 18.9961 13.0085 18.4326L10.5055 16.9386C10.4004 16.8758 10.2199 16.8249 10.002 16.8249C9.78568 16.8249 9.60137 16.8751 9.48942 16.9403L9.48783 16.9412L6.98971 18.4322C6.0447 18.9977 5.00453 19.2416 4.24235 18.6809C3.48337 18.1225 3.39769 17.0567 3.64463 15.9807L4.23799 13.3938L4.23835 13.3922C4.26437 13.2733 4.25928 13.0892 4.20191 12.8871C4.14415 12.6837 4.05205 12.5275 3.96983 12.4446L1.89392 10.3516C1.20477 9.65671 0.82182 8.80262 1.08196 7.98125C1.34285 7.15748 2.14973 6.68411 3.11489 6.52192L5.78374 6.07485C5.88155 6.05788 6.0352 5.99326 6.19407 5.87449C6.35324 5.75549 6.45954 5.62558 6.50436 5.53333L6.50661 5.52873L7.97984 2.55792L7.98042 2.55675C8.42633 1.66225 9.12039 1 9.99778 1Z"
        fill={color}
      />
    </svg>
  );
};

export const Body = () => {
  const userData = localStorage.getItem("user");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const userId = parsedUserData?.id || null;
  const { currency } = useCurrency();
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string | null>("about");
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [exploreReviews, setExploreReviews] = useState(false);
  const [writeReview, setWriteReview] = useState(false);
  const [reviewData, setReviewData] = useState({
    message: "",
    productId: id,
    stars: 0,
    userId: userId,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewDetails, setReviewDetails] = useState<any[]>([]);

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
          priceDiscount:
            response.data.priceDiscount && Number(response.data.priceDiscount),
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
      // //console.log("Product details:", transformedData);
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

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const res = await getReview(id);
        setReviewDetails(res || []);
      } catch (error: any) {
        console.error(error);
        setReviewDetails([]);
      }
    };

    getAllReviews();
  }, [id]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    if (product?.data.images) {
      setIndex(product.data.images.indexOf(image));
    }
  };

  const handlePrevClick = () => {
    if (product?.data.images) {
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.data.images.length) %
          product.data.images.length
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
      errorToast("Please select a size");
      return;
    }

    const cartItem = {
      id: product?.data.id || "",
      name: product?.data.name || "",
      price: product?.data.price || 0,
      priceDiscount: product?.data.priceDiscount || 0,
      priceConvert: product?.data.priceConvert || 0,
      priceDiscountConvert: product?.data.priceDiscountConvert || 0,
      // currency: currency,
      image: product?.data.images[0] || "/heroFallback.jpg",
      size: selectedSize,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  if (!product) {
    return <ProductSkeleton />; // Replace the loading text with skeleton
  }

  const handleSubmitReview = async () => {
    if (!reviewData.message) {
      errorToast("Please write a review");
      return;
    }
    if (reviewData.stars === 0) {
      errorToast("Please select a rating");
      return;
    }
    try {
       await createReview(reviewData);
      successToast("Review submitted successfully");
      setWriteReview(false);
      setReviewData({
        message: "",
        productId: id,
        stars: 0,
        userId: userId,
      });
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <div className="px-4 md:px-10 mt-[100px] md:mt-[150px]">
      {exploreReviews && (
        <div className="fixed z-50 left-0 top-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] backdrop-blur-md flex justify-center items-start px-4 overflow-hidden">
          <div className="bg-white w-full max-w-[1280px] h-full max-h-[45rem] max-h -[700px] mt-10 rounded-lg p-4 md:p-8 gap-2 relative overflow-hidden">
            <div className="flex justify-between items-center w-full">
              <p className="font-normal text-[22px]">Review details</p>
              <i onClick={() => setExploreReviews(false)}> {closeBtn()}</i>
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full my-4   gap-12 overflow-y-auto h-full max-h-[95%]">
              {/* image */}
              <div className="md:flex flex-col md:flex-row justify-center md:justify-start md:items-start gap-2 w-full hidden">
                <Image
                  width={520}
                  height={620}
                  src={product?.data?.images[0] || "/heroFallback.jpg"}
                  priority
                  alt={product?.data?.name}
                  className="w-[280px]  h-[280px]"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-text_strong text-base capitalize text-[18px] font-medium">
                    {product?.data?.name}
                  </p>
                  <p className="text-text_weak text-base font-normal">
                    {product.data?.description || "No description available"}
                  </p>
                </div>
              </div>

              {/* reviews */}

              <div className="max-w-[633px] w-full overflow-y-auto">
                <p className="text-text_strong text-base font-medium">
                  Reviews
                </p>

                <div className="flex justify-start items-center gap-2 mb-2">
                  <p
                    className={`${lora.className} font-normal text-[32px] text-text_strong`}
                  >
                    {reviewDetails?.length}
                  </p>
                  <i>{review_0()}</i>
                </div>

                {exploreReviews && userData && (
                  <>
                    <div
                      onClick={() => setWriteReview(true)}
                      className="font-medium underline pb-6 flex items-center gap-2 cursor-pointer "
                    >
                      <CircularQuestionIcon />
                      Write a review
                    </div>

                    {writeReview && (
                      <div className="w-full font-normal text-base flex flex-col gap-2">
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() =>
                                  setReviewData((prev) => ({
                                    ...prev,
                                    stars: star,
                                  }))
                                }
                                className="cursor-pointer"
                              >
                                <Star
                                  color={
                                    star <= (hoveredRating || reviewData.stars)
                                      ? "#F6B01E"
                                      : "#FEEBC3"
                                  }
                                />
                              </div>
                            ))}
                          </div>
                          <textarea
                            value={reviewData.message}
                            onChange={(e) =>
                              setReviewData((prev) => ({
                                ...prev,
                                message: e.target.value,
                              }))
                            }
                            placeholder="Write your review here..."
                            className="w-full p-2 border rounded-md min-h-[100px] outline-slate-500 resize-none"
                          />
                          <div className="w-full flex justify-end">
                            <button
                              onClick={handleSubmitReview}
                              className="h-8 px-4 flex justify-center items-center bg-black rounded-full text-base font-medium text-white"
                            >
                              Submit review
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {reviewDetails.length === 0 ? (
                  <div className="flex-col flex items-center gap-4">
                    <i>{msgIcon()}</i>
                    <div className="max-w-[290px]">
                      <p className="font-medium text-[18px] text-text_strong">
                        There are currently no reviews!
                      </p>
                      <p className="text-text_weak text-sm font-normal">
                        It looks like there are currently no reviews
                        available at the moment
                      </p>
                    </div>
                  </div>
                ) : (
                  reviewDetails.map((review) => (
                    <div
                      key={review.id}
                      className="w-full font-normal text-base flex flex-col gap-2 mb-6"
                    >
                      <p className="text-base font-medium">
                        {review.fullName}
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              color={
                                index < review.stars ? "#F6B01E" : "#FEEBC3"
                              }
                            />
                          ))}
                        </div>
                        <p className="font-normal text-[16px] text-text_weak">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="font-normal text-base text-text_weak">
                        {review.message}
                      </p>
                    </div>
                  ))
                )}

               
              </div>
            </div>
          </div>
        </div>
      )}

      {product && (
        <div className="mx-auto max-w-7xl w-full">
          <div className="w-full flex justify-start items-center ">
            <div
              onClick={() => history.back()}
              className="w-fit h-full items-center flex justify-between gap-2 pb-4"
            >
              <i>{arrowleft()}</i>
              <p className="text-lg ">Products</p>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-start gap-8">
            {/* image container */}
            <div className="w-fit h-full flex flex-col-reverse md:flex-row justify-between gap-6">
              {/* 3 images */}
              <div className="flex md:flex-col gap-4">
                {product?.data?.images.map((item) => (
                  <div
                    key={item}
                    className="w-fit h-fit cursor-pointer"
                    onClick={() => handleImageClick(item)}
                  >
                    <div className="w-fit h-fit">
                      <Image
                        width={100}
                        height={120}
                        src={item || "/heroFallback.jpg"}
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
                  src={currentImage || "/heroFallback.jpg"}
                  priority
                  alt=""
                  className="w-[420px] h-[500px]"
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

            <div className=" w-full max-w-[504px] h-fit flex flex-col gap-6">
              {/* name and price */}
              <div className="flex flex-col gap-4 w-full">
                <p
                  className={`${lora.className} text-[22px] font-normal text-text_strong`}
                >
                  {product?.data?.name}
                </p>

                <div className="flex justify-start items-center w-full font-medium text-lg gap-2">
                  <p className=" text-text_strong">
                    {currency === "NGN"
                      ? `₦ ${product?.data?.price}
            `
                      : `$ ${product?.data?.priceConvert}`}
                  </p>

                  {currency === "USD"
                    ? product?.data?.priceDiscountConvert && (
                        <del className="text-base text-text_weak">
                          ${product?.data?.priceDiscountConvert || 0}
                        </del>
                      )
                    : null}

                  {currency === "NGN"
                    ? product?.data?.priceDiscount && (
                        <del className="text-base text-text_weak">
                          ₦{product?.data?.priceDiscount || 0}
                        </del>
                      )
                    : null}
                </div>
              </div>

              {/* size */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-normal text-sm">Select size</p>
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-4 font-medium">
                    {product.data.size.split(",").map((size) => (
                      <div
                        key={size}
                        className={`col-span-2 md:col-span-1 rounded-lg border flex items-center justify-center flex-col md:w-[88px] py-2 cursor-pointer ${
                          selectedSize === size ? "border-black" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        <p className="text-text_strong text-sm uppercase">
                          {size}
                        </p>
                        <p className="text-text_weak text-xs text-nowrap">
                          {size === "xs"
                            ? "Extra small"
                            : size === "s"
                            ? "Small"
                            : size === "m"
                            ? "Medium"
                            : size === "l"
                            ? "Large"
                            : size === "xl"
                            ? "Extra Large"
                            : size}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* info */}
                <div className="flex gap-2 items-center">
                  <i>{info()}</i>
                  <Link
                    href={`/sizing-guide`}
                    className="underline text-base text-text_weak"
                  >
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
                      window.location.href = "/checkout";
                    } else {
                      errorToast("Please select a size");
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
                    onClick={() => toggleSection("about")}
                  >
                    <p className="text-text_strong text-base font-medium">
                      About product
                    </p>
                    <i
                      className={`duration-300 ${
                        activeSection === "about" && "rotate-180"
                      }`}
                    >
                      {arrowDown()}
                    </i>
                  </div>
                  {activeSection === "about" && (
                    <div className=" w-full text-text_weak">
                      <div className="w-full font-normal text-base ">
                        {product.data.description
                          .split(". ")
                          .map((sentence, index) => (
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
                    onClick={() => toggleSection("delivery")}
                  >
                    <p className="text-text_strong text-base font-medium">
                      Delivery & return
                    </p>
                    <i
                      className={`duration-300 ${
                        activeSection === "delivery" && "rotate-180"
                      }`}
                    >
                      {arrowDown()}
                    </i>
                  </div>
                  {activeSection === "delivery" && (
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
                    onClick={() => toggleSection("reviews")}
                  >
                    <p className="text-text_strong text-base font-medium">
                      {`Reviews (${reviewDetails?.length})`}
                    </p>
                    <i
                      className={`duration-300 ${
                        activeSection === "reviews" && "rotate-180"
                      }`}
                    >
                      {arrowDown()}
                    </i>
                  </div>
                  {activeSection === "reviews" && (
                    <>
                      <div className=" w-full text-text_weak">
                        <div className="w-full font-normal text-base flex flex-col gap-6">
                          <div className="flex justify-start items-center gap-2">
                            <p
                              className={`${lora.className} font-normal text-[32px] text-text_strong`}
                            >
                              {reviewDetails?.length}
                            </p>
                            <i>{review_0()}</i>
                          </div>

                          {reviewDetails.length === 0 && (
                            <div className="flex-col flex items-center gap-4">
                              <i>{msgIcon()}</i>

                              <div className="max-w-[290px] ">
                                <p className="font-medium text-[18px] text-text_strong">
                                  There are currently no reviews!
                                </p>
                                <p className="text-text_weak text-sm font-normal">
                                  It looks like there are currently no reviews
                                  available at the moment
                                </p>
                              </div>
                            </div>
                          )}

                          {userData && (
                            <>
                              <div
                                onClick={() => setWriteReview(true)}
                                className="font-medium underline pb-6 flex items-center gap-2 cursor-pointer"
                              >
                                <CircularQuestionIcon />
                                Write a review
                              </div>

                              {writeReview && (
                                <div className="w-full font-normal text-base flex flex-col gap-2">
                                  <div className="flex flex-col gap-4 w-full">
                                    <div className="flex gap-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <div
                                          key={star}
                                          onMouseEnter={() =>
                                            setHoveredRating(star)
                                          }
                                          onMouseLeave={() =>
                                            setHoveredRating(0)
                                          }
                                          onClick={() =>
                                            setReviewData((prev) => ({
                                              ...prev,
                                              stars: star,
                                            }))
                                          }
                                          className="cursor-pointer"
                                        >
                                          <Star
                                            color={
                                              star <=
                                              (hoveredRating ||
                                                reviewData.stars)
                                                ? "#F6B01E"
                                                : "#FEEBC3"
                                            }
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    <textarea
                                      value={reviewData.message}
                                      onChange={(e) =>
                                        setReviewData((prev) => ({
                                          ...prev,
                                          message: e.target.value,
                                        }))
                                      }
                                      placeholder="Write your review here..."
                                      className="w-full p-2 border rounded-md min-h-[100px] outline-slate-500 resize-none"
                                    />
                                    <div className="w-full flex justify-end">
                                      <button
                                        onClick={handleSubmitReview}
                                        className="h-8 px-4 flex justify-center items-center bg-black rounded-full text-base font-medium text-white"
                                      >
                                        Submit review
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      {/* written review */}
                      {reviewDetails.length > 0 ? (
                        reviewDetails.slice(0, 1).map((review) => (
                          <div
                            key={review.id}
                            className="w-full font-normal text-base flex flex-col gap-2"
                          >
                            <p className="text-base font-medium">
                              {review.fullName}
                            </p>
                            <div className="flex justify-start items-center gap-2">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, index) => (
                                  <Star
                                    key={index}
                                    color={
                                      index < review.stars
                                        ? "#F6B01E"
                                        : "#FEEBC3"
                                    }
                                  />
                                ))}
                              </div>
                              <p
                                className={`font-normal text-[16px] text-text_weak`}
                              >
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="font-normal text-base text-text_weak">
                              {review.message}
                            </p>

                            {reviewDetails.length > 1 && (
                              <div
                                onClick={() => setExploreReviews(true)}
                                className="font-medium underline py-6 text-text_weak cursor-pointer"
                              >
                                Explore {reviewDetails.length - 1} more reviews
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="flex-col flex items-center gap-4">
                          <i>{msgIcon()}</i>
                          <div className="max-w-[290px]">
                            <p className="font-medium text-[18px] text-text_strong">
                              There are currently no reviews!
                            </p>
                            <p className="text-text_weak text-sm font-normal">
                              It looks like there are currently no reviews
                              available at the moment
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* share product */}
                <div className="flex flex-col gap-4">
                  <p className="text-text_strong text-base font-medium">
                    Share product
                  </p>
                  <div className="flex flex-wrap gap-12 justify-start items-center">
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        successToast("Copied to clipboard");
                      }}
                      className="flex gap-2 items-center text-text_strong font-medium text-sm cursor-pointer"
                    >
                      <i>{linkIcon()}</i>
                      <p>Copy link</p>
                    </div>

                    {/* <div className="flex gap-2 items-center text-text_strong font-medium text-sm">
                      <i>{whatsapp()}</i>
                      <p>Whatsapp</p>
                    </div>

                    <div className="flex gap-2 items-center text-text_strong font-medium text-sm">
                      <i>{instagram()}</i>
                      <p>Instagram</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
