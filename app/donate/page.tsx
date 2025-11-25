export default function DonatePage() {
    return (
        <main className="min-h-screen bg-[#F7F3E3] pt-32 pb-20 px-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#211F40] mb-4">Support Our Synagogue</h1>

            <p className="text-lg text-gray-700 max-w-xl text-center mb-10">
                Your contribution helps us maintain our programs, events, and community services.
                Thank you for supporting our mission.
            </p>

            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">
                <h2 className="text-xl font-semibold text-[#211F40] mb-4">Donate Online</h2>

                <p className="text-gray-600 mb-6">
                    Click below to make a secure donation.
                </p>

                <a
                    href="https://your-donation-link-here.com"
                    target="_blank"
                    className="block px-6 py-3 bg-[#211F40] text-white rounded-full font-semibold shadow hover:bg-[#332e6b] transition"
                >
                    Donate Now
                </a>
            </div>
        </main>
    );
}
