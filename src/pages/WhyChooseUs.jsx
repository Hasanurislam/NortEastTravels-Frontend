import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// A custom hook for the number counting animation
function useAnimatedCounter(target, isInView) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      // If the target is a string like "50K+", we just want the number
      const end = parseInt(target.toString().replace(/[^0-9]/g, ''));
      if (start === end) return;

      // Find the duration based on the number size
      const duration = Math.min(2000, end * 20);
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [target, isInView]);
  
  // Re-attach the non-numeric parts like '+' or '.9'
  const finalCount = count + (typeof target === 'string' ? target.replace(/[0-9]/g, '') : '');
  return finalCount;
}


// A wrapper component for scroll-triggered animations
const AnimatedSection = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};


// Replace Link with react-router-dom's Link in production
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

// Animated Stat component using our custom hook
const AnimatedStat = ({ number, label, sublabel }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const animatedNumber = useAnimatedCounter(number, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-extrabold text-indigo-600 mb-1">{animatedNumber}</div>
      <div className="text-base font-semibold text-slate-700">{label}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wide">{sublabel}</div>
    </div>
  );
};

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  const reasons = [
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: "Born From Passion",
      subtitle: "Not profit margins",
      description: "Every journey we craft comes from our deep love for Northeast India. We're not tour operators—we're storytellers who happen to know the most beautiful stories.",
      detail: "Founded by local explorers who spent decades discovering hidden gems",
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      title: "Local Wisdom",
      subtitle: "Beyond guidebooks",
      description: "Our guides aren't just showing you places—they're sharing their ancestral knowledge. Experience destinations through the eyes of those who call them home.",
      detail: "Deep partnerships with indigenous communities across all seven sister states",
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      title: "Mindful Travel",
      subtitle: "Leave only footprints",
      description: "Tourism that gives back. Every booking contributes to local communities and conservation efforts. Travel with purpose, return with perspective.",
      detail: "₹500 from every booking goes directly to local conservation projects",
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "Moments, Not Monuments",
      subtitle: "Experiences over attractions",
      description: "We don't just take you to places—we create moments that become memories. Watch sunrise with monks, learn ancient crafts, taste recipes passed down generations.",
      detail: "Average of 15 unique cultural interactions per journey",
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
      title: "Trust, Earned Daily",
      subtitle: "Not marketed cheaply",
      description: "No hidden costs, no surprise changes, no compromises on quality. What we promise is what you experience—backed by 50,000+ satisfied travelers.",
      detail: "100% transparent pricing with 24/7 support guarantee",
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
      title: "Small Groups",
      subtitle: "Big connections",
      description: "Maximum 12 travelers per group. Because the best conversations happen around small campfires, and the most beautiful moments are best shared intimately.",
      detail: "Personalized attention with expert local guides throughout",
    },
  ];

  const testimonials = [
    { name: "Priya Sharma", location: "Mumbai", text: "They didn't just show me Meghalaya—they helped me discover a part of myself I never knew existed. The living root bridges weren't just a destination; they became a metaphor for my own resilience.", journey: "7-day Meghalaya Explorer", avatar: "PS" },
    { name: "Rajesh Kumar", location: "Delhi", text: "What struck me most wasn't the rhinos in Kaziranga, but how our guide spoke about them—with the reverence of someone protecting family. That's when I realized this wasn't tourism; this was homecoming.", journey: "Wildlife & Culture Combo", avatar: "RK" },
    { name: "Sarah Chen", location: "Singapore", text: "I've traveled to 40 countries, but nowhere have I felt more welcomed than in the villages of Majuli. The monks didn't just show us their monastery—they invited us into their philosophy of life.", journey: "Spiritual Northeast Journey", avatar: "SC" },
  ];

  const stats = [
    { number: 15, label: "Years of expertise", sublabel: "in Northeast India" },
    { number: "50K+", label: "Stories created", sublabel: "and memories made" },
    { number: 4.9, label: "Experience rating", sublabel: "from real travelers" },
    { number: "100%", label: "Authentic promise", sublabel: "no tourist traps" },
  ];

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero header */}
        <div className={`text-center pt-20 pb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-block bg-white border border-slate-200 rounded-full px-5 py-2 mb-6">
            <span className="text-indigo-600 text-sm font-semibold tracking-wide">North-East Travels &bull; Experience Real India</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Discover the <span className="text-indigo-600">Difference</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            North-East Travels is Assam’s trusted travel booking hub — born from local passion, built for mindful journeys. See authentic Northeast India with stories you’ll remember for life.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {reasons.map((reason, index) => (
            <div key={index} className={`group transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`} style={{ transitionDelay: `${index * 120}ms` }}>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 h-full group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                <div className="text-indigo-600 mb-5 inline-block">{reason.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{reason.title}</h3>
                <p className="text-indigo-500 font-medium text-sm mb-3">{reason.subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{reason.description}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{reason.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12 border border-slate-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Trusted Trip Partner In Numbers</h2>
              <p className="text-lg text-slate-500">Expertise, transparency, and memories that last</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedStat key={index} {...stat} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection>
          <div className="my-24 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-1">What Real Travelers Say</h2>
              <p className="text-lg text-indigo-500">Honest reviews from the heart</p>
            </div>
            <div className="relative rounded-2xl p-8 md:p-12 bg-white shadow-lg border border-slate-200 overflow-hidden">
               {/* Progress Bar */}
               <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
                <motion.div
                  className="h-1 bg-indigo-600"
                  key={activeTestimonial} // Re-trigger animation on change
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5 }}
                />
              </div>
              <div className="text-center">
                 <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial} // Key change triggers the animation
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-5 flex items-center justify-center border-2 border-slate-200">
                      <span className="text-2xl font-bold text-indigo-600">{testimonials[activeTestimonial].avatar}</span>
                    </div>
                    <blockquote className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed mb-6">
                      “{testimonials[activeTestimonial].text}”
                    </blockquote>
                    <div>
                      <div className="font-semibold text-slate-800 mb-0.5">{testimonials[activeTestimonial].name}</div>
                      <div className="text-sm text-slate-500">{testimonials[activeTestimonial].location} &bull; {testimonials[activeTestimonial].journey}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setActiveTestimonial(index)} className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === activeTestimonial ? "bg-indigo-600" : "bg-slate-300 hover:bg-slate-400"}`} aria-label={`Go to testimonial ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Promise */}
        <AnimatedSection>
          <div className="bg-slate-800 rounded-2xl shadow-lg p-10 md:p-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Promise to You</h2>
            <p className="text-lg font-light mb-8 max-w-3xl mx-auto leading-relaxed text-slate-300">
              Every booking helps preserve local culture. Every trip is crafted with care and transparency. Travel with North-East Travels and return home transformed — not just with photos, but with stories and perspective.
            </p>
            <div className="inline-block w-20 h-0.5 bg-slate-600"></div>
          </div>
        </AnimatedSection>

        {/* CTA Final Section */}
        <AnimatedSection>
          <div className="text-center my-24">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Ready to Experience Northeast India?
              </h2>
              <p className="text-lg text-slate-600 pt-2">
                Start your story with local experts and real connections.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/browse/tours" className="group bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center">
                <span>Start Your Journey</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/contact" className="group border border-slate-300 text-slate-700 font-bold py-3 px-8 rounded-lg hover:border-slate-400 hover:bg-slate-100 transition-all duration-300">
                <span>Let's Talk</span>
              </Link>
            </div>
            <div className="pt-12 mt-12 border-t border-slate-200">
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-slate-500">
                <div className="flex items-center space-x-2"><svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg><span className="text-sm font-medium">Award-winning journeys</span></div>
                <div className="flex items-center space-x-2"><svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-sm font-medium">100% satisfaction</span></div>
                <div className="flex items-center space-x-2"><svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg><span className="text-sm font-medium">Locally owned</span></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}