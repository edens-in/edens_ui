import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edens",
  description: "Edens is an innovative e-commerce platform designed as a virtual e-mall where sellers can open and manage their own digital storefronts. Unlike traditional marketplaces, Edens offers an immersive shopping experience, allowing businesses to personalize their virtual shops and engage directly with customers. With a focus on flexibility, seamless transactions, and a user-friendly interface, Edens aims to revolutionize online retail by bridging the gap between physical and digital shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
