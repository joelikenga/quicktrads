"use client";
import { useCart } from "@/context/CartContext";
import { Navbar } from "../global/navbar";
import { Body } from "./component/body";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const router = useRouter();

  useEffect(() => {
    if (cartCount === 0) {
      router.push('/products');
    }
  }, [cartCount, router]);

  if (cartCount === 0) {
    return null;
  }

  return (
    <main className="">
      <Navbar />
      <Body />
    </main>
  );
};

export default Checkout;