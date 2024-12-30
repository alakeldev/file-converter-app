import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PrelineScript from "./components/common/PrelineScript";
import Navbar from "./components/common/NavBar";
import { BackgroundBeamsWithCollision } from "./components/common/BackgroundBeamsWithCollision";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hi Convert Me",
  description: `The ultimate online tool for unlimited multimedia conversion.
                Transform images, audio and videos without restrictions.
                Start converting your content for free
                `,
  creator: "Abdullah Alakel",
  keywords: "unlimited image converter, unlimited audio converter, unlimited video converter"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PrelineScript /> 
        <Navbar />
        <BackgroundBeamsWithCollision />
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
