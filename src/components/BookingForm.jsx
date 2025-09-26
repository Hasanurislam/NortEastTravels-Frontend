import React, { useState, useEffect, useMemo, useContext } from "react";
import { Minus, Plus, Calendar } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../Api/axiosClient";

export default function BookingForm({ offer, selectedDate, guestCount, onClose }) {
  if (!offer) return null;

  const { user } = useContext(AuthContext);

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phoneNumber: user?.phone || "",
    pickupLocation: "",
    date: selectedDate || "",
    guests: guestCount || 1,
    specialRequests: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      fullName: user?.name || "",
      phoneNumber: user?.phone || "",
      pickupLocation: "",
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      guests: guestCount || 1,
      specialRequests: "",
    });
    setError(null);
  }, [offer, user, selectedDate, guestCount]);

  const totalPrice = useMemo(() => {
    const guestsCount = Number(form.guests);
    if (isNaN(guestsCount) || guestsCount < 1) return 0;
    const basePrice = offer.offerPrice * guestsCount;
    const serviceFee = Math.round(basePrice * 0.08);
    return basePrice + serviceFee;
  }, [form.guests, offer.offerPrice]);

  const canSubmit = () => {
    const { fullName, phoneNumber, pickupLocation, date, guests } = form;
    return (
      fullName.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      pickupLocation.trim() !== "" &&
      date !== "" &&
      guests > 0
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "guests") {
      const numericVal = value.replace(/\D/g, "");
      if (numericVal === "") {
        setForm((f) => ({ ...f, guests: 0 }));
      } else {
        setForm((f) => ({ ...f, guests: Math.max(1, Number(numericVal)) }));
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    if (!canSubmit()) {
      setError("Please fill all required fields.");
      return;
    }
    if (!user || !user.token) {
      setError("You must be logged in to book.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const payload = {
        travelers: Number(form.guests),
        date: form.date,
        pickupLocation: form.pickupLocation,
        phone: form.phoneNumber,
        specialRequests: form.specialRequests,
        totalPrice,
        offerId: offer._id,
      };

      await axiosClient.post("/api/bookings", payload, {

        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Booking successful!");
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Booking failed, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-6">
      <div className="relative max-w-lg w-full bg-white rounded-3xl p-8 overflow-auto max-h-[80vh] shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-700 text-3xl hover:text-black"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6">{offer.title || "Book Now"}</h2>

        <div className="mb-4">
          <span className="text-lg font-semibold text-gray-700 mr-2">
            Price per Guest:
          </span>
          <span className="text-green-600 text-lg">
            ₹{offer.offerPrice.toLocaleString()}
          </span>
          <span className="text-gray-400 line-through ml-3 text-lg">
            ₹{offer?.originalPrice?.toLocaleString() || "--"}
          </span>
        </div>

        <div className="mb-6 font-bold text-lg text-gray-800">
          Total Price: ₹{totalPrice.toLocaleString()}
        </div>

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          value={form.pickupLocation}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <label className="block mb-1 font-semibold">Select Date</label>
        <div className="relative mb-4">
          <Calendar className="absolute left-3 top-3 text-gray-400" />
          <input
            name="date"
            type="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            className="w-full pl-10 p-3 border rounded"
          />
        </div>

        <label className="block mb-1 font-semibold">Guests</label>
        <div className="flex mb-4">
          <button
            type="button"
            className="rounded-l border border-gray-300 p-2 hover:bg-gray-200"
            onClick={() =>
              setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))
            }
          >
            <Minus />
          </button>
          <input
            name="guests"
            type="number"
            min="1"
            value={form.guests}
            onChange={handleChange}
            className="w-16 p-2 border-y border-gray-300 text-center"
          />
          <button
            type="button"
            className="rounded-r border border-gray-300 p-2 hover:bg-gray-200"
            onClick={() => setForm((f) => ({ ...f, guests: f.guests + 1 }))}
          >
            <Plus />
          </button>
        </div>

        <textarea
          name="specialRequests"
          value={form.specialRequests}
          onChange={handleChange}
          placeholder="Special Requests (Optional)"
          rows="3"
          className="w-full p-3 border rounded mb-6"
        />

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

        <button
          className={`w-full py-3 rounded text-white font-semibold transition ${
            canSubmit()
              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!canSubmit() || loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
