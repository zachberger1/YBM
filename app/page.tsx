"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Plus } from "lucide-react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollCTA, setShowScrollCTA] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(""); // ✅ Added title state
  const [latestNewsletter, setLatestNewsletter] = useState<string | null>(null);

  // Detect scroll for CTA
  useEffect(() => {
    const handleScroll = () => setShowScrollCTA(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch latest newsletter on load
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/latest");
        const data = await res.json();
        if (res.ok && data.fileUrl) {
          setLatestNewsletter(data.fileUrl);
        }
      } catch (err) {
        console.error("Error fetching latest newsletter:", err);
      }
    };
    fetchLatest();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleUpload = async () => {
  if (!file || !title) {
    alert("Please select a file and enter a title.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (res.ok) {
    alert("Upload successful!");
    console.log("File available at:", data.fileUrl);
  } else {
    alert("Upload failed: " + data.error);
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf3] relative">
      {/* HEADER */}
      <header className="w-full bg-[#EBE6CA] flex justify-between fixed top-0 left-0 z-50 shadow-md">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-6 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="Logo" width={200} height={50} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center font-medium text-black">
            <Link href="/">Home</Link>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="pt-[80px]" />

      {/* HERO SECTION */}
      <div className="relative w-full h-[640px] ">
        <Image
          src="/heroph.jpg"
          alt="Hero Image"
          width={1920}
          height={584}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Hero Logo"
            width={350}
            height={350}
            className="object-contain filter brightness-0 invert drop-shadow-2xl"
          />
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="flex justify-center items-center py-16 px-6">
        <div className="bg-[#EBE6CA] w-full max-w-4xl p-10 rounded-xl shadow-lg border border-gray-300 text-center">
          <h1 className="text-4xl font-semibold mb-6 text-gray-800">
            About Our Community
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to our community! We’re a group of passionate individuals
            who share ideas, stories, and creativity. Our mission is to bring
            people together, inspire growth, and make every member feel at home.
          </p>
        </div>
      </section>

      {/* NEWSLETTER IFRAME SECTION */}
      <section className="flex justify-center items-center py-16 px-6 bg-[#EBE6CA]/50">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Latest Newsletter
          </h2>

          {latestNewsletter ? (
            <iframe
              src={latestNewsletter}
              className="w-full h-[800px] rounded-xl border border-gray-300 shadow-lg"
            />
          ) : (
            <p className="text-center text-gray-700">
              No newsletter uploaded yet.
            </p>
          )}
        </div>
      </section>

      {/* JOIN COMMUNITY SECTION */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#fdfbf3]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Join Our Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* LEFT BOX - WhatsApp */}
            <div className="bg-[#EBE6CA] border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <div>
                <h3 className="text-2xl font-semibold text-[#211F40] mb-4">
                  Join Through WhatsApp
                </h3>
                <p className="text-gray-700 mb-6">
                  Scan the QR code below to join our WhatsApp community and stay
                  updated with weekly news and events.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/QR.png"
                  alt="WhatsApp QR Code"
                  width={180}
                  height={180}
                  className="rounded-lg shadow-lg border border-gray-300"
                />
              </div>
            </div>

            {/* RIGHT BOX - Email Signup */}
            <div className="bg-[#EBE6CA] border border-gray-200 rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <div>
                <h3 className="text-2xl font-semibold text-[#211F40] mb-4">
                  Join Through Email
                </h3>
                <p className="text-gray-700 mb-6">
                  Enter your email below to sign up for our weekly newsletter
                  and stay connected with the latest updates.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 w-full px-5 py-4 text-lg bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-yellow-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EBE6CA] py-6 text-center text-gray-700 relative">
        <p>© {new Date().getFullYear()} Community. All rights reserved.</p>

        {/* Admin button bottom right */}
        <button
          onClick={() => setAdminOpen(true)}
          className="absolute bottom-4 right-6 text-black underline text-sm hover:text-gray-800 transition"
        >
          Admin
        </button>
      </footer>

      {/* ADMIN OVERLAY */}
      {adminOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#EBE6CA] rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center relative">
            <h2 className="text-2xl font-semibold text-[#211F40] mb-6">
              Upload New Newsletter
            </h2>
            <input
              type="text"
              placeholder="Enter newsletter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg mb-4 text-gray-800"
            />
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#211F40]/50 rounded-xl py-10 cursor-pointer hover:bg-[#f4efd7] transition">
              <Plus className="text-[#211F40]" size={40} />
              <span className="mt-2 text-gray-700 text-sm">
                Click to choose file
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && <p className="text-sm text-gray-700 mt-2">{file.name}</p>}
            <button
              onClick={handleUpload}
              className="bg-[#211F40] text-white px-6 py-3 rounded-lg mt-4 hover:bg-[#322e6b] transition"
            >
              Upload
            </button>
            <button
              onClick={() => setAdminOpen(false)}
              className="text-gray-600 hover:text-gray-800 mt-3 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
