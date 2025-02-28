"use client";
import {
  arrowDown,
  arrowleft,
  editIcon,
  leftCarousel,
  info,
  msgIcon,
  review_0,
  rightCarousel,
  trash,
  imageadd,
} from "@/app/global/svg";
import {
  fetchProduct,
  updateProduct,
  updateProductStatus,
} from "../../../../../../../utils/api/admin/products";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { stat } from "fs";

interface TransformedProduct {
  id: string;
  images: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: string;
  subCategory: string;
  rating: number;
  status: string;
  ordersCount: number;
  isFeatured: boolean;
}

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

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface BodyProps {
  id: string;
}

export const Body = ({ id }: BodyProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if edit=true is in the URL
    setEdit(searchParams.get("edit") === "true");
  }, [searchParams]);

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [currentImage, setCurrentImage] = useState(product?.data?.images[0]);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(true);
  const [showReviews, setShowReviews] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    "men" | "women" | "unisex"
  >("men");
  const [currency] = useState<"NGN">("NGN"); // Remove USD option, default to NGN
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  const subCategories = {
    men: ["Tops", "Trousers", "Two-Piece"],
    women: ["Bubu", "Tops", "Trousers", "Two-Piece"],
    unisex: ["Tops", "Trousers", "Two-Piece"],
  };

  // console.log("Edit mode:", edit);

  // Add form input handlers
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Update subcategory when main category changes
  const handleCategoryChange = (category: "men" | "women" | "unisex") => {
    setSelectedCategory(category);
    setSelectedSubCategory(""); // Reset subcategory when main category changes
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIndex(
          (prevIndex) => (prevIndex + 1) % (product?.data?.images?.length || 1)
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product?.data?.images.length, isHovered]);

  useEffect(() => {
    setCurrentImage(product?.data?.images[index]);
  }, [index, product?.data?.images]);

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIndex(product?.data?.images.indexOf(image) ?? 0);
  };

  const handlePrevClick = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + (product?.data?.images?.length ?? 1)) %
        (product?.data?.images?.length ?? 1)
    );
  };

  const handleNextClick = () => {
    setIndex(
      (prevIndex) => (prevIndex + 1) % (product?.data?.images?.length ?? 1)
    );
  };

  const getProduct = async (id: string) => {
    try {
      const response = await fetchProduct(id);
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
    getProduct(id);
  }, []);

  const calculateDiscount = (): string | null => {
    if (!price || !discountPrice) return null;

    const regularPrice = parseFloat(price);
    const discountedPrice = parseFloat(discountPrice);

    if (
      regularPrice <= 0 ||
      discountedPrice <= 0 ||
      discountedPrice >= regularPrice
    ) {
      return null;
    }

    const discount = ((regularPrice - discountedPrice) / regularPrice) * 100;
    return `-${Math.round(discount)}%`;
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && images.length < 3) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setImages((prev) => [...prev, { file, preview }]);
    }
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0 && images.length < 3) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setImages((prev) => [...prev, { file, preview }]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      if (prev[index].preview) {
        URL.revokeObjectURL(prev[index].preview);
      }
      return newImages;
    });
  };

  const uploadImageToCloudinary = async (
    base64Image: string
  ): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Missing Cloudinary configuration");
    }

    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Error uploading to Cloudinary"
        );
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProductUpload = async () => {
    if (isSaving) return; // Prevent upload if saving
    try {
      setIsUploading(true);
      setUploadError(null);

      if (
        !productName ||
        !price ||
        images.length === 0 ||
        !selectedSubCategory
      ) {
        setUploadError(
          "Please fill in all required fields including subcategory"
        );
        return;
      }

      // Upload all images to Cloudinary
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          const base64 = await convertFileToBase64(image.file);
          const cloudinaryUrl = await uploadImageToCloudinary(base64);
          return cloudinaryUrl;
        })
      );

      // Create product data object matching the interface
      const productData = {
        addToInventory: true,
        category: selectedCategory,
        currency: currency,
        description: description,
        images: uploadedImageUrls,
        isFeatured: false,
        name: productName,
        price: Number(price),
        priceDiscount: discountPrice ? Number(discountPrice) : undefined,
        size: selectedSizes.join(","),
        subCategory: selectedSubCategory, // Add selected subcategory
      };

      // Send to backend using the createProduct function
      const response = await updateProduct(id, productData);
      console.log("Product uploaded successfully:", response);

      // Clear form after successful upload
      setImages([]);
      setProductName("");
      setPrice("");
      setDiscountPrice("");
      setDescription("");
      setSelectedSizes([]);
    } catch (error) {
      console.error("Error uploading product:", error);
      setUploadError("Failed to upload product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveToDraft = async () => {
    if (isUploading) return; // Prevent saving if uploading
    try {
      setIsSaving(true);
      setUploadError(null);

      if (
        !productName ||
        !price ||
        images.length === 0 ||
        !selectedSubCategory
      ) {
        setUploadError(
          "Please fill in all required fields including subcategory"
        );
        return;
      }

      // Upload all images to Cloudinary
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          const base64 = await convertFileToBase64(image.file);
          const cloudinaryUrl = await uploadImageToCloudinary(base64);
          return cloudinaryUrl;
        })
      );

      // Create product data object matching the interface
      const productData = {
        addToInventory: false,
        category: selectedCategory,
        currency: currency,
        description: description,
        images: uploadedImageUrls,
        isFeatured: false,
        name: productName,
        price: Number(price),
        priceDiscount: discountPrice ? Number(discountPrice) : undefined,
        size: selectedSizes.join(","),
        subCategory: selectedSubCategory, // Add selected subcategory
      };

      // Send to backend using the createProduct function
      const response = await updateProduct(id, productData);
      console.log("Product drafted successfully:", response);

      // Clear form after successful upload
      setImages([]);
      setProductName("");
      setPrice("");
      setDiscountPrice("");
      setDescription("");
      setSelectedSizes([]);
    } catch (error) {
      console.error("Error drafting product:", error);
      setUploadError("Failed to draft product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  let P_Status = product?.data.status === "active" ? "deactivate" : "active";

  const handleStatusChange = async (e: React.MouseEvent, status: string) => {
    e.stopPropagation(); // Prevent row click event from firing

    try {
      await updateProductStatus(id, status);
      console.log("Product status changed successfully");
    } catch (error) {
      console.error("Error updating  status:", error);
    }
  };

  return (
    <div className="px-10 mt-[120px] ml-[240px]">
      <div className="mx-auto max-w-7xl w-full">
        {!edit ? (
          <>
            {/* Header section */}
            <div className="w-full flex items-center justify-between">
              <div
                onClick={() => history.back()}
                className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2"
              >
                <i>{arrowleft()}</i>
                Products
              </div>

              <div className="flex gap-4 items-center">
                <div
                  onClick={() => setEdit(true)}
                  className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2"
                >
                  <i>{editIcon()}</i>
                  Edit
                </div>

                <div
                  onClick={(e) => handleStatusChange(e, P_Status)}
                  className="cursor-pointer flex items-center text-[18px] font-medium text-text_strong mb-6 gap-2"
                >
                  {product?.data.status === "active" ? <i>{trash()}</i> : "dec"}
                  {product?.data.status === "active"
                    ? "Deactivate"
                    : "Activate"}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-start gap-8">
              {/* image container */}
              <div className="w-fit h-full flex justify-between gap-6">
                {/* 3 images */}
                <div className="flex flex-col gap-4">
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
                          src={item}
                          priority
                          alt=""
                          className={`w-[100px] h-[120px] ${
                            currentImage === item
                              ? "border-2 border-blue-500"
                              : ""
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
                    src={currentImage || ""}
                    priority
                    alt=""
                    className="w-[420px] h-[520px]"
                  />

                  <div className="absolute top-1/2 w-full flex justify-between px-4">
                    <button
                      onClick={handlePrevClick}
                      className="  rounded-full"
                    >
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
                    {product?.data.name}
                  </p>

                  <div className="flex justify-start items-center w-full font-medium text-lg gap-2">
                    <p className="text-text_strong">
                      {product?.data.currency}{" "}
                      {product?.data.price.toLocaleString()}
                    </p>
                    {product?.data.priceDiscount && (
                      <p className="text-text_weak line-through">
                        {product?.data.currency}{" "}
                        {product?.data.priceDiscount.toLocaleString()}
                      </p>
                    )}

                    <div
                      className={`h-6 flex px-2 items-center justify-center rounded-full ${
                        product?.data?.status === "active"
                          ? "bg-[#F5FFFC] text-[#109368]"
                          : "bg-[#FFF5F5] text-[#931010]"
                      } text-sm font-medium gap-1`}
                    >
                      <span
                        className={`rounded-full w-2 h-2 ${
                          product?.data?.status === "active"
                            ? "bg-[#109368]"
                            : "bg-[#931010]"
                        }`}
                      ></span>
                      <p className="capitalize">{product?.data?.status}</p>
                    </div>
                  </div>

                  {/* <div className="text-sm text-text_weak">
                <p>Category: <span className="capitalize">{product?.data.category}</span></p>
                <p>Sub-category: <span className="capitalize">{product?.data.subCategory}</span></p>
                <p>Status: <span className={`capitalize ${
                  product?.data.status === 'active' ? 'text-[#109368]' : 'text-[#931010]'
                }`}>{product?.data.status}</span></p>
              </div> */}
                </div>

                {/* size */}

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-base">Sizes</p>
                    <div className="grid grid-cols-5 gap-4 font-medium">
                      {product?.data.size.split(",").map((size) => (
                        <div
                          key={size}
                          className="col-span-1 rounded-lg border flex items-center justify-center flex-col w-[88px] py-2"
                        >
                          <p className="text-text_strong text-sm uppercase">
                            {size}
                          </p>
                          <p className="text-text_weak text-xs text-nowrap capitalize">
                            {size === "xs"
                              ? "Extra Small"
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
                </div>

                <div className="w-full flex flex-col gap-6">
                  {/* About product */}
                  <div className="flex flex-col gap-4">
                    <div
                      onClick={() => setShowAbout(!showAbout)}
                      className="flex justify-between w-full cursor-pointer items-center"
                    >
                      <p className="text-text_strong text-base font-medium">
                        About product
                      </p>
                      <i
                        className={`duration-300  ${showAbout && "rotate-180"}`}
                      >
                        {arrowDown()}
                      </i>
                    </div>
                    {showAbout && (
                      <div className="w-full text-text_weak">
                        <div className="w-full font-normal text-base ">
                          {product?.data.description
                            .split(". ")
                            .map((sentence, index) => (
                              <p key={index} className="pb-2">
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

                  {/*Reviews */}
                  <div className="flex flex-col gap-4">
                    <div
                      onClick={() => setShowReviews(!showReviews)}
                      className="flex justify-between w-full cursor-pointer items-center"
                    >
                      <p className="text-text_strong text-base font-medium ">
                        <> Reviews</>
                        <span className="text-sm text-text_weak ml-2">
                          ({product?.data.stars || 0} stars,{" "}
                          {product?.data.ordersCount || 0} orders)
                        </span>
                      </p>
                      <div className="flex items-center gap-2">
                        <i
                          className={`duration-300 ${
                            showReviews && "rotate-180"
                          }`}
                        >
                          {arrowDown()}
                        </i>
                      </div>
                    </div>

                    {showReviews && (
                      <>
                        {/* no reviews */}
                        {
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
                                      It looks like there are currently no
                                      reviews available at the moment
                                    </p>
                                  </div>
                                </div>
                              )}

                              <Link
                                href={``}
                                className="font-medium underline pb-6"
                              >
                                Write a review
                              </Link>
                            </div>
                          </div>
                        }
                        {/* review given */}
                        {
                          <div className="w-full font-normal text-base flex flex-col gap-2">
                            <p className="text-base font-medium">Emeka</p>
                            <div className="flex justify-start items-center gap-2">
                              <i>{review_0()}</i>
                              <p
                                className={`font-normal text-[16px] text-text_weak`}
                              >
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
                        }
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {edit ? (
          <>
            <div className="h-full">
              {/* Add product form content */}
              <div
                onClick={() => setEdit(false)}
                className="flex text-lg items-center pb-6 gap-1 cursor-pointer"
              >
                {arrowleft()}Add product
              </div>
              <div className="flex gap-[73px]">
                {/* the card sections where the images will be previewed and uploaded */}
                <div>
                  <p>Image</p>
                  <div className="flex items-center text-sm gap-2 text-text_weak mt-2">
                    <i>{info()}</i>
                    <p className="">
                      {`The first image will be your cover image (Note: you can move or drag image)`}
                    </p>
                  </div>

                  <div className="pt-2">
                    {/* the images panel */}
                    <div className="flex gap-6 pt-2">
                      {/* side images */}
                      <div className="flex flex-col gap-4">
                        {images.map((img, index) => (
                          <div
                            key={index}
                            className="w-[100px] h-[120px] relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            <Image
                              src={img.preview}
                              alt={`Product ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            {hoveredIndex === index && (
                              <div
                                className="absolute top-2 right-2 cursor-pointer bg-black rounded-full p-2"
                                onClick={() => handleDeleteImage(index)}
                              >
                                {trash()}
                              </div>
                            )}
                          </div>
                        ))}
                        {images.length < 3 && (
                          <div
                            className="w-[100px] flex justify-center items-center h-[120px] border border-text_weak hover:border-error_1 border-dashed cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                          >
                            {imageadd()}
                            <input
                              type="file"
                              hidden
                              ref={fileInputRef}
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </div>
                        )}
                      </div>

                      {/* the main image */}
                      <div>
                        <div
                          className="w-[492px] h-[600px] border border-dashed flex flex-col justify-center items-center text-center border-text_weak relative cursor-pointer"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          onClick={() =>
                            images.length === 0 && fileInputRef.current?.click()
                          }
                        >
                          {images.length > 0 ? (
                            <Image
                              src={images[0].preview}
                              alt="Main product"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <>
                              <span>{imageadd()}</span>
                              <p className="w-[240px] leading-[24px] text-text_weak text-sm">
                                <span className="underline font-[400] text-text_strong">
                                  Click to upload
                                </span>
                                or drag and drop image here
                              </p>
                              <p className="text-xs text-text_weak mt-2">
                                PNG or JPG(max. 500x600px)
                              </p>
                            </>
                          )}
                          <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* product options */}
                <section className="w-[323px] h-[972px]">
                  {/* name */}
                  <div className="pb-4 w-full">
                    <label htmlFor="name">
                      <p className="pb-2 text-sm">Name</p>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="on"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="border w-full border-stroke_strong outline-none focus:border-stroke_strong placeholder:text-text_weak rounded-md h-[40px] py-2 pl-4"
                      />
                    </label>
                  </div>

                  {/* regular price */}
                  <div className="pb-4 w-full relative">
                    <label htmlFor="price">
                      <p className="pb-2 text-sm">Regular price</p>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border  w-full border-stroke_strong outline-none focus:border-stroke_strong placeholder:text-text_weak rounded-md h-[40px] py-2 pl-24"
                      />
                      {/* price list */}
                      <div className="absolute top-[38px] left-4">
                        <p className="flex items-center text-sm text-text_weak gap-1">
                          NGN ₦
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* discount price */}
                  <div className="pb-4 w-full relative">
                    <label htmlFor="discount-price">
                      <p className="pb-2 text-sm">
                        Discount price{" "}
                        <span className="text-sm  text-text_weak">
                          (Optional)
                        </span>
                      </p>
                      <input
                        type="text"
                        name="discount-price"
                        id="discount-price"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        className="border w-full border-stroke_strong outline-none focus:border-stroke_strong placeholder:text-text_weak rounded-md h-[40px] py-2 pl-24"
                      />
                      {/* price list */}
                      <div className="absolute top-[38px] left-4">
                        <p className="flex items-center text-sm text-text_weak gap-1">
                          NGN ₦
                        </p>
                      </div>

                      {/* discount display */}
                      {calculateDiscount() && (
                        <div className="absolute top-[38px] right-4">
                          <p className="flex items-center text-sm text-error_1">
                            {calculateDiscount()}
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* size filter options */}
                  <div className="pt-4">
                    <p className="pb-2 text-sm">Size</p>

                    <p className="text-[12px] 2xl:text-sm text-text_weak relative flex gap-1  items-center">
                      <span>{info()}</span>Select all product available size
                      below
                    </p>

                    {/* size option filter itself */}
                    <div className="flex gap-4 pt-4 flex-col">
                      <div className="flex gap-3">
                        {/*  */}
                        <div
                          onClick={() => handleSizeToggle("XS")}
                          className={`w-full border text-center rounded-lg ${
                            selectedSizes.includes("XS")
                              ? "border-text_strong bg-stroke_weak"
                              : "border-stroke_strong"
                          } py-2 px-6`}
                        >
                          <h3 className="text-sm">XS</h3>
                          <p className="text-sm text-text_weak">Extra Small</p>
                        </div>
                        {/*  */}
                        <div
                          onClick={() => handleSizeToggle("S")}
                          className={`w-full border text-center rounded-lg ${
                            selectedSizes.includes("S")
                              ? "border-text_strong bg-stroke_weak"
                              : "border-stroke_strong"
                          } py-2 px-6`}
                        >
                          <h3 className="text-sm">S</h3>
                          <p className="text-sm text-text_weak">Small</p>
                        </div>
                      </div>

                      {/*  */}
                      <div className="flex gap-3">
                        {/*  */}
                        <div
                          onClick={() => handleSizeToggle("M")}
                          className={`w-full border text-center rounded-lg ${
                            selectedSizes.includes("M")
                              ? "border-text_strong bg-stroke_weak"
                              : "border-stroke_strong"
                          } py-2 px-4 2xl:px-6`}
                        >
                          <h3 className="text-sm">M</h3>
                          <p className="text-sm text-text_weak">Medium</p>
                        </div>
                        {/*  */}
                        <div
                          onClick={() => handleSizeToggle("L")}
                          className={`w-full border text-center rounded-lg ${
                            selectedSizes.includes("L")
                              ? "border-text_strong bg-stroke_weak"
                              : "border-stroke_strong"
                          } py-2 px-4 2xl:px-6`}
                        >
                          <h3 className="text-sm">L</h3>
                          <p className="text-sm text-text_weak">Large</p>
                        </div>
                      </div>

                      <div
                        onClick={() => handleSizeToggle("XL")}
                        className={`w-full border text-center rounded-lg ${
                          selectedSizes.includes("XL")
                            ? "border-text_strong bg-stroke_weak"
                            : "border-stroke_strong"
                        } py-2 px-4 2xl:px-6`}
                      >
                        <h3 className="text-sm">XL</h3>
                        <p className="text-sm text-text_weak">Extra Large</p>
                      </div>
                    </div>

                    {/* category */}
                    <div className="pt-3">
                      <p className="text-sm pb-2">category</p>

                      <p className="flex gap-1 text-sm text-text_weak pb-2 items-center">
                        {info()}Select a product category below
                      </p>

                      {/* category filter options */}
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                          <div
                            onClick={() => handleCategoryChange("men")}
                            className={`border rounded-lg text-center text-sm w-full ${
                              selectedCategory === "men"
                                ? "border-text_strong bg-stroke_weak"
                                : "border-stroke_strong"
                            } py-2 px-6`}
                          >
                            Men
                          </div>
                          <div
                            onClick={() => handleCategoryChange("women")}
                            className={`border rounded-lg text-center text-sm w-full ${
                              selectedCategory === "women"
                                ? "border-text_strong bg-stroke_weak"
                                : "border-stroke_strong"
                            } py-2 px-6`}
                          >
                            Women
                          </div>
                        </div>
                        <div
                          onClick={() => handleCategoryChange("unisex")}
                          className={`border rounded-lg text-center text-sm w-full ${
                            selectedCategory === "unisex"
                              ? "border-text_strong bg-stroke_weak"
                              : "border-stroke_strong"
                          } py-2 px-6`}
                        >
                          Unisex
                        </div>
                      </div>
                    </div>

                    {/* sub-category */}
                    <div className="pt-3">
                      <p className="text-sm pb-2">
                        {selectedCategory} sub-category
                      </p>

                      <p className="flex gap-1 text-sm text-text_weak pb-2 items-center">
                        {info()}Select a sub category below
                      </p>

                      <div className="grid grid-cols-2 flex-wrap gap-3 w-full">
                        {subCategories[selectedCategory].map((subCat) => (
                          <div
                            key={subCat}
                            onClick={() => setSelectedSubCategory(subCat)}
                            className={`border rounded-lg text-center text-sm col-span-1 ${
                              selectedSubCategory === subCat
                                ? "border-text_strong bg-stroke_weak"
                                : "border-stroke_strong"
                            } py-2 px-6 cursor-pointer`}
                          >
                            {subCat}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* about product */}
                    <div className="pt-3">
                      <p className="pb-2">About product</p>

                      <textarea
                        name=""
                        className="w-full h-[88px] border rounded-lg text-sm  resize-none border-stroke_strong outline-none focus:border-stroke_strong placeholder-text-text_weak p-2"
                        id=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex flex-col lg:gap-2 2xl:gap-6 pt-4 pb-2">
                    <button
                      onClick={handleProductUpload}
                      disabled={isUploading || isSaving || images.length === 0}
                      className={`rounded-full py-[10px] px-18 border border-text_strong text-center text-sm 
                          ${
                            isUploading || isSaving
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-text_strong hover:bg-text_strong/90"
                          } 
                          text-white flex items-center justify-center`}
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Uploading...
                        </>
                      ) : (
                        "Upload product"
                      )}
                    </button>

                    <button
                      onClick={handleSaveToDraft}
                      disabled={isUploading || isSaving || images.length === 0}
                      className="rounded-full py-[10px] px-18 border border-stroke_strong text-center text-sm text-text_strong flex justify-center items-center "
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2" />
                          Saving...
                        </>
                      ) : (
                        "Save to draft"
                      )}
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
