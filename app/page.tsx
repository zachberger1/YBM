"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Amenities from "./components/ui/amenities";

export default function Home() {
  const [showScrollCTA, setShowScrollCTA] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const [latestNewsletter, setLatestNewsletter] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImage, setViewerImage] = useState<string | null>(null);

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
        console.error("Error fetching newsletter:", err);
      }
    };
    fetchLatest();
  }, []);

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
      <Header />
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
      <section className="flex justify-center items-center py-16 px-6 bg-[#fdfbf3]">
        <div className="bg-[#EBE6CA] w-full max-w-4xl p-10 rounded-xl shadow-lg border border-gray-300 text-center">
          <h1 className="text-4xl font-semibold mb-6 text-gray-800">
            About Our Kehilla
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our kehillah is a growing, dynamic,leibedik community where achdus and warmth shape everyday life. Grounded in a strong commitment to Limmud HaTorah and Halacha, we nurture learning, mitzvah observance, and heartfelt connection to the R"BSO.

            Reflecting an American-style openness and friendliness, we are proud to create a heartzige environment where every member—whether a local, olah chadasha, visitor, or student from abroad—feels at home and connected, fully part of Yerushalayim Ir HaKodesh.

            While maintaining our distinctive style, we are also part of the larger Yeshurun Beit Knesset, fostering achdus and mutual respect between diverse communities in Eretz Yisrael, a value central to our identity.
          </p>

          <Link
            href="/donate"
            className="inline-block mt-4 px-8 py-4 bg-[#211F40] text-white rounded-full text-lg font-semibold shadow-lg hover:bg-[#322e6b] transition"
          >
            Donate
          </Link>
        </div>
      </section>

      {/* ABOUT THE RABBI (SUBTLE SECTION) */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 max-w-xs">
              <Image
                src="/Rabbi.jpeg"
                alt="Rabbi Chaim Yagoda"
                width={320}
                height={420}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-2xl font-bold text-[#211F40] mb-4">
              Rabbi Chaim Yagoda
            </h2>

            <div className="space-y-3 text-base leading-relaxed text-gray-700">
              <p>
                Rabbi Yagoda brings warmth, wisdom, and a deep love of Torah to
                every shiur he teaches. He leads a morning iyun shiur at
                EFG@Aish and an afternoon bekiyus shiur in the Beis Medrash,
                where students are inspired by his clarity and genuine care.
              </p>

              <p>
                Originally from Englewood, New Jersey, Rabbi Yagoda made aliyah
                to Eretz Yisrael after high school. He studied in Yeshivas Derech
                Hatalmid and later at the Mir Yeshiva, eventually receiving
                Semicha from the Rabanut HaRashit LeYisrael.
              </p>

              <p>
                A beloved member of EFG@Aish for over a decade, Rabbi Yagoda is
                known for his engaging teaching style and meaningful personal
                relationships with his talmidim.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* AMENITIES */}
      <section>
        <Amenities />
      </section>



      {/* NEWSLETTER PREVIEW */}
      <section id="newsletter" className="flex justify-center items-center py-16 px-6 bg-white/30">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 text-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Our Latest Newsletter
          </h2>
          <p className="text-2xl font-semibold" >Click the Newsletter for full scren preview and print</p>
          {latestNewsletter ? (
            <div
              className="relative w-full max-w-3xl mx-auto h-[500px] md:h-[650px] lg:h-[750px] overflow-hidden rounded-xl shadow-xl bg-white flex items-center justify-center cursor-pointer"
              onClick={() => {
                setViewerImage(latestNewsletter);
                setViewerOpen(true);
              }}
            >
              <img
                src={latestNewsletter}
                alt="Newsletter"
                className="max-h-full max-w-full object-contain"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-2xl md:text-3xl font-semibold">
                  Click for Preview
                </span>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700">No newsletter uploaded yet.</p>
          )}
        </div>
      </section>


      {/* GALLERY */}
      <section className="py-16 px-6 bg-[#EBE6CA]/40 flex justify-center">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Gallery</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-xl">
              <Image src="/heroph.jpg" alt="Gallery Image" width={800} height={600} className="w-full h-full object-cover" /> </div>
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-xl">
              <Image src="/mm.jpg" alt="Gallery Image" width={800} height={600} className="w-full h-full object-cover" /> </div>
          </div>
          <Link href="/gallery" className="inline-block mt-8 px-6 py-3 bg-[#211F40] text-white rounded-full shadow hover:bg-[#322e6b] transition" > View Full Gallery </Link>

        </div>
      </section>


      <section className="bg-white/90 py-16 px-6 border-t border-gray-300">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Join Our Community
          </h2>

          <div className=" gap-10 items-center">
            {/* LEFT BOX - WhatsApp */}
            <div className="bg-[#EBE6CA] p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-semibold text-[#211F40] mb-4">
                Join Through WhatsApp
              </h3>
              <p className="text-gray-700 mb-6">
                Scan the QR code below to join our WhatsApp community and stay
                updated with weekly news and events.
              </p>
              <div className="flex justify-center">
                <Image
                  src="/QR.png"
                  alt="WhatsApp QR Code"
                  width={180}
                  height={180}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>



          </div>
        </div>
      </section>

      <Footer onOpenAdmin={() => setAdminOpen(true)} />


      {/* ADMIN OVERLAY */}
      {adminOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-99999">
          {!authenticated ? (
            <form
              onSubmit={handlePasswordSubmit}
              className="bg-[#EBE6CA] rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm text-center"
            >
              <h2 className="text-2xl font-semibold text-[#211F40] mb-6">
                Admin Login
              </h2>

              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg mb-4 text-gray-800 bg-[#e6e1c5]"
              />

              <button
                type="submit"
                className="bg-[#211F40] text-white px-6 py-3 rounded-lg hover:bg-[#322e6b] transition w-full"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => setAdminOpen(false)}
                className="text-gray-600 hover:text-gray-800 mt-3 underline"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="bg-[#EBE6CA] rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center">
              <h2 className="text-2xl font-semibold text-[#211F40] mb-6">
                Upload New Newsletter
              </h2>

              <input
                type="text"
                placeholder="Newsletter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg mb-4 text-gray-800 bg-[#e6e1c5]"
              />

              <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#211F40]/50 rounded-xl py-10 cursor-pointer hover:bg-[#f4efd7] transition">
                <Plus className="text-[#211F40]" size={40} />
                <span className="mt-2 text-gray-700 text-sm">Click to choose file</span>
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="hidden" />
              </label>

              {file && <p className="text-sm text-gray-700 mt-2">{file.name}</p>}

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    setAdminOpen(false);
                    setAuthenticated(false);
                  }}
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Close
                </button>

                <button
                  onClick={async () => {
                    if (!file || !title) return alert("Missing file or title");

                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("title", title);

                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });

                    const data = await res.json();

                    if (res.ok) alert("Upload Successful");
                    else alert("Upload Failed: " + data.error);
                  }}
                  className="bg-[#211F40] text-white px-6 py-3 rounded-lg hover:bg-[#322e6b] transition"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FULLSCREEN VIEWER */}
      {viewerOpen && viewerImage && (
        <div className="fixed inset-0 bg-black/90 z-999999 flex items-start justify-center">

          <div className="absolute top-4 right-4 flex gap-3 z-100000">

            <button
              onClick={() => {
                const win = window.open("", "_blank");
                if (win) {
                  win.document.write(`
                    <html>
                      <head><title>Print</title>
                      <style>
                        body { margin: 0; background: #fff; }
                        img { max-width: 100%; height: auto; display: block; }
                      </style>
                      </head>
                      <body>
                        <img src="${viewerImage}" />
                      </body>
                    </html>
                  `);
                  win.document.close();
                  setTimeout(() => win.print(), 200);
                }
              }}
              className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition"
            >
              Print
            </button>

            <button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({
                    title: "Newsletter",
                    url: viewerImage,
                  });
                } else {
                  await navigator.clipboard.writeText(viewerImage);
                  alert("Copied link");
                }
              }}
              className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition"
            >
              Share
            </button>

            <button
              onClick={() => setViewerOpen(false)}
              className="px-4 py-2 bg-red-600/80 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>

          </div>

          <div className="w-full h-full flex items-center justify-center">
            <img
              src={viewerImage}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
