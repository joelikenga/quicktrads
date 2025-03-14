import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import { Toaster } from "react-hot-toast";

const openSans = Open_Sans({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quicktrads",
  description: "Quicktrads - Your Fashion Destination",
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/dtjf6sic8/image/upload/v1740862649/quicktrads/atqfeghcpsmjplrsaf6r.svg',
        sizes: 'any',
      },
    ],
    apple: [
      {
        url: 'https://res.cloudinary.com/dtjf6sic8/image/upload/v1740862649/quicktrads/atqfeghcpsmjplrsaf6r.svg',
        sizes: '180x180',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className}  antialiased`}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}