import Image from "next/image";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

export default function GalleryPage() {
  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf3]  pt-32  ">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Full Photo Gallery
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-0 sm:grid-cols-0 lg:grid-cols-2 gap-8 pb-6 " >

        <Image
          src="/heroph.jpg"
          alt={`Gallery Image `}
          width={800}
          height={600}
          className="w-full h-full object-cover  h-64 rounded-xl overflow-hidden shadow-xl"
        />
        <Image
          src="/mm.jpg"
          alt={`Gallery Image `}
          width={800}
          height={600} 
          className="w-full h-full object-cover h-64 rounded-xl overflow-hidden shadow-xl"
        />
      </div>

      {/* <div className="max-w-6xl mx-auto grid grid-cols-0 sm:grid-cols-0 lg:grid-cols-2 gap-8 pb-6 ">
        {images.map((src, i) => (
          <div
            key={i}
            className="w-full h-64 rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src="/heroph.jpg"
              alt={`Gallery Image ${i + 1}`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div> */}
      <Footer />
    </div>
  );
}
