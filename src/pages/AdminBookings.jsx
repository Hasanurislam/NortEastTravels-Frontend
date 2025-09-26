import { useState, useEffect, useContext } from "react";
import axiosClient from "../Api/axiosClient"; 
import { AuthContext } from "../context/AuthContext";

export default function AdminBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    if (!user?.token) return;
    try {
      const res = await axiosClient.get("/api/bookings", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  const updateStatus = async (id, status) => {
    if (!user?.token) return;
    try {
      await axiosClient.put(
        `/api/bookings/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchBookings();
    } catch (err) {
      console.error("Failed to update booking status", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 bg-gray-100 rounded">
            {b.tour && (
              <p>
                <b>Tour:</b> {b.tour.title}
              </p>
            )}
            {b.car && (
              <p>
                <b>Car:</b> {b.car.carType}
              </p>
            )}
            <p>
              <b>User:</b> {b.user.name} ({b.user.phone})
            </p>
            <p>
              <b>Date:</b> {new Date(b.date).toLocaleDateString()}
            </p>
            <p>
              <b>Status:</b> {b.status}
            </p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => updateStatus(b._id, "Confirmed")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(b._id, "Cancelled")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
