import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get("http://localhost:5000/api/reviews/latest");
      setReviews(res.data);
    };
    fetchReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  if (reviews.length === 0) return null;

  return (
    <div className="bg-gray-50 py-10 rounded-lg mt-12">
      <h2 className="text-3xl font-bold text-center mb-6">
        What Our Customers Say
      </h2>
      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {reviews.map((r) => (
            <div key={r._id} className="px-4">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-yellow-500 text-lg mb-2">{r.rating} ⭐</p>
                <p className="text-gray-700 italic">"{r.review}"</p>
                <p className="mt-3 font-semibold">- {r.user.name}</p>
                {r.tour && (
                  <p className="text-sm text-gray-500">Tour: {r.tour.title}</p>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
