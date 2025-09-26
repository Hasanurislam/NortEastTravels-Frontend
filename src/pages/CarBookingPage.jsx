import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosClient from "../Api/axiosClient";
import {
  Car,
  Users,
  Fuel,
  Settings,
  Star,
  Shield,
  ChevronDown,
  Filter,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";

// Reusable Car Card Component with fixed image URL handling
const CarCard = ({ car }) => {
  // Helper to build full image URL
 const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  };

  return (
    <Link
      to={`/car/${car._id}`}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform flex flex-col"
    >
      <div className="relative">
        <img
          src={getImageUrl(car.images?.[0]) || "https://placehold.co/600x400?text=Car"}
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
          <Star className="w-4 h-4 text-yellow-400" /> {car.rating}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{car.tagline}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 my-4">
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            {car.seatCapacity} seats
          </span>
          <span className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-gray-500" />
            {car.engineType}
          </span>
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-500" />
            Insured
          </span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-indigo-600 text-2xl font-bold">₹{car.price.toLocaleString("en-IN")}</span>
          <div className="bg-indigo-600 text-white rounded-xl px-5 py-2 cursor-pointer select-none">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Page Component - fully dynamic car listing with filters
export default function CarBookingPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ carType: "", engineType: "", seatCapacity: "" });
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const fetchCars = () => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      axiosClient
        .get(`/api/cars?${params.toString()}`)
        .then(({ data }) => {
          setCars(data.results);
        })
        .catch(() => {
          setError("Could not load cars. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const debounce = setTimeout(fetchCars, 300);
    return () => clearTimeout(debounce);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Skeleton for loading state
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white text-center py-20 px-4">
        <h1 className="text-5xl font-bold">Find Your Perfect Ride</h1>
        <p className="text-xl mt-4 text-slate-300">Freedom to explore, with a car for every journey.</p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Filter Options</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-indigo-600 font-semibold flex items-center gap-1"
            >
              {showFilters ? "Hide" : "Show"} <Filter className="w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
              <select
                name="carType"
                value={filters.carType}
                onChange={handleFilterChange}
                className="p-3 border-gray-300 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Types</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Economy">Economy</option>
                <option value="Electric">Electric</option>
              </select>

              <select
                name="engineType"
                value={filters.engineType}
                onChange={handleFilterChange}
                className="p-3 border-gray-300 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Engines</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>

              <select
                name="seatCapacity"
                value={filters.seatCapacity}
                onChange={handleFilterChange}
                className="p-3 border-gray-300 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Any Seats</option>
                <option value="4">4+ Seats</option>
                <option value="5">5+ Seats</option>
                <option value="7">7+ Seats</option>
              </select>
            </div>
          )}
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-lg text-red-700">
            <AlertTriangle className="mx-auto w-10 h-10 mb-4" />
            {error}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20">
            <Car className="mx-auto w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold">No Cars Found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
