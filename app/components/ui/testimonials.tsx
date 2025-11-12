"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  { quote: "The most peaceful and beautiful mikvah experience I’ve had.", name: "Community Member" },
  { quote: "A truly welcoming and calming environment.", name: "Sarah" },
  { quote: "Everything was private, clean, and respectful.", name: "Rachel" },
  { quote: "The attendants made me feel comfortable and cared for.", name: "Miriam" },
  { quote: "So grateful for such a beautiful mikvah in our community.", name: "Leah" },
]

export default function Testimonials() {
    
  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-[#EBE6CA] text-[#211F40] py-12 px-6 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Community Testimonials</h2>
      <div className="max-w-5xl mx-auto relative flex items-center">
        
        {/* Left Arrow */}
        <button onClick={prev} className="absolute left-0 z-10 p-2">
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Slider */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
              >
                <div className="bg-white shadow-md rounded-xl p-6 h-full flex flex-col justify-between">
                  <p className="italic text-lg">“{t.quote}”</p>
                  <p className="mt-4 font-semibold text-right">— {t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button onClick={next} className="absolute right-0 z-10 p-2">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  )
}
