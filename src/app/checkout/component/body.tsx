/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  closeIcon,
  failedIcon,
  info,
  mapIcon,
  pendingIcon,
  successIcon,
} from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // Add this import
import {
  createOrder,
  deleteShippingAddress,
  shippingAddress,
} from "../../../utils/api/user/product";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { loggedInUser } from "../../../utils/api/user/auth";
import { errorToast, successToast } from "../../../utils/toast/toast";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const FEES = {
  NIGERIA: {
    DELIVERY: 5000, // ₦5,000
    VAT_RATE: 0.075, // 7.5%
  },
  USA: {
    DELIVERY: 100, // $100
    VAT_RATE: 0.08, // 8%
  },
};

const formatPrice = (number: number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

interface Address {
  address: string;
  country: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  state: string;
}

// Add interface for Flutterwave config
interface FlutterwaveConfig {
  public_key: any;
  tx_ref: any;
  amount: any;
  currency: any;
  payment_options: any;
  customer: {
    email: string;
    phone_number: any;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
}

// First, add an interface for the Flutterwave response
interface FlutterwaveResponse {
  status: any;
  transaction_id: any;
  tx_ref: any;
  flw_ref: any;
  amount: number;
  currency: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
}

interface OrderProduct {
  productId: string;
  quantity: number;
}

interface OrderRequest {
  currency: string;
  product: OrderProduct[];
  shippingDetails: ShippingDetails;
  shippingFee: number;
  tax: number;
}

interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  state: string;
  country: string;
}

interface OrderRes {
  id: string;
  createdAt: string;
  updatedAt: string;
  currency: string;
  dhlStatus: string | null;
  dhlStatusCode: string | null;
  order: OrderProduct[];
  paymentMethod: string;
  reason: string | null;
  shippingDetails: ShippingDetails;
  shippingFee: number;
  status: "pending" | "completed" | "failed";
  totalAmount: number;
  trackingID: string | null;
  usdAmount: number;
  userId: string;
}

export const Body = () => {
  const [addressEdit, setAddressEdit] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [deleteAddress, setDeleteAddress] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(0);
  const { cartItems, clearCart } = useCart(); // Add clearCart to destructuring
  const [addressData, setAddressData] = useState<Address>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    country: "",
  });

  const [selectedAddress, setSelectedAddress] = useState<Address>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    country: "",
  });
  const [shippingData, setShippingData] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [orderResponse, setOrderResponse] = useState<OrderRes | null>(null);

  const isNigeria = selectedAddress.country?.toLowerCase() === "nigeria";
  const deliveryFee = isNigeria ? FEES.NIGERIA.DELIVERY : FEES.USA.DELIVERY;
  const vatRate = isNigeria ? FEES.NIGERIA.VAT_RATE : FEES.USA.VAT_RATE;

  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    originalPrice?: number;
    size?: string;
  }

  const productTotal = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );
  const vatAmount = productTotal * vatRate;
  const subTotal = productTotal + vatAmount; // Includes product total and VAT
  const totalQuantity = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.quantity,
    0
  );
  const total = subTotal + deliveryFee; // Final total including delivery fee

  // const handlePayment = () => {
  //   setPending(true); // Show pending state first

  //   // Simulate payment processing
  //   setTimeout(() => {
  //     setPending(false);
  //     // Randomly succeed or fail for demo purposes
  //     const isSuccessful = Math.random() > 0.5;
  //     if (isSuccessful) {
  //       setSuccess(true);
  //     } else {
  //       setFailed(true);
  //     }
  //   }, 2000);
  // };

  const handleAddress = async () => {
    //
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
      console.warn(res.status);
      successToast("Address added");

      // Handle the response if needed
    } catch (error: unknown) {
      throw error;
    }
  };

  const getShippindData = async () => {
    try {
      const shipping_res = await loggedInUser();
      // console.log("logged user", shipping_res);

      const transformedData = shipping_res?.data?.shippingDetails.map(
        (detail: Address) => ({
          fullName: detail.fullName,
          email: detail.email,
          phoneNumber: detail.phoneNumber,
          address: detail.address,
          state: detail.state,
          country: detail.country,
        })
      );
      setShippingData(transformedData);
    } catch (err: unknown) {
      errorToast(err);
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
    // Optionally refresh the address list or show success message
  };

  // Update the config with proper type checking
  const config: FlutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "", // Provide fallback empty string
    tx_ref: Number(new Date().toLocaleDateString("en-GB").replace(/\//g, "")),
    amount: total,
    currency: isNigeria ? "NGN" : "USD",
    payment_options: "card",
    customer: {
      email: selectedAddress.email,
      phone_number: selectedAddress.phoneNumber,
      name: selectedAddress.fullName,
    },
    customizations: {
      title: "Quicktrads",
      description: "Quicktrads Purchase",
      logo: "https://res.cloudinary.com/dtjf6sic8/image/upload/v1740862649/quicktrads/atqfeghcpsmjplrsaf6r.svg",
    },
  };

  // Type the response properly
  const fwConfig = {
    ...config,
    callback: async (response: FlutterwaveResponse) => {
      try {
        if (response.status === "successful") {
          // Create order with the cart items
          const orderData: OrderRequest = {
            currency: response.currency,
            product: cartItems.map(
              (item: { id: string; quantity: number }) => ({
                productId: item.id,
                quantity: item.quantity,
              })
            ),
            shippingDetails: {
              address: selectedAddress.address,
              country: selectedAddress.country,
              email: selectedAddress.email,
              fullName: selectedAddress.fullName,
              phoneNumber: selectedAddress.phoneNumber,
              state: selectedAddress.state,
            },
            shippingFee: deliveryFee,
            tax: vatRate,
          };

          const orderResponse = (await createOrder(orderData)) as OrderRes;
          console.log("orderResponse", orderResponse);
          console.log("FW", response);
          setOrderResponse(orderResponse);

          setSuccess(true);

          // Clear the cart
          clearCart();
          closePaymentModal();
        } else {
          setFailed(true);
          setPending(false);
          errorToast("Payment failed");
        }
      } catch (error) {
        errorToast(error);
        setFailed(true);
      } finally {
        closePaymentModal();
      }
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };
  // Add validation function
  const canProceedToReview = () => {
    return Object.values(selectedAddress).every((value) => value !== "");
  };

  // Update review click handler
  const handleReviewClick = () => {
    if (canProceedToReview()) {
      setReview(true);
    } else {
      // Optionally show an error message
      errorToast("Please select a shipping address before proceeding");
    }
  };

  // Add address selection handler
  const handleAddressSelection = (address: Address, index: number) => {
    setSelectedAddress(address);
    setSelectedAddressId(index);
  };

  // Add this handler function near your other handlers:
  const handleConfirmAddress = () => {
    setAddressEdit(false);
  };

  const handleAddressDelete = async (index: number) => {
    try {
      await deleteShippingAddress(index);
      setShippingData((prev) => prev.filter((_, i) => i !== index));
      successToast("Address deleted successfully");
      setDeleteAddress(false);
    } catch (error: unknown) {
      errorToast(error);
    }
  };

  return (
    <div className="w-full  px-10 mt-[150px]">
      {/* payment successful */}
      {success && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {successIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Thank you, for your purchase!`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`Your payment has been successfully processed. A confirmation email with your order details has been sent to you`}
              </p>
            </div>

            <div className="w-full bg-stroke_weak p-6 flex flex-col gap-4 text-text_strong rounded-lg">
              <p className="font-medium text-base text-center">
                Order confirmation details
              </p>
              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">Order ID</p>
                <p className="font-medium text-base">{`${orderResponse?.id.slice(
                  0,
                  7
                )}...${orderResponse?.id.slice(-1)}`}</p>
              </div>

              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">
                  Payment amount
                </p>
                <p className="font-medium text-base">{`$${formatPrice(
                  orderResponse?.totalAmount || 0
                )}`}</p>
              </div>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => {
                  setSuccess(false);
                  window.location.href = "/orders";
                }}
              >
                <p>Track order</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => {
                  setSuccess(false);
                  window.location.href = "/categories";
                }}
              >
                <p>Continue shopping</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* payment pending */}
      {pending && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {pendingIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Payment pending`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`Your payment is being processed. This may take a few minutes. You will receive a confirmation once the payment is successful`}
              </p>
            </div>

            <div className="w-full bg-stroke_weak p-6 flex flex-col gap-4 text-text_strong rounded-lg">
              <p className="font-medium text-base text-center">
                Order confirmation details
              </p>
              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">
                  Tracking number
                </p>
                <p className="font-medium text-base">{`T9483Jk_e832`}</p>
              </div>

              <div className="justify-between flex w-full">
                <p className="font-medium text-base text-text_weak">
                  Payment amount
                </p>
                <p className="font-medium text-base">{`$${formatPrice(
                  total
                )}`}</p>
              </div>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Track order</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                // onClick={() => setDeleteAddress(false)}
              >
                <p>Continue shopping</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* payment failed */}
      {failed && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {failedIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Payment failed`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`Unfortunately, we couldn't process your payment. Please try again or contact support if the issue persists`}
              </p>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setFailed(false)}
              >
                <p>Retry payment</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteAddress(false)}
              >
                <p>Contact support</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* add address modal */}
      {addressModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-start backdrop-blur px-4 md:px-0 overflow-y-auto">
          <div className="bg-white max-w-[480px] w-full h-fit p-4 md:p-8 flex flex-col gap-8 rounded-lg  mt-20 mb-6">
            <div className="w-full flex justify-between items-center">
              <p className="text-text_strong  text-[18px] font-medium">
                Add address
              </p>
              <i
                onClick={() => setAddressModal(false)}
                className="cursor-pointer"
              >
                {closeIcon()}
              </i>
            </div>

            {/* address modal content */}
            <div className="w-full flex flex-col gap-4">
              {/* fullname */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Full name</p>
                <div className="w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4 w-full"
                    placeholder="Enter your full name"
                    type="text"
                    value={addressData.fullName}
                    onChange={(e) => handleAddressInput(e, "fullName")}
                  />
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Email</p>
                <div className="w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4 w-full"
                    placeholder="Enter your email"
                    type="email"
                    value={addressData.email}
                    onChange={(e) => handleAddressInput(e, "email")}
                  />
                </div>
              </div>
              {/* phone */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Phone number</p>
                <div className="w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4 w-full"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={addressData.phoneNumber}
                    onChange={(e) => handleAddressInput(e, "phoneNumber")}
                  />
                </div>
              </div>
              {/* Address */}
              <div className="flex flex-col gap-2 w-full ">
                <p className="">Address</p>
                <div className="w-full">
                  <input
                    className="outline-none border rounded-lg h-10 px-4 w-full"
                    placeholder="Enter your address"
                    type="text"
                    value={addressData.address}
                    onChange={(e) => handleAddressInput(e, "address")}
                  />
                </div>
              </div>

              <div className="flex gap-8 justify-start items-center w-full">
                {/* State */}
                <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
                  <p className="">State</p>
                  <div className="w-full">
                    <input
                      className="outline-none border rounded-lg h-10 px-4 w-full"
                      placeholder="Enter your state"
                      type="text"
                      value={addressData.state}
                      onChange={(e) => handleAddressInput(e, "state")}
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
                  <p className="">Country</p>
                  <div className="w-full">
                    <input
                      className="outline-none border rounded-lg h-10 px-4 w-full"
                      placeholder="Enter your country"
                      type="text"
                      value={addressData.country}
                      onChange={(e) => handleAddressInput(e, "country")}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* buttons */}
            <div className="flex gap-6 justify-between items-center w-full font-medium text-base mt-2">
              <button
                onClick={handleAddressSubmit}
                className="w-full text-background bg-text_strong rounded-full px-6 h-12 flex justify-center items-center"
              >
                Add address
              </button>
              <button
                onClick={() => setAddressModal(false)}
                className="w-full text-text_strong border bg-background rounded-full px-6 h-12 flex justify-center items-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----- deleteItem modal ----- */}
      {deleteAddress && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteAddress(false)}
              >
                {mapIcon()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Are you sure you want to delete address?`}
              </p>

              <p className="text-text_weak text-sm md:text-base font-normal">
                {`This action will delete address. If you're not ready to make changes, you can save them for later instead`}
              </p>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => {
                  handleAddressDelete(deleteIndex);
                  // setDeleteIndex();
                }}
              >
                <p>Delete</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteAddress(false)}
              >
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-7xl">
        <div className=" flex justify-start gap-[108px]">
          {/* not logged in */}
          {false && (
            <div className="flex flex-col gap-6 text-text_strong w-1/2 font-normal text-sm">
              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Account</p>
                <p className="">
                  If you already have an account, click Login to access your
                  profile. If you’re a new user, click Sign up to create an
                  account.
                </p>
              </div>

              <div className="flex gap-4 justify-start items-center">
                <Link href={`/sign_up`}>
                  <button className="border rounded-full items-center flex h-8 px-6">
                    Sign up
                  </button>
                </Link>

                <Link href={`/login`}>
                  <button className="border rounded-full items-center flex h-8 px-6">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* ---------- review container---------- */}
          {review ? (
            <div className="flex flex-col gap-8 text-text_strong w-full max-w-[480px] font-normal text-sm mb-8">
              {/* contact info */}
              <div className="flex-col gap-4 flex w-full">
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[18px] text-text_strong">
                    Contact information
                  </p>
                  <p
                    onClick={() => setReview(!review)}
                    className="font-normal text-sm text-text_weak underline cursor-pointer "
                  >
                    {"Change"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-normal">
                  <p className="text-text_strong text-base ">
                    {selectedAddress.fullName}
                  </p>
                  <div className="flex justify-start items-center text-text_weak text-base gap-4">
                    <p>{selectedAddress.phoneNumber}</p>
                    <p>{selectedAddress.email}</p>
                  </div>
                </div>
              </div>

              {/* shipping */}
              <div className="flex-col gap-4 flex w-full">
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[18px] text-text_strong">
                    Shipping
                  </p>
                  <p
                    onClick={() => setReview(!review)}
                    className="font-normal text-sm text-text_weak underline cursor-pointer "
                  >
                    {"Change"}
                  </p>
                </div>

                <div className="inline-flex gap-2 w-full">
                  <i>{info()}</i>
                  <p className="text-sm font-normal text-text_weak">
                    {`International shipping takes up to 20 working days. While 3-4
                  days within Lagos, based on your address for delivery outside
                  Lagos`}
                  </p>
                </div>
                <p className="text-text_strong text-base ml-8">
                  {`${selectedAddress.address}, ${selectedAddress.state}, ${selectedAddress.country}`}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Order summary</p>
                <div className="flex flex-col gap-6">
                  {/* Product Total */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Products ({totalQuantity.toLocaleString()} items)
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(productTotal)}
                    </p>
                  </div>

                  {/* VAT */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      VAT ({(vatRate * 100).toFixed(1)}%)
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(vatAmount)}
                    </p>
                  </div>

                  {/* Delivery Fee */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Estimated delivery & handling
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(deliveryFee)}
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Subtotal
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(subTotal)}
                    </p>
                  </div>
                  <div className="inline-flex gap-2 w-full">
                    <i>{info()}</i>
                    <p className="text-sm font-normal text-text_weak w-full max-w-[343px]">
                      {`The subtotal reflects the total price of your order, including taxes, before any applicable discounts. It does not include shipping costs.`}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Total
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* button */}
              <FlutterWaveButton
                {...fwConfig}
                className="h-10 rounded-full bg-text_strong text-background font-medium text-base flex justify-center items-center w-full px-6"
              >
                Pay Now
              </FlutterWaveButton>
            </div>
          ) : null}

          {/* container 1 */}

          {!review ? (
            <div className="flex flex-col gap-8 text-text_strong w-full max-w-[480px] font-normal text-sm mb-8">
              {/* account */}
              {/* <div className="flex flex-col gap-4">
                <p className="text-[18px]">Account</p>
                <div className="flex flex-col">
                  <div className="flex flex-col gap-2 w-full ">
                    <p className="">Full name</p>
                    <div className=" w-full">
                      <input
                        className="outline-none border rounded-lg h-10 px-4  w-full"
                        placeholder=""
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* shipping */}
              <div className="flex-col gap-4 flex w-full">
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[18px] text-text_strong">
                    Shipping
                  </p>
                  <p
                    onClick={() => setAddressEdit(!addressEdit)}
                    className="font-normal text-sm text-text_weak underline cursor-pointer "
                  >
                    {addressEdit ? "Close" : "Select address"}
                  </p>
                </div>

                <div className="inline-flex gap-2 w-full">
                  <i>{info()}</i>
                  <p className="text-sm font-normal text-text_weak">
                    {`International shipping takes up to 20 working days. While 3-4
                  days within Lagos, based on your address for delivery outside
                  Lagos`}
                  </p>
                </div>
                {/* shipping addresses */}
                {!addressEdit && selectedAddress.address && (
                  <div className="mt-8 w-full">
                    <div className="max-w-[600px] rounded-2xl border border-text_strong p-6 flex flex-col justify-start gap-2">
                      <div className="w-full flex justify-between ">
                        <p className="text-text_strong font-medium text-base">
                          {selectedAddress.fullName}
                        </p>
                      </div>

                      <div className="font-normal text-text_weak flex flex-col items-start gap-2 w-full">
                        <div className="flex gap-4 font-medium text-sm">
                          <div className="">{selectedAddress.phoneNumber}</div>
                          <div className="">{selectedAddress.email}</div>
                        </div>
                        <p className="font-medium text-sm">
                          {`${selectedAddress.address}, ${selectedAddress.state}, ${selectedAddress.country}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show address list only when editing */}
                {addressEdit && (
                  <div className="mt-8 w-full flex flex-col gap-2">
                    {shippingData &&
                      shippingData.map((data, index) => (
                        <div
                          key={index}
                          className={`max-w-[600px] rounded-2xl border border-text_strong p-6 flex flex-col justify-start gap-2 cursor-pointer transition-colors relative ${
                            selectedAddressId === index
                              ? "bg-fill overflow-hidden"
                              : "bg-white"
                          }`}
                          onClick={() => handleAddressSelection(data, index)}
                        >
                          {selectedAddressId === index && (
                            <div className="h-12 w-5 bg-black absolute rotate-[45deg] -top-4 -translate-x-[30px]"></div>
                          )}
                          <div className="w-full flex justify-between ">
                            <p className="text-text_strong font-medium text-base">
                              {data.fullName}
                            </p>
                            <div className="flex gap-4 font-medium text-sm">
                              <div className="cursor-pointer">Edit</div>
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
                            <div className="flex gap-4 font-medium text-sm">
                              <div className="">{data.phoneNumber}</div>
                              <div className="">{data.email}</div>
                            </div>
                            <p className=" font-medium text-sm">
                              {`${data.address}, ${data.state},${data.country}`}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {addressEdit && (
                <div className="flex justify-between px-6 gap-6">
                  <button
                    onClick={handleConfirmAddress}
                    className={`border rounded-full items-center flex h-10 w-full justify-center px-6 ${
                      selectedAddressId !== null
                        ? "bg-text_strong text-background border-text_strong"
                        : "text-gray-400 border-gray-300 cursor-not-allowed"
                    }`}
                    disabled={selectedAddressId === null}
                  >
                    Confirm address
                  </button>
                  <button
                    onClick={() => setAddressModal(true)}
                    className="border rounded-full items-center flex h-10 w-full justify-center px-6"
                  >
                    Add address
                  </button>
                </div>
              )}
              {/* Contact info */}

              {/* <div className="flex flex-col gap-4">
                <p className="text-[18px]">Contact information</p>
                <div className="flex flex-col">
                  <div className="flex flex-col gap-2 w-full ">
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

                <div className="flex flex-col">
                  <div className="flex flex-col gap-2 w-full ">
                    <p className="">Phone number</p>
                    <div className=" w-full">
                      <input
                        className="outline-none border rounded-lg h-10 px-4  w-full"
                        placeholder=""
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* button */}
              <button
                onClick={handleReviewClick}
                className={`h-10 rounded-full font-medium text-base flex justify-center items-center w-full px-6 ${
                  canProceedToReview()
                    ? "bg-text_strong text-background"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!canProceedToReview()}
              >
                Review orders
              </button>
            </div>
          ) : null}

          {/* container 2 */}
          <div className="flex flex-col gap-20 text-text_strong w-full max-w-[480px] font-normal text-sm mb-8">
            {!review ? (
              <div className="flex flex-col gap-4">
                <p className="text-[18px]">Order summary</p>
                <div className="flex flex-col gap-6">
                  {/* Product Total */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Products ({totalQuantity.toLocaleString()} items)
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(productTotal)}
                    </p>
                  </div>

                  {/* VAT */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      VAT ({(vatRate * 100).toFixed(1)}%)
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(vatAmount)}
                    </p>
                  </div>

                  {/* Delivery Fee */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Estimated delivery & handling
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(deliveryFee)}
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Subtotal
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(subTotal)}
                    </p>
                  </div>
                  <div className="inline-flex gap-2 w-full">
                    <i>{info()}</i>
                    <p className="text-sm font-normal text-text_weak w-full max-w-[343px]">
                      {`The subtotal reflects the total price of your order, including taxes, before any applicable discounts. It does not include shipping costs.`}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="w-full flex justify-between">
                    <p className="font-normal text-base text-text_weak">
                      Total
                    </p>
                    <p className="font-normal text-base text-text_strong cursor-pointer">
                      ${formatPrice(total)}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* items display */}

            <div className="w-full">
              {cartItems &&
                cartItems.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex justify-start gap-6 w-full mb-6"
                  >
                    <Image
                      src={item.image}
                      width={154.29}
                      height={180}
                      priority
                      alt={item.name}
                      className="w-[154.29px] h-[180px] object-cover"
                    />

                    <div className="flex flex-col gap-4">
                      <div className="w-full text-text_strong text-ellipsis gap-2 ">
                        <p className="text-lg font- truncate font-medium">
                          {item.name}
                        </p>
                        <div className="text-lg font- truncate flex gap-2 font-medium">
                          <p>{`$ ${formatPrice(item.price)}`}</p>
                          {item.originalPrice && (
                            <del className="text-text_weak">{`$ ${formatPrice(
                              item.originalPrice
                            )}`}</del>
                          )}
                        </div>
                      </div>

                      <div className="flex-col flex items-start gap-4">
                        <div className="w-full text-text_strong text-ellipsis gap-2 ">
                          <p className="text-base font- truncate font-normal text-text_weak">
                            Quantity:
                          </p>
                          <p className="text-base font-normal">
                            {item.quantity}
                          </p>
                        </div>

                        {item.size && (
                          <div className="w-full text-text_strong text-ellipsis gap-2 ">
                            <p className="text-base font- truncate font-normal text-text_weak">
                              Size:
                            </p>
                            <p className="text-base font-normal flex gap-2">
                              <div className="uppercase"> {item.size}</div> (
                              {item.size === "s" || item.size === "S"
                                ? "Small"
                                : item.size === "m" || item.size === "M"
                                ? "Medium"
                                : item.size === "l" || item.size === "L"
                                ? "Large"
                                : item.size === "xl" || item.size === "XL"
                                ? "Extra Large"
                                : item.size}
                              )
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
