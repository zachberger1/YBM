"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Footer({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const pathname = usePathname();
  const [message, setMessage] = useState("");

  const handleAdminClick = () => {
    if (pathname === "/") {
      // Home → open admin overlay
      onOpenAdmin?.();
    } else {
      // Other pages → show small warning
      setMessage("The admin panel is only available on the homepage.");
    }
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(""), 2500);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <footer className="bg-[#EBE6CA] py-12 px-6 mt-auto relative border-t border-gray-400/40 rounded-t-4xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">

        {/* COLUMN 1 – QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#211F40]">Quick Links</h3>
          <ul className="space-y-2 text-lg">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#newsletter" className="hover:underline">
                Zmanim
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/donate" className="hover:underline font-semibold">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 2 – CONTACT */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#211F40]">Contact</h3>
          <p className="text-lg">📞 555-123-4567</p>
          <p className="text-lg">✉️ info@community.org</p>
        </div>

        {/* COLUMN 3 – LOCATION */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#211F40]">Location</h3>
          <p className="text-lg leading-relaxed">
            123 Community Street <br />
            Jerusalem, Israel
          </p>
        </div>
      </div>

      {/* ADMIN BUTTON */}
      <button
        onClick={handleAdminClick}
        className="absolute bottom-4 right-6 text-black underline text-sm hover:text-gray-800 transition"
      >
        Admin
      </button>

      {/* NOTICE MESSAGE */}
      {message && (
        <div className="absolute bottom-16 right-6 bg-white px-4 py-2 rounded-lg shadow text-sm text-black border border-gray-300 animate-fade">
          {message}
        </div>
      )}

      <style jsx>{`
        .animate-fade {
          animation: fadein 0.25s ease-out;
        }
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
}
