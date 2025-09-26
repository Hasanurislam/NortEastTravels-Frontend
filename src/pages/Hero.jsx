import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SiteHeroIntro() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // A slight delay before starting the animation can feel smoother
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    {
      label: "Tours",
      description:
        "Experience authentic and immersive journeys exploring Northeast India’s natural beauty and cultural heritage.",
      path: "/browse/tours",
    },
    {
      label: "Cars",
      description:
        "Secure reliable and comfortable vehicles suited to your travel style for a seamless mobility experience.",
      path: "/browse/cars",
    },
    {
      label: "Hotels",
      description:
        "Discover carefully selected accommodations offering comfort and local charm across key destinations.",
      path: "/browse/hotels",
    },
  ];

  return (
    // ADDED: animate-bg-pan for a slow, subtle background gradient animation.
    // You'll need to add this animation to your tailwind.config.js (see note below)
    <section className="bg-gradient-to-b from-[#fdf6f0] via-[#f7f9fc] to-[#e6f0f5] min-h-screen text-gray-900 animate-bg-pan">
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Introduction */}
        <div
          // The entrance animation for the text is already good, we'll keep it.
          className={`text-center mb-20 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-gray-800">
            Your Trusted Travel Booking Platform for Northeast India
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light text-gray-600">
            North-East Travels is Assam’s premier online platform dedicated to
            delivering curated travel experiences, transparent pricing, and
            convenient booking services. Whether you seek culturally immersive
            tours, quality vehicles for hire, or exceptional accommodations, we
            ensure your journey is seamless and memorable.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {categories.map(({ label, description, path }, index) => (
            <div
              key={label}
              role="button"
              tabIndex={0}
              onClick={() => navigate(path)}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(path);
              }}
              // ADDED: `group` for micro-interactions and enhanced transition/hover effects
              // The base transition duration is now slightly longer for a smoother feel.
              className={`
                group cursor-pointer border border-gray-300 rounded-2xl p-8 flex flex-col justify-between 
                bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300
                transition-all duration-500 ease-in-out hover:-translate-y-2
                ${ isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8" }
              `}
              // ADDED: Inline style for staggered animation delay. This is a clean way to handle dynamic delays.
              style={{ transitionDelay: `${index * 150}ms` }}
              aria-label={`Maps to ${label}`}
            >
              <div>
                <h2 className="text-3xl font-semibold mb-4 text-indigo-700">{label}</h2>
                <p className="text-indigo-900 mb-6 flex-grow leading-relaxed text-sm md:text-base">
                  {description}
                </p>
              </div>
              <div className="inline-flex items-center text-indigo-600 font-semibold text-lg">
                Explore
                {/* ADDED: Transition and group-hover effect for the arrow */}
                <ArrowRight className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}