import Image from "next/image";

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
    <div className="min-h-screen bg-[#fdfbf3] pb-20 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Full Photo Gallery
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((src, i) => (
          <div
            key={i}
            className="w-full h-64 rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src={src}
              alt={`Gallery Image ${i + 1}`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
