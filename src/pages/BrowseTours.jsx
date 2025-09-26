import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import axiosClient from "../Api/axiosClient";
import {
  MapPin, Users, Star, Camera, Mountain, Trees, Waves, Clock, Search,
  LoaderCircle, AlertTriangle
} from "lucide-react";

import TourBookingForm from '../components/TourBookingForm' // Adjust path if needed

// Icon helper function
const getTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "adventure": return <Mountain className="w-4 h-4" />;
    case "family": return <Users className="w-4 h-4" />;
    case "honeymoon": return <Trees className="w-4 h-4" />;
    default: return <Waves className="w-4 h-4" />;
  }
};

// Image URL helper
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return  `${import.meta.env.VITE_API_BASE_URL}${path}`;
};

export default function BrowseTours() {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    maxPrice: "",
    sortBy: "",
  });

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page,
          limit: 6,
          search: filters.search,
          type: filters.type,
          maxPrice: filters.maxPrice,
          sortBy: filters.sortBy,
        });
        const { data } = await axiosClient.get(`/api/tours?${params.toString()}`);
        setTours(data.results);
        setTours(data.results);
        setTotalPages(data.pages);
        setTotalTours(data.total);
      } catch (e) {
        console.error("Failed to fetch tours:", e);
        setError("Could not load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchTours();
    }, 300);
    return () => clearTimeout(debounceFetch);
  }, [page, filters]);

  const clearFilters = () => {
    setFilters({ search: "", type: "", maxPrice: "", sortBy: "" });
    setPage(1);
  };

  const openBookingForm = (tour) => {
    setSelectedTour(tour);
    setSelectedDate("");
    setGuestCount(1);
    setShowBookingForm(true);
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setSelectedTour(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100">
      <div className="px-6 py-14 max-w-7xl mx-auto mt-6">
        {/* Header and Filters same as your original */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Discover Northeast India</h1>
            <p className="text-gray-600 text-base md:text-lg">Explore breathtaking landscapes and rich cultures</p>
          </div>
          <div className="text-sm text-slate-700 bg-white shadow px-5 py-2 rounded-xl border border-gray-200 font-semibold">
            {loading ? (
              <span className="flex items-center gap-2"><LoaderCircle className="w-4 h-4 animate-spin text-indigo-400" /> Loading…</span>
            ) : (
              <span>{totalTours} tours available</span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/95 border border-gray-100 shadow-lg p-7 rounded-2xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours..."
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-blue-50 text-gray-800 placeholder-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <select
              className="border border-gray-200 rounded-xl px-3 py-3 bg-blue-50 shadow text-gray-800"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="Adventure">Adventure</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Family">Family</option>
            </select>
            <input
              type="number"
              placeholder="Max Price"
              className="border border-gray-200 rounded-xl px-3 py-3 bg-blue-50 shadow text-gray-800"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
            <select
              className="border border-gray-200 rounded-xl px-3 py-3 bg-blue-50 shadow text-gray-800"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="">Sort By</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>
        {/* Tours Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
                <div className="h-52 bg-gray-300" />
                <div className="p-7 space-y-4"><div className="h-6 bg-gray-200 rounded w-2/3" /><div className="h-4 bg-gray-200 rounded w-1/2" /><div className="h-9 bg-gray-200 rounded mt-4" /></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-white rounded-3xl border shadow ">
            <AlertTriangle className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Could Not Load Tours</h3>
            <p className="text-gray-700 mb-7">{error}</p>
          </div>
        ) : tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getImageUrl(tour.images?.[0]) || 'https://placehold.co/600x400/EEE/31343C?text=Image'}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-semibold shadow">
                    {getTypeIcon(tour.type)}<span className="ml-1 text-blue-700">{tour.type}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white rounded-xl px-4 py-2 text-base font-bold shadow-lg">
                    ₹{tour.price?.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700">{tour.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {tour.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow">{tour.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3 flex-col sm:flex-row">
                    <button
                      onClick={() => navigate(`/tour/${tour._id}`)}
                      className="flex-1 bg-blue-700 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold shadow transition-colors text-lg"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openBookingForm(tour)}
                      className="flex-1 bg-green-600 hover:bg-green-800 text-white py-3 rounded-xl font-semibold shadow transition-colors text-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 col-span-full bg-white rounded-3xl shadow border">
            <Search className="w-14 h-14 text-gray-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900">No Tours Found</h3>
            <p className="text-gray-600 mt-4 mb-7">Try adjusting your search filters to find what you're looking for.</p>
            <button
              onClick={clearFilters}
              className="bg-blue-700 hover:bg-blue-900 text-white px-7 py-3 rounded-xl font-semibold shadow"
            >Clear Filters</button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-14 gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-6 py-3 rounded-xl border bg-white font-semibold text-gray-800 disabled:opacity-40 hover:bg-blue-100 shadow"
            >Previous</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-6 py-3 rounded-xl border font-semibold shadow
                  ${page === i + 1 ? "bg-blue-700 text-white" : "bg-white text-gray-800 hover:bg-blue-100"}`}
              >{i + 1}</button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-6 py-3 rounded-xl border bg-white font-semibold text-gray-800 disabled:opacity-40 hover:bg-blue-100 shadow"
            >Next</button>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedTour && (
        <TourBookingForm
          tour={selectedTour}
          selectedDate={selectedDate}
          guestCount={guestCount}
          onClose={closeBookingForm}
        />
      )}
    </div>
  );
}
