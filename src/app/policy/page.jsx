import React from 'react';
import PrelineScript from "../components/common/PrelineScript";
import Navbar from "@/app/components/common/NavBar";
import { BackgroundBeamsWithCollision } from "../components/common/BackgroundBeamsWithCollision";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gray-900 text-white">
      <PrelineScript />
      <Navbar />
      <main className="relative z-10 flex-grow p-4">
        <BackgroundBeamsWithCollision className="absolute inset-0 w-full h-full -z-10 object-cover" />
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Privacy Policy</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <p className="mb-4">
            Welcome to Convert Image 2 PDF. Your privacy is of utmost importance to us. This Privacy Policy outlines the types of information we do not collect and how we handle your data during your use of our application.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-blue-400">Data Collection</h2>
          <p className="mb-4">
            We do not collect, store, or process any personal information from users of our application. Our service does not require you to sign in or provide any personal details.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-blue-400">Use of the Application</h2>
          <p className="mb-4">
            Convert 2 PDF is designed to convert images to PDF files efficiently and securely. All operations are performed locally on your device, ensuring that your data remains private and never leaves your possession.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-blue-400">Third-Party Services</h2>
          <p className="mb-4">
            Our application does not integrate with any third-party services for data collection or processing. Your data is fully secure and managed within the scope of our application.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-blue-400">Commitment to Privacy</h2>
          <p className="mb-4">
            We are committed to ensuring your privacy. Since we do not collect any personal data, there is no information to manage, store, or share.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-blue-400">Policy Updates</h2>
          <p className="mb-4">
            This Privacy Policy may be updated periodically to reflect any changes in our practices. Any significant updates will be communicated through this page.
          </p>
          <p className="mb-4">
            Last updated: 30.12.2024
          </p>
        </div>
      </main>
    </div>
  );
}
