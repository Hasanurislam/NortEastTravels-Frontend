// client/src/pages/ComingSoonPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ComingSoonPage = () => {
  const navigate = useNavigate();

  const handleExploreTours = (e) => {
    e?.preventDefault();
    // navigate to BrowseTours page (adjust path if your route differs)
    navigate("/browse/tours");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        {/* Divider */}
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />

        {/* Call to action */}
        <p className="text-lg text-gray-700 mb-8">
          While you wait, why not discover what we have to offer?
        </p>

        {/* Explore Tours Button */}
        <button
          onClick={handleExploreTours}
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          aria-label="Explore our tours"
        >
          Explore Our Tours
        </button>

        {/* Footer text */}
        <p className="text-sm text-gray-500 mt-12">
          Thank you for your patience
        </p>
      </div>
    </div>
  );
};

export default ComingSoonPage;
