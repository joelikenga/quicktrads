import { arrowleft, info } from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  updateContent,
  getContent,
  createContent,
} from "@/utils/api/admin/products";
import LoadingSkeleton from "./LoadingSkeleton";

interface EditContentProps {
  onClick: () => void;
}

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const colors = [
  "#E9C46A",
  "#FEEDC2",
  "#DFDACF",
  "#F6F4F4",
  "#FFE1E1",
  "#E1FFF6",
];

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

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    // errorToast(error);
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

const PromoteContent: React.FC<EditContentProps> = ({ onClick }) => {
  const [selectedColor, setSelectedColor] = useState<string>("#E9C46A");
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    backgroundColor: "#E9C46A",
    heroTitle: "",
    heroSubTitle: "",
    heroImage: "",
    heroBtnText: "",
    heroBtnTextColor: "#FFFFFF",
    heroBtnBgColor: "#000000",
    heroBtnCTA: "",
    heroPageName: "heroPagePromotion" as const,
  });
  const [isNewContent, setIsNewContent] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
    const [imageError, setImageError] = useState(false);
      const [isLoading, setIsLoading] = useState(true);
    
  

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await getContent();
        if (response.data) {
          const promoteContent = response.data.find(
            (page: any) => page.heroPageName === "heroPagePromotion"
          );
          if (promoteContent) {
            setIsNewContent(false);
            setFormData(promoteContent);
            setSelectedColor(promoteContent.backgroundColor);
          }
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleHeroImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const base64 = await convertFileToBase64(file);
      const cloudinaryUrl = await uploadImageToCloudinary(base64);
      setFormData((prev) => ({
        ...prev,
        heroImage: cloudinaryUrl,
      }));
    } catch (error) {
      console.error("Failed to upload hero image:", error);
    } finally {
      setIsUploading(false);
    }
  };


  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      heroImage: ""
    }));
  };

  const handleSubmit = async () => {
    // Validate all required fields
    if (!formData.heroTitle || !formData.heroSubTitle || !formData.heroBtnText || !formData.heroBtnCTA|| !formData.heroImage) {
      alert("Please fill in all fields before updating");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        backgroundColor: selectedColor,
        heroImage: formData.heroImage, // Use temp image if available
      };

      if (isNewContent) {
        await createContent({
          ...updatedData,
          heroPageName: "heroPagePromotion",
        });
      } else {
        await updateContent(formData.id, updatedData);
      }
      onClick();
    } catch (error) {
      console.error("Failed to save content:", error);
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  function handleColorChange(color: string): void {
    setSelectedColor(color);
  }

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleHeroImageUpload(file);
    };
    input.click();
  };

  const ImageUploadUI = () => (
    <div className="relative group">
      <div
        onClick={handleImageClick}
        className="w-[420px] h-[320px] border-dotted border stroke-stroke_weak cursor-pointer relative overflow-hidden"
        style={{ backgroundColor: selectedColor, zIndex: 0 }}
      >
        {isUploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
          </div>
        ) : formData.heroImage ? (
          <>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Remove
              </button>
            </div>
            <img
              src={formData.heroImage}
              alt="hero"
              className="w-full h-full object-contain z-[1] relative"
              onError={() => setImageError(true)}
              // style={{ display: imageError ? 'none' : 'block' }}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full z-[1]">
            <p className="text-gray-500">Click to upload image</p>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }


  return (
    <>
      <div>
        <h3
          onClick={onClick}
          className="font-[500] flex cursor-pointer items-center gap-1 text-[18px] leading-[28px] text-black"
        >
          <span>{arrowleft()}</span>Edit content
        </h3>

        <section className="mt-[48px]">
          <p className="text-base font-[400] text-black pb-1">Content</p>
          <p className="flex items-center gap-2 text-[14px] text-text_weak">
            <span>{info()}</span>Edit content below and check preview above
            across all device
          </p>

          {/* image and bg filter options */}
          <section className="flex mt-2 pt-2 gap-8">
            <div>
              <p className="text-[14px] text-text_strong font-[400]">Image</p>
              <ImageUploadUI />
            </div>

            {/* Color Selector */}
            <div className="">
              <p className="text-sm leading-[22px] pb-2 font-400">
                Background color
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                {/* color changer */}

                <div className="flex flex-wrap gap-1">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-[24px] h-[24px] rounded-full cursor-pointer border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-[32px] h-[32px] p-1 rounded-full outline-none border-white focus:border-black cursor-pointer border-2 transition-all duration-300 hover:scale-110"
                />
              </div>

              {/* hero adjust content */}
              <div className="pb-4">
                <label htmlFor="header-text">
                  <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">
                    Header
                  </p>
                  <input
                    type="text"
                    value={formData.heroTitle || ""} // Add fallback empty string
                    onChange={handleInputChange("heroTitle")}
                    className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4"
                    id="header-text"
                  />
                </label>
              </div>

              {/* description */}
              <div className="pb-4">
                <label htmlFor="description-text">
                  <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">
                    Description
                  </p>
                  <input
                    type="text"
                    value={formData.heroSubTitle || ""} // Add fallback empty string
                    onChange={handleInputChange("heroSubTitle")}
                    className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4"
                    id="description-text"
                  />
                </label>
              </div>

              {/* Button */}
              <div className="pb-4">
                <label htmlFor="button-text">
                  <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">
                    Button Text
                  </p>
                  <input
                    type="text"
                    value={formData.heroBtnText || ""} // Add fallback empty string
                    onChange={handleInputChange("heroBtnText")}
                    className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4"
                    id="button-text"
                  />
                </label>
              </div>

              <div className="">
                <p className="text-sm leading-[22px] pb-2 font-400">
                  Button Color
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  {/* color changer */}
                  <div className="flex flex-wrap gap-1">
                    {colors.map((color) => (
                      <div
                        key={color}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            heroBtnBgColor: color,
                          }))
                        }
                        className={`w-[24px] h-[24px] rounded-full cursor-pointer border-2 ${
                          formData.heroBtnBgColor === color
                            ? "border-black"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                  <input
                    type="color"
                    value={formData.heroBtnBgColor}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroBtnBgColor: e.target.value,
                      }))
                    }
                    className="w-[32px] h-[32px] p-1 rounded-full outline-none border-white focus:border-black cursor-pointer border-2 transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
              {/* Button Text Color */}
              <div className="pb-4">
                <p className="text-sm leading-[22px] pb-2 font-400">
                  Button Text Color
                </p>
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        heroBtnTextColor: "#FFFFFF",
                      }))
                    }
                    className={`w-[24px] h-[24px] border-black rounded-full cursor-pointer border-2 ${
                      formData.heroBtnTextColor === "#FFFFFF"
                        ? "border-black"
                        : "border-gray"
                    }`}
                    style={{ backgroundColor: "#FFFFFF" }}
                  ></div>
                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        heroBtnTextColor: "#000000",
                      }))
                    }
                    className={`w-[24px] h-[24px]  border-black rounded-full cursor-pointer border-2 ${
                      formData.heroBtnTextColor === "#000000"
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: "#000000" }}
                  ></div>
                </div>
              </div>

              {/* Button link */}
              <div>
                <label htmlFor="button-link-text">
                  <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">
                    Button link
                  </p>
                  <input
                    type="text"
                    value={formData.heroBtnCTA || ""} // Add fallback empty string
                    onChange={handleInputChange("heroBtnCTA")}
                    className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4"
                    id="button-link-text"
                  />
                </label>
              </div>
            </div>
          </section>
        </section>
      </div>

      <div>
        <section className="mt-[48px]">
          <p className="text-base font-[400] text-black pb-1">Content</p>
          <p className="flex items-center gap-2 text-[14px] text-text_weak">
            <span>{info()}</span>Edit content below and check preview above
            across all device
          </p>

          {/* preview screens */}
          <div
            className="w-[790px] 2xl:w-[980px] mb-[48px] mt-[16px] flex"
            style={{ backgroundColor: selectedColor }}
          >
            <div className="py-[76.67px] pl-[61.34px]">
              <h1
                className={`${lora.className} w-[372px] h-[102px] leading-[50.6px] font-[400] pb-[12px] text-[46px]`}
              >
                {formData.heroTitle || ""}
              </h1>

              <p className="text-[12.27px] leading-[16.87px] text-text_weak">
                {formData.heroSubTitle || ""}
              </p>

              <div
                className="w-[94px] h-[30.67px] mt-[24px] flex justify-center items-center py-[6px] px-[18px] rounded-full cursor-pointer selection:no-underline"
                style={{
                  backgroundColor: formData.heroBtnBgColor,
                  color: formData.heroBtnTextColor,
                }}
              >
                <p className="text-[12.27px]">{formData.heroBtnText || ""}</p>
              </div>
            </div>
            <div 
              className="w-[499px] h-[337px] bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${formData.heroImage || "https://res.cloudinary.com/dymkfk58k/image/upload/v1740666686/image_ogsxr3.png"})` 
              }}
            />
          </div>

          <div className="flex gap-4 items-center mb-[14px]">
            <div
              onClick={handleSubmit}
              className="w-[153.3px] cursor-pointer selection:no-underline h-[40px] rounded-full py-[9px] px-[51px] border-1 border text-white bg-black flex justify-center items-center"
            >
              Update
            </div>
            <div
              onClick={onClick}
              className="w-[153.3px] cursor-pointer selection:no-underline h-[40px] rounded-full py-[9px] px-[51px] border-1 border border-stroke_weak flex justify-center items-center"
            >
              Cancel
            </div>
          </div>

        </section>
        
      </div>
    </>
  );
};

export default PromoteContent;
