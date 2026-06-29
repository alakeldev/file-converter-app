"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (active: boolean): string =>
    `py-4 px-1 inline-flex items-center gap-2 border-b-2 text-lg whitespace-nowrap focus:outline-none ${
      active
        ? "border-blue-500 text-blue-600 dark:text-blue-500"
        : "border-transparent text-gray-500 dark:text-neutral-500 hover:text-blue-600 focus:text-blue-600 dark:hover:text-blue-500 dark:focus:text-blue-500"
    }`;

  return (
    <div className="border-b-2 border-gray-200 dark:border-neutral-700">
      <nav className="-mb-0.5 flex justify-center gap-x-6">
        <Link href="/" className={linkClass(pathname === "/")}>
          Home
        </Link>
        <Link href="/policy" className={`${linkClass(pathname === "/policy")} font-medium`}>
          Privacy Policy
        </Link>
      </nav>
    </div>
  );
}
