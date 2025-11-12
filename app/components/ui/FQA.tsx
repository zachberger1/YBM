"use client"
import { useState } from "react"

const faqs = [
    {
        question: "I am a bride and I need to set up an appointment, what do I do?",
        answer: `Getting married is an exciting and meaningful time in your life. 
    Bridal appointments are scheduled during the daytime hours only. 
    Call the Mikvah at (818) 760-4567 or click here to email us. 
    A representative will contact you to schedule and review guidelines. 
    Suggested fee: $100.`,
    },
    {
        question: "I am a bride and I'd like to learn about Taharat Hamishpachah.",
        answer: `The Teichman Mikvah will direct you to a Kallah teacher trained to teach 
    about Family Purity and Mikvah use. Please call (818) 760-4567 or email us.`,
    },
    {
        question: "I have a bedikah cloth (or other shailah). What should I do?",
        answer: `The Mikvah has a private drop box for shailos, addressed by Rabbi Asher Biron. 
    Place in a sealed envelope with your phone number. No name is required.`,
    },
    {
        question: "If I come fully prepared, can I just immerse?",
        answer: `For Halachic and hygienic reasons, all women must shower at the Mikvah before immersing.`,
    },
    {
        question: "How do I prepare if I need to go on Friday night or Yom Tov?",
        answer: `Complete all preparations before Shabbat/Yom Tov begins. 
    Arrive 30 minutes after candle lighting. 
    Friday: doors close 40 minutes after. Yom Tov: follow same rules.`,
    },
    {
        question: "If I need to go Motzaei Shabbat/Yom Tov?",
        answer: `Prepare fully before Shabbat/Yom Tov. After, shower thoroughly, comb hair, brush teeth, and check body carefully.`,
    },
    {
        question: "How long may I stay in the water and pray?",
        answer: `You may remain as long as you wish for prayer, but not alone in the Mikvah.`,
    },
    {
        question: "Can I make an after-hours appointment?",
        answer: `Yes, for an additional fee. Call (818) 760-4567 at least 24 hours in advance or email us.`,
    },
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="bg-[#EBE6CA] text-[#211F40] py-12 px-6 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-[#211F40] pb-4">
                        <button
                            className="w-full text-left flex justify-between items-center font-semibold text-lg"
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            {faq.question}
                            <span>{openIndex === i ? "−" : "+"}</span>
                        </button>
                        {openIndex === i && (
                            <p className="mt-3 text-base leading-relaxed">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
