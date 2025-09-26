import { useState } from "react";
// For the intended serif font effect, you would typically import a font in your CSS/project
// and extend your tailwind.config.js, e.g., fontFamily: { serif: ['Lora', 'serif'] }

export default function RedesignedAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqData = [
    {
      question: "What makes your Northeast India experiences different?",
      answer:
        "We believe travel should transform, not just transport. Our journeys are crafted by locals who've spent generations understanding these lands. Every experience includes authentic cultural immersion—from learning traditional crafts with artisans to sharing meals with families in remote villages. We limit groups to 12 travelers maximum, ensuring intimate connections and personalized attention that larger tours simply cannot provide.",
    },
    {
      question: "How do you ensure sustainable and responsible tourism?",
      answer:
        "Sustainability isn't a buzzword for us—it's our foundation. ₹500 from every booking directly supports local conservation projects and community development. We partner exclusively with locally-owned accommodations, employ regional guides, and source meals from village cooperatives. Our 'Leave No Trace' philosophy extends beyond environmental impact to cultural sensitivity, ensuring our presence enriches rather than disrupts local communities.",
    },
    {
      question: "What's included in your tour packages?",
      answer:
        "Our all-inclusive approach means no hidden surprises. Every package includes premium accommodations (heritage properties and eco-lodges), all meals featuring regional cuisine, private transportation with experienced drivers, expert local guides, entrance fees to all attractions, cultural activities and workshops, and 24/7 support. We also provide detailed pre-departure briefings, packing guides, and post-trip photo collections.",
    },
    {
      question: "How far in advance should we book our journey?",
      answer:
        "For the best experience, we recommend booking 2-3 months ahead, especially for peak seasons (October-March and June-August). This allows us to secure the finest accommodations and arrange special cultural experiences. However, we understand spontaneous travel desires—we've crafted beautiful journeys with just 2 weeks' notice. Early booking also offers better rates and ensures availability during festivals and special events.",
    },
    {
      question: "What if weather affects our planned activities?",
      answer:
        "Northeast India's weather can be as dramatic as its landscapes, and we plan accordingly. Every itinerary includes flexible alternatives—indoor cultural experiences, covered markets, monastery visits, or artisan workshops. Our local expertise means we know hidden gems perfect for rainy days. If weather significantly impacts your experience, we offer complimentary extensions or future trip credits. Your satisfaction, not rigid schedules, guides our decisions.",
    },
    {
      question: "Do you cater to solo travelers and special requirements?",
      answer:
        "Absolutely. Solo travelers find kindred spirits in our small groups, and we ensure comfortable single accommodations without excessive supplements. For special requirements—dietary restrictions, mobility considerations, photography interests, or spiritual pursuits—we customize experiences accordingly. Our pre-trip consultations identify your interests and needs, allowing us to tailor everything from meal selections to activity intensity levels.",
    },
    {
      question: "What's your cancellation and refund policy?",
      answer:
        "We believe in fair, transparent policies that protect both travelers and our local partners. Cancellations 60+ days prior receive full refunds minus processing fees. 30-59 days: 75% refund. 15-29 days: 50% refund. Less than 15 days: 25% refund, though we'll work to reschedule when possible. Medical emergencies and visa issues receive special consideration. We strongly recommend travel insurance and are happy to suggest trusted providers.",
    },
    {
      question: "How do we stay connected during our journey?",
      answer:
        "While we encourage digital detox for deeper cultural immersion, we ensure you're never truly disconnected. All accommodations provide WiFi, major towns have excellent mobile coverage, and we supply local SIM cards if needed. Our guides carry satellite phones for remote areas. We also provide daily check-in services for families back home and can arrange emergency communications anytime. Sometimes the best connection is with the present moment—but we're here when you need us.",
    },
  ];

  return (
    <section className="bg-stone-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-100/60 rounded-full px-5 py-2 mb-8 border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
            <span className="text-emerald-800 text-base font-medium tracking-wide">
              Northeast India FAQs • Your Questions Answered
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-800 mb-6 tracking-tight">
            Clarity for Your <br />
            <span className="text-emerald-700">Unforgettable Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
            Real answers for thoughtful adventurers—because unforgettable journeys start with reliable guidance.
          </p>
        </div>

        {/* Accordion */}
        <div className="border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden bg-white">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border-t border-gray-200/80 ${index === 0 ? "border-t-0" : ""}`}
            >
              {/* Accordion control */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus-visible:bg-stone-50"
              >
                <h3 className={`text-lg md:text-xl font-serif font-medium transition-colors duration-300
                  ${openIndex === index ? "text-emerald-700" : "text-stone-800"}`}
                >
                  {item.question}
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300
                    ${openIndex === index ? "rotate-90 text-emerald-600" : "rotate-0 text-stone-400"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Accordion content - using a grid-based animation */}
              <div
                className={`grid transition-all duration-500 ease-in-out
                  ${openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6">
                    <div className="border-l-2 border-emerald-200 pl-6">
                      <p className="text-stone-700 leading-relaxed text-[17px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 pt-16 border-t border-gray-200/80">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-4">
            Still Have a Question?
          </h2>
          <p className="text-stone-600 mb-8 max-w-xl mx-auto">
            We're here to help. The best journeys begin with a good conversation.
            Reach out and let's craft your perfect adventure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+919101221130"
              className="group bg-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300 flex items-center tracking-wide"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>Call Our Experts</span>
            </a>
            <a
              href="mailto:hello@yourcompany.com"
              className="group border border-gray-300 text-stone-700 font-bold py-3 px-8 rounded-full hover:border-gray-400 hover:bg-stone-100/50 transition-all duration-300 flex items-center tracking-wide"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}