import PrelineScript from "./components/common/PrelineScript";
import Navbar from "@/app/components/common/NavBar";
import { BackgroundBeamsWithCollision } from "./components/common/BackgroundBeamsWithCollision";
import React from 'react';
import Script from 'next/script';
import FileUpload from "./components/common/FileUpload";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <PrelineScript />
      <Navbar />
      <main className="relative z-10 flex-grow">
        <BackgroundBeamsWithCollision className="absolute inset-0 w-full h-full -z-10 object-cover" />
        <div className="text-center p-10">
          <h1 className="text-4xl font-bold sm:text-6xl text-neutral-200">
            Hi <span className="text-[#275195]">Convert</span> 2 PDF
          </h1>
          <p className="mt-3 text-neutral-300">
            Transform Any Image to PDF Instantly with Your All-in-One Conversion Tool!
          </p>
        </div>
        <FileUpload />
      </main>
      <Script src="/node_modules/lodash/lodash.min.js" strategy="afterInteractive" /> 
      <Script src="/node_modules/dropzone/dist/min/dropzone.min.js" strategy="afterInteractive" />
    </div>
  );
}
