"use client";

import { MapPin, Phone, CalendarDays } from "lucide-react";

export default function Amenities() {
    return (
        <section className="py-16 px-6 bg-[#EBE6CA]/40 flex justify-center">
            <div className="max-w-6xl w-full">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Amenities
                </h2>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-xl transition">
                    <MapPin size={48} className="text-[#211F40] mb-4" />

                    <h3 className="text-3xl font-semibold text-gray-800 mb-3">
                        Location
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                        44 King George Street
                        Jerusalem, Israel
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">

                    {/* LOCATION */}


                    {/* CONTACT */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-xl transition">
                        <Phone size={48} className="text-[#211F40] mb-4" />

                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                            Contact Us
                        </h3>

                        <p className="text-gray-700 leading-relaxed">
                            Have a question? Reach out at: <br />
                            <br />
                            ✉️ Ybmshul@gmail.com
                        </p>
                    </div>




                    {/* COMMUNITY EVENTS (SUGGESTED THIRD ITEM) */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-xl transition">
                        <CalendarDays size={48} className="text-[#211F40] mb-4" />

                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                            Community Events
                        </h3>

                        <p className="text-gray-700 leading-relaxed">
                            Stay updated on weekly gatherings,
                            special occasions, and programs.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
