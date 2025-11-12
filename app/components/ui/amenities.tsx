import { DoorOpen, Car, Accessibility, Home } from "lucide-react"

export default function Amenities() {
    const features = [
        { icon: DoorOpen, title: "Spa-Like Preparation Rooms", desc: "Beautifully designed for peace and comfort." },
        { icon: Car, title: "Private & Handicap Parking", desc: "Ample private parking with handicap spaces." },
        { icon: Accessibility, title: "Handicap Accessible Rooms", desc: "Designed for full accessibility and comfort." },
        { icon: Home, title: "Ample Mikvah Pool", desc: "Spacious pool ensuring a calm, serene experience." },
    ]

    return (
        <section className="py-16 text-gray-800 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#211F40] mb-10">
                    Our Amenities
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200"
                        >
                            <f.icon size={40} className="text-[#211F40] mb-4" />
                            <h3 className="text-xl font-semibold text-[#211F40] mb-2">{f.title}</h3>
                            <p className="text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
