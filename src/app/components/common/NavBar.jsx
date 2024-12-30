"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    if (pathname === '/') {
      setActiveLink('home');
    } else if (pathname === '/policy') {
      setActiveLink('privacy');
    }
  }, [pathname]);

  return (
    <div className="border-b-2 border-gray-200 dark:border-neutral-700">
      <nav className="-mb-0.5 flex justify-center gap-x-6">
        <Link href="/" legacyBehavior>
          <a
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-lg ${
              activeLink === 'home' ? 'border-blue-500 text-blue-600 dark:text-blue-500' : 'border-transparent text-gray-500 dark:text-neutral-500'
            } whitespace-nowrap hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:hover:text-blue-500 dark:focus:text-blue-500`}
            onClick={() => setActiveLink('home')}
          >
            Home
          </a>
        </Link>
        <Link href="/policy" legacyBehavior>
          <a
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 text-lg ${
              activeLink === 'privacy' ? 'border-blue-500 text-blue-600 dark:text-blue-500' : 'border-transparent text-gray-500 dark:text-neutral-500'
            } font-medium whitespace-nowrap hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:hover:text-blue-500 dark:focus:text-blue-500`}
            onClick={() => setActiveLink('privacy')}
          >
            Privacy Policy
          </a>
        </Link>
      </nav>
    </div>
  );
}
