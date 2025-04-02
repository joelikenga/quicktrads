"use client";
import { ProfileAvatar } from "@/app/global/profileGenerator";
import { SafeImage } from "@/app/global/SafeImage";
import { arrowDown, uploadIcon } from "@/app/global/svg";
import { loggedInUser, UpdateUserDetails } from "@/utils/api/user/auth";
import { successToast } from "@/utils/toast/toast";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export const Body = () => {
  const [isUploading, setIsUploading] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [imageError, setImageError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [showGender, setShowGender] = useState<any | null>(null);
  const [imgLink, setImgLink] = useState<string | null>(null);

  const genderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genderRef.current &&
        !genderRef.current.contains(event.target as Node)
      ) {
        setShowGender(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setUserData(localStorage.getItem("user"));
  });

  const [formData, setFormData] = useState({
    address: "",
    avatar: "",
    country: "",
    dob: "",
    email: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    state: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        avatar: JSON.parse(userData)?.avatar,
        fullName: JSON.parse(userData)?.fullName,
        email: JSON.parse(userData)?.email,
        phoneNumber: JSON.parse(userData)?.phoneNumber,
        gender: JSON.parse(userData)?.gender,
        dob: JSON.parse(userData)?.dob,
        country: JSON.parse(userData)?.country,
        state: JSON.parse(userData)?.state,
        address: JSON.parse(userData)?.address,
      }));
    }
  }, [userData]);

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
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
      setImgLink(cloudinaryUrl);
      setFormData((prev) => ({
        ...prev,
        avatar: cloudinaryUrl,
      }));
      // setImageError(null);
    } catch (error) {
      console.error("Failed to upload hero image:", error);
      // setImageError("Failed to upload image");
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

  const formatDateForDisplay = (dob: string) => {
    if (!dob) return "";
    const date = new Date(dob);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(user);
    }
  }, []);

  const updateDetails = useCallback(async () => {
    try {
      // Get the raw date value from formData (already in YYYY-MM-DD format from input)
      const dobValue =
        formatDateForDisplay(formData.dob) || JSON.parse(userData)?.dob;
      console.log(dobValue);
      const response = await UpdateUserDetails({
        avatar: formData.avatar || JSON.parse(userData)?.avatar,
        fullName: formData.fullName || JSON.parse(userData)?.fullName,
        email: formData.email || JSON.parse(userData)?.email,
        phoneNumber: formData.phoneNumber || JSON.parse(userData)?.phoneNumber,
        gender: formData.gender || JSON.parse(userData)?.gender,
        dob: dobValue, // Use the raw value which is already in correct format
        country: formData.country || JSON.parse(userData)?.country,
        state: formData.state || JSON.parse(userData)?.state,
        address: formData.address || JSON.parse(userData)?.address,
      });

      const fetchUserData = await loggedInUser();
      if (response && fetchUserData) {
        localStorage.setItem("user", JSON.stringify(fetchUserData?.data));
      }
      successToast("Profile updated");
      window.location.reload();
    } catch (err: any) {
      throw err;
    }
  }, [formData, userData]);

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
          {imgLink ? (
            <SafeImage
              className="rounded-full w-16 h-16"
              src={imgLink}
              alt=""
              width={50}
              height={50}
              priority
            />
          ) : (
            <>
              {!JSON.parse(userData)?.avatar ? (
                <ProfileAvatar
                  name={JSON.parse(userData)?.fullName || "User"}
                  size="large"
                />
              ) : (
                <SafeImage
                  className="rounded-full w-16 h-16"
                  src={JSON.parse(userData)?.avatar}
                  alt=""
                  width={50}
                  height={50}
                  priority
                />
              )}
            </>
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

        <div className="flex flex-col items-start gap-2 sm:gap-4 w-full ">
          {/* fullName and Email */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-8 justify-start items-center w-full">
            {/* fullName */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Full name</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                  value={formData.fullName || ""}
                  onChange={handleInputChange("fullName")}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Email</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange("email")}
                />
              </div>
            </div>
          </div>

          {/* phone and Gender */}
          <div className="flex flex-col sm:flex-row gap-2  md:gap-8 justify-start items-center w-full">
            {/* Phone */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Phone number</p>
              <div className="w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="number"
                  value={formData.phoneNumber || ""}
                  onChange={handleInputChange("phoneNumber")}
                />
              </div>
            </div>

            {/* Gender */}
            <div
              ref={genderRef}
              className="flex flex-col gap-2 w-full max-w-[323px] relative"
            >
              <p className="">Gender</p>
              <div className="w-full">
                <div
                  className="outline-none border rounded-lg h-10 px-4 w-full flex items-center justify-between cursor-pointer"
                  onClick={() => setShowGender(!showGender)}
                >
                  {formData.gender || "Select Gender"}
                  <span
                    className={`absolute top-[42px] right-4 duration-300 ${
                      !showGender ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    {arrowDown()}
                  </span>
                </div>
                {showGender && (
                  <div className="py-4 border w-full rounded-xl gap-2 flex flex-col absolute z-20 mt-1 bg-white">
                    <div
                      className="h-9 p-4  flex items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          gender: "Male",
                        }));
                        setShowGender(false);
                      }}
                    >
                      Male
                    </div>
                    <div
                      className="h-9 p-4  flex items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          gender: "Female",
                        }));
                        setShowGender(false);
                      }}
                    >
                      Female
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* country and DOB */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-8 justify-start items-center w-full">
            {/* Phone */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Date of birth</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4 w-full"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value={formatDateForDisplay(formData.dob)}
                  onChange={handleInputChange("dob")}
                />
              </div>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
              <p className="text-sm sm:text-base">Country</p>
              <div className=" w-full">
                <div className="outline-none border rounded-lg h-10 px-4  w-full flex items-center">
                  Nigeria
                </div>
                <span className="  absolute top-[42px] right-4">
                  {arrowDown()}
                </span>
                {false && (
                  <div className=" py-4 border w-full rounded-xl gap-2 flex flex-col absolute ">
                    <div className="h-9 p-4 bg-fill flex items-center">
                      Nigeria
                    </div>
                    <div className="h-9 p-4 bg-fill flex items-center">USA</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* State and Address */}
          <div className="flex flex-col sm:flex-row  gap-8 justify-start items-center w-full">
            {/* State */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">State</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                  value={formData.state || ""}
                  onChange={handleInputChange("state")}
                />
              </div>
            </div>
            {/* State */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Address</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                  value={formData.address || ""}
                  onChange={handleInputChange("address")}
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
          <Link
            href={`/forget_password`}
            className="max-w-[153px w-fit text-text_strong border bg-background rounded-full px-6 h-10 flex justify-center items-center"
          >
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
};
