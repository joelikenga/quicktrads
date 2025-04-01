"use client";
import { ProfileAvatar } from "@/app/global/profileGenerator";
import { SafeImage } from "@/app/global/SafeImage";
import { arrowDown, uploadIcon } from "@/app/global/svg";
import { useEffect, useState } from "react";

export const Body = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    setUserData(localStorage.getItem("user"));
  });

  const [formData, setFormData] = useState({
    address: "",
    avatar: "",
    country: "#E9C46A",
    dob: "",
    email: "",
    fullName: "",
    gender: "",
    password: "",
    phoneNumber: "",
    state: "",
  });

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

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const base64 = await convertFileToBase64(file);
      const cloudinaryUrl = await uploadImageToCloudinary(base64);
      setFormData((prev) => ({
        ...prev,
        avatar: cloudinaryUrl,
      }));
      setImageError(null);
    } catch (error) {
      console.error("Failed to upload hero image:", error);
      setImageError("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleImageUpload(file);
    };
    input.click();
  };

  return (
    <div className=" flex flex-col gap-8 h-[82px] border-b px-4 md:px-0  md:ml-[280px] mt-[150px]">
      <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
        <p className="text-text_strong text-[22px]">Profile</p>
        <p className="text-text_weak text-base ">Update your profile details</p>
      </div>

      {/* input */}

      <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">
        {/* image upload */}
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          {!userData?.avatar ? (
            <ProfileAvatar name={JSON.parse(userData)?.fullName || "User"} size="large" />
          ) : (
            <SafeImage
            className="rounded-full w-16 h-16"
              src={userData?.avatar}
              alt=""
              width={50}
              height={50}
              priority
            />
          )}
          <div
            onClick={handleImageClick}
            className="flex gap-2 pr-6 pl-5 h-8 justify-center items-center border rounded-full font-medium text-sm"
          >
            <i>{uploadIcon()}</i>
            <p>Upload image</p>
          </div>
        </div>

        {/* inputs */}

        <div className="flex flex-col items-start gap-4 w-full ">
          {/* fullName and Email */}
          <div className="flex flex-col sm:flex-row gap-8 justify-start items-center w-full">
            {/* fullName */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="">Full name</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="">Email</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* phone and Gender */}
          <div className="flex flex-col sm:flex-row  gap-8 justify-start items-center w-full">
            {/* Phone */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="">Phone number</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
              <p className="">Gender</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                  // value={`male`}
                />
                <span className="  absolute top-[42px] right-4">
                  {arrowDown()}
                </span>
                {false && (
                  <div className=" py-4 border w-full rounded-xl gap-2 flex flex-col absolute z-20 mt-1 ">
                    <div className="h-9 p-4 bg-fill flex items-center">
                      Male
                    </div>
                    <div className="h-9 p-4 bg-fill flex items-center">
                      Male
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* country and DOB */}
          <div className="flex flex-col sm:flex-row  gap-8 justify-start items-center w-full">
            {/* Phone */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="">Date of birth</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="date"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
              <p className="">Country</p>
              <div className=" w-full">
                <div className="outline-none border rounded-lg h-10 px-4  w-full flex items-center">
                  Nigeria
                </div>
                <span className="  absolute top-[42px] right-4">
                  {arrowDown()}
                </span>
                {
                  <div className=" py-4 border w-full rounded-xl gap-2 flex flex-col absolute ">
                    <div className="h-9 p-4 bg-fill flex items-center">
                      Nigeria
                    </div>
                    <div className="h-9 p-4 bg-fill flex items-center">USA</div>
                  </div>
                }
              </div>
            </div>
          </div>

          {/* State and Address */}
          <div className="flex flex-col sm:flex-row  gap-8 justify-start items-center w-full">
            {/* State */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="">State</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            {/* State */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="">Address</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        {/* button */}

        <div className="flex gap-8 justify-start items-center w-full text-base font-medium  mt-2 mb-8">
          <button className="max-w-[153px] w-full text-background bg-text_strong rounded-full px-6 h-10 flex justify-center items-center">
            Update
          </button>
          <button className="max-w-[153px] w-full text-text_strong border bg-background rounded-full px-6 h-10 flex justify-center items-center">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
