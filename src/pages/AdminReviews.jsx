import { useState, useEffect, useContext } from "react";
import axiosClient from "../Api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function AdminReviews() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await axiosClient.get("/api/reviews/tourId");

    setReviews(res.data);
  };

  const deleteReview = async (id) => {
   await axiosClient.delete(`/api/reviews/${id}`, {
  headers: { Authorization: `Bearer ${user.token}` },
});

    fetchReviews();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
      {reviews.map((r) => (
        <div
          key={r._id}
          className="bg-gray-100 p-4 rounded mb-2 flex justify-between"
        >
          <div>
            <p>
              <b>{r.user.name}</b> - {r.rating} ⭐
            </p>
            <p>{r.review}</p>
          </div>
          <button
            onClick={() => deleteReview(r._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
