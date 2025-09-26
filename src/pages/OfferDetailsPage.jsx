// src/pages/OfferDetails.jsx
import React, { useState, useEffect, useMemo, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import axiosClient from "../Api/axiosClient"; // Adjust relative path as needed

import {
  Star,
  Check,
  ArrowRight,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import BookingForm from "../components/BookingForm"; // Adjust path if needed

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function OfferDetails() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    async function fetchOffer() {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get(`/api/offers/${offerId}`);

        setOffer(res.data);
      } catch (err) {
        setError("Failed to load offer.");
      } finally {
        setLoading(false);
      }
    }
    if (offerId) fetchOffer();
  }, [offerId]);

  const priceDetails = useMemo(() => {
    if (!offer) return null;
    const base = offer.offerPrice * guestCount;
    const fee = Math.round(base * 0.08);
    return { base, fee, total: base + fee };
  }, [offer, guestCount]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <LoaderCircle className="w-14 h-14 animate-spin text-indigo-600" />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-red-600">
        <AlertTriangle size={48} />
        <p className="mt-4 text-xl font-semibold">{error}</p>
        <Link to="/offers" className="mt-4 text-indigo-600 underline">
          Back to Offers
        </Link>
      </div>
    );

  if (!offer)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        Offer not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          {offer.image ? (
            <img
              src={offer.image?.startsWith("http") ? offer.image : `${import.meta.env.VITE_API_BASE_URL}${offer.image}`}
              alt={offer.title}
            />

          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60"
            aria-label="Go Back"
          >
            ← Back
          </button>
        </div>

        <div className="p-8 flex flex-col space-y-6">
          <h1 className="text-4xl font-extrabold">{offer.title}</h1>
          <p className="text-lg text-gray-700 font-semibold">
            {offer.subtitle || "Description not available"}
          </p>
          <p className="text-gray-600 whitespace-pre-line">{offer.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {(offer.features || []).map((feat, idx) => (
              <span
                key={idx}
                className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-semibold"
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Details */}
          <div className="flex justify-between text-gray-500">
            <div>Type: {offer.type || "N/A"}</div>
            <div>Duration: {offer.duration || "N/A"}</div>
            <div>Valid till: {offer.validTill || "N/A"}</div>
          </div>

          {/* Booking Section */}
          <div className="border-t pt-6 space-y-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                className="border border-gray-300 rounded-md p-3 w-full"
                placeholderText="Choose a date"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                  className="px-2 py-1 bg-gray-200 rounded"
                  aria-label="Decrease guests"
                >
                  -
                </button>
                <span>{guestCount}</span>
                <button
                  onClick={() => setGuestCount((c) => c + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                  aria-label="Increase guests"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Price per guest:</span>
                <span>₹{(offer.offerPrice ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Service fee (8%):</span>
                <span>₹{(priceDetails?.fee ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-2">
                <span>Total:</span>
                <span>₹{(priceDetails?.total ?? 0).toLocaleString()}</span>
              </div>
            </div>

            <button
              disabled={!selectedDate}
              onClick={() => setShowBookingForm(true)}
              className={`w-full py-3 rounded-md text-white text-lg font-semibold ${selectedDate
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Proceed to Book
            </button>
          </div>

          {showBookingForm && (
            <BookingForm
              offer={offer}
              selectedDate={selectedDate}
              guestCount={guestCount}
              onClose={() => setShowBookingForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
