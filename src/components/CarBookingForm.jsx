import React, { useState, useEffect, useContext } from "react";
import { Calendar } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function BookingForm({
  car,
  initialName = "",
  initialPhone = "",
  initialPickupLocation = "",
  initialPickupDate = "",
  initialDropoffDate = "",
  onClose,
}) {
  const { user } = useContext(AuthContext);
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    fullName: initialName,
    phoneNumber: initialPhone,
    pickupLocation: initialPickupLocation,
    pickupDate: initialPickupDate,
    dropoffDate: initialDropoffDate,
    // Internal Date objects for date pickers can be separate or inferred from above if using custom date picker
    // But here we use native input type=date for simplicity
    specialRequests: "",
  });

  useEffect(() => {
    setForm((f) => ({
      ...f,
      fullName: initialName,
      phoneNumber: initialPhone,
      pickupLocation: initialPickupLocation,
      pickupDate: initialPickupDate,
      dropoffDate: initialDropoffDate,
    }));
  }, [initialName, initialPhone, initialPickupLocation, initialPickupDate, initialDropoffDate]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = () => {
    const { fullName, phoneNumber, pickupLocation, pickupDate, dropoffDate } = form;
    if (!fullName || !phoneNumber || !pickupLocation || !pickupDate || !dropoffDate) return false;
    if (new Date(dropoffDate) <= new Date(pickupDate)) return false;
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    if (!canSubmit()) {
      setError("Please fill all fields correctly.");
      return;
    }
    if (!user || !user.token) {
      setError("You must be logged in to book.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const start = new Date(form.pickupDate);
      const end = new Date(form.dropoffDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const base = car.price * days;
      const fee = Math.round(base * 0.1);
      const totalPrice = base + fee;

      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          carId: car._id,
          travelers: days,
          date: form.pickupDate,
          pickupLocation: form.pickupLocation,
          phone: form.phoneNumber,
          specialRequests: form.specialRequests,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      
      alert("Booking successful!");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white bg-opacity-90 rounded-3xl p-8 max-w-lg w-full shadow-xl relative overflow-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 text-3xl hover:text-gray-900"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-6">Reserve {car?.name || "Car"}</h2>

        {error && <p className="mb-4 text-red-600">{error}</p>}

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

        <div className="grid grid-cols-2 gap-4 mb-4">
          <DateInput
            label="Pickup Date"
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
            min={today}
          />
          <DateInput
            label="Dropoff Date"
            name="dropoffDate"
            value={form.dropoffDate}
            onChange={handleChange}
            min={form.pickupDate || today}
            disabled={!form.pickupDate}
          />
        </div>

        <textarea
          name="specialRequests"
          placeholder="Special Requests (Optional)"
          value={form.specialRequests}
          onChange={handleChange}
          rows={3}
          className="w-full mb-6 p-3 border rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={!canSubmit() || loading}
          className={`w-full py-4 rounded text-white transition ${
            loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Submitting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}

function DateInput({ label, name, value, onChange, min, disabled }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <div className="relative">
        <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          disabled={disabled}
          className="w-full pl-10 p-3 border rounded disabled:bg-gray-100"
        />
      </div>
    </div>
  );
}
