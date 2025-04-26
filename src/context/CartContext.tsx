 
'use client'

import { errorToast,  successToast } from '@/utils/toast/toast';
import React, { createContext, useContext, useState,  useEffect } from 'react';
// import { CartContextType, CartItem } from '../types/';
// import { errorToast } from '../utils/toast/toast';


 interface CartItem {
  id: string; // Unique identifier for the item
  name: string; // Name of the item
  price: number; // Price of the item
  quantity: number; // Quantity of the item in the cart
  size?: string; // Optional size of the item (e.g., for clothing)
  image?: string; // Optional image URL of the item
  // Add any other relevant properties here
}

//  interface CartContextType {
//   cartItems: CartItem[]; // Array of items in the cart
//   addToCart: (item: CartItem) => void; // Function to add an item to the cart
//   removeFromCart: (id: string) => void; // Function to remove an item from the cart
//   updateQuantity: (id: string, quantity: number) => void; // Function to update the quantity of an item in the cart
//   getCartCount: () => number; // Function to get the total number of items in the cart
//   updateSize: (itemId: string, newSize: string) => void; // Function to update the size of an item in the cart
//   clearCart: () => void; // Function to clear all items from the cart
// }

const CART_STORAGE_KEY = 'quicktrads_cart';

const CartContext = createContext<any | undefined>(undefined);

export function CartProvider({ children }: { children: any }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    // //console.log('savedCart', savedCart)
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        errorToast(error)
        throw error
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
    successToast('Item added')
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    successToast('Item(s) removed')

  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateSize = (itemId: string, newSize: string) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, size: newSize } : item
    ));
    successToast('Size updated')

  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    successToast('Cart cleared')
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      getCartCount,
      updateSize,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
 