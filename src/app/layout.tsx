import type { Metadata } from "next";
import {  Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-raleway",
  subsets: ["latin"],
});

// const lora = Lora({
//   variable: "--font-lora",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Quicktrads",
  description: "Quicktrads - Your Fashion Destination",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      // {
      //   url: '/icon.svg',
      //   type: 'image/svg+xml',
      // },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
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
      <body
        className={`${openSans.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
// ${lora.variable}