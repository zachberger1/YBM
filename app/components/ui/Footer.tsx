export default function Footer() {
    return (
        <footer className="bg-[#211F40] text-[#EBE6CA] py-10 px-6 md:px-20">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-bold mb-3">The Teichman Mikvah</h3>
                    <p>12800 Chandler Blvd<br />Sherman Oaks, CA 91401</p>
                    <p className="mt-2">📞 (818) 760-4567</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Keep in Touch</h3>
                    <ul className="space-y-2">
                        <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                        <li><a href="/faq" className="hover:underline">FAQs</a></li>
                        <li><a href="/membership" className="hover:underline">Membership</a></li>
                    </ul>
                </div>

                {/* Copyright */}
                <div className="md:text-right">
                    <p>© 2021 The Teichman Mikvah</p>
                    <p className="text-sm">Trademarks and brands are the property of their respective owners.</p>
                </div>
            </div>
        </footer>
    )
}
