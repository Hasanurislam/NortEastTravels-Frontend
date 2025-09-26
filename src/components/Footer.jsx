import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Youtube,
  Heart,
} from "lucide-react";

const Link = ({ to, children, className = "" }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-75"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight leading-none">
                  Northeast
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase leading-none">
                  Travels
                </span>
              </div>
            </Link>

            <p className="text-gray-300 leading-relaxed text-sm">
              Discover the hidden gems of Northeast India with our expertly curated travel experiences. Adventure awaits in every corner.
            </p>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                  { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                  { icon: Twitter, href: "#", color: "hover:bg-blue-400" },
                  { icon: Youtube, href: "#", color: "hover:bg-red-600" },
                  { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                  >
                    <social.icon className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {[
                { name: "Destinations", href: "/destinations" },
                { name: "Tour Packages", href: "/packages" },
                { name: "Adventure Tours", href: "/adventure" },
                { name: "Cultural Experiences", href: "/culture" },
                { name: "Travel Guide", href: "/guide" },
                { name: "Blog", href: "/blog" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">
              Services
            </h4>
            <nav className="space-y-3">
              {[
                { name: "Hotel Booking", href: "/hotels" },
                { name: "Flight Booking", href: "/flights" },
                { name: "Car Rental", href: "/cars" },
                { name: "Travel Insurance", href: "/insurance" },
                { name: "Visa Assistance", href: "/visa" },
                { name: "Custom Itineraries", href: "/custom" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-blue-600 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    123 Tourist Street
                    <br />
                    Imphal, Manipur 795001
                    <br />
                    Northeast India
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <a
                  href="tel:+919101221130"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                 +919101221130
                </a>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </div>
                <a
                  href="mailto:info@northeasttravels.com"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  info@northeasttravels.com
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h5 className="text-white font-medium text-sm">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p className="flex items-center space-x-1">
                <span>
                  © {new Date().getFullYear()} Northeast Travels. Made with
                </span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>in India</span>
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/cookies"
                  className="hover:text-white transition-colors duration-300"
                >
                  Cookies
                </Link>
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <ArrowUp className="w-4 h-4 text-gray-300 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" />
              <span className="text-sm text-gray-300 group-hover:text-white">
                Back to Top
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Background Effects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
}
