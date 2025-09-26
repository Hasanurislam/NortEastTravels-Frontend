import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Calendar,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const destinations = [
    {
      name: "Ziro Valley",
      location: "Arunachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      description: "Home of ancient Apatani tribes with otherworldly charm",
      rating: 4.8,
      type: "Cultural Heritage",
    },
    {
      name: "Kaziranga National Park",
      location: "Assam",
      image:
        "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      description: "UNESCO World Heritage Site, home to one-horned rhinoceros",
      rating: 4.9,
      type: "Wildlife Safari",
    },
    {
      name: "Tawang",
      location: "Arunachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      description: "Snow-clad peaks, pristine lakes and ancient monasteries",
      rating: 4.7,
      type: "Mountain Adventure",
    },
    {
      name: "Cherrapunji",
      location: "Meghalaya",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      description: "Wettest place on Earth with living root bridges",
      rating: 4.6,
      type: "Natural Wonder",
    },
    {
      name: "Shillong",
      location: "Meghalaya",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      description: "Scotland of the East with rolling hills and lakes",
      rating: 4.5,
      type: "Hill Station",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Brand */}
              <div className="space-y-2">
                <div className="inline-flex items-center bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  <MapPin className="w-8 h-8 mr-2 text-emerald-400" />
                  <span className="text-2xl font-light tracking-wider">
                    NORTH EAST
                  </span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  TRAVELS
                </h1>
                <p className="text-xl text-gray-300 font-light">
                  Discover the Hidden Gems of Northeast India
                </p>
              </div>

              {/* Current Destination Info */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">
                    {destinations[currentSlide].type}
                  </span>
                  <div className="flex items-center text-amber-300">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-sm font-medium">
                      {destinations[currentSlide].rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {destinations[currentSlide].name}
                </h3>
                <p className="text-gray-300 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-emerald-400" />
                  {destinations[currentSlide].location}
                </p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {destinations[currentSlide].description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  onClick={() => navigate("/browse/tours")}
                >
                  <span className="flex items-center justify-center">
                    Explore Packages
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Plan Your Trip
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150+</div>
                  <div className="text-sm text-gray-300">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5000+</div>
                  <div className="text-sm text-gray-300">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.8★</div>
                  <div className="text-sm text-gray-300">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Destination Cards */}
            <div className="hidden lg:block">
              <div className="space-y-4">
                {destinations.map((destination, index) => (
                  <div
                    key={index}
                    className={`group cursor-pointer transition-all duration-500 ${index === currentSlide
                        ? "transform scale-105 opacity-100"
                        : "opacity-60 hover:opacity-80"
                      }`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-16 h-16 rounded-xl bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${destination.image})`,
                          }}
                        ></div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">
                            {destination.name}
                          </h4>
                          <p className="text-gray-300 text-sm">
                            {destination.location}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 fill-current text-amber-300 mr-1" />
                            <span className="text-xs text-amber-300">
                              {destination.rating}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">
                              {destination.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                  ? "bg-emerald-400 w-8"
                  : "bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Banner;
