import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewList({ tourId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [tourId]);

  const fetchReviews = async () => {
    const res = await axios.get(`http://localhost:5000/api/reviews/${tourId}`);
    setReviews(res.data);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r._id} className="border-b pb-2">
              <p className="font-bold">{r.user.name}</p>
              <p className="text-yellow-600">{r.rating} ⭐</p>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
