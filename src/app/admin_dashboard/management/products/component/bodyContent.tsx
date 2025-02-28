"use client";

import {
  arrowleft,
  editIcon,
  imageadd,
  info,
  nextIcon,
  noproducts,
  previousIcon,
  review_1,
  searchIcon,
  trash,
} from "@/app/global/svg";
import { useState, useRef,  useEffect } from "react";
import Image from "next/image";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
} from "../../../../../../utils/api/admin/products";
import { useRouter } from "next/navigation"; // Add this at the top with other imports

// interface ProductData {
//   name: string;
//   regularPrice: number;
//   discountPrice?: number;
//   sizes: string[];
//   category: string;
//   about: string;
//   images: string[];
// }

// Add interface for pagination
interface PaginationData {
  hasPreviousPage: boolean;
  has_next_page: boolean;
  page: number;
  size: number;
  totalCount: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  priceDiscount?: number;
  category: string;
  subCategory: string;
  status: string;
  images: string[];
  stars: number;
  ordersCount: number;
  isFeatured: boolean;
  description: string;
}

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

export const BodyContent = () => {
  const router = useRouter(); // Add this at the top with other imports
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

  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [products, setProducts] = useState<TransformedProduct[]>([]);

  const [page, setPage] = useState<number>(1);
  // const [size] = useState<number>(10);  // Remove setSize as it's now fixed
  const [searchQuery, setSearchQuery] = useState("");


  console.log("upload error", uploadError);

  const [paginationData, setPaginationData] = useState<PaginationData>({
    hasPreviousPage: false,
    has_next_page: false,
    page: 1,
    size: 10,
    totalCount: 0,
  });

  const [allProducts, setAllProducts] = useState<TransformedProduct[]>([]);
  const ITEMS_PER_PAGE = 7;

  // Update subcategory when main category changes
  const handleCategoryChange = (category: "men" | "women" | "unisex") => {
    setSelectedCategory(category);
    setSelectedSubCategory(""); // Reset subcategory when main category changes
  };

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
        const response = await createProduct(productData);
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
      const response = await createProduct(productData);
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

  const getAllproducts = async () => {
    try {
      const response = await fetchAllProducts(1, 1000); // Get all products at once

      console.log("All products response:", response);
      
      const transformedProducts = response?.data?.map((product: Product): TransformedProduct => ({
        id: product.id,
        images: product.images[0],
        name: product.name,
        price: product.price,
        discountPrice: product.priceDiscount,
        category: product.category,
        subCategory: product.subCategory,
        rating: product.stars,
        status: product.status,
        ordersCount: product.ordersCount,
        isFeatured: product.isFeatured
      })) || [];

      setAllProducts(transformedProducts);
      
      // Set pagination data
      setPaginationData({
        hasPreviousPage: page > 1,
        has_next_page: page < Math.ceil(transformedProducts.length / ITEMS_PER_PAGE),
        page: page,
        size: ITEMS_PER_PAGE,
        totalCount: transformedProducts.length
      });
      
    } catch (error) {
      console.error("Error fetching all products:", error);
      setAllProducts([]);
      setPaginationData({
        hasPreviousPage: false,
        has_next_page: false,
        page: 1,
        size: ITEMS_PER_PAGE,
        totalCount: 0
      });
    }
  };

  // Add function to get current page items
  const getCurrentPageItems = () => {
    const filteredProducts = getFilteredProducts(allProducts);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update products state with paginated results
    setProducts(paginatedProducts);
    
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    
    // Update pagination data based on filtered results
    setPaginationData(prev => ({
      ...prev,
      hasPreviousPage: page > 1,
      has_next_page: page < totalPages,
      totalCount: filteredProducts.length,
      page: page // Ensure current page is set correctly
    }));
  };

  // Update page change handler
  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Update getFilteredProducts to work with allProducts
  const getFilteredProducts = (productsToFilter: TransformedProduct[] = allProducts) => {
    if (!searchQuery) return productsToFilter;

    const searchTerm = searchQuery.toLowerCase();
    return productsToFilter.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subCategory.toLowerCase().includes(searchTerm) ||
      product.status.toLowerCase().includes(searchTerm)
    );
  };

  // Update useEffect to handle pagination
  useEffect(() => {
    getCurrentPageItems();
  }, [page, searchQuery, allProducts]);

  useEffect(() => {
    getAllproducts();
    const interval = setInterval(() => {
      getAllproducts();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add form input handlers
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };


  // Add this helper function after the component declaration
  const generatePaginationRange = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      2,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages - 1,
      totalPages,
    ];
  };

  // Add function to handle row click
  const handleRowClick = (productId: string) => {
    router.push(`/admin_dashboard/management/products/${productId}`);
  };

  // Add function to handle edit click
  const handleEditClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); // Prevent row click event from firing
    router.push(`/admin_dashboard/management/products/${productId}?edit=true`);
  };

  const handleDeleteClick = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); // Prevent row click event from firing

      try {
        // Call the deleteProduct function from your API utility
        await deleteProduct(productId);
        console.log("Product deleted successfully");

        // Refresh the product list after deletion
        getAllproducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
  };

  

  return (
    <div className="mt-[120px] ml-[240px] h-full max-w-[1040px] w-full">
      {/* Show no products view when products array is empty */}
      {  products.length === 0  ? (
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center justify-start">
            <div className="flex items-center text-[18px] font-medium text-text_strong">
              Products
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center items-center w-full">
              <div className="mt-20 flex flex-col items-center justify-center gap-4">
                <i>{noproducts()}</i>
                <div className="text-[18px] font-medium text-text_strong w-full max-w-[290px] gap-2 text-center">
                  <p>There are currently no products!</p>
                  <p className="text-[14px] font-normal text-text_weak">
                    It looks like there are currently no products available at
                    the moment
                  </p>
                </div>
                <button
                  onClick={() => setAddProduct(true)}
                  className="w-[160px] h-[38px] bg-text_strong text-background rounded-full"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Show either add product form or products table */}
          {addProduct ? (
            <div className="h-full">
              {/* Add product form content */}
              <div
                onClick={() => setAddProduct(false)}
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
          ) : (
            /* Products table view */
            <div className="w-full flex flex-col gap-6">
              <div className="w-full flex items-center justify-start">
                <div className="flex items-center text-[18px] font-medium text-text_strong">
                  Products
                </div>
              </div>
              {/* Search section */}
              <div className="w-full flex items-center justify-between">
                <div className="h-8 rounded-full border border-stroke_strong flex items-center gap-2 px-4 bg-fill">
                  {searchIcon()}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by product details, category, sub-category, or status"
                    className="outline-none w-full h-full bg-inherit"
                  />
                </div>

                {/* add products */}
                <button
                  onClick={() => setAddProduct(true)}
                  className="w-[160px] h-8 bg-text_strong text-background rounded-full"
                >
                  Add Product
                </button>
              </div>
              {/* Products table */}
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-stroke_weak mt-12 overflow-x-auto">
                  <thead className="text-start bg-background border-y">
                    <tr className="">
                      <th
                        scope="col"
                        className="px-4 py-[12px] text-start  font-normal text-sm h-10 "
                      >
                        Product details
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                      >
                        Sub-category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                      >
                        Rating
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-[12px] text-start  font-normal text-sm h-10"
                      ></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-stroke_weak">
                    {products.map((product) => (
                      <tr 
                        key={product.id} 
                        className="cursor-pointer hover:bg-stroke_weak/20"
                        onClick={() => handleRowClick(product.id)}
                      >
                        <td className="p-4">
                          <div className="flex gap-6 items-start w-ful w-[304px]">
                            <Image
                              src={product.images || "/placeholder.png"} // Add a placeholder image
                              className="w-[69px] h-[80px]"
                              width={69}
                              height={80}
                              priority
                              alt={product.name}
                            />
                            <div className="text-text_strong text-sm font-normal text-wrap">
                              {product.name}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap flex-flex-col gap-2">
                            <p>₦{product.price.toLocaleString()}</p>
                            {product.discountPrice && product.discountPrice > 0 && (
                              <p className="line-through text-text_weak">
                                ₦{product.price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap flex-flex-col gap-2">
                            <p className="capitalize">{product.category}</p>
                            {product.isFeatured && (
                              <p className="text-text_weak">Featured</p>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap flex-flex-col gap-2">
                            <p className="capitalize">{product.subCategory}</p>
                            {/* Add trending logic if needed */}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-text_strong text-sm font-normal text-nowrap flex-flex-col gap-2">
                            <i>{review_1()}</i>
                            <p className="text-text_weak">
                              {`(${product.rating || 0} reviews)`}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-text_strong text-sm font-normal text-wrap">
                            <div
                              className={`h-6 flex px-2 items-center justify-center rounded-full ${
                                product.status === "active"
                                  ? "bg-[#F5FFFC] text-[#109368]"
                                  : "bg-[#FFF5F5] text-[#931010]"
                              } text-sm font-medium gap-1`}
                            >
                              <span
                                className={`rounded-full w-2 h-2 ${
                                  product.status === "active"
                                    ? "bg-[#109368]"
                                    : "bg-[#931010]"
                                }`}
                              ></span>
                              <p className="capitalize">{product.status}</p>
                            </div>
                          </div>
                        </td>

                        <td className="">
                          <div className="text-text_strong text-sm font-normal text-nowrap flex gap-4">
                            <i
                              className="cursor-pointer"
                              onClick={(e) => handleEditClick(e, product.id)}
                            >
                              {editIcon()}
                            </i>
                            <i
                              onClick={(e) => handleDeleteClick(e, product.id)}

                              className="cursor-pointer"
                            >
                              {trash()}
                            </i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="flex justify-between p-4 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className={`text-text_weak flex items-center gap-2 ${
                      page <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {" "}
                    <i>{previousIcon()}</i>
                    <> Previous</>
                  </button>

                  <div className="flex gap-1">
                    {generatePaginationRange(
                      paginationData.page,
                      Math.ceil(paginationData.totalCount / paginationData.size)
                    ).map((pageNum, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          typeof pageNum === "number" &&
                          handlePageChange(pageNum)
                        }
                        className={`h-10 w-10 flex items-center rounded-full justify-center ${
                          pageNum === paginationData.page
                            ? "bg-fill text-black  border"
                            : typeof pageNum === "number"
                            ? "cursor-pointer hover:bg-stroke_weak"
                            : "cursor-default"
                        }`}
                      >
                        {pageNum}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= Math.ceil(allProducts.length / ITEMS_PER_PAGE)}
                    className={`text-text_weak flex items-center gap-2 ${
                      page >= Math.ceil(allProducts.length / ITEMS_PER_PAGE)
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <>Next</>
                    <i>{nextIcon()}</i>
                  </button>
                </div>

                <p className="font-medium text-base">
                  Page {page} of{" "}
                  {Math.ceil(allProducts.length / ITEMS_PER_PAGE)}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};