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
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [latestNewsletter, setLatestNewsletter] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollCTA(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/latest");
        const data = await res.json();
        if (res.ok && data.fileUrl) setLatestNewsletter(data.fileUrl);
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

    try {
      const data = await res.json();
      if (res.ok) {
        alert("Upload successful!");
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch {
      alert("Upload failed: server returned invalid response");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "1234") {
      setAuthenticated(true);
      setPasswordInput("");
    } else {
      alert("Incorrect password.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf3] relative">

      {/* HEADER */}
      <header className="w-full bg-[#EBE6CA] flex justify-between fixed top-0 left-0 z-50 shadow-md">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center px-6 py-2">

          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="Logo" width={200} height={50} />
          </Link>

          <nav className="hidden md:flex gap-6 items-center font-medium text-black">
            <Link href="/">Home</Link>

            <Link
              href="#newsletter"
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
          <div className="fixed inset-0 bg-black/80 text-white flex flex-col items-center justify-center space-y-8 text-2xl font-semibold z-[9999]">
            <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                document.getElementById("newsletter")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="px-6 py-3 bg-white text-[#211F40] rounded-full shadow hover:bg-gray-200 transition"
            >
              Zmanim
            </button>

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

      <div className="pt-20" />

      {/* HERO */}
      <div className="relative w-full h-[640px]">
        <Image
          src="/heroph.jpg"
          alt="Hero Image"
          width={1920}
          height={584}
          className="w-full h-full object-cover"
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

      {/* ABOUT */}
      <section className="flex justify-center items-center py-16 px-6">
        <div className="bg-[#EBE6CA] w-full max-w-4xl p-10 rounded-xl shadow-lg border border-gray-300 text-center">
          <h1 className="text-4xl font-semibold mb-6 text-gray-800">
            About Our Community
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to our community! We’re a group of passionate individuals
            who share ideas, stories, and creativity.
          </p>

          {/* NEW DONATE BUTTON */}
          <Link
            href="/donate"
            className="inline-block mt-4 px-8 py-4 bg-[#211F40] text-white rounded-full text-lg font-semibold shadow-lg hover:bg-[#322e6b] transition"
          >
            Donate
          </Link>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 px-6 bg-[#EBE6CA]/40 flex justify-center">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Gallery</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-xl">
              <Image src="/heroph.jpg" alt="Gallery Image" width={800} height={600} className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-xl">
              <Image src="/heroph.jpg" alt="Gallery Image" width={800} height={600} className="w-full h-full object-cover" />
            </div>
          </div>

          <Link
            href="/gallery"
            className="inline-block mt-8 px-6 py-3 bg-[#211F40] text-white rounded-full shadow hover:bg-[#322e6b] transition"
          >
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="flex justify-center items-center py-16 px-6 bg-white/30">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Latest Newsletter
          </h2>
          {latestNewsletter ? (
            <div className="relative w-full max-w-3xl mx-auto h-[500px] md:h-[650px] lg:h-[750px] overflow-hidden rounded-xl shadow-xl bg-white flex items-center justify-center">
              <img
                src={latestNewsletter}
                alt="Newsletter"
                className="max-h-full max-w-full object-contain"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-2xl md:text-3xl font-semibold">Click for Preview</span>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700">No newsletter uploaded yet.</p>
          )}

        </div>
      </section>

      {/* UPDATED FOOTER */}
      <footer className="bg-[#EBE6CA] py-12 px-6 mt-auto relative border-t border-gray-400/40 rounded-t-4xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">

          {/* COLUMN 1 – QUICK LINKS */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#211F40]">Quick Links</h3>
            <ul className="space-y-2 text-lg">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="#newsletter" className="hover:underline">Zmanim</Link></li>
              <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
              <li><Link href="/donate" className="hover:underline font-semibold">Donate</Link></li>
            </ul>
          </div>

          {/* COLUMN 2 – CONTACT INFO */}
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
          onClick={() => setAdminOpen(true)}
          className="absolute bottom-4 right-6 text-black underline text-sm hover:text-gray-800 transition"
        >
          Admin
        </button>
      </footer>

      {/* ADMIN OVERLAY */}
      {adminOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          {!authenticated ? (
            <form
              onSubmit={handlePasswordSubmit}
              className="bg-[#EBE6CA] rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm text-center"
            >
              <h2 className="text-2xl font-semibold text-[#211F40] mb-6">Admin Login</h2>
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg mb-4 text-gray-800 bg-[#e6e1c5]"
              />
              <button type="submit" className="bg-[#211F40] text-white px-6 py-3 rounded-lg hover:bg-[#322e6b] transition w-full">Submit</button>
              <button type="button" onClick={() => setAdminOpen(false)} className="text-gray-600 hover:text-gray-800 mt-3 underline">Cancel</button>
            </form>
          ) : (
            <div className="bg-[#EBE6CA] rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center">
              <h2 className="text-2xl font-semibold text-[#211F40] mb-6">Upload New Newsletter</h2>
              <input
                type="text"
                placeholder="Enter newsletter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg mb-4 text-gray-800 bg-[#e6e1c5] "
              />
              <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#211F40]/50 rounded-xl py-10 cursor-pointer hover:bg-[#f4efd7] transition">
                <Plus className="text-[#211F40]" size={40} />
                <span className="mt-2 text-gray-700 text-sm">Click to choose file</span>
                <input type="file" onChange={handleFileChange} className="hidden" />
              </label>
              {file && <p className="text-sm text-gray-700 mt-2">{file.name}</p>}
              <div className="flex flex-row justify-between ">
                <button
                  onClick={() => {
                    setAdminOpen(false);
                    setAuthenticated(false);
                  }}
                  className="text-gray-600 hover:text-gray-800 mt-3 underline"
                >
                  Close
                </button>

                <button onClick={handleUpload} className="bg-[#211F40] text-white px-6 py-3 rounded-lg mt-4 hover:bg-[#322e6b] transition">Upload</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
