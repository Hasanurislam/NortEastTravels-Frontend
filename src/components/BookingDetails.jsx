import React from "react";

export default function BookingDetails({ booking, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-6">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-3xl max-w-xl w-full p-8 shadow-2xl overflow-y-auto max-h-[80vh] relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 text-3xl font-bold focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b pb-4">
          Booking Details
        </h2>
        <div className="grid grid-cols-1 gap-4 text-gray-700 text-base">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Customer Name:</span>
            <span>{booking.user?.name || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Phone:</span>
            <span>{booking.phone}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Type:</span>
            <span>{booking.tour ? "Tour" : booking.car ? "Car" : "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Item:</span>
            <span>{booking.tour?.title || booking.car?.carType || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Date:</span>
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Travelers:</span>
            <span>{booking.travelers}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Pickup Location:</span>
            <span>{booking.pickupLocation}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Special Requests:</span>
            <span>{booking.specialRequests || "None"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Total Price:</span>
            <span>₹ {booking.totalPrice ? booking.totalPrice.toLocaleString() : "N/A"}</span>
          </div>
          <div className="flex justify-between pt-4">
            <span className="font-semibold text-lg">Status:</span>
            <span className="text-lg">{booking.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
