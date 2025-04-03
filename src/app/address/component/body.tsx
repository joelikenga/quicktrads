"use client";
import { closeIcon, mapIcon } from "@/app/global/svg";
import { Lora } from "next/font/google";
import { useEffect, useState } from "react";
import { loggedInUser } from "../../../utils/api/user/auth";
import {
  deleteShippingAddress,
  shippingAddress,
} from "../../../utils/api/user/product";
import { successToast } from "@/utils/toast/toast";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

interface Address {
  address: string;
  country: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  state: string;
}

export const Body = () => {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [deleteAddress, setDeleteAddress] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<Address>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    country: "",
  });
  const [shippingData, setShippingData] = useState<Address[]>([]);
  const [selectedAddressId] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddress = async () => {
    const data: Address = {
      fullName: addressData.fullName,
      email: addressData.email,
      phoneNumber: addressData.phoneNumber,
      address: addressData.address,
      state: addressData.state,
      country: addressData.country,
    };

    try {
      const res = await shippingAddress(data);
      await getShippindData();
      // Clear the form
      if (res){
      setAddressData({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        state: "",
        country: "",
      });
        successToast('Address added');
      }
      window.location.reload()
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const getShippindData = async () => {
    try {
      setLoading(true);
      const shipping_res = await loggedInUser();
      const transformedData =
        shipping_res?.data?.shippingDetails?.map((detail: Address) => ({
          fullName: detail.fullName,
          email: detail.email,
          phoneNumber: detail.phoneNumber,
          address: detail.address,
          state: detail.state,
          country: detail.country,
        })) || [];
      setShippingData(transformedData);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressDelete = async (index: number) => {
    try {
      await deleteShippingAddress(index);
      setShippingData((prev) => prev.filter((_, i) => i !== index));
      setDeleteAddress(false);
      successToast('Address deleted');
      window.location.reload()

    } catch (error: unknown) {
      throw error;
    }
  };

  useEffect(() => {
    getShippindData();
  }, []);

  const handleAddressInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Address
  ) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleAddressSubmit = async () => {
    await handleAddress();
    setAddressModal(false);
  };

  // Skeleton Loading Components
  const AddressSkeleton = () => (
    <div className="max-w-[600px] rounded-2xl border border-stroke_weak p-6 flex flex-col gap-4 animate-pulse">
      <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
      <div className="flex gap-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="flex justify-end gap-4 mt-2">
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const EmptyStateSkeleton = () => (
    <div className="w-full flex justify-center items-center mt-12 animate-pulse">
      <div className="w-full max-w-[400px] flex flex-col gap-8 items-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col gap-4 text-center">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
        <div className="h-12 w-full bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="px-4 md:px-0 flex flex-col gap-8 md:ml-[280px] mt-[150px]">
      {/* Add address modal */}
      {addressModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-start backdrop-blur px-4 md:px-0 overflow-y-auto">
          <div className="bg-white max-w-[480px] w-full h-fit p-4 md:p-8 flex flex-col gap-8 rounded-lg mt-20 mb-6">
            <div className="w-full flex justify-between items-center">
              <p className="text-text_strong text-[18px] font-medium">
                Add address
              </p>
              <i
                onClick={() => setAddressModal(false)}
                className="cursor-pointer"
              >
                {closeIcon()}
              </i>
            </div>

            {/* Address form */}
            <div className="w-full flex flex-col gap-4">
              {[
                { label: "Full name", field: "fullName", type: "text" },
                { label: "Email", field: "email", type: "email" },
                { label: "Phone number", field: "phoneNumber", type: "tel" },
                { label: "Address", field: "address", type: "text" },
                { label: "State", field: "state", type: "text" },
                { label: "Country", field: "country", type: "text" },
              ].map((item) => (
                <div key={item.field} className="flex flex-col gap-2 w-full">
                  <p>{item.label}</p>
                  <input
                    className="outline-none border rounded-lg h-10 px-4 w-full"
                    type={item.type}
                    value={addressData[item.field as keyof Address]}
                    onChange={(e) =>
                      handleAddressInput(e, item.field as keyof Address)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Form buttons */}
            <div className="flex gap-2 sm:gap-2 justify-between items-center w-full font-medium text-base mt-2">
              <button
                onClick={handleAddressSubmit}
                className="w-full text-nowrap text-background bg-text_strong rounded-full px-2 md:px-6 h-12 flex justify-center items-center"
              >
                Add address
              </button>
              <button
                onClick={() => setAddressModal(false)}
                className="w-full text-nowrap text-text_strong border bg-background rounded-full px-2 md:px-6 h-12 flex justify-center items-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete address modal */}
      {deleteAddress && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg">
            <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {mapIcon()}
              </div>
              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                Are you sure you want to delete address?
              </p>
              <p className="text-text_weak text-sm md:text-base font-normal">
                This action will delete address. If you're not ready to make
                changes, you can save them for later instead
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => handleAddressDelete(deleteIndex)}
              >
                Delete
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteAddress(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex justify-between w-full max-w-7xl items-start">
        <div className="flex flex-col gap-2 w-fit font-normal">
          <p className="text-text_strong text-[22px]">Address</p>
          <p className="text-text_weak sm:text-base text-[12px] sm:w-full">
            Add, update and select your address information
          </p>
        </div>
        <button
          onClick={() => setAddressModal(true)}
          className="w-fit max-w-[323px] text-background bg-text_strong rounded-full text-nowrap px-6 mr-0 md:mr-9 xl:mr-0 h-10 flex justify-center items-center lg:mr-10"
        >
          Add address
        </button>
      </div>

      {/* Address list */}
      <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">
        {loading ? (
          <div className="w-full">
            {[...Array(2)].map((_, i) => (
              <AddressSkeleton key={i} />
            ))}
          </div>
        ) : shippingData.length === 0 ? (
          <div className="w-full flex justify-center items-center mt-12">
            <div className="w-full max-w-[400px] flex flex-col gap-8 items-center">
              {mapIcon()}
              <div className="flex flex-col gap-4 font-normal text-center">
                <p className="text-text_strong text-[22px]">
                  There are currently no address yet!
                </p>
                <p className="text-text_weak text-base">
                  Add shipping address to your account to enjoy seamless
                  checkout and delivery
                </p>
              </div>
              <button
                onClick={() => setAddressModal(true)}
                className="bg-text_strong text-background font-medium text-base h-12 w-full px-6 flex rounded-full items-center justify-center"
              >
                Add address
              </button>
            </div>
          </div>
        ) : (
          <div className="my-8 w-full flex flex-col gap-2">
            {shippingData.map((data, index) => (
              <div
                key={index}
                className={`max-w-[600px] rounded-2xl border border-text_strong p-6 flex flex-col justify-start gap-2 cursor-pointer transition-colors relative ${
                  selectedAddressId === index
                    ? "bg-fill overflow-hidden"
                    : "bg-white"
                }`}
              >
                {selectedAddressId === index && (
                  <div className="h-12 w-5 bg-black absolute rotate-[45deg] -top-4 -translate-x-[30px]"></div>
                )}
                <div className="w-full flex justify-between">
                  <p className="text-text_strong font-medium text-base">
                    {data.fullName}
                  </p>
                  <div className="flex gap-4 font-medium text-sm">
                    {/* <div className="cursor-pointer">Edit</div> */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteIndex(index);
                        setDeleteAddress(true);
                      }}
                      className="cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                </div>

                <div className="font-normal text-text_weak flex flex-col items-start gap-2 w-full">
                  <div className="flex gap-3 sm:gap-4 font-medium text-sm">
                    <div>{data.phoneNumber}</div>
                    <div>{data.email}</div>
                  </div>
                  <p className="font-medium text-sm">
                    {`${data.address}, ${data.state}, ${data.country}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
