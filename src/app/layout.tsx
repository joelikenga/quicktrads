// app/layout.tsx
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { metadata } from './meta'; // Import the metadata
import ClientLayout from './client-layout';

const openSans = Open_Sans({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export { metadata }; // Export from server component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning data-qb-installed className={`${openSans.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}