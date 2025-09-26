import React, { useState, useEffect } from "react";
import axiosClient from "../Api/axiosClient";
import { Star, ArrowRight, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OffersPage() {
  const [exclusiveOffers, setExclusiveOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [offersError, setOffersError] = useState(null);

  const navigate = useNavigate();

  const getImageUrl = (img) => {
    if (!img) return undefined;
    return img.startsWith("http") ? img : `${import.meta.env.VITE_API_BASE_URL}${img}`;
  };

  useEffect(() => {
    setLoadingOffers(true);
    axiosClient
      .get("/api/offers")
      .then((res) => {
        console.log("API Response:", res.data);
        setExclusiveOffers(res.data.offers || []);
        setLoadingOffers(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setOffersError("Could not load offers from server.");
        setLoadingOffers(false);
      });
  }, []);

  if (loadingOffers)
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl bg-gradient-to-br from-[#241046] via-[#501c3d] to-[#4f144c]">
        <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}>
          Loading offers...
        </motion.div>
      </div>
    );

  if (offersError)
    return (
      <div className="flex items-center justify-center h-screen text-red-400 text-xl bg-gradient-to-br from-[#241046] via-[#501c3d] to-[#4f144c]">
        <div className="text-center">
          <XCircle className="mx-auto w-12 h-12 mb-4" />
          {offersError}
        </div>
      </div>
    );

  if (!exclusiveOffers.length)
    return (
      <div className="flex items-center justify-center h-screen text-white/80 text-xl bg-gradient-to-br from-[#241046] via-[#501c3d] to-[#4f144c]">
        <div className="text-center">
          <XCircle className="mx-auto w-12 h-12 mb-4 text-pink-400/80" />
          <h2 className="text-2xl font-bold mb-2">No Offers Available</h2>
          <p className="text-white/60">Please check back later for exclusive deals.</p>
        </div>
      </div>
    );

  const OfferCard = ({ offer }) => {
    const featuresToShow = offer.features?.slice(0, 3) || [];
    const moreCount = (offer.features?.length ?? 0) - featuresToShow.length;
    const maxDescChars = 110;
    const isLongDesc = offer.description && offer.description.length > maxDescChars;
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const rotateX = -((y - height / 2) / (height / 2)) * 8;
      const rotateY = ((x - width / 2) / (width / 2)) * 8;

      setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    const cardVariants = {
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      hover: {
        scale: 1.04,
        boxShadow: "0 20px 30px rgba(227, 74, 117, 0.4)",
        transition: { duration: 0.3, ease: "easeOut" },
      },
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "420px",
          minWidth: "320px",
          maxWidth: "450px",
          height: "730px",
          transformStyle: "preserve-3d",
          cursor: "pointer",
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        className="relative flex flex-col group bg-gradient-to-br from-[#2b225a]/80 via-[#613264]/90 to-[#e34a75]/90 rounded-3xl border-none shadow-2xl ring-1 ring-white/20 backdrop-blur-md overflow-hidden"
        onClick={() => navigate(`/offers/${offer._id}`)}
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter") navigate(`/offers/${offer._id}`);
        }}
        role="button"
      >
        <div className="relative h-[220px] w-full bg-gray-800/80 overflow-hidden select-none">
          {offer.image ? (
            <img
              src={getImageUrl(offer.image)}
              alt={offer.title}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              style={{ filter: "grayscale(0.15) brightness(0.95)" }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white text-lg">No Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        </div>
        <div
          className="flex-1 flex flex-col px-8 py-6 bg-gradient-to-bl from-white/5 via-transparent to-black/30"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="uppercase text-[12px] tracking-widest font-bold text-white/80 bg-gradient-to-tr from-yellow-400/60 via-white/30 to-yellow-200/60 px-3 py-1 rounded-full shadow">
              {offer.type || "PREMIUM"}
            </span>
            <div className="flex items-center gap-1 text-yellow-400 font-extrabold drop-shadow">
              <Star size={18} /> <span className="drop-shadow-md">{offer.rating || "4.9"}</span>
            </div>
          </div>
          <h2 className="text-3xl mb-1 font-extrabold text-white/95 tracking-tight leading-snug drop-shadow-md">{offer.title}</h2>
          <div className="mb-1 text-white/85 font-semibold tracking-wide text-[15px]">{offer.subtitle || "7 Destinations • 12 Days"}</div>
          <div className="mb-3 text-white/80 leading-snug text-[16px] min-h-[54px] relative">
            {!isLongDesc ? (
              offer.description
            ) : showFullDesc ? (
              <>
                {offer.description}{" "}
                <span
                  className="text-yellow-300 cursor-pointer font-semibold ml-1 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullDesc(false);
                  }}
                >
                  less
                </span>
              </>
            ) : (
              <>
                {offer.description.slice(0, maxDescChars)}…
                <span
                  className="ml-2 text-blue-300 cursor-pointer font-semibold hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullDesc(true);
                  }}
                >
                  more
                </span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {featuresToShow.map((feat, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-tr from-purple-500/60 via-pink-600/60 to-red-400/60 text-white px-4 py-1 rounded-full text-[13px] font-semibold shadow"
              >
                {feat}
              </span>
            ))}
            {moreCount > 0 && (
              <span className="bg-gradient-to-tr from-slate-500/40 to-transparent text-white/70 px-3 py-1 rounded-full text-[13px] font-semibold shadow">
                +{moreCount} more
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              {offer.discount && (
                <span className="bg-gradient-to-r from-green-500/70 to-green-700/90 text-white text-[15px] font-bold px-3 py-1 rounded-full shadow-md">
                  {offer.discount}% OFF
                </span>
              )}
            </div>
            <span className="text-xs text-white/70 font-medium tracking-wide">Valid till {offer.validTill || "Dec 31, 2024"}</span>
          </div>
          <div className="mb-7 border-b border-white/10 pb-2">
            <span className="block text-3xl text-white font-extrabold drop-shadow">
              ₹{(offer.offerPrice || 0).toLocaleString("en-IN")}
            </span>
            <span className="block text-xl text-white/30 line-through font-semibold -mt-1">
              ₹{(offer.originalPrice || 0).toLocaleString("en-IN")}
            </span>
          </div>
          <motion.button
            className="w-full py-3 rounded-xl text-white text-base font-bold bg-gradient-to-r from-[#b048ff]/95 via-[#e15294]/90 to-[#fc604a]/90 flex items-center justify-center gap-2 shadow-xl shadow-black/20 transition-transform transform-gpu"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/offers/${offer._id}`);
            }}
            tabIndex={-1}
            style={{ outline: "none", marginTop: "auto", letterSpacing: 0.48, transform: "translateZ(20px)" }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 15px #fc604a" }}
            whileTap={{ scale: 0.96, boxShadow: "0 0 8px #e15294" }}
          >
            Claim Offer <ArrowRight size={20} />
          </motion.button>
        </div>
        <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:ring-4 group-hover:ring-pink-400/30 group-hover:blur-sm transition-all duration-200" />
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        ease: "easeOut",
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#241046] via-[#501c3d] to-[#4f144c] py-16 px-3">
      <motion.div
        className="flex flex-wrap gap-x-10 gap-y-14 justify-center mx-auto max-w-[1300px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {exclusiveOffers.map((offer) => (
          <OfferCard key={offer._id} offer={offer} />
        ))}
      </motion.div>
    </div>
  );
}
