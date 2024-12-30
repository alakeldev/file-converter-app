"use client";
import React from 'react';

export default function Navbar() {
  return (
    <div className="border-b-2 border-gray-200 dark:border-neutral-700">
      <nav className="-mb-0.5 flex justify-center gap-x-6">
        <a className="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
          Home
        </a>
        <a className="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-blue-500 text-sm font-medium whitespace-nowrap text-blue-600 focus:outline-none focus:text-blue-800 dark:text-blue-500" href="#" aria-current="page">
          Privacy Policy
        </a>
      </nav>
    </div>
  );
}
