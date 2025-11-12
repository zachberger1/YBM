export default function Membership() {
    const memberships = [
        {
            title: "Standard Visit",
            price: "$36",
            duration: "Per Visit",
            details: "One visit during regular hours.",
            button: "Make an Appointment",
            link: "/appointment",
        },
        {
            title: "Basic Membership",
            price: "$500",
            duration: "Per Year",
            details: "One-year membership during regular hours.",
            button: "Join Basic Membership",
            link: "/membership/basic",
        },
        {
            title: "Gold Membership",
            price: "$1,000",
            duration: "Per Year",
            details: "One-year membership during regular hours with added benefits.",
            button: "Join Gold Membership",
            link: "/membership/gold",
        },
    ]

    return (
        <section className="py-16 bg-gray-100 text-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#211F40] mb-10">
                    Membership Options
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {memberships.map((m, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-200"
                        >
                            <h3 className="text-2xl font-bold text-[#211F40] mb-3">{m.title}</h3>
                            <p className="text-3xl font-extrabold text-[#322F5E]">{m.price}</p>
                            <p className="text-sm mb-4">{m.duration}</p>
                            <p className="mb-6">{m.details}</p>
                            <a
                                href={m.link}
                                className="inline-block px-5 py-2 bg-[#211F40] text-[#EBE6CA] rounded-lg hover:bg-[#322F5E] transition"
                            >
                                {m.button}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
