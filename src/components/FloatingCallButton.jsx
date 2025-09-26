import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PRIMARY_PHONE } from "../config/site";
import { Phone } from "lucide-react";

export default function FloatingCallButton() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only show on home page
  if (location.pathname !== "/") return null;

  if (!show) return null;

  return (
    <a
      href={`tel:${PRIMARY_PHONE}`}
      aria-label="Call now"
      title="Call now"
      className="md:hidden fixed right-4 bottom-25 z-50 rounded-full shadow-lg bg-green-600 text-white h-14 w-14 flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="text-2xl">
        <Phone />
      </span>
      <span
        className="absolute inline-flex h-14 w-14 rounded-full opacity-75 animate-ping bg-green-600"
        aria-hidden="true"
      />
    </a>
  );
}
