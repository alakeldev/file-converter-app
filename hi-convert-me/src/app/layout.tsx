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
  title: "Convert 2 PDF",
  description: `The ultimate online tool for converting images without limits.
                Effortlessly transform images to PDF without restrictions.
                Start converting your content for free today.`,
  creator: "Abdullah Alakel",
  keywords: "Unlimited images converter, PDF conversion, free image to PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}


            
      </body>
    </html>
  );
}
