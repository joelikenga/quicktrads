/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { add, info, redCart, remove, trash } from "@/app/global/svg";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const Body = () => {
  const { cartItems, removeFromCart, updateQuantity, updateSize } = useCart();
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [mobileCheckout, setMobileCheckout] = useState<boolean>(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const availableSizes = ["xs", "s", "m", "l", "xl"];

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  const handleSizeChange = (itemId: string, newSize: string) => {
    updateSize(itemId, newSize);
    setSizeModalOpen(false);
    setSelectedItem(null);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    );
  };

  const formatPrice = (price: number, currency: string = "$") => {
    return `${currency}${price.toFixed(2)}`;
  };

  const handleDelete = () => {
    if (deleteItemId) {
      removeFromCart(deleteItemId);
      setDeleteItemId(null);
    }
  };

  return (
    <div className="w-full px-6 md:px-10  lg:px-10 flex flex-col gap-4 z-0 mt-[120px]">
      {/* ----- deleteItem modal ----- */}
      {deleteItemId && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg ">
            <div className="w-full flex flex-col justify-center items-center gap-4  text-center">
              <div
                className="cursor-pointer"
                onClick={() => setDeleteItemId(null)}
              >
                {redCart()}
              </div>

              <p
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                {`Are you sure you want to remove this item from your cart?`}
              </p>

              <p className="text-text_strong text-sm md:text-base font-normal">
                {`This action will remove wears from your cart. If you're not
                ready to make changes, you can save them for later instead`}
              </p>
            </div>

            {/* ----- button ----- */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={handleDelete}
              >
                <p>Remove wears</p>
              </button>
              <button
                className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-1/2 border"
                onClick={() => setDeleteItemId(null)}
              >
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----- mobile checkout ----- */}
      {mobileCheckout && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0 md:hidden">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-4 rounded-lg ">
            <div
              className={`${lora.className}  text-text_strong font-normal text-[22px] w-full flex justify-normal items-start`}
            >
              <p>Summary</p>
            </div>
            {/*----- content -----*/}
            <div className="flex flex-col gap-8 p-">
              {/*----- total -----*/}
              <div className="flex flex-col gap-6">
                <div className="w-full flex justify-between items-center gap-4 font-medium text-nowrap">
                  <p className="text-text_weak  text-base">
                    Delivery & handing
                  </p>
                  <p className="text-text_strong  text-base">
                    Calculated at checkout
                  </p>
                </div>
                {/* ------subtotal------ */}
                <div className="w-full flex justify-between items-start gap-4 font-medium">
                  <div className="flex flex-col gap-2 w-full max-w-[343px] items-start">
                    <p className="text-text_weak  text-base">Subtotal</p>
                    <p className="text-text_weak  text-sm">
                      The subtotal reflects the total price of your order, It
                      does not include shipping costs and taxes.
                    </p>
                  </div>
                  <p className="text-text_strong  text-base">
                    {formatPrice(calculateSubtotal())}
                  </p>
                </div>

                {/* -----total----- */}
                <div className="w-full flex justify-between items-center gap-4 font-medium">
                  <p className="text-text_weak  text-base">Total</p>
                  <p className="text-text_strong  text-base">
                    {formatPrice(calculateSubtotal())}
                  </p>
                </div>
              </div>
              {/*----- checkout button -----*/}

              <div className="flex flex-col gap-6">
                <Link className="w-full rounded-full" href={``}>
                  <button
                    type="submit"
                    className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full"
                  >
                    <p>Checkout now</p>
                  </button>
                </Link>
                <Link className="w-full rounded-full" href={``}>
                  <button
                    type="submit"
                    className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full border"
                  >
                    <p>Continue shopping</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Size selection modal */}
      {sizeModalOpen && selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur px-4 md:px-0">
          <div className="bg-white max-w-[480px] w-full h-fit p-6 md:p-12 flex flex-col gap-8 rounded-lg">
            <div className="w-full flex flex-col gap-4">
              <h2
                className={`${lora.className} text-text_strong text-lg md:text-[22px] font-normal`}
              >
                Select Size
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    className="border border-text_strong px-4 py-2 rounded-lg hover:bg-text_strong hover:text-background transition-colors uppercase"
                    onClick={() => handleSizeChange(selectedItem, size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                className="mt-4 bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full border"
                onClick={() => {
                  setSizeModalOpen(false);
                  setSelectedItem(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-background w-full max-w-7xl mx-auto pt-6 ">
        {/* ----- no item in cart ----- */}
        {cartItems.length === 0 ? (
          <div className="bg-background h-[360px] w-full flex justify-center items-center">
            {/* ----- content ---- */}
            <div className="w-full max-w-[406px] h-fit flex flex-col gap-8 items-center text-center ">
              {redCart()}
              <div className="flex flex-col gap-4 text-text_strong">
                <p
                  className={`${lora.className} font-medium text-[22px] sm:text-nowrap`}
                >
                  There are currently no items in the cart
                </p>
                <p className="font-medium text-base">
                  Discover the latest trends and start building your dream
                  wardrobe today!
                </p>
              </div>
              {/* ----- shopping button ----- */}
              <Link className="w-full rounded-full" href={``}>
                <button
                  type="submit"
                  className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full"
                >
                  <p>Continue shopping</p>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="min-h-[500px] flex justify-start gap-[80px]">
            {/* ------- items ------ */}
            <div className="pt- w-full max-w-[600px] overflow-y-auto hidden_scroll">
              <div
                className={`${lora.className} pb-2 text-text_strong font-normal text-[22px] w-full flex md:justify-normal justify-between items-start md:items-center`}
              >
                <p>Cart</p>
                {/* ----- checkout ----- */}
                <button
                  onClick={() => setMobileCheckout(true)}
                  className="md:hidden outline-none border-none rounded-lg px-4 h-8 text-background bg-text_strong font-medium"
                >
                  <p className=" text-base">Checkout</p>
                </button>
              </div>
              {/* ----- items list ----- */}
              <div className="flex flex-col gap-[64px]">
                {cartItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="max-w-[600px] w-full bg-white flex flex-col md:flex-row gap-6"
                  >
                    {/* image */}
                    <div className="w-[240px] h-[280px]">
                      <Image
                        className="w-full h-full"
                        width={240}
                        height={280}
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    {/* details */}
                    <div className="flex flex-col items-start w-full truncate gap-6">
                      <div className="w-full text-text_strong text-ellipsis gap-2 ">
                        <p className="text-lg font- truncate font-medium">
                          {item.name}
                        </p>
                        <div className="text-lg font- truncate flex gap-2 font-medium">
                          <p>{`$ ${item.price}`}</p>
                          <del className="text-text_weak">{`$ ${item.price}`}</del>
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-start gap-2">
                        <div className="w-full flex justify-between text-text_strong font-medium text-base">
                          <p>Size</p>
                          <p
                            className="cursor-pointer hover:underline"
                            onClick={() => {
                              setSelectedItem(item.id);
                              setSizeModalOpen(true);
                            }}
                          >
                            Change
                          </p>
                        </div>

                        <span className="border border-text_strong px-3 py-1 text-text_strong flex flex-col items-center text-center rounded-lg uppercase ">
                          <p className="">{item.size}</p>
                          {/* <p className="">{item.sizeDescription}</p> */}
                        </span>
                      </div>

                      {/* items count */}
                      <div className="w-[113px] border h-10 px-4 flex items-center justify-between rounded-full">
                        <div
                          className=" cursor-pointer"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          {item.quantity === 1 ? (
                            <i onClick={() => removeFromCart(item.id)}>
                              {trash()}
                            </i>
                          ) : (
                            remove()
                          )}
                        </div>
                        <input
                          type="number"
                          className="outline-none w-[40px] text-center h-full"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <div
                          className=" cursor-pointer"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          {add()}
                        </div>
                      </div>
                      {/* delete item */}
                      <div
                        onClick={() => setDeleteItemId(item.id)}
                        className="flex items-center gap-1  cursor-pointer"
                      >
                        {trash()}
                        <p className="font-medium text-base">
                          Remove from cart
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*----- checkout -----*/}
            <div className="w-full max-w-[504px] hidden md:block">
              <div
                className={`${lora.className} pb-2 text-text_strong font-normal text-[22px] w-full flex justify-normal items-start`}
              >
                <p>Summary</p>
              </div>
              {/*----- content -----*/}
              <div className="flex flex-col gap-8 p-">
                {/*----- total -----*/}
                <div className="flex flex-col gap-6">
                  <div className="w-full flex justify-between items-center gap-4 font-medium">
                    <p className="text-text_weak  text-base">
                      Estimated delivery & handing
                    </p>
                    <p className="text-text_strong  text-base">
                      Calculated at checkout
                    </p>
                  </div>
                  {/* ------subtotal------ */}
                  <div className="w-full flex justify-between items-start gap-4 font-medium">
                    <div className="flex flex-col gap-2 w-full max-w-[343px] items-start">
                      <p className="text-text_weak  text-base">Subtotal</p>
                      <div className="text-text_weak  text-sm flex gap-2">
                        <i>{info()}</i>{" "}
                        <>
                          {" "}
                          The subtotal reflects the total price of your order,
                          It does not include shipping costs and taxes.
                        </>
                      </div>
                    </div>
                    <p className="text-text_strong  text-base">
                      {formatPrice(calculateSubtotal())}
                    </p>
                  </div>

                  {/* -----total----- */}
                  <div className="w-full flex justify-between items-center gap-4 font-medium">
                    <p className="text-text_weak  text-base">Total</p>
                    <p className="text-text_strong  text-base">
                      {formatPrice(calculateSubtotal())}
                    </p>
                  </div>
                </div>
                {/*----- checkout button -----*/}

                <div className="flex flex-col gap-6">
                  <Link className="w-full rounded-full" href={`/checkout`}>
                    <button
                      type="submit"
                      className="bg-text_strong text-background h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full"
                    >
                      <p>Checkout now</p>
                    </button>
                  </Link>
                  <Link className="w-full rounded-full" href={`/categories`}>
                    <button
                      type="submit"
                      className="bg-background text-text_strong h-12 rounded-full flex justify-center items-center text-center text-base font-medium w-full border"
                    >
                      <p>Continue shopping</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
