import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Users,
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Waves,
  Plane,
  Heart,
  Share2,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
  Phone,
  Mail,
  Shield,
  Award,
  Clock,
  Bed,
  Bath,
  Maximize2,
  Wind,
  Tv,
  ParkingCircle,
  Soup,
  Sparkles,
  Crown,
  ArrowRight,
  Grid,
  List,
  SlidersHorizontal,
  Navigation,
  Camera,
} from "lucide-react";

const HotelBookingPage = () => {
  const [searchParams, setSearchParams] = useState({
    location: "Guwahati, Assam",
    checkIn: "",
    checkOut: "",
    guests: {
      adults: 2,
      children: 0,
      rooms: 1,
    },
  });

  const [filters, setFilters] = useState({
    priceRange: [0, 25000],
    starRating: [],
    amenities: [],
    propertyType: [],
    sortBy: "popularity",
  });

  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [wishlistedHotels, setWishlistedHotels] = useState(new Set());

  // Mock hotel data
  const hotels = [
    {
      id: 1,
      name: "Vivanta Guwahati",
      location: "Guwahati, Assam",
      rating: 4.8,
      reviews: 2847,
      pricePerNight: 8999,
      originalPrice: 12999,
      discount: 31,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1470&auto=format&fit=crop",
      ],
      amenities: [
        "Wifi",
        "Pool",
        "Gym",
        "Restaurant",
        "Spa",
        "Parking",
        "AC",
        "Room Service",
      ],
      features: [
        "River View",
        "Business Center",
        "Conference Hall",
        "Airport Shuttle",
      ],
      roomTypes: [
        {
          type: "Deluxe Room",
          price: 8999,
          size: "35 sqm",
          bed: "King Bed",
          occupancy: "2 Adults",
        },
        {
          type: "Executive Suite",
          price: 12999,
          size: "55 sqm",
          bed: "King Bed + Sofa",
          occupancy: "3 Adults",
        },
        {
          type: "Presidential Suite",
          price: 24999,
          size: "85 sqm",
          bed: "King Bed + Living",
          occupancy: "4 Adults",
        },
      ],
      propertyType: "Luxury Hotel",
      distance: "2.5 km from city center",
      description:
        "Luxury riverside hotel with panoramic Brahmaputra views, world-class amenities, and authentic Assamese hospitality.",
      highlights: [
        "Riverside Location",
        "Multiple Dining Options",
        "Luxury Spa",
        "Event Spaces",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 24 hours",
        children: "Children under 12 stay free",
      },
      badge: "PREMIUM",
      isPopular: true,
    },
    {
      id: 2,
      name: "Radisson Blu Hotel Guwahati",
      location: "Guwahati, Assam",
      rating: 4.6,
      reviews: 1923,
      pricePerNight: 7499,
      originalPrice: 10999,
      discount: 32,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1470&auto=format&fit=crop",
      ],
      amenities: [
        "Wifi",
        "Pool",
        "Gym",
        "Restaurant",
        "Bar",
        "Parking",
        "AC",
        "Laundry",
      ],
      features: [
        "City Center",
        "Shopping Mall Access",
        "Multi-cuisine Restaurant",
        "Rooftop Bar",
      ],
      roomTypes: [
        {
          type: "Superior Room",
          price: 7499,
          size: "30 sqm",
          bed: "Queen Bed",
          occupancy: "2 Adults",
        },
        {
          type: "Business Suite",
          price: 11999,
          size: "50 sqm",
          bed: "King Bed + Desk",
          occupancy: "3 Adults",
        },
      ],
      propertyType: "Business Hotel",
      distance: "City Center",
      description:
        "Contemporary business hotel in the heart of Guwahati with modern amenities and excellent connectivity.",
      highlights: [
        "Central Location",
        "Business Facilities",
        "Rooftop Dining",
        "Shopping Access",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours",
        children: "Children under 10 stay free",
      },
      badge: "BUSINESS",
    },
    {
      id: 3,
      name: "Kiranshree Portico",
      location: "Guwahati, Assam",
      rating: 4.4,
      reviews: 1456,
      pricePerNight: 4999,
      originalPrice: 7499,
      discount: 33,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop",
      ],
      amenities: [
        "Wifi",
        "Restaurant",
        "Parking",
        "AC",
        "Room Service",
        "Conference Room",
      ],
      features: [
        "Budget Friendly",
        "Good Location",
        "Clean Rooms",
        "Helpful Staff",
      ],
      roomTypes: [
        {
          type: "Standard Room",
          price: 4999,
          size: "25 sqm",
          bed: "Double Bed",
          occupancy: "2 Adults",
        },
        {
          type: "Deluxe Room",
          price: 6999,
          size: "30 sqm",
          bed: "King Bed",
          occupancy: "2 Adults",
        },
      ],
      propertyType: "Budget Hotel",
      distance: "1.8 km from railway station",
      description:
        "Comfortable budget hotel with essential amenities and warm hospitality in convenient location.",
      highlights: [
        "Value for Money",
        "Good Service",
        "Clean Facilities",
        "Strategic Location",
      ],
      policies: {
        checkIn: "1:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 24 hours",
        children: "Children under 5 stay free",
      },
      badge: "VALUE",
    },
    {
      id: 4,
      name: "Hotel Dynasty",
      location: "Guwahati, Assam",
      rating: 4.2,
      reviews: 987,
      pricePerNight: 3499,
      originalPrice: 5499,
      discount: 36,
      images: [
        "https://images.unsplash.com/photo-1586611292717-f828b167408c?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop",
      ],
      amenities: ["Wifi", "Restaurant", "AC", "Parking", "Laundry"],
      features: [
        "Economic Stay",
        "Basic Amenities",
        "Central Location",
        "24x7 Service",
      ],
      roomTypes: [
        {
          type: "Economy Room",
          price: 3499,
          size: "20 sqm",
          bed: "Double Bed",
          occupancy: "2 Adults",
        },
      ],
      propertyType: "Budget Hotel",
      distance: "3.2 km from airport",
      description:
        "Affordable accommodation with basic amenities for budget-conscious travelers.",
      highlights: [
        "Affordable Rates",
        "Basic Comfort",
        "Convenient Location",
        "Friendly Staff",
      ],
      policies: {
        checkIn: "12:00 PM",
        checkOut: "10:00 AM",
        cancellation: "24-hour cancellation policy",
        children: "Extra charge for children above 5",
      },
      badge: "BUDGET",
    },
  ];

  const amenityIcons = {
    Wifi: Wifi,
    Pool: Waves,
    Gym: Dumbbell,
    Restaurant: Utensils,
    Bar: Coffee,
    Parking: Car,
    AC: Wind,
    "Room Service": Soup,
    Spa: Sparkles,
    Laundry: Bath,
    "Conference Room": Users,
    TV: Tv,
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const availableDates = generateDates();

  const toggleWishlist = (hotelId) => {
    const newWishlisted = new Set(wishlistedHotels);
    if (newWishlisted.has(hotelId)) {
      newWishlisted.delete(hotelId);
    } else {
      newWishlisted.add(hotelId);
    }
    setWishlistedHotels(newWishlisted);
  };

  const getBadgeColor = (badge) => {
    const colors = {
      PREMIUM: "from-purple-500 to-pink-500",
      BUSINESS: "from-blue-500 to-indigo-500",
      VALUE: "from-green-500 to-emerald-500",
      BUDGET: "from-orange-500 to-red-500",
    };
    return colors[badge] || "from-gray-500 to-gray-600";
  };

  const calculateNights = () => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 1;
    const checkIn = new Date(searchParams.checkIn);
    const checkOut = new Date(searchParams.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesPrice =
      hotel.pricePerNight >= filters.priceRange[0] &&
      hotel.pricePerNight <= filters.priceRange[1];
    const matchesRating =
      filters.starRating.length === 0 ||
      filters.starRating.some((rating) => Math.floor(hotel.rating) === rating);
    const matchesAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((amenity) => hotel.amenities.includes(amenity));
    return matchesPrice && matchesRating && matchesAmenities;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (filters.sortBy) {
      case "priceLow":
        return a.pricePerNight - b.pricePerNight;
      case "priceHigh":
        return b.pricePerNight - a.pricePerNight;
      case "rating":
        return b.rating - a.rating;
      case "popularity":
      default:
        return b.reviews - a.reviews;
    }
  });

  const HotelCard = ({ hotel, index }) => (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div
            className={`bg-gradient-to-r ${getBadgeColor(
              hotel.badge
            )} text-white px-3 py-1 rounded-full text-xs font-bold`}
          >
            {hotel.badge}
          </div>
          {hotel.isPopular && (
            <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Crown className="w-3 h-3" />
              POPULAR
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {hotel.discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {hotel.discount}% OFF
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => toggleWishlist(hotel.id)}
            className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
              wishlistedHotels.has(hotel.id)
                ? "bg-red-500/80 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                wishlistedHotels.has(hotel.id) ? "fill-current" : ""
              }`}
            />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Button */}
        <button
          onClick={() => {
            setSelectedHotel(hotel);
            setCurrentImageIndex(0);
            setIsLightboxOpen(true);
          }}
          className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 transition-all"
        >
          <Camera className="w-4 h-4" />
          {hotel.images.length} Photos
        </button>

        {/* Rating */}
        <div className="absolute top-4 right-16 bg-white/90 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-bold text-sm text-gray-900">
            {hotel.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{hotel.distance}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 6).map((amenity, idx) => {
              const IconComponent = amenityIcons[amenity] || Check;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-2 py-1 rounded-lg text-xs transition-colors"
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{amenity}</span>
                </div>
              );
            })}
            {hotel.amenities.length > 6 && (
              <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                +{hotel.amenities.length - 6} more
              </div>
            )}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {hotel.highlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs"
              >
                {highlight}
              </span>
            ))}
            {hotel.highlights.length > 3 && (
              <span className="text-blue-600 text-xs px-2 py-1">
                +{hotel.highlights.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing and CTA */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  ₹{hotel.pricePerNight.toLocaleString("en-IN")}
                </span>
                {hotel.originalPrice > hotel.pricePerNight && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{hotel.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <div className="text-gray-600 text-sm">
                per night • {calculateNights()} nights
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{hotel.rating}</span>
                <span>({hotel.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedHotel(hotel)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors"
            >
              View Details
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 px-6 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Stay
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Discover luxury hotels, cozy homestays, and budget-friendly
              accommodations across Northeast India
            </p>

            {/* Search Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Location */}
                <div className="lg:col-span-2">
                  <label className="block text-white font-semibold mb-2 text-left">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchParams.location}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          location: e.target.value,
                        })
                      }
                      placeholder="Where are you going?"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                    />
                  </div>
                </div>

                {/* Check-in */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-left">
                    Check-in
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={searchParams.checkIn}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          checkIn: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                    />
                  </div>
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-left">
                    Check-out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={searchParams.checkOut}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          checkOut: e.target.value,
                        })
                      }
                      min={
                        searchParams.checkIn ||
                        new Date().toISOString().split("T")[0]
                      }
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-left">
                    Guests & Rooms
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium appearance-none cursor-pointer"
                      value={`${searchParams.guests.adults}-${searchParams.guests.children}-${searchParams.guests.rooms}`}
                      onChange={(e) => {
                        const [adults, children, rooms] = e.target.value
                          .split("-")
                          .map(Number);
                        setSearchParams({
                          ...searchParams,
                          guests: { adults, children, rooms },
                        });
                      }}
                    >
                      <option value="1-0-1">1 Adult, 1 Room</option>
                      <option value="2-0-1">2 Adults, 1 Room</option>
                      <option value="2-1-1">2 Adults, 1 Child, 1 Room</option>
                      <option value="2-2-1">
                        2 Adults, 2 Children, 1 Room
                      </option>
                      <option value="4-0-2">4 Adults, 2 Rooms</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-8">
                <button className="w-full lg:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 px-12 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 text-lg">
                  <Search className="w-6 h-6" />
                  Search Hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Results Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Hotels in {searchParams.location}
            </h2>
            <p className="text-gray-600">
              {sortedHotels.length} properties found •{" "}
              {searchParams.checkIn && searchParams.checkOut
                ? `${new Date(
                    searchParams.checkIn
                  ).toLocaleDateString()} - ${new Date(
                    searchParams.checkOut
                  ).toLocaleDateString()}`
                : "Select dates to see availability"}
            </p>
          </div>

          {/* View Toggle and Sort */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popularity">Most Popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white border border-gray-200 hover:border-blue-300 px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-gray-700 transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [0, parseInt(e.target.value)],
                      })
                    }
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>
                      ₹{filters.priceRange[1].toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Star Rating
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.starRating.includes(rating)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              starRating: [...filters.starRating, rating],
                            });
                          } else {
                            setFilters({
                              ...filters,
                              starRating: filters.starRating.filter(
                                (r) => r !== rating
                              ),
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                          />
                        ))}
                        <span className="text-sm text-gray-600">& above</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="space-y-2">
                  {["Wifi", "Pool", "Gym", "Restaurant", "Parking", "Spa"].map(
                    (amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                amenities: [...filters.amenities, amenity],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                amenities: filters.amenities.filter(
                                  (a) => a !== amenity
                                ),
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Property Type
                </h3>
                <div className="space-y-2">
                  {[
                    "Luxury Hotel",
                    "Business Hotel",
                    "Budget Hotel",
                    "Resort",
                  ].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.propertyType.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              propertyType: [...filters.propertyType, type],
                            });
                          } else {
                            setFilters({
                              ...filters,
                              propertyType: filters.propertyType.filter(
                                (t) => t !== type
                              ),
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() =>
                  setFilters({
                    priceRange: [0, 25000],
                    starRating: [],
                    amenities: [],
                    propertyType: [],
                    sortBy: "popularity",
                  })
                }
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Hotels Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {sortedHotels.map((hotel, index) => (
            <HotelCard key={hotel.id} hotel={hotel} index={index} />
          ))}
        </div>

        {/* No Results */}
        {sortedHotels.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No hotels found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search criteria to find more
              options.
            </p>
            <button
              onClick={() =>
                setFilters({
                  priceRange: [0, 25000],
                  starRating: [],
                  amenities: [],
                  propertyType: [],
                  sortBy: "popularity",
                })
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {sortedHotels.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
              Load More Hotels
            </button>
          </div>
        )}
      </div>

      {/* Hotel Detail Modal */}
      {selectedHotel && !isLightboxOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedHotel.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedHotel.location}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{selectedHotel.rating}</span>
                      <span>({selectedHotel.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHotel(null)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Image Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedHotel.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${selectedHotel.name} ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setCurrentImageIndex(idx);
                      setIsLightboxOpen(true);
                    }}
                  />
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  About this property
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedHotel.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedHotel.amenities.map((amenity, idx) => {
                    const IconComponent = amenityIcons[amenity] || Check;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <IconComponent className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Room Types */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Available Rooms
                </h3>
                <div className="space-y-4">
                  {selectedHotel.roomTypes.map((room, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 mb-2">
                            {room.type}
                          </h4>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Maximize2 className="w-4 h-4" />
                              <span>{room.size}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4" />
                              <span>{room.bed}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{room.occupancy}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{room.price.toLocaleString("en-IN")}
                          </div>
                          <div className="text-gray-600 text-sm">per night</div>
                          <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            Select Room
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Policies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Check-in/out
                    </h4>
                    <div className="space-y-1 text-gray-700">
                      <div>Check-in: {selectedHotel.policies.checkIn}</div>
                      <div>Check-out: {selectedHotel.policies.checkOut}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Cancellation
                    </h4>
                    <div className="text-gray-700">
                      {selectedHotel.policies.cancellation}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Children Policy
                    </h4>
                    <div className="text-gray-700">
                      {selectedHotel.policies.children}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    ₹{selectedHotel.pricePerNight.toLocaleString("en-IN")}
                  </div>
                  <div className="text-gray-600">
                    per night • {calculateNights()} nights total
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleWishlist(selectedHotel.id)}
                    className={`px-6 py-3 rounded-xl font-medium border-2 transition-all ${
                      wishlistedHotels.has(selectedHotel.id)
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlistedHotels.has(selectedHotel.id)
                          ? "fill-current"
                          : ""
                      }`}
                    />
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Images */}
      {isLightboxOpen && selectedHotel && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedHotel.images[currentImageIndex]}
              alt={selectedHotel.name}
              className="max-w-full max-h-full object-contain"
            />

            {selectedHotel.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      currentImageIndex === 0
                        ? selectedHotel.images.length - 1
                        : currentImageIndex - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      currentImageIndex === selectedHotel.images.length - 1
                        ? 0
                        : currentImageIndex + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {selectedHotel.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {selectedHotel.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Trust Section */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Book With Us?</h2>
            <p className="text-blue-200 text-lg">
              Your comfort and satisfaction are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
              <p className="text-blue-200">
                SSL encrypted transactions and data protection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-blue-200">
                Find it cheaper elsewhere? We'll match the price
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-blue-200">
                Round-the-clock customer service assistance
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Properties</h3>
              <p className="text-blue-200">
                All hotels are personally verified and rated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingPage;
