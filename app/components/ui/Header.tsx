"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { HiMenu, HiX } from "react-icons/hi"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showScrollCTA, setShowScrollCTA] = useState(false)

  // Show floating CTA after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollCTA(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Header */}
      <header  className="w-full  bg-[#EBE6CA]  flex justify-between">
        <div className="max-w-7xl mx-auto flex justify-between  px-6 py-2">
          {/* Logo */}
          <div className="left-0  ">
            <Link href="/">
              <Image src="/logo.svg" alt="Teichman Mikvah Logo" width={260} height={10} />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center font-medium text-black">
            <Link href="/">Home</Link>
            {/* <Link href="/about">About Us</Link>
            <Link href="/visit">Visit</Link>
            <Link href="/resources">Additional Resources</Link>
            <Link href="/ask">Ask the Rabbi</Link>
            <Link href="/contact">Contact</Link> */}

            {/* CTA Buttons */}
            <Link
              href="/book"
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

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-6 text-white text-2xl md:hidden">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/visit" onClick={() => setMobileOpen(false)}>Visit</Link>
          <Link href="/resources" onClick={() => setMobileOpen(false)}>Additional Resources</Link>
          <Link href="/ask" onClick={() => setMobileOpen(false)}>Ask the Rabbi</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link
            href="/book"
            className="px-6 py-3 bg-white text-[#211F40] rounded-full font-semibold shadow hover:bg-gray-200 transition"
            onClick={() => setMobileOpen(false)}
          >
            Book
          </Link>
          <Link
            href="/donate"
            className="px-6 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-[#211F40] transition"
            onClick={() => setMobileOpen(false)}
          >
            Donate
          </Link>
        </div>
      )}

      {/* Floating Donate CTA */}
      {showScrollCTA && (
        <Link
          href="/donate"
          className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-[#EAB33B] text-[#211F40] rounded-full font-bold shadow-lg hover:bg-[#f5c542] transition"
        >
          Donate Now
        </Link>
      )}

      {/* Spacer for fixed header */}
     
    </>
  )
}
