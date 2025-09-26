import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../Api/axiosClient";

export default function BookingForm({ tour, onClose, selectedDate, guestCount }) {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    passengers: guestCount || 1,
    pickup: "",
    message: "",
    date: selectedDate || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      date: selectedDate,
      passengers: guestCount,
    }));
  }, [selectedDate, guestCount]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.passengers ||
      !form.date ||
      !form.pickup
    ) {
      setError("Please fill all required fields");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // Calculate totalPrice based on tour price and passenger count
      const totalPrice = +(tour.price * Number(form.passengers));

      // Prepare booking data for backend
      const bookingData = {
        tourId: tour._id,
        travelers: Number(form.passengers),
        date: form.date,
        pickupLocation: form.pickup,
        phone: form.phone,
        specialRequests: form.message,
        totalPrice: totalPrice,
      };

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      // Send booking create request
      await axiosClient.post("/api/bookings", bookingData, {
  headers: { Authorization: `Bearer ${user.token}` },
});

      alert("Booking request submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Booking submission failed:", err);
      setError(
        err.response?.data?.message ||
          "Booking submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // Corrected line
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close booking form"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Booking for {tour.title}
        </h2>

        {error && (
          <p className="mb-4 text-red-600 font-semibold">{error}</p>
        )}

        <div className="grid gap-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
            required
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
            required
          />
          <input
            type="number"
            name="passengers"
            placeholder="No. of Passengers"
            value={form.passengers}
            onChange={handleChange}
            min={1}
            className="border rounded-lg p-3 w-full"
            required
          />
          <input
            name="date"
            type="date"
            placeholder="Select Date"
            value={form.date}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
            required
          />
          <input
            name="pickup"
            placeholder="Pickup Location"
            value={form.pickup}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
            required
          />
          <textarea
            name="message"
            placeholder="Special Message (Optional)"
            value={form.message}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
