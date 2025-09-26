import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosClient from "../Api/axiosClient"; 

import {
  Star,
  MapPin,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  Grid,
  ThumbsUp,
  Navigation,
  Quote,
  LoaderCircle,
  AlertTriangle,
  Minus,
  Plus,
} from "lucide-react";

import TourBookingForm from "../components/TourBookingForm";
export default function TourDetailsPage() {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchTourData = async () => {
      if (!tourId) return;
      setLoading(true);
      try {
        const [tourResponse, reviewsResponse] = await Promise.all([
  axiosClient.get(`/api/tours/${tourId}`),
  axiosClient.get(`/api/reviews/tour/${tourId}`),
]);

        setTour(tourResponse.data);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error("Failed to fetch tour data:", err);
        setError("Could not load tour details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTourData();
  }, [tourId]);

  const priceDetails = useMemo(() => {
    if (!tour) return null;
    const basePrice = tour.price * guestCount;
    const serviceFee = Math.round(basePrice * 0.08);
    const totalPrice = basePrice + serviceFee;
    return { basePrice, serviceFee, totalPrice };
  }, [tour, guestCount]);

  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 2; i < 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  }, []);

  const nextImage = () =>
    tour && setCurrentImageIndex((p) => (p + 1) % tour.images.length);
  const prevImage = () =>
    tour &&
    setCurrentImageIndex(
      (p) => (p - 1 + tour.images.length) % tour.images.length
    );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoaderCircle className="w-14 h-14 animate-spin text-blue-700" />
      </div>
    );
  if (error || !tour)
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4 bg-gray-50">
        <div>
          <AlertTriangle className="w-14 h-14 mx-auto text-red-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-gray-900">An Error Occurred</h2>
          <p className="text-gray-600 mb-6">{error || "Tour not found."}</p>
          <Link
            to="/browse/tours"
            className="bg-black text-white px-7 py-2 rounded-lg text-base font-medium hover:bg-gray-800"
          >
            Back to Tours
          </Link>
        </div>
      </div>
    );

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-blue-50 relative">
      {/* Hero Section with Gallery Overlay */}
      <div className="relative h-[52vh] md:h-[60vh] flex items-center justify-center bg-black">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}${tour.images[currentImageIndex]}`}

          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 rounded-b-3xl shadow-xl brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 rounded-b-3xl" />
        {/* Navigation & Gallery Controls */}
        <div className="absolute top-8 left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-xl font-medium transition"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
        </div>
        {tour.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full shadow-lg z-20"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full shadow-lg z-20"
            >
              <ChevronRight />
            </button>
          </>
        )}
        {/* Gallery dots */}
        {tour.images.length > 1 && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {tour.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-3 h-3 rounded-full border ${
                  i === currentImageIndex
                    ? "bg-blue-600 border-blue-700"
                    : "bg-white/50 border-white/70"
                } transition`}
              />
            ))}
          </div>
        )}
        {/* Hero Text */}
        <div className="absolute bottom-10 left-0 right-0 px-8 z-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-3 text-white drop-shadow-lg">
              {tour.title}
            </h1>
            <div className="flex items-center gap-6 text-lg font-medium text-white drop-shadow">
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" /> {averageRating}{" "}
                <span className="text-xs text-white/70 ml-1">
                  ({reviews.length} reviews)
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> {tour.duration}
              </span>
              {/* Optional: If you have location */}
              {/* <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {tour.location}
              </span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/95 p-7 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                <Grid className="w-6 h-6 text-blue-500" />
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{tour.description}</p>
            </div>

            <div className="bg-white/95 p-7 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                <ThumbsUp className="w-6 h-6 text-blue-500" />
                Highlights
              </h2>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold shadow"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/95 p-7 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                <Navigation className="w-6 h-6 text-blue-500" />
                Itinerary
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap text-lg">{tour.itinerary}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white/95 p-7 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-2">
                <Quote className="w-6 h-6 text-blue-500" />
                Reviews ({reviews.length})
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b last:border-b-0 pb-7 last:pb-0 flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div className="flex items-center mb-2 md:mb-0">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating ? "text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="ml-3 font-semibold text-gray-800">
                          {review.user?.name || "Anonymous User"}
                        </p>
                        <p className="ml-6 text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-gray-600 mt-2 md:mt-0">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No reviews yet for this tour. Be the first to leave one!
                </p>
              )}
            </div>
          </div>

          {/* Right Sidebar: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-16 bg-white/95 border border-blue-200 p-7 rounded-3xl shadow-2xl flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                <Check className="w-6 h-6 text-blue-500" /> Book Your Tour
              </h3>

              {/* Date Selector */}
              <div>
  <label
    htmlFor="date-select"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Select Date
  </label>
  <input
    type="date"
    id="date-select"
    min={availableDates[0]}              // earliest allowed date (7 days from today)
    max={availableDates[availableDates.length - 1]}  // latest allowed date (90 days from today)
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="w-full border border-blue-300 focus:border-blue-500 rounded-lg shadow-sm p-3 bg-blue-50 font-semibold transition"
  />
</div>


              {/* Guest Counter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center justify-between border border-blue-300 rounded-lg p-3 bg-blue-50 shadow">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="p-2 rounded-full bg-white hover:bg-blue-200 transition border border-blue-300"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-lg text-blue-900">
                    {guestCount} {guestCount > 1 ? "Adults" : "Adult"}
                  </span>
                  <button
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="p-2 rounded-full bg-white hover:bg-blue-200 transition border border-blue-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              {priceDetails && (
                <div className="space-y-2 border-t pt-4 mt-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      Base Price&nbsp;
                      <span className="font-medium text-blue-800">
                        (₹{tour.price.toLocaleString("en-IN")} x {guestCount})
                      </span>
                    </span>
                    <span className="font-medium">
                      ₹{priceDetails.basePrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      Service Fee{" "}
                      <span className="text-xs text-gray-500">(8%)</span>
                    </span>
                    <span className="font-medium">
                      ₹{priceDetails.serviceFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t mt-3">
                    <span>Total Price</span>
                    <span>₹{priceDetails.totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}

              {/* Reserve Now Button */}
              <button
                disabled={!selectedDate}
                onClick={() => setShowBookingForm(true)}
                className={`mt-10 w-full py-3 rounded-xl font-semibold shadow-lg text-lg transition-colors ${
                  selectedDate
                    ? "bg-blue-700 hover:bg-blue-900 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Reserve Now
              </button>

              {/* Booking Form Modal */}
              {showBookingForm && (
                <TourBookingForm
                  tour={tour}
                  onClose={() => setShowBookingForm(false)}
                  selectedDate={selectedDate}
                  guestCount={guestCount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
