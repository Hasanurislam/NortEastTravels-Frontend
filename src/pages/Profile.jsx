import React, { useEffect, useState, useContext } from "react";
import axiosClient from "../Api/axiosClient"; // Adjust path if needed

import { AuthContext } from "../context/AuthContext";
import {
  LoaderCircle,
  AlertTriangle,
  Briefcase,
  Calendar,
  Users,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

// Helper to build full image URL for backend relative paths
const getImageUrl = (item) => {
  if (!item) return null;
  const path = item.images?.[0] || item.image || null;
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;


};

// BookingCard component displays booking info
const BookingCard = ({ booking, onCancel }) => {
  const item = booking.tour ?? booking.car ?? booking.offer ?? {};
  const itemType = booking.tour ? "Tour" : booking.car ? "Car" : "Offer";

  const imageUrl =
    getImageUrl(item) || `https://placehold.co/600x400/94a3b8/FFFFFF?text=${itemType}`;

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden flex flex-col md:flex-row transform hover:scale-[1.02] transition-transform duration-300">
      <img
        src={imageUrl}
        alt={item.title ?? item.name ?? itemType}
        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
      />
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                statusStyles[booking.status]
              }`}
            >
              {booking.status}
            </span>
            <h3 className="text-2xl font-bold mt-2 text-gray-900">
              {item.title ?? item.name ?? "Untitled"}
            </h3>
            <p className="text-gray-500 font-medium">{itemType} Booking</p>
          </div>
          {booking.status === "Pending" && (
            <button
              onClick={() => onCancel(booking._id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Cancel Booking"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
        <div className="border-t my-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-gray-500" />
            <span>
              {new Date(booking.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Users size={18} className="text-gray-500" />
            <span>{booking.travelers} Traveler(s)</span>
          </div>
          <div className="flex items-center gap-3 col-span-full">
            <MapPin size={18} className="text-gray-500" />
            <span>{booking.pickupLocation}</span>
          </div>
          <div className="flex items-center gap-3 col-span-full">
            <Phone size={18} className="text-gray-500" />
            <span>Contact: {booking.phone}</span>
          </div>
        </div>
        <div className="border-t mt-auto pt-4 flex justify-end items-baseline gap-2">
          <span className="text-gray-500 font-medium">Total Price:</span>
          <span className="text-2xl font-bold text-indigo-600">
            ₹{booking.totalPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("all");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const fetchBookings = async () => {
    if (!user?.token) return;
    try {
      const { data } = await axiosClient.get("/api/bookings/my", {
  headers: { Authorization: `Bearer ${user.token}` },
});

      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError("Failed to fetch your bookings. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
    else setLoading(false);
  }, [user]);

  const handleCancelClick = (bookingId) => {
    setBookingToCancel(bookingId);
    setShowConfirmModal(true);
  };

  const confirmCancelBooking = async () => {
    if (!bookingToCancel) return;
    try {
      await axiosClient.put(
  `/api/bookings/cancel/${bookingToCancel}`,
  {},
  { headers: { Authorization: `Bearer ${user?.token}` } }
);

      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation failed. Please try again.");
    } finally {
      setShowConfirmModal(false);
      setBookingToCancel(null);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === "completed") {
      return b.status === "Confirmed"; // or adapt if you use "Completed"
    } else if (filter === "others") {
      return b.status !== "Confirmed";
    }
    return true; // for "all"
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );

  if (!user)
    return (
      <p className="text-center mt-20 text-xl font-semibold">
        Please log in to view your profile.
      </p>
    );

  const displayName = user?.name ? user.name.split(" ")[0] : "Guest";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Welcome, {displayName}!</h1>
            <p className="text-gray-600 mt-1 text-lg">
              Manage your profile and view your booking history.
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-gray-200 hover:bg-red-100 text-gray-800 hover:text-red-800 font-bold py-2 px-4 rounded-lg transition-colors mt-4 sm:mt-0"
          >
            Logout
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded font-semibold ${
              filter === "completed" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Completed Orders
          </button>
          <button
            onClick={() => setFilter("others")}
            className={`px-4 py-2 rounded font-semibold ${
              filter === "others" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Other Orders
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded font-semibold ${
              filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            All Orders
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center gap-3 mb-6">
            <AlertTriangle />
            {error}
          </div>
        )}

        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
            <Briefcase size={64} className="mx-auto text-gray-300" />
            <p className="mt-4 text-xl font-semibold text-gray-700">
              You have no bookings in this category.
            </p>
            <p className="text-gray-500 mt-2">
              Ready for an adventure? Explore our tours and cars.
            </p>
            <Link
              to="/browse/tours"
              className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Explore Tours
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredBookings.map((b) => (
              <BookingCard key={b._id} booking={b} onCancel={handleCancelClick} />
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Are you sure?</h3>
            <p className="text-gray-600 mb-8">
              Do you really want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancelBooking}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
