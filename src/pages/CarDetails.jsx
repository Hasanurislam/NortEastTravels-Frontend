// src/pages/CarDetails.jsx
import React, { useState, useEffect, useMemo, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import axiosClient from "../Api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import {
  Star,
  Users,
  Fuel,
  Settings,
  Shield,
  ChevronLeft,
  LoaderCircle,
  AlertTriangle,
  Zap,
  Car as CarIcon,
} from "lucide-react";

import BookingForm from "../components/CarBookingForm";

const SimilarCarCard = ({ car }) => (
  <Link
    to={`/car/${car._id}`}
    className="bg-white rounded-2xl shadow transition hover:shadow-xl group overflow-hidden ring-1 ring-gray-200 hover:ring-indigo-300 flex flex-col"
    aria-label={`Explore ${car.name}`}
  >
    <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
      <img
        src={car.images?.[0] || "https://placehold.co/600x400"}
        alt={car.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 flex flex-col justify-between flex-1">
      <h4 className="font-semibold text-lg truncate text-gray-900 group-hover:text-indigo-700 mb-2">
        {car.name}
      </h4>
      <div>
        <span className="text-xl font-bold text-indigo-600">
          ₹{car.price.toLocaleString("en-IN")}
        </span>
        <span className="text-sm ml-1 text-gray-500">/day</span>
      </div>
    </div>
  </Link>
);

export default function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setPhoneNumber(user.phone || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!carId) return;
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const res = await axiosClient.get(`/api/cars/${carId}`);
        setCar(res.data);
        if (res.data.carType) {
          const simRes = await axiosClient.get(
            `/api/cars?carType=${res.data.carType}&limit=5`
          );
          setSimilarCars(simRes.data.results.filter((c) => c._id !== carId).slice(0, 4));
        }
      } catch {
        setError("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [carId]);

 const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
};



  const priceDetails = useMemo(() => {
    if (!car || !pickupDate || !dropoffDate) return null;
    const d1 = new Date(pickupDate);
    const d2 = new Date(dropoffDate);
    if (d2 <= d1) return null;
    const days = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    const base = car.price * days;
    const fee = Math.round(base * 0.1);
    return { days, base, fee, total: base + fee };
  }, [car, pickupDate, dropoffDate]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-slate-50">
        <LoaderCircle className="w-14 h-14 animate-spin text-indigo-600" />
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-slate-50">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <p className="mt-4 text-gray-700 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-7">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-indigo-700 flex items-center gap-2"
            aria-label="Back to listings"
          >
            <ChevronLeft size={18} />
            Back to listings
          </button>
          <h1 className="text-4xl font-extrabold">{car.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{car.tagline}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <img
            src={getImageUrl(car.images?.[0]) || "https://placehold.co/600x400"}
            alt={car.name}
            className="w-full h-auto object-cover"
          />


          <div className="bg-white p-8 rounded-2xl shadow ring-1 ring-gray-200 mt-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
              <CarIcon /> Vehicle Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-8 text-base text-gray-700">
              <div className="flex items-center gap-3">
                <Users className="text-indigo-600 w-6 h-6" /> {car.seatCapacity} Passengers
              </div>
              <div className="flex items-center gap-3">
                <CarIcon className="text-indigo-600 w-6 h-6" /> {car.carType}
              </div>
              <div className="flex items-center gap-3">
                <Fuel className="text-indigo-600 w-6 h-6" /> {car.engineType}
              </div>
              <div className="flex items-center gap-3">
                <Settings className="text-indigo-600 w-6 h-6" /> {car.transmission}
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-indigo-600 w-6 h-6" /> Fully Insured
              </div>
              <div className="flex items-center gap-3">
                <Zap className={car.availability ? "text-green-500" : "text-red-500"} />
                {car.availability ? "Available" : "Unavailable"}
              </div>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  Features
                </h3>
                <div className="flex flex-wrap gap-3">
                  {car.features.map((feature, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl p-7 shadow ring-1 ring-gray-200 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-extrabold">₹{car.price.toLocaleString("en-IN")}</span>
              <span className="text-gray-500">per day</span>
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mb-4 p-3 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mb-4 p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full mb-4 p-3 border rounded"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => {
                  setPickupDate(e.target.value);
                  setDropoffDate("");
                }}
                className="p-3 border rounded"
              />
              <input
                type="date"
                min={pickupDate || today}
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                disabled={!pickupDate}
                className="p-3 border rounded disabled:bg-gray-100"
              />
            </div>

            {priceDetails && (
              <div className="border-t pt-4 space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>{priceDetails.days} day(s) rental</span>
                  <span>₹{priceDetails.base.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹{priceDetails.fee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t pt-3 text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{priceDetails.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            <button
              disabled={
                !car.availability ||
                !pickupDate ||
                !dropoffDate ||
                !pickupLocation ||
                !fullName ||
                !phoneNumber
              }
              onClick={() => setShowBookingModal(true)}
              className={`w-full py-4 rounded text-white transition ${!car.availability ||
                  !pickupDate ||
                  !dropoffDate ||
                  !pickupLocation ||
                  !fullName ||
                  !phoneNumber
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>

      {similarCars.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
            Similar {car.carType} Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarCars.map((c) => (
              <SimilarCarCard key={c._id} car={c} />
            ))}
          </div>
        </div>
      )}

      {showBookingModal && (
        <BookingForm
          car={car}
          initialName={fullName}
          initialPhone={phoneNumber}
          initialPickupLocation={pickupLocation}
          initialPickupDate={pickupDate}
          initialDropoffDate={dropoffDate}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
