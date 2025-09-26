import React, { useEffect, useState, useContext } from "react";
import axiosClient from "../Api/axiosClient";
import { Clock, Check, X, Calendar } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import BookingDetails from "../components/BookingDetails"; // Adjust path as needed

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/api/bookings", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axiosClient.put(
        `/api/bookings/${bookingId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error("Failed to update booking status:", error);
      alert("Failed to update booking status");
    }
  };

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;

  const statusDetails = {
    Pending: {
      text: "Pending",
      bg: "bg-yellow-50",
      textColor: "text-yellow-700",
      icon: <Clock className="inline w-5 h-5 text-yellow-500 mr-1" />,
      border: "border-yellow-300",
    },
    Confirmed: {
      text: "Confirmed",
      bg: "bg-green-50",
      textColor: "text-green-700",
      icon: <Check className="inline w-5 h-5 text-green-600 mr-1" />,
      border: "border-green-400",
    },
    Cancelled: {
      text: "Cancelled",
      bg: "bg-red-50",
      textColor: "text-red-700",
      icon: <X className="inline w-5 h-5 text-red-600 mr-1" />,
      border: "border-red-400",
    },
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-center text-gray-600 text-lg font-medium">
        Access denied. Please log in as admin.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-gray-900">
        Dashboard
      </h1>
      <p className="text-gray-600 mb-10 text-lg">
        Manage bookings and monitor system status
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          {
            label: "Total Bookings",
            value: totalBookings,
            icon: <Calendar className="w-10 h-10 text-blue-500" />,
            bg: "bg-white",
          },
          {
            label: "Pending",
            value: pendingCount,
            icon: <Clock className="w-10 h-10 text-yellow-500" />,
            bg: "bg-yellow-50",
            textColor: "text-yellow-700",
          },
          {
            label: "Confirmed",
            value: confirmedCount,
            icon: <Check className="w-10 h-10 text-green-600" />,
            bg: "bg-green-50",
            textColor: "text-green-700",
          },
        ].map(({ label, value, icon, bg, textColor }, i) => (
          <div
            key={i}
            className={`${bg} rounded-2xl shadow p-6 flex items-center justify-between`}
          >
            <div>
              <div
                className={`text-sm font-semibold mb-1 ${
                  textColor || "text-gray-600"
                }`}
              >
                {label}
              </div>
              <div className="text-3xl font-extrabold tracking-tight text-gray-900">
                {value}
              </div>
            </div>
            <div>{icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 px-8 py-5">
          <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide select-none">
              <tr>
                <th className="w-1/6 px-6 py-3 text-left font-semibold">Customer</th>
                <th className="w-1/12 px-6 py-3 text-left font-semibold">Type</th>
                <th className="w-1/6 px-6 py-3 text-left font-semibold">Item</th>
                <th className="w-1/6 px-6 py-3 text-left font-semibold">Date</th>
                <th className="w-1/12 px-6 py-3 text-left font-semibold">Amount</th>
                <th className="w-1/6 px-6 py-3 text-left font-semibold">Status</th>
                <th className="w-1/6 px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-lg text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-lg text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="px-6 py-4 truncate">{booking.user?.name || "N/A"}</td>
                    <td className="px-6 py-4">
                      {booking.tour ? "Tour" : booking.car ? "Car" : "N/A"}
                    </td>
                    <td className="px-6 py-4 truncate">
                      {booking.tour?.title || booking.car?.carType || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(booking.date).toISOString().substring(0, 10)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      ₹{" "}
                      {typeof booking.totalPrice === "number"
                        ? booking.totalPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusDetails[booking.status]?.bg} ${statusDetails[booking.status]?.textColor} border ${statusDetails[booking.status]?.border} select-none`}
                      >
                        {statusDetails[booking.status]?.icon}
                        {statusDetails[booking.status]?.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="border border-gray-300 rounded text-sm px-2 py-1"
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetails booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      )}
    </div>
  );
}
