"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-[#EBE6CA] flex justify-between fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-6 py-2">

        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.svg" alt="Logo" width={200} height={50} />
        </Link>

        <nav className="hidden md:flex gap-6 items-center font-medium text-black">
          <Link href="/">Home</Link>

          <Link
            href="/#newsletter"
            className="px-4 py-2 bg-white text-[#211F40] rounded-full font-semibold shadow hover:bg-gray-200 transition"
          >
            Zmanim
          </Link>

          <Link
            href="/donate"
            className="px-4 py-2 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-[#211F40] transition"
          >
            Donate
          </Link>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/80 text-white flex flex-col items-center justify-center space-y-8 text-2xl font-semibold z-9999">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>

          <Link
            href="/#newsletter"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-3 bg-white text-[#211F40] rounded-full shadow hover:bg-gray-200 transition"
          >
            Zmanim
          </Link>

          <Link
            href="/donate"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-3 border-2 border-white rounded-full hover:bg-white hover:text-[#211F40] transition"
          >
            Donate
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="text-lg underline opacity-70 hover:opacity-100"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
}
