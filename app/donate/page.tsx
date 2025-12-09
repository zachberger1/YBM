import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

export default function DonatePage() {
    return (
        <div>
            <Header />

            <main className="min-h-screen bg-[#F7F3E3] pt-32 pb-20 px-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-[#211F40] mb-4">
                    Support Our Synagogue
                </h1>

                <p className="text-lg text-gray-700 max-w-2xl text-center mb-12">
                    Your contribution helps us maintain our programs, events, and
                    community services. Thank you for supporting our mission.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">

                    {/* ISRAEL DONATIONS */}
                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-200">
                        <h2 className="text-xl font-semibold text-[#211F40] mb-4">
                            Donate from Israel
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Secure online donations for Israeli supporters.
                        </p>

                        <a
                            href="https://www.matara.pro/nedarimplus/online/?mosad=7013139"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-[#211F40] text-white rounded-full font-semibold shadow hover:bg-[#332e6b] transition"
                        >
                            Donate (Israel)
                        </a>
                    </div>

                    {/* USA DONATIONS */}
                    <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-200">
                        <h2 className="text-xl font-semibold text-[#211F40] mb-4">
                            Donate from the United States
                        </h2>

                        <p className="text-gray-600 mb-6">
                            U.S. tax-deductible donations through PEF Israel Endowment Funds.
                        </p>

                        <a
                            href="https://pefisrael.org/charity/haskel-veyadoa-bet-shemesh/edit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-[#211F40] text-white rounded-full font-semibold shadow hover:bg-[#332e6b] transition"
                        >
                            Donate (U.S.)
                        </a>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
