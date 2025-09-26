import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function ReviewForm({ tourId, onAdded }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        { tourId, rating, review },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setRating(5);
      setReview("");
      if (onAdded) onAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Review failed");
    }
  };

  if (!user) return <p className="text-gray-600">Login to leave a review.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mb-4"
    >
      <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
      <label className="block mb-2">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} ⭐
          </option>
        ))}
      </select>

      <textarea
        placeholder="Write your review..."
        className="border p-2 rounded w-full mb-3"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Submit Review
      </button>
    </form>
  );
}
